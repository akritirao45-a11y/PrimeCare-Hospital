import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DOCTORS } from '../data/mockData';
import { getDoctorInitials } from '../utils/doctorUtils';
import { PageHeader } from '../components/common/PageHeader';
import { Star, Award, Calendar, Clock, MapPin, CheckCircle2, ArrowLeft, Video, Building, PhoneCall } from 'lucide-react';

export const DoctorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const doctor = DOCTORS.find(d => d.id === id) || DOCTORS[0];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={doctor.name}
        subtitle={`${doctor.title} • ${doctor.departmentName}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Doctors', path: '/doctors' },
          { name: doctor.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <button
          onClick={() => navigate('/doctors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </button>

        {/* Doctor Header Profile */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center">
            <div className="w-36 h-36 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-4xl shadow-lg ring-4 ring-sky-100 mx-auto">
              {getDoctorInitials(doctor.name)}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{doctor.rating} / 5.0</span>
                <span className="text-slate-400 text-xs font-normal">({doctor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full">
                {doctor.departmentName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {doctor.name}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                {doctor.specialty}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Experience</span>
                <span className="text-sm font-bold text-slate-800">{doctor.experienceYears}+ Years</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Consultation Fee</span>
                <span className="text-sm font-bold text-sky-700">{doctor.consultationFee}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block font-medium">OPD Room</span>
                <span className="text-sm font-bold text-slate-800">{doctor.roomNumber}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={`/appointments?doctor=${doctor.id}&dept=${doctor.departmentId}`}
                id={`doctor-detail-book-btn-${doctor.id}`}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>

              <a
                href="tel:+911123456789"
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-3 rounded-xl inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Inquire Schedule</span>
              </a>
            </div>
          </div>
        </div>

        {/* Deep Credentials & Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Qualifications & Expertise */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-sky-600" />
                  <span>Educational Qualifications</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.qualifications.map((qual, idx) => (
                    <span key={idx} className="bg-sky-50 text-sky-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-sky-100">
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Areas of Clinical Expertise</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.areasOfExpertise.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 font-medium">
                      <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Schedule & Consultation Mode */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-600" />
                <span>Weekly OPD Availability</span>
              </h3>

              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                  const isAvailable = doctor.availableDays.includes(day);
                  return (
                    <div key={day} className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-slate-50">
                      <span className="font-semibold text-slate-700">{day}</span>
                      {isAvailable ? (
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          09:00 AM - 05:00 PM
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Off Duty</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <span className="text-slate-500 font-medium block">Consultation Modes:</span>
                <div className="flex gap-2">
                  {doctor.consultationType.map(type => (
                    <span key={type} className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 font-semibold px-2.5 py-1 rounded-md">
                      {type === 'In-Person' ? <Building className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                      <span>{type}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
