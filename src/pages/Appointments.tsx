import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { DEPARTMENTS, DOCTORS, TIME_SLOTS } from '../data/mockData';
import { saveAppointment, getStoredAppointments, cancelAppointment, syncAppointmentsFromSupabase } from '../utils/storage';
import { getDoctorInitials } from '../utils/doctorUtils';
import { PageHeader } from '../components/common/PageHeader';
import { Appointment } from '../types';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Building2,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  XCircle,
  Download,
  Search,
  Check
} from 'lucide-react';

export const Appointments: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tab mode: 'booking' or 'my-appointments'
  const activeTabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'booking' | 'my-appointments'>(
    activeTabParam === 'lookup' ? 'my-appointments' : 'booking'
  );

  // Pre-fill from URL parameters if available
  const initialDept = searchParams.get('dept') || DEPARTMENTS[0].id;
  const initialDoctor = searchParams.get('doctor') || '';

  // Form State
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDept);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctor);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[2]);

  // Patient Fields
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);

  // My appointments list & lookup state
  const [savedAppointments, setSavedAppointments] = useState<Appointment[]>([]);
  const [lookupRef, setLookupRef] = useState('');

  // Update doctor options when department changes
  const availableDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);

  useEffect(() => {
    if (availableDoctors.length > 0 && (!selectedDoctorId || !availableDoctors.some(d => d.id === selectedDoctorId))) {
      setSelectedDoctorId(availableDoctors[0].id);
    }
  }, [selectedDeptId]);

  // Load saved appointments on mount or tab change and sync with Supabase backend
  useEffect(() => {
    setSavedAppointments(getStoredAppointments());
    syncAppointmentsFromSupabase().then(synced => {
      setSavedAppointments(synced);
    });
  }, [activeTab, submittedAppointment]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!age || isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120).';
    }
    if (!phone.trim() || phone.trim().length < 8) {
      newErrors.phone = 'Valid phone number is required (min 8 digits).';
    }
    if (!email.trim() || !email.includes('@')) {
      newErrors.email = 'Valid email address is required.';
    }
    if (!reason.trim()) {
      newErrors.reason = 'Please state the primary reason for visit.';
    }
    if (!selectedDate) {
      newErrors.selectedDate = 'Preferred date is required.';
    }
    if (!selectedTimeSlot) {
      newErrors.selectedTimeSlot = 'Time slot is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const currentDept = DEPARTMENTS.find(d => d.id === selectedDeptId);
    const currentDoc = DOCTORS.find(d => d.id === selectedDoctorId);

    const saved = saveAppointment({
      patientName: fullName.trim(),
      age: Number(age),
      gender,
      phone: phone.trim(),
      email: email.trim(),
      departmentId: selectedDeptId,
      departmentName: currentDept ? currentDept.name : 'General Healthcare',
      doctorId: selectedDoctorId,
      doctorName: currentDoc ? currentDoc.name : 'Consultant Specialist',
      doctorSpecialty: currentDoc ? currentDoc.specialty : 'Specialist',
      preferredDate: selectedDate,
      preferredTime: selectedTimeSlot,
      reasonForVisit: reason.trim(),
      additionalMessage: additionalMessage.trim()
    });

    setSubmittedAppointment(saved);
  };

  const handleCancelApt = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment request?')) {
      cancelAppointment(id);
      setSavedAppointments(getStoredAppointments());
    }
  };

  const selectedDoctorObj = DOCTORS.find(d => d.id === selectedDoctorId);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Schedule a Medical Appointment"
        subtitle="Request a consultation with our experienced specialists. Fast, secure, and user-friendly."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Appointments' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => {
                setActiveTab('booking');
                setSubmittedAppointment(null);
              }}
              id="appointment-tab-booking"
              type="button"
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                activeTab === 'booking'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Book New Appointment
            </button>
            <button
              onClick={() => setActiveTab('my-appointments')}
              id="appointment-tab-my-appointments"
              type="button"
              className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'my-appointments'
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>My Saved Appointments</span>
              {savedAppointments.length > 0 && (
                <span className="bg-sky-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {savedAppointments.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* TAB 1: BOOKING FLOW */}
        {activeTab === 'booking' && (
          <div>
            {submittedAppointment ? (
              /* CONFIRMATION SCREEN */
              <div className="bg-white rounded-3xl border border-emerald-100 p-6 sm:p-10 shadow-xl space-y-8 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-200">
                      Appointment Request Submitted
                    </span>
                    <span className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Saved to Supabase Table (xsasuoxlnmbsfrgzidjp)</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Thank You, {submittedAppointment.patientName}!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                    Your appointment request has been logged successfully into our patient portal. Our desk coordinator will verify your slot and reach out prior to your visit.
                  </p>
                </div>

                {/* Appointment Card Summary */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Reference Number</span>
                    <span className="text-base font-extrabold text-sky-700 font-mono tracking-wider bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
                      {submittedAppointment.referenceNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Assigned Doctor</span>
                      <span className="text-sm font-bold text-slate-800">{submittedAppointment.doctorName}</span>
                      <span className="text-slate-500 block">{submittedAppointment.doctorSpecialty}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Department</span>
                      <span className="text-sm font-bold text-slate-800">{submittedAppointment.departmentName}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Scheduled Date & Time</span>
                      <span className="text-sm font-bold text-sky-700 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {submittedAppointment.preferredDate} at {submittedAppointment.preferredTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-medium">Patient Contact</span>
                      <span className="text-slate-800 font-medium block">{submittedAppointment.phone}</span>
                      <span className="text-slate-500 block">{submittedAppointment.email}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                    <span>Status: <strong className="text-emerald-600">{submittedAppointment.status}</strong></span>
                    <span>Created: {new Date(submittedAppointment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => setSubmittedAppointment(null)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Book Another Appointment
                  </button>
                  <button
                    onClick={() => setActiveTab('my-appointments')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-6 py-3 rounded-xl transition-colors"
                  >
                    View All Saved Appointments
                  </button>
                  <Link
                    to="/"
                    className="text-xs text-sky-600 font-semibold hover:underline"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              /* BOOKING FORM */
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm space-y-8">
                
                {/* Supabase Integration Info Banner */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 px-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span>Supabase Backend Connected</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    Project: <span className="font-bold text-sky-700">xsasuoxlnmbsfrgzidjp</span>
                  </div>
                </div>
                
                {/* STEP 1 & 2: SELECTION */}
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center">1</span>
                      <span>Select Specialty Department & Doctor</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department Dropdown */}
                    <div>
                      <label htmlFor="dept-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Department <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="dept-select"
                        value={selectedDeptId}
                        onChange={(e) => setSelectedDeptId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {DEPARTMENTS.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Doctor Dropdown */}
                    <div>
                      <label htmlFor="doctor-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Doctor / Specialist <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="doctor-select"
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {availableDoctors.map(doc => (
                          <option key={doc.id} value={doc.id}>
                            {doc.name} ({doc.title})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Doctor Quick Badge */}
                  {selectedDoctorObj && (
                    <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs ring-2 ring-sky-200 shrink-0">
                        {getDoctorInitials(selectedDoctorObj.name)}
                      </div>
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-slate-900 block">{selectedDoctorObj.name}</span>
                        <span className="text-slate-600 block">{selectedDoctorObj.specialty} • {selectedDoctorObj.experienceYears}+ Yrs Exp</span>
                        <span className="text-sky-700 font-semibold block">Fee: {selectedDoctorObj.consultationFee} (Room {selectedDoctorObj.roomNumber})</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* STEP 3 & 4: DATE & TIME SLOT */}
                <div className="space-y-6 pt-2">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center">2</span>
                      <span>Select Preferred Date & Time Slot</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Date Selector */}
                    <div className="md:col-span-5">
                      <label htmlFor="appointment-date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="appointment-date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.selectedDate && (
                        <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.selectedDate}
                        </p>
                      )}
                    </div>

                    {/* Time Slots Grid */}
                    <div className="md:col-span-7">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Available Time Slots <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                              selectedTimeSlot === slot
                                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 5: PATIENT DETAILS */}
                <div className="space-y-6 pt-2">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-extrabold flex items-center justify-center">3</span>
                      <span>Patient Information</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="patient-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label htmlFor="patient-age" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Age (Years) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="patient-age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 42"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.age && (
                        <p className="text-xs text-rose-500 mt-1">{errors.age}</p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label htmlFor="patient-gender" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="patient-gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="patient-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="patient-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="patient-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patient@example.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Reason for Visit */}
                    <div className="sm:col-span-2 md:col-span-3">
                      <label htmlFor="visit-reason" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Reason for Visit / Symptoms <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="visit-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g. Routine checkup, chest discomfort, knee joint pain, severe headache..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      {errors.reason && (
                        <p className="text-xs text-rose-500 mt-1">{errors.reason}</p>
                      )}
                    </div>

                    {/* Additional Message */}
                    <div className="sm:col-span-2 md:col-span-3">
                      <label htmlFor="additional-notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Additional Notes or Medical History (Optional)
                      </label>
                      <textarea
                        id="additional-notes"
                        rows={2}
                        value={additionalMessage}
                        onChange={(e) => setAdditionalMessage(e.target.value)}
                        placeholder="Mention any known allergies, chronic conditions, or specific questions..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    <span className="text-rose-500">*</span> Required fields must be completed.
                  </span>

                  <button
                    type="submit"
                    id="submit-appointment-btn"
                    className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-sky-600/25 transition-all duration-200 active:scale-98"
                  >
                    Confirm & Submit Appointment Request
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* TAB 2: MY SAVED APPOINTMENTS */}
        {activeTab === 'my-appointments' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Saved Demo Appointments</h2>
                <p className="text-xs text-slate-500">
                  Manage or view appointments saved in local storage on this device.
                </p>
              </div>

              {/* Reference Search */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  placeholder="Filter by ref e.g. WC-2026..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {savedAppointments.length > 0 ? (
              <div className="space-y-4">
                {savedAppointments
                  .filter(apt => !lookupRef || apt.referenceNumber.toLowerCase().includes(lookupRef.toLowerCase()) || apt.patientName.toLowerCase().includes(lookupRef.toLowerCase()))
                  .map((apt) => (
                    <div
                      key={apt.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        apt.status === 'Cancelled'
                          ? 'bg-slate-50 border-slate-200 opacity-60'
                          : 'bg-white border-slate-200 shadow-2xs hover:border-sky-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md border border-sky-200">
                            {apt.referenceNumber}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}>
                            {apt.status}
                          </span>
                        </div>

                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleCancelApt(apt.id)}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel Appointment</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3">
                        <div>
                          <span className="text-slate-400 block">Patient Name</span>
                          <span className="font-bold text-slate-800">{apt.patientName} ({apt.age} yrs, {apt.gender})</span>
                        </div>

                        <div>
                          <span className="text-slate-400 block">Doctor & Department</span>
                          <span className="font-bold text-slate-800">{apt.doctorName}</span>
                          <span className="text-slate-500 block">{apt.departmentName}</span>
                        </div>

                        <div>
                          <span className="text-slate-400 block">Scheduled Date & Time</span>
                          <span className="font-bold text-sky-700 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {apt.preferredDate} at {apt.preferredTime}
                          </span>
                        </div>
                      </div>

                      {apt.reasonForVisit && (
                        <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg">
                          <strong>Reason:</strong> {apt.reasonForVisit}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <p className="text-sm font-semibold">No appointment records found in local storage.</p>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="text-xs font-bold text-sky-600 hover:underline"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
