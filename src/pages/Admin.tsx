import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../types';
import { syncAppointmentsFromSupabase, getStoredAppointments, cancelAppointment } from '../utils/storage';
import { updateAppointmentStatusInSupabase } from '../lib/supabaseAppointments';
import {
  checkAdminExists,
  registerSingleSlotAdmin,
  loginAdmin,
  getAdminSession,
  logoutAdmin,
  AdminUser
} from '../lib/supabaseAdmin';
import { PageHeader } from '../components/common/PageHeader';
import {
  ShieldCheck,
  Lock,
  UserPlus,
  LogIn,
  LogOut,
  Search,
  Filter,
  RefreshCw,
  Database,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock3,
  FileSpreadsheet,
  Code,
  Copy,
  Check,
  ChevronDown,
  Info,
  Shield,
  Stethoscope,
  Building,
  AlertTriangle
} from 'lucide-react';

export const Admin: React.FC = () => {
  const navigate = useNavigate();

  // Auth State
  const [adminSession, setAdminSessionState] = useState<AdminUser | null>(getAdminSession());
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [existingAdminUsername, setExistingAdminUsername] = useState<string>('');

  // Login / Signup Form States
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Dashboard State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Check single slot status on load
  const loadAdminSlotStatus = async () => {
    const res = await checkAdminExists();
    setAdminExists(res.exists);
    if (res.adminUsername) setExistingAdminUsername(res.adminUsername);
    
    // Default to login mode if admin exists
    if (res.exists) {
      setIsRegisterMode(false);
    } else {
      setIsRegisterMode(true);
    }
  };

  useEffect(() => {
    loadAdminSlotStatus();
    if (adminSession) {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    setIsLoadingAppointments(true);
    const local = getStoredAppointments();
    setAppointments(local);

    try {
      const synced = await syncAppointmentsFromSupabase();
      setAppointments(synced);
    } catch (err) {
      console.error('Failed to sync bookings:', err);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  // Handle Auth submission
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);
    setIsSubmittingAuth(true);

    if (isRegisterMode) {
      if (!username.trim() || !email.trim() || !password) {
        setAuthError('Please fill in all required fields.');
        setIsSubmittingAuth(false);
        return;
      }
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match.');
        setIsSubmittingAuth(false);
        return;
      }
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters long.');
        setIsSubmittingAuth(false);
        return;
      }

      const res = await registerSingleSlotAdmin(username, email, password);
      if (res.success && res.user) {
        setAdminSessionState(res.user);
        setAuthSuccess('Admin account created successfully! Slot is now locked.');
        await loadAdminSlotStatus();
        fetchBookings();
      } else {
        setAuthError(res.error || 'Failed to register admin user.');
      }
    } else {
      // Login
      if (!username.trim() || !password) {
        setAuthError('Please enter your username/email and password.');
        setIsSubmittingAuth(false);
        return;
      }

      const res = await loginAdmin(username, password);
      if (res.success && res.user) {
        setAdminSessionState(res.user);
        setAuthSuccess('Login successful!');
        fetchBookings();
      } else {
        setAuthError(res.error || 'Invalid username or password.');
      }
    }
    setIsSubmittingAuth(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdminSessionState(null);
  };

  // Update appointment status
  const handleStatusChange = async (id: string, newStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => {
    // Local state update
    const updated = appointments.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt);
    setAppointments(updated);
    localStorage.setItem('primecare_hospital_appointments', JSON.stringify(updated));

    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }

    // Supabase update
    await updateAppointmentStatusInSupabase(id, newStatus);
  };

  // SQL Queries for User
  const supabaseSqlQuery = `-- 1. CREATE APPOINTMENTS TABLE IN SUPABASE
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  reference_number TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  age INT,
  gender TEXT,
  phone TEXT,
  email TEXT,
  department_id TEXT,
  department_name TEXT,
  doctor_id TEXT,
  doctor_name TEXT,
  doctor_specialty TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  reason_for_visit TEXT,
  additional_message TEXT,
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & set public policies for app interaction
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Allow public update on appointments" ON appointments FOR UPDATE USING (true);

-- 2. CREATE SINGLE-SLOT ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on admin_users" ON admin_users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on admin_users" ON admin_users FOR INSERT WITH CHECK (true);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(supabaseSqlQuery);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Export CSV
  const exportToCsv = () => {
    if (appointments.length === 0) return;
    const headers = ['Ref Number', 'Patient Name', 'Age', 'Gender', 'Phone', 'Email', 'Department', 'Doctor', 'Date', 'Time', 'Reason', 'Status', 'Created At'];
    const rows = appointments.map(a => [
      a.referenceNumber,
      `"${a.patientName}"`,
      a.age,
      a.gender,
      a.phone,
      a.email,
      `"${a.departmentName}"`,
      `"${a.doctorName}"`,
      a.preferredDate,
      a.preferredTime,
      `"${(a.reasonForVisit || '').replace(/"/g, '""')}"`,
      a.status,
      a.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PrimeCare_Bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDept = deptFilter === 'all' || apt.departmentId === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Unique departments for filter
  const departmentsList = Array.from(new Set(appointments.map(a => a.departmentName))).filter(Boolean);

  // Stats calculation
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Admin Portal"
        subtitle="Manage hospital appointments, view patient bookings, and sync with Supabase backend database."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Admin Portal' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SQL SCHEMA QUERY MODAL BANNER / TOGGLE */}
        <div className="mb-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Supabase Database Setup & SQL Query</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  xsasuoxlnmbsfrgzidjp
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                View or copy the complete PostgreSQL SQL script to create your <code className="bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded">appointments</code> & <code className="bg-slate-800 text-sky-300 px-1.5 py-0.5 rounded">admin_users</code> tables in Supabase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => setShowSqlModal(!showSqlModal)}
              className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Code className="w-4 h-4" />
              <span>{showSqlModal ? 'Hide SQL Query' : 'View SQL Query'}</span>
            </button>
            <button
              onClick={copySqlToClipboard}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              {copiedSql ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>
        </div>

        {/* EXPANDABLE SQL CODE DISPLAY */}
        {showSqlModal && (
          <div className="mb-8 bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-2xl relative animate-fadeIn">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2 text-sky-400 font-bold">
                <Code className="w-4 h-4" /> Supabase SQL Editor Script
              </span>
              <button
                onClick={copySqlToClipboard}
                className="text-sky-400 hover:underline flex items-center gap-1 font-sans font-medium"
              >
                {copiedSql ? '✓ Copied to clipboard' : 'Copy SQL Script'}
              </button>
            </div>
            <pre className="text-xs font-mono text-emerald-400 bg-slate-900/90 p-4 rounded-xl overflow-x-auto border border-slate-800 leading-relaxed">
              {supabaseSqlQuery}
            </pre>
            <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              Run this script directly inside your <b>Supabase Project → SQL Editor → Run</b> to initialize or verify your database schema.
            </p>
          </div>
        )}

        {/* AUTH SECTION OR ADMIN DASHBOARD */}
        {!adminSession ? (
          /* NOT LOGGED IN - LOGIN / REGISTER CARD */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto shadow-sm">
                {isRegisterMode ? <UserPlus className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {isRegisterMode ? 'Register Primary Admin' : 'Admin Login'}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isRegisterMode
                  ? '⚡ Only 1 Admin Slot is available. Create your primary admin credentials below. Once created, registration will be permanently locked.'
                  : 'Enter your registered admin credentials to access the appointments management dashboard.'}
              </p>
            </div>

            {/* SINGLE SLOT NOTICE BADGE */}
            {adminExists === true && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3.5 rounded-2xl text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">1 Admin Account Already Registered</p>
                  <p className="text-amber-700 text-[11px] mt-0.5">
                    Registration is locked ({existingAdminUsername ? `@${existingAdminUsername}` : 'Admin exists'}). Please log in below.
                  </p>
                </div>
              </div>
            )}

            {adminExists === false && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded-2xl text-xs flex items-start gap-2.5">
                <UserPlus className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Single Admin Slot Available</p>
                  <p className="text-emerald-700 text-[11px] mt-0.5">
                    You are creating the official admin account. Nobody else will be able to register afterwards.
                  </p>
                </div>
              </div>
            )}

            {/* ERROR / SUCCESS ALERTS */}
            {authError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}
            {authSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            {/* AUTH FORM */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isRegisterMode ? 'Username' : 'Username or Email'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={isRegisterMode ? 'e.g. admin' : 'admin or admin@primecare.com'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-medium"
                  />
                </div>
              </div>

              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@primecarehospital.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-medium"
                  />
                </div>
              </div>

              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all mt-2"
              >
                {isSubmittingAuth ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : isRegisterMode ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Primary Admin Account</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* SWITCH TOGGLE BUTTON (ONLY IF NO ADMIN EXISTS YET) */}
            <div className="pt-2 border-t border-slate-100 text-center">
              {adminExists ? (
                <p className="text-[11px] text-slate-400">
                  🔒 Admin registration closed. Single admin slot is taken.
                </p>
              ) : (
                <button
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    setAuthError(null);
                  }}
                  className="text-xs text-sky-600 font-semibold hover:underline"
                >
                  {isRegisterMode
                    ? 'Already created the account? Switch to Login'
                    : 'Need to create the single admin account? Register Slot'}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* LOGGED IN - ADMIN DASHBOARD */
          <div className="space-y-8 animate-fadeIn">
            
            {/* ADMIN WELCOME BAR */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                  {adminSession.username.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900">Welcome, {adminSession.username}</h2>
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Primary Admin
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {adminSession.email} • Connected to Supabase <code className="text-sky-700 font-mono">appointments</code> table
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchBookings}
                  disabled={isLoadingAppointments}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-200"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAppointments ? 'animate-spin' : ''}`} />
                  <span>Sync Supabase</span>
                </button>
                <button
                  onClick={exportToCsv}
                  disabled={appointments.length === 0}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* METRICS STATS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
                <p className="text-xs text-slate-500 font-semibold">Total Bookings</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Recorded on website</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                </p>
                <p className="text-2xl font-extrabold text-emerald-700 mt-1">{confirmedCount}</p>
                <span className="text-[10px] text-emerald-600/70 mt-0.5 block">Approved slots</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs">
                <p className="text-xs text-amber-600 font-semibold flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5" /> Pending
                </p>
                <p className="text-2xl font-extrabold text-amber-700 mt-1">{pendingCount}</p>
                <span className="text-[10px] text-amber-600/70 mt-0.5 block">Under review</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs">
                <p className="text-xs text-sky-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Completed
                </p>
                <p className="text-2xl font-extrabold text-sky-700 mt-1">{completedCount}</p>
                <span className="text-[10px] text-sky-600/70 mt-0.5 block">Consulted & served</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs col-span-2 md:col-span-1">
                <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Cancelled
                </p>
                <p className="text-2xl font-extrabold text-rose-700 mt-1">{cancelledCount}</p>
                <span className="text-[10px] text-rose-600/70 mt-0.5 block">Void / Cancelled</span>
              </div>
            </div>

            {/* CONTROLS & SEARCH */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search patient, ref #, doctor, phone..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
                    {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                          statusFilter === st
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Department Filter */}
                  {departmentsList.length > 0 && (
                    <select
                      value={deptFilter}
                      onChange={(e) => setDeptFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold py-2 px-3 rounded-xl focus:outline-none"
                    >
                      <option value="all">All Departments</option>
                      {departmentsList.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  )}
                </div>

              </div>

              {/* BOOKINGS TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Ref Number</th>
                      <th className="py-3.5 px-4">Patient Info</th>
                      <th className="py-3.5 px-4">Doctor & Dept</th>
                      <th className="py-3.5 px-4">Date & Slot</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                          No appointment bookings found matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Ref Number */}
                          <td className="py-3.5 px-4 font-mono font-bold text-sky-700 whitespace-nowrap">
                            {apt.referenceNumber}
                            <span className="block text-[10px] text-slate-400 font-sans font-normal">
                              {new Date(apt.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          {/* Patient Info */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{apt.patientName}</div>
                            <div className="text-[11px] text-slate-500">
                              {apt.gender}, {apt.age} yrs • {apt.phone}
                            </div>
                          </td>

                          {/* Doctor & Dept */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{apt.doctorName}</div>
                            <div className="text-[11px] text-sky-600 font-medium">{apt.departmentName}</div>
                          </td>

                          {/* Date & Slot */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-semibold text-slate-700">{apt.preferredDate}</div>
                            <div className="text-[11px] text-slate-500">{apt.preferredTime}</div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                apt.status === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : apt.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : apt.status === 'Completed'
                                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                                  : 'bg-rose-50 text-rose-800 border-rose-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  apt.status === 'Confirmed'
                                    ? 'bg-emerald-500'
                                    : apt.status === 'Pending'
                                    ? 'bg-amber-500'
                                    : apt.status === 'Completed'
                                    ? 'bg-sky-500'
                                    : 'bg-rose-500'
                                }`}
                              />
                              {apt.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              {/* Status Selector */}
                              <select
                                value={apt.status}
                                onChange={(e) => handleStatusChange(apt.id, e.target.value as any)}
                                className="bg-slate-50 border border-slate-200 text-[11px] font-semibold py-1 px-2 rounded-lg text-slate-700 focus:outline-none"
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>

                              {/* Details Modal Trigger */}
                              <button
                                onClick={() => setSelectedAppointment(apt)}
                                className="bg-sky-50 text-sky-700 hover:bg-sky-100 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors"
                              >
                                View
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* DETAIL MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-600 font-mono">
                  {selectedAppointment.referenceNumber}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Patient Booking Details</h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-slate-400 font-medium">Patient Name</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Age & Gender</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">
                    {selectedAppointment.age} Yrs • {selectedAppointment.gender}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Phone Number</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Email Address</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAppointment.email || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                <div>
                  <p className="text-slate-400 font-medium">Doctor Assigned</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedAppointment.doctorName}</p>
                  <p className="text-[11px] text-sky-600">{selectedAppointment.doctorSpecialty}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Department</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedAppointment.departmentName}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Scheduled Date</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAppointment.preferredDate}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Slot Time</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAppointment.preferredTime}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 font-medium mb-1">Reason for Visit</p>
                <p className="bg-slate-50 p-3 rounded-xl text-slate-800 border border-slate-100 font-medium leading-relaxed">
                  {selectedAppointment.reasonForVisit}
                </p>
              </div>

              {selectedAppointment.additionalMessage && (
                <div>
                  <p className="text-slate-400 font-medium mb-1">Additional Patient Notes</p>
                  <p className="bg-slate-50 p-3 rounded-xl text-slate-700 border border-slate-100">
                    {selectedAppointment.additionalMessage}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-slate-400 text-[11px]">
                  Booked on {new Date(selectedAppointment.createdAt).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAppointment.id, 'Completed')}
                    className="bg-sky-600 text-white px-3 py-1.5 rounded-xl font-bold hover:bg-sky-500 transition-colors"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAppointment.id, 'Cancelled')}
                    className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl font-bold hover:bg-rose-100 transition-colors"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
