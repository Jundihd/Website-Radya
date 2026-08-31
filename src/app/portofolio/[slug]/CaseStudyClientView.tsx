'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/types';
import { ContactModal } from '@/components/ContactModal';
import {
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Server,
  ArrowRight,
  PhoneCall,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  ImageIcon,
} from 'lucide-react';

interface CaseStudyClientViewProps {
  study: CaseStudy;
}

export const CaseStudyClientView: React.FC<CaseStudyClientViewProps> = ({ study }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Consolidate all available screenshots & images into a deduplicated array
  const allPhotos = useMemo(() => {
    const list = [study.image, ...(study.images || []), ...(study.screenshots || [])].filter(Boolean);
    return Array.from(new Set(list));
  }, [study]);

  // Auto-rotate top hero carousel every 4 seconds if not hovered and multiple photos exist
  useEffect(() => {
    if (allPhotos.length <= 1 || isHeroHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [allPhotos.length, isHeroHovered]);

  // Keyboard navigation for Lightbox (ESC to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allPhotos.length) % allPhotos.length : 0));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allPhotos.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allPhotos.length]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % allPhotos.length);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/portofolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#1793E8] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Portofolio</span>
          </Link>

          <Link href="/" className="flex items-center">
            <Image
              src="/images/logos/radya-logo.png"
              alt="Radya Labs"
              width={150}
              height={30}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          <button
            onClick={() => setIsContactOpen(true)}
            className="bg-gradient-radya text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-sm hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Konsultasi Proyek</span>
          </button>
        </div>
      </header>

      {/* Main Content Article */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/portofolio" className="hover:text-slate-700 transition-colors">
            Portofolio & Studi Kasus
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[#1793E8] font-bold truncate max-w-xs">{study.title.ID}</span>
        </nav>

        {/* Hero Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-extrabold tracking-wider uppercase">
              {typeof study.category === 'object' ? study.category.ID : study.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
              Klien: {study.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6">
            {study.title.ID}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
            {study.summary.ID}
          </p>
        </header>

        {/* Key Impact Metric Cards */}
        {study.metrics && study.metrics.length > 0 && (
          <section aria-label="Key Impact Metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm text-center relative overflow-hidden"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient-radya mb-2">
                  {metric.value}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {metric.label.ID}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Top Hero Auto-Rotating Photo Carousel Showcase */}
        <div
          className="relative w-full h-[340px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800/90 mb-14 bg-slate-950 group select-none cursor-pointer"
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          onClick={() => setLightboxIndex(currentSlide)}
        >
          {/* Photo Slides */}
          {allPhotos.map((imgSrc, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={imgSrc + idx}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={`${study.title.ID} screenshot ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            );
          })}

          {/* Dark Overlay Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 z-20 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
            <span className="px-3.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-extrabold text-[#29B6F6] uppercase tracking-wider shadow-md">
              {typeof study.category === 'object' ? study.category.ID : study.category} — {study.client}
            </span>

            {/* Click to Enlarge Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
              <Maximize2 className="w-3.5 h-3.5 text-[#29B6F6]" />
              <span>Klik untuk Perbesar ({currentSlide + 1}/{allPhotos.length})</span>
            </div>
          </div>

          {/* Previous / Next Arrow Controls */}
          {allPhotos.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrevSlide}
                className="pointer-events-auto p-3 rounded-2xl bg-slate-950/80 hover:bg-[#1793E8] text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95"
                title="Foto Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextSlide}
                className="pointer-events-auto p-3 rounded-2xl bg-slate-950/80 hover:bg-[#1793E8] text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95"
                title="Foto Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Bottom Dot Indicators */}
          {allPhotos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-2 pointer-events-none">
              {allPhotos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(dotIdx);
                  }}
                  className={`pointer-events-auto h-2 rounded-full transition-all duration-300 ${
                    dotIdx === currentSlide
                      ? 'w-8 bg-[#29B6F6] shadow-sm'
                      : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                  title={`Foto ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Core Architecture Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Challenge Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-5">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">Tantangan Bisnis & Teknis</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {study.challenge.ID}
            </p>
          </div>

          {/* Solution Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-5">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">Solusi Arsitektur Radya Labs</h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {study.solution.ID}
            </p>
          </div>
        </div>

        {/* Tech Stack & Ecosystem */}
        {study.tags && study.tags.length > 0 && (
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-14 shadow-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <Server className="w-6 h-6 text-[#29B6F6]" />
              <h3 className="text-xl font-bold text-white">Teknologi & Ekosistem Terapan</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Studi kasus ini diimplementasikan menggunakan stack teknologi Cloud Native berstandar enterprise dengan otomasi CI/CD dan ISO 27001 Security compliance.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {study.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-slate-200 hover:border-[#1793E8] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Visual Implementation Gallery - Clickable to View Full Detail */}
        {allPhotos.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">Galeri Implementasi Sistem</h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Klik foto mana saja untuk melihat tangkapan layar sistem dalam resolusi penuh.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1793E8] bg-[#1793E8]/10 px-3 py-1 rounded-full">
                <ImageIcon className="w-4 h-4" />
                <span>{allPhotos.length} Foto Screenshot</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allPhotos.map((imgSrc, idx) => (
                <div
                  key={imgSrc + idx}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative h-60 rounded-2xl overflow-hidden shadow-md border border-slate-200/90 bg-slate-950 group cursor-pointer hover:border-[#1793E8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Image
                    src={imgSrc}
                    alt={`${study.title.ID} Preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/60 transition-colors flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 duration-200 p-4 text-center">
                    <Maximize2 className="w-8 h-8 text-[#29B6F6] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">Perbesar Foto #{idx + 1}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[10px] font-bold text-white border border-white/10">
                    Foto {idx + 1} dari {allPhotos.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified Client Testimonial / Credential Quote */}
        {study.testimonial && (
          <div className="bg-gradient-to-br from-[#1793E8]/10 via-white to-[#43D3A4]/10 rounded-3xl p-8 sm:p-10 border border-[#1793E8]/20 shadow-sm mb-14">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#1793E8] uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" />
              <span>Testimoni Resmi Klien</span>
            </div>
            <blockquote className="text-base sm:text-lg italic font-raleway font-medium text-slate-700 leading-relaxed mb-6">
              &ldquo;{study.testimonial.quote.ID}&rdquo;
            </blockquote>
            <div className="font-bold text-[#0F172A] text-sm">
              {study.testimonial.author} — <span className="text-slate-500 font-normal">{study.testimonial.role}</span>
            </div>
          </div>
        )}

        {/* Bottom Conversion CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] p-8 sm:p-12 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KONSULTASIKAN KEBUTUHAN ANDA</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Ingin Membangun Solusi Skala Enterprise Serupa?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Diskusikan arsitektur sistem, tahap pengembangan, dan timeline implementasi bersama Senior Principal Solutions Architect Radya Labs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-radya text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Jadwalkan Konsultasi Gratis</span>
              </button>
              <Link
                href="/portofolio"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Lihat Studi Kasus Lainnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox High-Resolution Fullscreen Image Modal Popup */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between text-white z-50 mb-2">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-sm sm:text-base text-[#29B6F6]">
                {study.title.ID}
              </span>
              <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                Foto {lightboxIndex + 1} dari {allPhotos.length}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 cursor-pointer"
              title="Tutup (ESC)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Fullscreen High-Res Image Container */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto my-auto flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[82vh]">
              <Image
                src={allPhotos[lightboxIndex]}
                alt={`${study.title.ID} Full Resolution Photo ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Left / Right Arrow Navigation */}
            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allPhotos.length) % allPhotos.length : 0));
                  }}
                  className="absolute left-2 sm:left-4 p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-[#1793E8] text-white border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Foto Sebelumnya (Panah Kiri)"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allPhotos.length : 0));
                  }}
                  className="absolute right-2 sm:right-4 p-3 sm:p-4 rounded-2xl bg-slate-900/80 hover:bg-[#1793E8] text-white border border-white/20 backdrop-blur-md shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Foto Selanjutnya (Panah Kanan)"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Strip Indicator */}
          {allPhotos.length > 1 && (
            <div
              className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-2 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {allPhotos.map((thumbSrc, thumbIdx) => (
                <button
                  key={thumbSrc + thumbIdx}
                  onClick={() => setLightboxIndex(thumbIdx)}
                  className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    thumbIdx === lightboxIndex
                      ? 'border-[#29B6F6] scale-110 shadow-lg'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={thumbSrc}
                    alt={`Thumbnail ${thumbIdx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Direct Contact Modal Dialog Popup */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language="ID"
      />
    </div>
  );
};
