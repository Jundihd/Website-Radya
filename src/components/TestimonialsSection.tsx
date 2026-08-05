'use client';
import React, { useState } from 'react';
import { Language } from '@/types';
import { TESTIMONIALS } from '@/lib/data';
import { Star, Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'TESTIMONI KLIEN' : 'CLIENT TESTIMONIALS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              {language === 'ID'
                ? 'Kepercayaan Mereka Adalah Semangat Bagi Kami'
                : 'Trusted by Leaders Driving Transformation'}
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#0F172A] text-white hover:bg-slate-800 transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                idx === activeIndex
                  ? 'bg-gradient-to-b from-slate-50 to-white border-[#1793E8]/50 shadow-xl ring-2 ring-[#1793E8]/20 scale-[1.02]'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#1793E8]/20" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-base leading-relaxed mb-8 italic">
                  "{t.quote[language]}"
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="text-base font-extrabold text-[#0F172A]">
                    {t.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500">
                    {t.role} • <span className="text-[#1793E8] font-bold">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
