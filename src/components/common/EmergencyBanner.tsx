import React from 'react';
import { PhoneCall, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmergencyBanner: React.FC = () => {
  return (
    <div id="emergency-top-banner" className="bg-sky-900 text-sky-50 text-xs sm:text-sm py-2 px-4 border-b border-sky-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium text-amber-300">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>24/7 Emergency Care</span>
          </div>
          <a
            href="tel:+911123459999"
            className="flex items-center gap-1.5 font-bold hover:text-sky-200 transition-colors bg-sky-800/80 px-2.5 py-0.5 rounded-full"
            id="top-emergency-hotline-link"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
            <span>Emergency Hotline: +91 11 2345 9999</span>
          </a>
          <div className="hidden md:flex items-center gap-1.5 text-sky-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Trauma Center Open 24 Hours</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sky-200 text-xs">
          <span className="hidden lg:inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            Healthcare Avenue, New Delhi
          </span>
          <Link
            to="/emergency"
            id="top-emergency-info-link"
            className="underline underline-offset-2 hover:text-white font-medium"
          >
            Emergency Guidance
          </Link>
        </div>
      </div>
    </div>
  );
};
