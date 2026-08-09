import React from 'react';
import { Link } from 'react-router-dom';
import { Department } from '../../types';
import { IconHelper } from './IconHelper';
import { ArrowRight, User, MapPin } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <div
      id={`department-card-${department.id}`}
      className="bg-white rounded-3xl border border-slate-100 shadow-xs hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden group"
    >
      {/* Department Image & Header */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* Department Icon */}
        <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md text-blue-600 flex items-center justify-center shadow-sm">
          <IconHelper name={department.iconName} className="w-6 h-6" />
        </div>

        {/* Location badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1 text-[11px] font-semibold text-slate-100 bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
          <MapPin className="w-3 h-3 text-blue-400" />
          <span>{department.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {department.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
            {department.shortDescription}
          </p>
        </div>

        {/* Services Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Specialized Treatments:
          </span>
          <div className="flex flex-wrap gap-1">
            {department.servicesOffered.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-blue-100"
              >
                {service}
              </span>
            ))}
            {department.servicesOffered.length > 3 && (
              <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-2 py-0.5 rounded-full">
                +{department.servicesOffered.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Head Doctor */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-700">Head: {department.headDoctor}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to={`/departments/${department.id}`}
            id={`view-dept-${department.id}`}
            className="w-full text-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors"
          >
            Explore
          </Link>

          <Link
            to={`/appointments?dept=${department.id}`}
            id={`book-dept-${department.id}`}
            className="w-full flex items-center justify-center gap-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-colors shadow-xs"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
