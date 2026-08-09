import React from 'react';
import { Link } from 'react-router-dom';
import { Doctor } from '../../types';
import { getDoctorInitials } from '../../utils/doctorUtils';
import { Star, Calendar, Clock, Award, ArrowRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctorId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  return (
    <div
      id={`doctor-card-${doctor.id}`}
      className="bg-white rounded-3xl border border-slate-100 shadow-xs hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden group"
    >
      {/* Top Banner & Photo */}
      <div className="relative bg-gradient-to-b from-blue-50/60 to-white p-6 pb-4 text-center border-b border-slate-100">
        <div className="relative inline-block mx-auto mb-3">
          <div className="w-20 h-20 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl shadow-xs mx-auto ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
            {getDoctorInitials(doctor.name)}
          </div>
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white" title="Active Specialist">
            <Award className="w-3.5 h-3.5" />
          </span>
        </div>

        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-blue-100/60">
          {doctor.departmentName}
        </span>

        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {doctor.name}
        </h3>
        
        <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
          {doctor.title}
        </p>

        {/* Rating & Experience */}
        <div className="flex items-center justify-center gap-3 mt-3 text-xs text-slate-600">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-bold border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{doctor.rating}</span>
            <span className="text-slate-400 font-normal">({doctor.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-100">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>{doctor.experienceYears}+ Yrs</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {doctor.bio}
        </p>

        {/* Available Days */}
        <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1.5 border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              OPD Days:
            </span>
            <span className="font-bold text-slate-800">
              {doctor.availableDays.length} days / wk
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {doctor.availableDays.map((day) => (
              <span key={day} className="bg-white text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                {day.substring(0, 3)}
              </span>
            ))}
          </div>
        </div>

        {/* Consultation Fee */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Consultation Fee:
          </span>
          <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
            {doctor.consultationFee}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to={`/doctors/${doctor.id}`}
            id={`view-doctor-profile-${doctor.id}`}
            className="w-full text-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors"
          >
            Profile
          </Link>

          {onBookAppointment ? (
            <button
              onClick={() => onBookAppointment(doctor.id)}
              id={`book-doctor-btn-${doctor.id}`}
              type="button"
              className="w-full flex items-center justify-center gap-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-xs"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              to={`/appointments?doctor=${doctor.id}&dept=${doctor.departmentId}`}
              id={`book-doctor-link-${doctor.id}`}
              className="w-full flex items-center justify-center gap-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-xs"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
