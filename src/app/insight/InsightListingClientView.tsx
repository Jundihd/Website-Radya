'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InsightArticle, Language } from '@/types';
import { ContactModal } from '@/components/ContactModal';
import { COMPANY_CONFIG } from '@/lib/company-info';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  Sparkles,
  Filter,
} from 'lucide-react';

interface InsightListingClientViewProps {
  initialArticles: InsightArticle[];
}

export const InsightListingClientView: React.FC<InsightListingClientViewProps> = ({ initialArticles }) => {
  const [language, setLanguage] = useState<Language>('EN');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Extract unique categories dynamically from articles
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialArticles.forEach((art) => {
      const catName = typeof art.category === 'object' ? art.category.EN || art.category.ID : art.category;
      if (catName) set.add(catName.toUpperCase());
    });
    return ['ALL', ...Array.from(set)];
  }, [initialArticles]);

  // Filter articles based on search query and selected category
  const filteredArticles = useMemo(() => {
    return initialArticles.filter((art) => {
      const catName = (typeof art.category === 'object' ? art.category.EN || art.category.ID : art.category || '').toUpperCase();
      const matchesCategory = selectedCategory === 'ALL' || catName === selectedCategory;

      const titleStr = (art.title?.EN || art.title?.ID || '').toLowerCase();
      const summaryStr = (art.summary?.EN || art.summary?.ID || '').toLowerCase();
      const tagsStr = (art.tags || []).join(' ').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = !query || titleStr.includes(query) || summaryStr.includes(query) || tagsStr.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

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
              {language === 'ID' ? 'Arsip Insight & Artikel' : 'Insight & Article Archive'}
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/10">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{initialArticles.length}+ {language === 'ID' ? 'ARTIKEL TERPUBLIKASI' : 'PUBLISHED ARTICLES'}</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              {language === 'ID'
                ? 'Arsip Insight & Panduan Arsitektur Software'
                : 'Radya Engineering Insights & Architecture Playbooks'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {language === 'ID'
                ? 'Koleksi lengkap artikel arsitektur Cloud Native, AI & Machine Learning, DevOps, dan strategi digital dari tim Senior Principal Solutions Architect Radya Labs.'
                : 'Complete collection of cloud native architecture, generative AI, DevOps, and digital transformation playbooks peer-reviewed by Radya Labs solutions architects.'}
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
                    ? 'Cari artikel berdasarkan judul, topik, atau kata kunci (e.g. AI, Cloud, Kubernetes)...'
                    : 'Search articles by title, topic, or keyword (e.g., AI, Cloud, Kubernetes)...'
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
        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#1793E8]" />
            <span>{language === 'ID' ? 'Kategori:' : 'Category:'}</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(12);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1793E8] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1793E8]/50 hover:text-[#1793E8]'
              }`}
            >
              {cat === 'ALL' ? (language === 'ID' ? 'SEMUA ARTIKEL' : 'ALL ARTICLES') : cat}
            </button>
          ))}
        </div>

        {/* Results Counter Summary */}
        <div className="flex items-center justify-between mb-8 text-xs font-bold text-slate-500">
          <span>
            {language === 'ID'
              ? `Menampilkan ${displayedArticles.length} dari ${filteredArticles.length} artikel`
              : `Showing ${displayedArticles.length} of ${filteredArticles.length} articles`}
          </span>
          {searchQuery && (
            <span className="text-[#1793E8]">
              {language === 'ID' ? `Hasil pencarian untuk "${searchQuery}"` : `Search results for "${searchQuery}"`}
            </span>
          )}
        </div>

        {/* 3-Column Responsive Article Grid */}
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedArticles.map((art) => {
              const articleHref = `/insight/${art.slug || art.id}`;
              const titleText = art.title[language] || art.title.ID;
              const summaryText = art.summary[language] || art.summary.ID;
              const categoryText = typeof art.category === 'object' ? (art.category[language] || art.category.ID) : art.category;

              return (
                <article
                  key={art.id}
                  className="group bg-white rounded-3xl border border-slate-200/80 hover:border-[#1793E8]/50 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <Link href={articleHref} className="relative block h-52 overflow-hidden bg-slate-100">
                      {art.image ? (
                        <Image
                          src={art.image}
                          alt={titleText}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-[#1793E8] flex items-center justify-center text-white font-extrabold text-lg p-6">
                          {titleText}
                        </div>
                      )}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[10px] font-extrabold text-[#29B6F6] uppercase tracking-wider shadow-sm">
                          {categoryText}
                        </span>
                      </div>
                    </Link>

                    {/* Card Content Body */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#1793E8]" />
                          <time dateTime={art.date}>{art.date}</time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#1793E8]" />
                          {art.readTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-2">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'ID' ? 'Oleh: Principal Solution Architect' : 'By: Principal Solution Architect'}</span>
                      </div>

                      <h2 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#1793E8] transition-colors leading-snug cursor-pointer line-clamp-2">
                        <Link href={articleHref}>{titleText}</Link>
                      </h2>

                      <p className="text-[#475569] text-sm leading-relaxed mb-4 line-clamp-3">
                        {summaryText}
                      </p>

                      {art.tags && art.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                          {art.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Read Article Action Button */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <Link
                      href={articleHref}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-radya text-white font-bold text-xs flex items-center justify-between shadow-xs hover:brightness-110 transition-all"
                    >
                      <span>{language === 'ID' ? 'Baca Artikel Lengkap' : 'Read Full Article'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">
              {language === 'ID' ? 'Tidak Ada Artikel Ditemukan' : 'No Articles Found'}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {language === 'ID'
                ? `Tidak ada artikel yang cocok dengan pencarian "${searchQuery}". Coba kata kunci lain atau pilih kategori Semua.`
                : `No articles match your search "${searchQuery}". Try another keyword or select All categories.`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-radya text-white font-bold text-xs shadow-md"
            >
              {language === 'ID' ? 'Reset Filter' : 'Reset Filters'}
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
              <span>{language === 'ID' ? 'Muat Lebih Banyak Artikel' : 'Load More Articles'}</span>
              <ChevronRight className="w-4 h-4 text-[#1793E8] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Bottom Lead Conversion Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] p-8 sm:p-12 text-white shadow-2xl text-center relative overflow-hidden mt-12">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-bold uppercase mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'KONSULTASI KEBUTUHAN ANDA' : 'CONSULTATION & ARCHITECTURE'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              {language === 'ID'
                ? 'Ingin Mendiskusikan Arsitektur Sistem dengan Engineer Kami?'
                : 'Need to Discuss Software Architecture with Senior Engineers?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              {language === 'ID'
                ? 'Diskusikan arsitektur Cloud Native, solusi AI, dan strategi otomatisasi bisnis bersama Senior Solution Architect Radya Labs.'
                : 'Discuss cloud native architecture, AI integration, and technical roadmaps directly with Radya Labs solutions architects.'}
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
