import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, Clock, ShieldAlert, Award, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Hospital Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" id="footer-logo-link" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Prime<span className="text-sky-400">Care</span> Hospital
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Delivering compassionate, patient-centered healthcare through distinguished medical specialists, modern diagnostic technology, and 24/7 emergency care.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-800/90 text-sky-300 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-700">
                <Award className="w-4 h-4 text-sky-400" />
                <span>NABL & NABH Accredited</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-950/60 text-rose-300 text-xs font-semibold py-1.5 px-3 rounded-lg border border-rose-900/50">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>24/7 Level-1 Trauma</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" id="footer-link-home" className="hover:text-sky-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" id="footer-link-about" className="hover:text-sky-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/departments" id="footer-link-departments" className="hover:text-sky-400 transition-colors">Departments</Link>
              </li>
              <li>
                <Link to="/doctors" id="footer-link-doctors" className="hover:text-sky-400 transition-colors">Find a Doctor</Link>
              </li>
              <li>
                <Link to="/services" id="footer-link-services" className="hover:text-sky-400 transition-colors">Medical Services</Link>
              </li>
              <li>
                <Link to="/emergency" id="footer-link-emergency" className="hover:text-sky-400 transition-colors">Emergency Care</Link>
              </li>
              <li>
                <Link to="/contact" id="footer-link-contact" className="hover:text-sky-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Patient Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/appointments" id="footer-resource-book" className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1">
                  <span>Book Appointment</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/appointments?tab=lookup" id="footer-resource-my-appointments" className="hover:text-sky-400 transition-colors">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link to="/services#checkups" id="footer-resource-checkups" className="hover:text-sky-400 transition-colors">
                  Executive Health Checkups
                </Link>
              </li>
              <li>
                <Link to="/contact#faqs" id="footer-resource-faqs" className="hover:text-sky-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about#values" id="footer-resource-patient-rights" className="hover:text-sky-400 transition-colors">
                  Patient Rights & Charter
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <Link to="/admin" id="footer-resource-admin-portal" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Admin Portal (Sign Up / Login)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-sky-500 pl-2">
              Hospital Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>PrimeCare Hospital, Healthcare Avenue, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-rose-300 font-semibold">+91 11 2345 9999 (24/7)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>contact@primecarehospital.demo</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-slate-400 border-t border-slate-800">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p>OPD: Mon–Sat (8:00 AM – 8:00 PM)</p>
                  <p className="text-sky-400 font-semibold">Emergency & ICU: Open 24/7</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© 2026 PrimeCare Hospital. All rights reserved.</p>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 text-sky-300 font-medium">
            Demo website — information shown is for demonstration purposes.
          </div>
        </div>
      </div>
    </footer>
  );
};
