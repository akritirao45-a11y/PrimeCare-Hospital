import React from 'react';
import { Info } from 'lucide-react';

export const DemoDisclaimerNotice: React.FC = () => {
  return (
    <div className="bg-sky-50 border-y border-sky-100 py-1.5 px-4 text-center text-xs text-slate-600 flex items-center justify-center gap-2">
      <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
      <span>
        <strong>Demo Hospital Website</strong> — All doctor profiles, testimonials, and appointment submissions are for demonstration purposes.
      </span>
    </div>
  );
};
