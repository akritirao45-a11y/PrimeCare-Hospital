import React, { useState, useMemo } from 'react';
import { DOCTORS, DEPARTMENTS } from '../data/mockData';
import { DoctorCard } from '../components/common/DoctorCard';
import { PageHeader } from '../components/common/PageHeader';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const Doctors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'name'>('rating');

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(doc => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;

      const matchesDay = selectedDay === 'all' || doc.availableDays.includes(selectedDay);

      return matchesSearch && matchesDept && matchesDay;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedDept, selectedDay, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedDay('all');
    setSortBy('rating');
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Find a Medical Specialist"
        subtitle="Search our renowned medical faculty across departments and book appointments."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Doctors' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filters & Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name or specialty (e.g. Dr. Ananya, Angioplasty)..."
                id="doctor-search-input"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Department Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                id="doctor-dept-filter"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-700"
              >
                <option value="all">All Departments ({DEPARTMENTS.length})</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Available Day Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                id="doctor-day-filter"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-700"
              >
                <option value="all">Any Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                id="doctor-sort-dropdown"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-700"
              >
                <option value="rating">Sort: Highest Rating</option>
                <option value="experience">Sort: Experience (Yrs)</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Filter Bar Stats & Reset */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Showing <strong>{filteredDoctors.length}</strong> of {DOCTORS.length} doctors</span>
            {(searchQuery || selectedDept !== 'all' || selectedDay !== 'all') && (
              <button
                onClick={resetFilters}
                className="text-sky-600 font-semibold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4">
            <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Doctors Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any specialist matching your criteria. Try adjusting your search query or department filters.
            </p>
            <button
              onClick={resetFilters}
              className="bg-sky-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-sky-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
