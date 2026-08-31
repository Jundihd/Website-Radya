'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy, Language } from '@/types';
import { ContactModal } from '@/components/ContactModal';
import {
  ArrowLeft,
  Search,
  Briefcase,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

interface PortfolioListingClientViewProps {
  initialPortfolios: CaseStudy[];
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
      className="relative h-52 overflow-hidden bg-slate-950"
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

      {/* Multi-Image Dots Indicator (Top Right) */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-sm pointer-events-none">
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

      {/* Client Name & Industry Tag (Bottom) */}
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

export const PortfolioListingClientView: React.FC<PortfolioListingClientViewProps> = ({ initialPortfolios }) => {
  const [language, setLanguage] = useState<Language>('EN');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Filter portfolios based on search query
  const filteredPortfolios = useMemo(() => {
    return initialPortfolios.filter((p) => {
      const titleStr = (typeof p.title === 'object' ? p.title.EN || p.title.ID : p.title || '').toLowerCase();
      const clientStr = (p.client || '').toLowerCase();
      const summaryStr = (typeof p.summary === 'object' ? p.summary.EN || p.summary.ID : p.summary || '').toLowerCase();
      const tagsStr = (p.tags || []).join(' ').toLowerCase();
      const industryStr = (p.industry || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      return (
        !query ||
        titleStr.includes(query) ||
        clientStr.includes(query) ||
        summaryStr.includes(query) ||
        tagsStr.includes(query) ||
        industryStr.includes(query)
      );
    });
  }, [initialPortfolios, searchQuery]);

  const displayedPortfolios = filteredPortfolios.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPortfolios.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#1793E8] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'ID' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
          </Link>

          <Link href="/" className="flex items-center">
            <Image
              src="/images/logos/radya-logo.png"
              alt="Radya Labs"
              width={160}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'EN'
                    ? 'bg-white text-[#1793E8] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ID')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'ID'
                    ? 'bg-white text-[#1793E8] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ID
              </button>
            </div>

            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-gradient-radya text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-sm hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'Jadwalkan Konsultasi' : 'Book a Consultation'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] text-white pt-14 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radya opacity-20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {language === 'ID' ? 'Beranda' : 'Home'}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-[#29B6F6] font-bold">
              {language === 'ID' ? 'Arsip Portofolio & Studi Kasus' : 'Portfolio & Case Studies Archive'}
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/10">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{initialPortfolios.length}+ {language === 'ID' ? 'SISTEM AKTIF PRODUKSI' : 'PRODUCTION SYSTEMS'}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {language === 'ID'
                ? 'Arsip Portofolio & Studi Kasus Sistem Enterprise'
                : 'Radya Enterprise Case Studies & Portfolio Archive'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {language === 'ID'
                ? 'Rekam jejak implementasi arsitektur sistem skala nasional untuk instansi kementerian, perbankan, holding BUMN farmasi, dan ekspedisi logistik di Indonesia.'
                : 'Full architectural case studies of national mission-critical platforms built by Radya Labs for government ministries, banks, pharma holdings, and logistics networks.'}
            </p>

            {/* Search Bar Container */}
            <div className="relative max-w-2xl bg-white rounded-2xl p-2 shadow-2xl flex items-center gap-3 border border-slate-200">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder={
                  language === 'ID'
                    ? 'Cari portofolio berdasarkan klien, teknologi, atau industri (e.g. Kemendikbud, OJK, Bio Farma)...'
                    : 'Search portfolios by client, technology, or industry (e.g., Kemendikbud, OJK, Bio Farma)...'
                }
                className="flex-1 bg-transparent text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none pr-2"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 bg-slate-100 rounded-lg"
                >
                  {language === 'ID' ? 'Hapus' : 'Clear'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Counter Summary */}
        <div className="flex items-center justify-between mb-8 text-xs font-bold text-slate-500">
          <span>
            {language === 'ID'
              ? `Menampilkan ${displayedPortfolios.length} dari ${filteredPortfolios.length} studi kasus`
              : `Showing ${displayedPortfolios.length} of ${filteredPortfolios.length} case studies`}
          </span>
          {searchQuery && (
            <span className="text-[#1793E8]">
              {language === 'ID' ? `Hasil pencarian untuk "${searchQuery}"` : `Search results for "${searchQuery}"`}
            </span>
          )}
        </div>

        {/* 3-Column Responsive Portfolio Grid with Photo Carousels */}
        {displayedPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedPortfolios.map((study) => {
              const portfolioHref = `/portofolio/${study.slug || study.id}`;
              const titleText = typeof study.title === 'object' ? study.title[language] || study.title.ID : study.title;
              const summaryText = typeof study.summary === 'object' ? study.summary[language] || study.summary.ID : study.summary;
              const categoryText =
                typeof study.category === 'object'
                  ? study.category[language] || study.category.ID
                  : study.category;

              const cardImages = Array.from(
                new Set([study.image, ...(study.images || []), ...(study.screenshots || [])])
              ).filter(Boolean);

              return (
                <Link
                  key={study.id}
                  href={portfolioHref}
                  className="group bg-slate-900 rounded-3xl border border-slate-800 hover:border-[#1793E8]/60 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#1793E8]/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Auto-Rotating Hero Photo Carousel inside each Card */}
                    <CardHeroImageCarousel
                      images={cardImages}
                      alt={titleText}
                      categoryText={categoryText}
                      client={study.client}
                      industry={study.industry}
                    />

                    {/* Card Content Body */}
                    <div className="p-6 text-white">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-[#29B6F6] transition-colors leading-snug line-clamp-2">
                        {titleText}
                      </h2>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {summaryText}
                      </p>

                      {/* Highlight Metrics */}
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/90 border border-slate-800/80 mb-4">
                          {study.metrics.map((m, idx) => (
                            <div key={idx} className="text-center sm:text-left">
                              <div className="text-sm sm:text-base font-black text-emerald-400 tracking-tight">
                                {m.value}
                              </div>
                              <div className="text-[9px] sm:text-[10px] font-semibold text-slate-400 truncate">
                                {typeof m.label === 'object' ? (m.label[language] || m.label.ID) : m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Tags */}
                      {study.tags && study.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {study.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded-md border border-slate-700/50"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* View Details Action */}
                  <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#29B6F6] group-hover:text-white transition-colors">
                    <span>{language === 'ID' ? 'Lihat Detail Studi Kasus' : 'View Case Study Details'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#29B6F6]" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">
              {language === 'ID' ? 'Tidak Ada Portofolio Ditemukan' : 'No Portfolios Found'}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {language === 'ID'
                ? `Tidak ada studi kasus yang cocok dengan pencarian "${searchQuery}". Coba kata kunci lain.`
                : `No case studies match your search "${searchQuery}". Try another keyword.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-radya text-white font-bold text-xs shadow-md"
            >
              {language === 'ID' ? 'Hapus Pencarian' : 'Clear Search'}
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-6 pb-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-extrabold text-sm shadow-sm transition-all inline-flex items-center gap-2 group hover:border-[#1793E8]"
            >
              <span>{language === 'ID' ? 'Muat Lebih Banyak Portofolio' : 'Load More Portfolios'}</span>
              <ChevronRight className="w-4 h-4 text-[#1793E8] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Bottom Lead Conversion Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] p-8 sm:p-12 text-white shadow-2xl text-center relative overflow-hidden mt-12">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-bold uppercase mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'INGIN MEMBANGUN SISTEM SERUPA?' : 'BUILD A SIMILAR SYSTEM'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              {language === 'ID'
                ? 'Rencanakan Arsitektur Sistem Anda Bersama Engineer Radya Labs'
                : 'Scope Your System Architecture with Senior Engineers'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              {language === 'ID'
                ? 'Punya proyek skala besar yang membutuhkan ketahanan nol downtime, keamanan ISO 27001, dan tim dedicated? Konsultasikan bersama kami.'
                : 'Building high-concurrency systems requiring zero downtime resilience, ISO 27001 security, and dedicated engineering pods? Let\'s discuss your roadmap.'}
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-radya text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'ID' ? 'Jadwalkan Konsultasi Gratis' : 'Book a Consultation'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Direct Contact Modal Dialog Popup */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
      />
    </div>
  );
};
