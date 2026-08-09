import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DEPARTMENTS, DOCTORS } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { DoctorCard } from '../components/common/DoctorCard';
import { IconHelper } from '../components/common/IconHelper';
import { CheckCircle2, MapPin, Phone, User, Calendar, ArrowLeft } from 'lucide-react';

export const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const department = DEPARTMENTS.find(d => d.id === id) || DEPARTMENTS[0];
  const deptDoctors = DOCTORS.filter(doc => doc.departmentId === department.id);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title={`${department.name} Department`}
        subtitle={department.shortDescription}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Departments', path: '/departments' },
          { name: department.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <button
          onClick={() => navigate('/departments')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Departments</span>
        </button>

        {/* Main Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-100">
              <img
                src={department.image}
                alt={department.name}
                className="w-full h-[320px] object-cover"
              />
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">About the Department</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {department.fullDescription}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-3">Key Services & Procedures Offered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {department.servicesOffered.map((srv, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Department Meta Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-sky-900 text-white p-6 rounded-3xl shadow-lg space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-sky-300">
                  <IconHelper name={department.iconName} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{department.name}</h3>
                  <span className="text-xs text-sky-200">WeCare Hospital Center</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-sky-800 text-xs text-sky-100">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-400" />
                  <span>Head Doctor: <strong>{department.headDoctor}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>Location: {department.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>Phone: +91 11 2345 6789 ({department.phoneExtension})</span>
                </div>
              </div>

              <Link
                to={`/appointments?dept=${department.id}`}
                id={`dept-detail-book-cta-${department.id}`}
                className="w-full py-3 bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm rounded-xl text-center block shadow-md transition-colors"
              >
                Book Appointment in {department.name}
              </Link>
            </div>
          </div>

        </div>

        {/* Assigned Doctors */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              Specialist Faculty
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Doctors in {department.name}
            </h2>
          </div>

          {deptDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deptDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No specialist doctors currently listed for this department.</p>
          )}
        </div>

      </div>
    </div>
  );
};
