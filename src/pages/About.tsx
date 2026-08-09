import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Award, Target, Eye, Heart, ShieldCheck, Users, Building2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      <PageHeader
        title="About PrimeCare Hospital"
        subtitle="Dedicated to advancing health, inspiring hope, and delivering compassionate care to every patient."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About Us' }]}
      />

      {/* 1. ABOUT PRIMECARE HOSPITAL OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              Established Hospital & Research Center
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Providing World-Class Medical Care with a Human Touch
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              PrimeCare Hospital was founded with a singular purpose: to make advanced medical care accessible, compassionate, and patient-centered. Located in the heart of New Delhi, our multi-specialty facility brings together eminent medical minds, robotic surgical technology, and 24/7 critical care units.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether providing life-saving intervention in our Level-1 Trauma wing or supporting families through routine health checkups and preventive medicine, our hospital adheres to stringent NABL and NABH clinical standards.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="bg-sky-50 p-4 rounded-xl text-center">
                <span className="block text-2xl font-extrabold text-sky-700">300+</span>
                <span className="text-xs text-slate-600 font-medium mt-1 block">Hospital Beds</span>
              </div>
              <div className="bg-sky-50 p-4 rounded-xl text-center">
                <span className="block text-2xl font-extrabold text-sky-700">50+</span>
                <span className="text-xs text-slate-600 font-medium mt-1 block">Specialist Doctors</span>
              </div>
              <div className="bg-sky-50 p-4 rounded-xl text-center col-span-2 sm:col-span-1">
                <span className="block text-2xl font-extrabold text-sky-700">12</span>
                <span className="text-xs text-slate-600 font-medium mt-1 block">Super Specialties</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                alt="WeCare Hospital Building Architecture"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. MISSION & VISION */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To deliver high-quality, evidence-based, compassionate healthcare that improves the lives of our patients and communities through clinical innovation, ethical practice, and continuous learning.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be recognized nationally and internationally as a premier healthcare institution known for clinical excellence, patient trust, groundbreaking research, and accessible treatment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OUR VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Core Beliefs
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <Heart className="w-8 h-8 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">Compassion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Treating every patient with dignity, warmth, and genuine human empathy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <Award className="w-8 h-8 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">Excellence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adhering strictly to international medical protocols and safety standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <ShieldCheck className="w-8 h-8 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">Integrity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintaining total transparency in clinical diagnosis, billing, and communication.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <Users className="w-8 h-8 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">Collaboration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multidisciplinary doctor consultations for precise diagnostic accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PATIENT-CENTERED APPROACH */}
      <section className="bg-sky-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-800/80 px-3 py-1 rounded-full">
                Healing Philosophy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Our Patient-Centered Approach
              </h2>
              <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
                We believe that healing happens best when medicine is combined with comfort, clear communication, and emotional support for the entire family.
              </p>
              
              <ul className="space-y-3 text-sm text-sky-100">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Personalized treatment plans tailored to each individual patient’s history.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Transparent communication regarding surgical risks, options, and expected outcomes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Spacious private rooms and dedicated attendant amenities for family comfort.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-sky-800">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                alt="Doctor comforting patient in consultation room"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. MODERN HEALTHCARE FACILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Infrastructure
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Modern Healthcare Facilities
          </h2>
          <p className="text-sm text-slate-600">
            Engineered for safety, hygiene, diagnostic speed, and surgical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
              alt="Modular Operation Theater"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Modular Operation Theaters</h3>
              <p className="text-xs text-slate-600">HEPA ultra-clean laminar flow air circulation reducing infection rates to near zero.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80"
              alt="Intensive Care Unit (ICU)"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Advanced ICU & CCU Wings</h3>
              <p className="text-xs text-slate-600">24/7 continuous telemetry monitoring, ventilators, and 1:1 dedicated nursing ratio.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80"
              alt="Diagnostic Imaging Suite"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-base font-bold text-slate-900">3T MRI & 128-Slice CT</h3>
              <p className="text-xs text-slate-600">Sub-second high definition cross-sectional diagnostics for rapid treatment planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 & 8. QUALITY & SAFETY */}
      <section className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Quality & Clinical Safety Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            WeCare Hospital undergoes annual clinical audits by independent healthcare accreditation bodies. We maintain strict infection control, electronic medication safety protocols, and continuous nursing training.
          </p>
          <div className="pt-2">
            <Link
              to="/appointments"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-6 py-3 rounded-xl inline-block"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
