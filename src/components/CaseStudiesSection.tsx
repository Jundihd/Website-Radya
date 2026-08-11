'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Language, CaseStudy } from '@/types';
import { CASE_STUDIES } from '@/lib/data';
import {
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe
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
  const [studies, setStudies] = useState<CaseStudy[]>(CASE_STUDIES);
  const [isLiveCms, setIsLiveCms] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const total = studies.length;

  useEffect(() => {
    let isMounted = true;
    async function loadCmsPortfolios() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.portfolios && data.portfolios.length > 0) {
            setStudies(data.portfolios);
            setIsLiveCms(data.isLive ?? true);
          }
        }
      } catch (err) {
        console.error('Failed to load CMS portfolios:', err);
      }
    }
    loadCmsPortfolios();
    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="portofolio" className="py-20 lg:py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1793E8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#43D3A4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#29B6F6] text-[11px] font-bold uppercase tracking-wider mb-3 border border-white/10">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'PORTOFOLIO KAMI' : 'FEATURED CASE STUDIES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              {language === 'ID' ? 'Solusi Nyata, Dampak Terukur' : 'Proven Enterprise Impact & ROI'}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              {language === 'ID'
                ? 'Geser ke kanan/kiri untuk menelusuri studi kasus & portofolio unggulan dari Radya Labs.'
                : 'Scroll horizontally to explore our enterprise case studies and customer success stories.'}
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-md">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-[#1793E8] text-slate-300 hover:text-white transition-all shadow-xs hover:scale-105 active:scale-95"
                title={language === 'ID' ? 'Geser Kiri' : 'Scroll Left'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-[#1793E8] text-slate-300 hover:text-white transition-all shadow-xs hover:scale-105 active:scale-95"
                title={language === 'ID' ? 'Geser Kanan' : 'Scroll Right'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Card Horizontal Carousel Track */}
        <div className="relative mb-12">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1"
          >
            {studies.map((study) => {
              const categoryText = typeof study.category === 'object' ? (study.category[language] || study.category.ID) : study.category;

              return (
                <div
                  key={study.id}
                  onClick={() => onSelectCaseStudy(study)}
                  className="w-[88vw] sm:w-[350px] md:w-[370px] lg:w-[380px] shrink-0 snap-start group bg-slate-900 rounded-3xl border border-slate-800 hover:border-[#1793E8]/60 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#1793E8]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image & Overlay Badges */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      {/* Category Pill */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-extrabold text-[#29B6F6] uppercase tracking-wider">
                          {categoryText}
                        </span>
                      </div>

                      {/* Client Name & Industry Tag */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <span className="text-lg font-black text-white tracking-wide uppercase drop-shadow-md">
                          {study.client}
                        </span>
                        <span className="text-[10px] text-slate-200 font-semibold bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">
                          {study.industry}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-[#29B6F6] transition-colors leading-tight line-clamp-2">
                        {study.title[language]}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {study.summary[language]}
                      </p>

                      {/* Highlight Metrics Row */}
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/90 border border-slate-800/80 mb-4">
                        {study.metrics.map((m, idx) => (
                          <div key={idx} className="text-center sm:text-left">
                            <div className="text-sm sm:text-base font-black text-emerald-400 tracking-tight">
                              {m.value}
                            </div>
                            <div className="text-[9px] sm:text-[10px] font-semibold text-slate-400 truncate">
                              {m.label[language]}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {study.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded-md border border-slate-700/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#29B6F6] group-hover:text-white transition-colors">
                    <span>{language === 'ID' ? 'Lihat Detail Portofolio' : 'View Case Study Details'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#29B6F6]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicator Track Footer */}
          <div className="flex items-center justify-between mt-4 text-xs font-semibold text-slate-400 px-2">
            <span>{language === 'ID' ? `Menampilkan ${total} Studi Kasus Portofolio` : `Showing ${total} Enterprise Case Studies`}</span>
            <span className="flex items-center gap-1 text-[#29B6F6]">
              <span>← {language === 'ID' ? 'Geser untuk portofolio lain' : 'Swipe/scroll for more'} →</span>
            </span>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="bg-gradient-radya text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-[#1793E8]/30 hover:shadow-xl hover:shadow-[#1793E8]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>{language === 'ID' ? 'Lihat Portofolio Lainnya' : 'View More Portfolios'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

