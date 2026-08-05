'use client';
import React, { useState } from 'react';
import { Language, CaseStudy } from '@/types';
import { CASE_STUDIES } from '@/lib/data';
import {
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CaseStudiesSectionProps {
  language: Language;
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenContact?: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  language,
  onSelectCaseStudy,
  onOpenContact,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const total = CASE_STUDIES.length;

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  return (
    <section id="portofolio" className="py-10 sm:py-12 lg:py-10 bg-[#0F172A] text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1793E8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#43D3A4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Compact Header Grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#29B6F6] text-[11px] font-bold uppercase tracking-wider mb-2 border border-white/10">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'PORTOFOLIO KAMI' : 'FEATURED CASE STUDIES'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {language === 'ID' ? 'Solusi Nyata, Dampak Terukur' : 'Proven Enterprise Impact & ROI'}
            </h2>
          </div>

          {/* Carousel Navigation Buttons & Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-slate-400">
              0{activeIndex + 1} / 0{total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1793E8] border border-white/10 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                aria-label="Previous portfolio"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1793E8] border border-white/10 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                aria-label="Next portfolio"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Highlight Carousel Stage (Fits within viewport height without scrolling) */}
        <div className="relative flex items-center justify-center px-2 sm:px-0">
          
          {/* Side Left Card (Blurred & Dimmed) */}
          <div
            onClick={() => setActiveIndex(prevIndex)}
            className="hidden lg:block absolute left-0 w-[28%] opacity-35 scale-90 blur-[3px] hover:blur-none hover:opacity-75 transition-all duration-500 cursor-pointer z-10"
          >
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={CASE_STUDIES[prevIndex].image}
                  alt={CASE_STUDIES[prevIndex].title[language]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/60" />
                <div className="absolute bottom-2.5 left-3 text-sm font-extrabold text-white">
                  {CASE_STUDIES[prevIndex].client}
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-xs font-bold text-slate-300 line-clamp-1">
                  {CASE_STUDIES[prevIndex].title[language]}
                </h4>
              </div>
            </div>
          </div>

          {/* Active Center Card (Fully Highlighted & Compact) */}
          <div className="w-full lg:max-w-xl z-20 transition-all duration-500 transform">
            <div
              onClick={() => onSelectCaseStudy(CASE_STUDIES[activeIndex])}
              className="group bg-slate-900 rounded-2xl border-2 border-[#1793E8]/70 hover:border-[#1793E8] overflow-hidden shadow-2xl shadow-[#1793E8]/20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image & Overlay Category Badge */}
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={CASE_STUDIES[activeIndex].image}
                    alt={CASE_STUDIES[activeIndex].title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-extrabold text-[#29B6F6] uppercase tracking-wider">
                      {CASE_STUDIES[activeIndex].category[language]}
                    </span>
                  </div>

                  {/* Client Logo Tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-black text-white tracking-wide uppercase drop-shadow-md">
                      {CASE_STUDIES[activeIndex].client}
                    </span>
                    <span className="text-[11px] text-slate-200 font-semibold bg-white/15 px-2.5 py-0.5 rounded-md backdrop-blur-md border border-white/10">
                      {CASE_STUDIES[activeIndex].industry}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 group-hover:text-[#29B6F6] transition-colors leading-tight">
                    {CASE_STUDIES[activeIndex].title[language]}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {CASE_STUDIES[activeIndex].summary[language]}
                  </p>

                  {/* Highlight Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-4">
                    {CASE_STUDIES[activeIndex].metrics.map((m, idx) => (
                      <div key={idx} className="text-center sm:text-left">
                        <div className="text-base sm:text-lg font-black text-emerald-400 tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-400 truncate">
                          {m.label[language]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {CASE_STUDIES[activeIndex].tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded-md border border-slate-700/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-5 sm:px-6 py-3.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-[#29B6F6] group-hover:text-white transition-colors">
                <span>{language === 'ID' ? 'Lihat Detail Portofolio' : 'View Portfolio Details'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Side Right Card (Blurred & Dimmed) */}
          <div
            onClick={() => setActiveIndex(nextIndex)}
            className="hidden lg:block absolute right-0 w-[28%] opacity-35 scale-90 blur-[3px] hover:blur-none hover:opacity-75 transition-all duration-500 cursor-pointer z-10"
          >
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={CASE_STUDIES[nextIndex].image}
                  alt={CASE_STUDIES[nextIndex].title[language]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/60" />
                <div className="absolute bottom-2.5 left-3 text-sm font-extrabold text-white">
                  {CASE_STUDIES[nextIndex].client}
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-xs font-bold text-slate-300 line-clamp-1">
                  {CASE_STUDIES[nextIndex].title[language]}
                </h4>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {CASE_STUDIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-7 bg-gradient-radya'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA Button: Lihat Portofolio Lainnya */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => {
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="bg-gradient-radya text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-[#1793E8]/30 hover:shadow-xl hover:shadow-[#1793E8]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>{language === 'ID' ? 'Lihat Portofolio Lainnya' : 'View More Portfolios'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
