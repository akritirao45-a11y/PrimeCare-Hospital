import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs: { name: string; path?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3 max-w-3xl">
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-1.5 text-xs text-blue-300">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-white transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white font-semibold">{crumb.name}</span>
                )}
                {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
              </React.Fragment>
            ))}
          </nav>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
