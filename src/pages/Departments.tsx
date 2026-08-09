import React, { useState } from 'react';
import { DEPARTMENTS } from '../data/mockData';
import { DepartmentCard } from '../components/common/DepartmentCard';
import { PageHeader } from '../components/common/PageHeader';
import { Search } from 'lucide-react';

export const Departments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = DEPARTMENTS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.servicesOffered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Clinical Departments & Centers of Excellence"
        subtitle="Explore our specialized medical, surgical, and diagnostic departments led by distinguished faculty."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Departments' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search department by name or treatment (e.g., Cardiology, Stroke, Knee)..."
            id="department-search-input"
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
        </div>

        {/* Grid */}
        {filteredDepts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepts.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
            <p className="text-base font-bold text-slate-700">No departments match your search "{searchQuery}"</p>
            <p className="text-xs text-slate-500">Try searching for broader terms like "Surgery", "Heart", or "Skin".</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-sky-600 font-semibold hover:underline"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
