import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HeartPulse, Menu, X, Calendar, Phone, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Track scroll position for navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100' : 'bg-white border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" id="primecare-logo-link" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight block font-sans">
                Prime<span className="text-blue-600">Care</span>
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wider uppercase block -mt-1">
                Hospital & Research
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                id={`nav-link-${link.name.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 font-bold'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/emergency"
              id="desktop-nav-emergency-btn"
              className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold border border-rose-200"
              title="Emergency Services"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Emergency</span>
            </Link>

            <Link
              to="/appointments"
              id="desktop-book-appointment-cta"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/appointments"
              id="mobile-quick-book-btn"
              className="bg-sky-600 text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-hamburger-toggle"
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'text-sky-700 bg-sky-50 font-bold border-l-4 border-sky-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/appointments"
              id="mobile-drawer-book-btn"
              className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white font-semibold py-3 rounded-xl shadow-md text-center"
            >
              <Calendar className="w-5 h-5" />
              <span>Book an Appointment</span>
            </Link>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                to="/emergency"
                id="mobile-drawer-emergency-btn"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-50 text-rose-700 font-semibold rounded-lg border border-rose-200"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Emergency 24/7</span>
              </Link>
              <a
                href="tel:+911123456789"
                id="mobile-drawer-call-btn"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Call Hospital</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
