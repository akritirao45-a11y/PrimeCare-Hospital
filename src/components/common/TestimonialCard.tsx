import React from 'react';
import { Testimonial } from '../../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div
      id={`testimonial-card-${testimonial.id}`}
      className="bg-blue-50/50 rounded-3xl border border-blue-100 p-6 shadow-xs flex flex-col justify-between relative group hover:border-blue-200 transition-colors"
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-200/60 shrink-0 pointer-events-none" />

      <div className="space-y-3 relative z-10">
        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < testimonial.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-200 text-slate-200'
              }`}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
          "{testimonial.quote || testimonial.reviewText}"
        </p>
      </div>

      <div className="pt-4 mt-3 border-t border-blue-100/80 flex items-center gap-3">
        <img
          src={testimonial.avatar || testimonial.patientPhoto}
          alt={testimonial.patientName}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-xs"
          loading="lazy"
        />
        <div>
          <h4 className="text-xs font-bold text-slate-800">
            {testimonial.patientName}
          </h4>
          <p className="text-[11px] text-slate-500">
            {testimonial.treatment || testimonial.treatmentReceived} • <span className="text-blue-600 font-semibold">{testimonial.department}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
