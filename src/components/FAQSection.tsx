/**
 * @license
 * FAZZA FOOD - Komponen FAQ Accordion (Pertanyaan yang Sering Diajukan)
 */

import React, { useState } from 'react';
import { FAQ_LIST } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white border-t border-orange-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3.5 py-1.5 rounded-full mb-2">
            <HelpCircle className="w-4 h-4 text-[#EA580C]" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B1F0E]">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-[#3B1F0E]/75 mt-2">
            Semua hal penting yang perlu Anda ketahui sebelum memesan hidangan di FAZZA FOOD.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_LIST.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-orange-200/80 overflow-hidden bg-[#FFF8F0] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-100/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#3B1F0E]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-orange-200 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#EA580C] text-white' : 'text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#3B1F0E]/80 leading-relaxed border-t border-orange-200/40 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
