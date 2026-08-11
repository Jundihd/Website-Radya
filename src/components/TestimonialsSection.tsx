'use client';
import React, { useState, useEffect } from 'react';
import { Language, Testimonial } from '@/types';
import { TESTIMONIALS } from '@/lib/data';
import { Star, Quote, Award } from 'lucide-react';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  useEffect(() => {
    let isMounted = true;
    async function loadCmsTestimonials() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.testimonials && data.testimonials.length > 0) {
            setTestimonials(data.testimonials);
          }
        }
      } catch (err) {
        console.error('Failed to load CMS testimonials:', err);
      }
    }
    loadCmsTestimonials();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Testimonials Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl border border-slate-200/80 bg-white hover:border-[#1793E8]/50 hover:shadow-xl hover:-translate-y-1.5 hover:ring-2 hover:ring-[#1793E8]/20 transition-all duration-300 flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#1793E8]/20 group-hover:text-[#1793E8]/40 transition-colors" />
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
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:border-[#1793E8]/40 transition-colors"
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
