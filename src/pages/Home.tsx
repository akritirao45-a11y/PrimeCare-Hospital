import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEPARTMENTS, DOCTORS, SERVICES, TESTIMONIALS, BLOG_POSTS, FAQS } from '../data/mockData';
import { DoctorCard } from '../components/common/DoctorCard';
import { DepartmentCard } from '../components/common/DepartmentCard';
import { ServiceCard } from '../components/common/ServiceCard';
import { TestimonialCard } from '../components/common/TestimonialCard';
import { BlogCard } from '../components/common/BlogCard';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { BlogPost } from '../types';
import { getDoctorInitials } from '../utils/doctorUtils';
import {
  Calendar,
  UserCheck,
  Building2,
  ShieldAlert,
  Award,
  CheckCircle2,
  Clock,
  HeartPulse,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Activity,
  Users,
  Search,
  X,
  Star
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDoctorTab, setSelectedDoctorTab] = useState<string>('all');
  const [selectedBlogModal, setSelectedBlogModal] = useState<BlogPost | null>(null);

  const filteredDoctors = selectedDoctorTab === 'all'
    ? DOCTORS.slice(0, 6)
    : DOCTORS.filter(d => d.departmentId === selectedDoctorTab).slice(0, 6);

  const featuredDoctor = DOCTORS[0]; // Dr. Ananya Sharma

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-slate-50 min-h-screen">
      
      {/* ==========================================
          1. PRIMARY BENTO GRID HERO & QUICK TILES
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Bento Tile 1: Main Hero (7 Cols) */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 flex flex-col justify-center border border-slate-100 shadow-xs relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <span className="inline-block px-3.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                Premium Healthcare Services
              </span>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-[1.12] text-slate-900 tracking-tight">
                Compassionate Care. <br />
                <span className="text-blue-600 underline decoration-blue-100">Advanced</span> Medicine. <br />
                Better Health.
              </h1>

              <p className="text-slate-500 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                PrimeCare Hospital provides comprehensive healthcare through world-class board-certified medical experts, 24/7 emergency response, and patient-centered modern facilities.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/departments"
                  id="hero-explore-depts-btn"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all duration-200 active:scale-98 inline-flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Explore Departments</span>
                </Link>

                <div className="flex -space-x-3 items-center ml-2">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
                    alt="Doctor 1"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                    alt="Doctor 2"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xs"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[11px] font-bold text-blue-700 shadow-xs">
                    50+
                  </div>
                  <span className="ml-5 text-xs font-semibold text-slate-600">
                    Expert Doctors
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Tile 2: Quick Actions Right Column (5 Cols Grid) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Quick Schedule Tile */}
            <Link
              to="/appointments"
              id="bento-tile-schedule"
              className="bg-blue-600 rounded-3xl p-6 text-white flex flex-col justify-between hover:bg-blue-700 cursor-pointer shadow-xl shadow-blue-100/80 transition-all duration-200 group min-h-[160px]"
            >
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:translate-x-0.5 transition-transform">Schedule</h3>
                <p className="text-blue-100 text-xs font-medium">Instant appointment booking</p>
              </div>
            </Link>

            {/* Specialist Lookup Tile */}
            <Link
              to="/doctors"
              id="bento-tile-find-dr"
              className="bg-white rounded-3xl p-6 border border-slate-100 flex flex-col justify-between hover:border-blue-200 transition-colors shadow-xs cursor-pointer group min-h-[160px]"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">Find Dr.</h3>
                <p className="text-slate-400 text-xs font-medium">Specialist directory lookup</p>
              </div>
            </Link>

            {/* Emergency Care Span-2 Tile */}
            <Link
              to="/emergency"
              id="bento-tile-emergency"
              className="col-span-2 bg-slate-900 rounded-3xl p-6 sm:p-8 flex items-center justify-between text-white relative overflow-hidden shadow-lg group hover:bg-slate-800 transition-colors"
            >
              <div className="z-10 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-bold">Emergency Care</h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">24/7 Rapid Trauma Response Unit Available</p>
                <div className="inline-flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 rounded-xl text-red-400 font-mono text-xs font-bold mt-2">
                  <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full" />
                  <span>+91 1800-PRIME-CARE</span>
                </div>
              </div>

              <div className="hidden sm:block opacity-10 group-hover:opacity-20 transition-opacity">
                <HeartPulse className="w-32 h-32 text-white" />
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* ==========================================
          2. SECONDARY BENTO ROW: DEPTS, DOCTOR OF WEEK, FEEDBACK
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Mini Departments List Bento */}
          <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-800 text-base">Key Departments</h4>
                <Link to="/departments" className="text-xs text-blue-600 font-bold hover:underline">
                  View All ({DEPARTMENTS.length})
                </Link>
              </div>

              <div className="space-y-2.5">
                {DEPARTMENTS.slice(0, 3).map((dept) => (
                  <Link
                    key={dept.id}
                    to={`/departments/${dept.id}`}
                    className="flex items-center gap-3 p-2.5 hover:bg-blue-50/70 rounded-2xl transition-colors group"
                  >
                    <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {dept.name.charAt(0)}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{dept.name}</p>
                      <p className="text-slate-400 text-[11px]">{dept.headDoctor.split(' ')[1]} Head</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Doctor of the Week Bento */}
          <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Specialist Spotlight
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                On Duty Today
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-24 h-24 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-md ring-4 ring-blue-100 shrink-0">
                {getDoctorInitials(featuredDoctor.name)}
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <h5 className="text-lg font-bold text-slate-800">{featuredDoctor.name}</h5>
                <p className="text-blue-600 font-semibold text-xs">{featuredDoctor.title}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[11px] text-slate-500 pt-1">
                  <span className="px-2 py-0.5 bg-slate-50 rounded border border-slate-200">{featuredDoctor.experienceYears}+ Yrs Exp</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200 font-semibold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {featuredDoctor.rating}
                  </span>
                </div>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <Link
                    to={`/doctors/${featuredDoctor.id}`}
                    className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/appointments?doctor=${featuredDoctor.id}&dept=${featuredDoctor.departmentId}`}
                    className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-xs"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Feedback Bento */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-3">Patient Experience</h4>
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-3">
                <p className="text-slate-600 text-xs italic leading-relaxed">
                  "{TESTIMONIALS[0].reviewText}"
                </p>
                <div className="flex items-center gap-3 pt-1 border-t border-blue-100/80">
                  <img
                    src={TESTIMONIALS[0].patientPhoto}
                    alt={TESTIMONIALS[0].patientName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{TESTIMONIALS[0].patientName}</p>
                    <p className="text-[10px] text-slate-500">{TESTIMONIALS[0].treatmentReceived} • {TESTIMONIALS[0].rating}/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. CENTERS OF EXCELLENCE / DEPARTMENTS GRID
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Centers of Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Specialized Medical & Surgical Departments
              </h2>
            </div>
            <Link
              to="/departments"
              id="view-all-departments-btn"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline text-xs sm:text-sm"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.slice(0, 6).map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. CLINICAL LEADERSHIP / DOCTORS DIRECTORY
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Faculty Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Consult with Our Senior Faculty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select department tabs to view specialist doctors available for consultation.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedDoctorTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedDoctorTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Faculty
            </button>
            {DEPARTMENTS.slice(0, 5).map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDoctorTab(dept.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedDoctorTab === dept.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Doctor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/doctors"
              id="view-all-doctors-btn"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-2xl transition-colors shadow-sm"
            >
              <span>Search Full Doctor Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. COMPREHENSIVE HOSPITAL SERVICES BENTO
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Hospital Spectrum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Inpatient, Outpatient & Diagnostic Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Equipped with modern robotic suites, 3T MRI units, and 24/7 ICU infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/services"
              id="view-all-services-btn"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline text-xs sm:text-sm"
            >
              <span>Explore All Hospital Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. PRIORITY APPOINTMENT BANNER BENTO
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl z-10">
            <span className="inline-block bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Prioritize Your Health
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Need Prompt Medical Care or Consultation?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Book your appointment online in under 2 minutes. Select your preferred doctor, pick an available slot, and receive instant digital booking confirmation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 z-10 shrink-0 w-full sm:w-auto">
            <Link
              to="/appointments"
              id="banner-book-appointment-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-500/20 transition-all text-center"
            >
              Book Appointment Now
            </Link>
            <Link
              to="/about"
              id="banner-about-us-btn"
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-2xl border border-slate-700 transition-all text-center"
            >
              About Our Hospital
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. PATIENT REVIEWS & WELLNESS ARTICLES
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Testimonials Bento (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Testimonials
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">What Our Patients Say</h3>
            </div>

            <div className="space-y-4">
              {TESTIMONIALS.slice(0, 2).map((test) => (
                <TestimonialCard key={test.id} testimonial={test} />
              ))}
            </div>
          </div>

          {/* Health Articles Bento (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                Health Education
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">Latest Medical Articles</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BLOG_POSTS.slice(0, 2).map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onReadMore={(p) => setSelectedBlogModal(p)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          8. FREQUENTLY ASKED QUESTIONS
         ========================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Help Center
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedBlogModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedBlogModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
                {selectedBlogModal.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
                {selectedBlogModal.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                By {selectedBlogModal.author} ({selectedBlogModal.authorRole}) • {selectedBlogModal.date}
              </p>
            </div>

            <img
              src={selectedBlogModal.image}
              alt={selectedBlogModal.title}
              className="w-full h-56 object-cover rounded-2xl"
            />

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              {selectedBlogModal.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedBlogModal.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedBlogModal(null)}
                className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
