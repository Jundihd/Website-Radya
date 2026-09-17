'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Language, CaseStudy } from '@/types';
import { CASE_STUDIES } from '@/lib/data';
import {
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface CaseStudiesSectionProps {
  language: Language;
  onSelectCaseStudy?: (study: CaseStudy) => void;
  onOpenContact?: () => void;
}

interface CardHeroImageCarouselProps {
  images: string[];
  alt: string;
  categoryText: string;
  client: string;
  industry: string;
}

const CardHeroImageCarousel: React.FC<CardHeroImageCarouselProps> = ({
  images,
  alt,
  categoryText,
  client,
  industry,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <div
      className="relative h-48 overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((imgSrc, i) => (
        <img
          key={imgSrc + i}
          src={imgSrc}
          alt={`${alt} screenshot ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
            i === currentIdx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-20 pointer-events-none" />

      {/* Category Pill (Top Left) */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 text-[10px] font-extrabold text-[#29B6F6] uppercase tracking-wider shadow-sm">
          {categoryText}
        </span>
      </div>

      {/* Multi-Image Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-sm">
          {images.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === currentIdx ? 'w-3.5 bg-[#29B6F6]' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Client Name & Industry Tag */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
        <span className="text-base sm:text-lg font-black text-white tracking-wide uppercase drop-shadow-md truncate max-w-[65%]">
          {client}
        </span>
        <span className="text-[10px] text-slate-200 font-semibold bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10 shrink-0">
          {industry}
        </span>
      </div>
    </div>
  );
};

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  language,
}) => {
  // Fully static — data lives in src/lib/data.ts (synced from CMS, no live fetch).
  const studies: CaseStudy[] = CASE_STUDIES;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter 5 target portfolios requested by user: ANBK, OJK, Imuni, BioAudit, Anteraja
  const top5Portfolios = useMemo(() => {
    const targetKeys = ['anbk', 'sikepo', 'imuni', 'bioaudit', 'anteraja-aware'];
    const matched: CaseStudy[] = [];

    targetKeys.forEach((key) => {
      const found = studies.find(
        (s) => s.id === key || s.slug === key || (s.client && s.client.toLowerCase().includes(key))
      );
      if (found && !matched.some((m) => m.id === found.id)) {
        matched.push(found);
      }
    });

    // Fill up to 5 if needed from remaining studies
    if (matched.length < 5) {
      studies.forEach((s) => {
        if (matched.length < 5 && !matched.some((m) => m.id === s.id)) {
          matched.push(s);
        }
      });
    }

    return matched.slice(0, 5);
  }, [studies]);

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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              {language === 'ID' ? '25+ Sistem Berjalan Aktif di Produksi' : '25+ Systems Currently Running in Production'}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              {language === 'ID'
                ? 'Perbankan, pemerintah, farmasi, pertambangan, logistik. Rekam jejak implementasi skala nasional Radya Labs.'
                : 'Banking, government, pharmaceutical, mining, logistics. Explore Radya Labs national mission-critical projects.'}
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

        {/* 5 Portfolios + 6th Card: "See More Portfolios" */}
        <div className="relative mb-12">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1"
          >
            {/* 1 - 5 Selected Case Studies */}
            {top5Portfolios.map((study) => {
              const categoryText = typeof study.category === 'object' ? (study.category[language] || study.category.ID) : study.category;
              const cardImages = study.images && study.images.length > 0
                ? study.images
                : [study.image];

              return (
                <Link
                  key={study.id}
                  href={`/portofolio/${study.slug || study.id}`}
                  className="w-[88vw] sm:w-[350px] md:w-[370px] lg:w-[380px] shrink-0 snap-start group bg-slate-900 rounded-3xl border border-slate-800 hover:border-[#1793E8]/60 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#1793E8]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Auto-Cycling Image Hero Carousel */}
                    <CardHeroImageCarousel
                      images={cardImages}
                      alt={study.title[language]}
                      categoryText={categoryText}
                      client={study.client}
                      industry={study.industry}
                    />

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
                </Link>
              );
            })}

            {/* 6th Card: "See More Portfolios" Link Card */}
            <div className="w-[88vw] sm:w-[350px] md:w-[370px] lg:w-[380px] shrink-0 snap-start group bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#1793E8] rounded-3xl border border-slate-800 p-8 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#1793E8]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#29B6F6] flex items-center justify-center mb-6 border border-white/10">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#29B6F6]">
                  {language === 'ID' ? 'ARSIP PORTOFOLIO LENGKAP' : 'FULL PORTFOLIO ARCHIVE'}
                </span>
                <h3 className="text-2xl font-extrabold mt-2 mb-3 leading-snug">
                  {language === 'ID'
                    ? 'Jelajahi 25+ Portofolio & Studi Kasus Enterprise'
                    : 'Explore 25+ Enterprise Case Studies & Portfolios'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {language === 'ID'
                    ? 'Lihat rekam jejak arsitektur sistem skala nasional yang kami bangun untuk perbankan, pemerintah, farmasi, dan logistik.'
                    : 'Explore our complete record of mission-critical systems engineered for banking, government, pharmaceuticals, and logistics.'}
                </p>
              </div>

              <Link
                href="/portofolio"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-radya text-white font-bold text-sm flex items-center justify-between shadow-lg hover:brightness-110 transition-all group-hover:translate-x-1"
              >
                <span>{language === 'ID' ? 'Lihat Semua Portofolio' : 'See More Portfolios'}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Indicator Track Footer */}
          <div className="flex items-center justify-end mt-4 text-xs font-semibold text-slate-400 px-2">
            <span className="flex items-center gap-1 text-[#29B6F6]">
              <span>← {language === 'ID' ? 'Geser untuk portofolio lain' : 'Swipe for more'} →</span>
            </span>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/portofolio"
            className="bg-gradient-radya text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-lg shadow-[#1793E8]/30 hover:shadow-xl hover:shadow-[#1793E8]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>{language === 'ID' ? 'Lihat Semua Portofolio (25+)' : 'View All Portfolios (25+)'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
