import React from 'react';
import { Link } from 'react-router-dom';
import { MedicalService } from '../../types';
import { IconHelper } from './IconHelper';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: MedicalService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div
      id={`service-card-${service.id}`}
      className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
            <IconHelper name={service.iconName} className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100/60">
            {service.category}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Benefits List */}
        <ul className="space-y-1.5 pt-3 border-t border-slate-100">
          {service.benefits.slice(0, 3).map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/services#${service.id}`}
          id={`service-learn-more-${service.id}`}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/link"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        <Link
          to={`/appointments?service=${service.id}`}
          id={`service-book-${service.id}`}
          className="text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 px-3.5 py-1.5 rounded-xl transition-colors border border-blue-100"
        >
          Book Care
        </Link>
      </div>
    </div>
  );
};
