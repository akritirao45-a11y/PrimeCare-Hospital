import React, { useState } from 'react';
import { FAQ } from '../../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            id={`faq-item-${faq.id}`}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-200"
          >
            <button
              onClick={() => toggleAccordion(faq.id)}
              id={`faq-toggle-${faq.id}`}
              type="button"
              className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-sky-600 transition-colors focus:outline-none focus:bg-slate-50"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-sky-600 shrink-0" />
                <span className="text-sm sm:text-base">{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-sky-600' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
