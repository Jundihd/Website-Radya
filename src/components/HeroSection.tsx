'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { HERO_STATS } from '@/lib/data';
import { ArrowRight, Zap, FolderKanban } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onOpenContact: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    src: '/images/hero-slide-1.png',
    alt: 'Radya Labs Project Showcase and Industry Presentation with Kemenparekraf',
    title: { ID: 'Kolaborasi & Pameran Inovasi Kemenparekraf', EN: 'Innovation Showcase & Industry Partnership' }
  },
  {
    id: 2,
    src: '/images/hero-slide-2.png',
    alt: 'Radya Labs ANBK Kemendikbudristek School Computer Lab Visit',
    title: { ID: 'Platform Asesmen Nasional (ANBK)', EN: 'Nationwide Educational Platform (ANBK)' }
  },
  {
    id: 3,
    src: '/images/hero-slide-3.png',
    alt: 'Radya Labs & Alkademi Foundation Guinness World Records Holder',
    title: { ID: 'Rekor Dunia Generative AI Apps', EN: 'Guinness World Record for GenAI Apps' }
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenContact,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide rotation every 4 seconds (strictly automatic, no manual drag/swipe)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-24 pb-8 md:pt-28 md:pb-10 overflow-hidden bg-[#F8FAFC]">
      {/* Background Decorative Mesh Shapes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1793E8]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#43D3A4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#29B6F6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column - Main Headline, Value Proposition & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-xs mb-4 hover:border-[#1793E8]/50 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#43D3A4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#43D3A4]"></span>
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-slate-700">
                {language === 'ID'
                  ? 'Teman Transformasi Digital Terbaik Anda'
                  : 'Your Trusted Digital Transformation Partner'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] lg:leading-[1.18] font-extrabold text-[#0F172A] tracking-tight mb-4">
              {language === 'ID' ? (
                <>
                  Membangun Solusi Digital{' '}
                  <span className="text-gradient-radya">Cerdas, Aman</span>, dan Berdampak Nyata.
                </>
              ) : (
                <>
                  Build Intelligent Digital Solutions That{' '}
                  <span className="text-gradient-radya">Scale Your Enterprise</span>.
                </>
              )}
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-xl font-normal">
              {language === 'ID'
                ? 'Radya Labs membantu perusahaan bertransformasi digital dan bertumbuh melalui solusi Cloud Native, AI, dan aplikasi berkualitas tinggi yang siap menghadapi masa depan.'
                : 'Radya Labs empowers companies to digitally transform and grow through Cloud Native, AI, and future-ready high-quality applications.'}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#layanan"
                className="bg-gradient-radya text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-[#1793E8]/30 hover:shadow-xl hover:shadow-[#1793E8]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>{language === 'ID' ? 'Jelajahi Layanan Kami' : 'Explore Our Services'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#portofolio"
                className="bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-xs hover:border-slate-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FolderKanban className="w-4 h-4 text-[#1793E8]" />
                <span>{language === 'ID' ? 'Lihat Portofolio Kami' : 'View our Portfolio'}</span>
              </a>
            </div>

          </div>

          {/* Right Hero Column - Auto-Rotating Photo Carousel Visual (Enlarged & Vertically Aligned with Left Column) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Symmetrical Image Frame Container */}
            <div className="relative w-full rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-white/95 via-slate-50/90 to-[#1793E8]/15 border border-slate-200/90 shadow-2xl backdrop-blur-xl">
              
              {/* Carousel Container (Aspect ratio 1024/483 matching the exact photo dimensions 100%) */}
              <div
                className="relative rounded-2xl overflow-hidden w-full select-none pointer-events-none shadow-md"
                style={{ aspectRatio: '1024 / 483' }}
              >
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-100 z-0'
                      }`}
                    >
                      {/* Crisp Full-Frame Photo touching edges seamlessly with 0 empty space */}
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        unoptimized
                        quality={100}
                        priority={idx === 0}
                        className="object-cover rounded-2xl"
                      />

                      {/* Subtle Vignette Bottom Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none rounded-2xl" />
                      
                      {/* Bottom Caption Badge */}
                      <div className="absolute bottom-3.5 left-4 right-24 z-20 flex items-center">
                        <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md truncate">
                          {slide.title[language]}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Subtle Automatic Progress Dots Indicator */}
                <div className="absolute bottom-3.5 right-4 z-30 flex items-center gap-1.5 pointer-events-none">
                  {HERO_SLIDES.map((slide, idx) => (
                    <span
                      key={slide.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentSlide
                          ? 'w-6 bg-[#43D3A4] shadow-sm'
                          : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating hanging badge: ISO 27001 & SOC2 Compliant (Positioned Top-Right) */}
              <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3 z-20 animate-float hover:shadow-2xl transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#43D3A4]/15 flex items-center justify-center text-[#43D3A4] shrink-0">
                  <Zap className="w-5 h-5 fill-[#43D3A4]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900">ISO 27001 & SOC2 Compliant</div>
                  <div className="text-[11px] font-medium text-slate-500">Enterprise Security Standard</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Stats Counter Row (Full Width across the bottom of both columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full mt-10 md:mt-12 pt-8 border-t border-slate-200/80">
          {HERO_STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col p-4 rounded-2xl bg-white/80 border border-slate-200/70 shadow-xs backdrop-blur-xs hover:border-[#1793E8]/30 hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight text-gradient-radya">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {stat.label[language]}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
