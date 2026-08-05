'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Language, InsightArticle } from '@/types';
import { INSIGHTS_ARTICLES, FAQS } from '@/lib/data';
import { BookOpen, ArrowRight, Clock, Calendar, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Globe, Loader2 } from 'lucide-react';

interface InsightsSectionProps {
  language: Language;
  onSelectArticle: (article: InsightArticle) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  language,
  onSelectArticle,
}) => {
  const [articles, setArticles] = useState<InsightArticle[]>(INSIGHTS_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [isLiveCms, setIsLiveCms] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCmsArticles() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.articles && data.articles.length > 0) {
            setArticles(data.articles);
            setIsLiveCms(data.isLive ?? true);
          }
        }
      } catch (err) {
        console.error('Failed to load CMS articles:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCmsArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="insight" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'ID' ? 'INSIGHT TERBARU' : 'LATEST INSIGHTS'}</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {language === 'ID'
                ? 'Artikel & Insight Terbaru dari Radya Labs'
                : 'Official Articles & Thought Leadership'}
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              {language === 'ID'
                ? 'Geser ke kanan/kiri untuk menelusuri artikel resmi dari tim Principal Architect Radya Labs.'
                : 'Scroll horizontally to explore official articles published on Radya Labs.'}
            </p>
          </div>

          {/* Navigation Controls & Website Link */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#1793E8] text-slate-700 hover:text-white transition-all shadow-2xs hover:scale-105 active:scale-95"
                title={language === 'ID' ? 'Geser Kiri' : 'Scroll Left'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#1793E8] text-slate-700 hover:text-white transition-all shadow-2xs hover:scale-105 active:scale-95"
                title={language === 'ID' ? 'Geser Kanan' : 'Scroll Right'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <a
              href="https://radyalabs.com/id/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:border-[#1793E8] text-slate-700 font-bold text-xs shadow-xs hover:shadow-md transition-all"
            >
              <Globe className="w-4 h-4 text-[#1793E8]" />
              <span className="hidden sm:inline">{language === 'ID' ? 'Buka RadyaLabs.com Blog' : 'Visit RadyaLabs.com'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#1793E8]" />
            <p className="text-sm font-semibold">{language === 'ID' ? 'Memuat seluruh artikel dari Radya Labs CMS...' : 'Syncing articles from Radya Labs CMS...'}</p>
          </div>
        ) : (
          <div className="mb-20 relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1"
            >
              {articles.map((art) => {
                const originalUrl = art.originalUrl || `https://radyalabs.com/id/blog/${art.slug || art.id}`;

                return (
                  <div
                    key={art.id}
                    className="w-[85vw] sm:w-[350px] md:w-[370px] shrink-0 snap-start group bg-white rounded-3xl border border-slate-200/80 hover:border-[#1793E8]/50 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Image */}
                      <div
                        onClick={() => onSelectArticle(art)}
                        className="relative h-52 overflow-hidden cursor-pointer"
                      >
                        <img
                          src={art.image}
                          alt={art.title[language] || art.title.ID}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-extrabold text-[#29B6F6] uppercase tracking-wider">
                            {art.category}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#1793E8]" />
                            {art.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#1793E8]" />
                            {art.readTime}
                          </span>
                        </div>

                        <h3
                          onClick={() => onSelectArticle(art)}
                          className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#1793E8] transition-colors leading-snug cursor-pointer line-clamp-2"
                        >
                          {art.title[language] || art.title.ID}
                        </h3>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {art.summary[language] || art.summary.ID}
                        </p>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
                      <button
                        onClick={() => onSelectArticle(art)}
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-radya text-white font-bold text-xs flex items-center justify-between shadow-xs hover:brightness-110 transition-all"
                      >
                        <span>{language === 'ID' ? 'Baca Versi Lengkap' : 'Read Full Version'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-4 rounded-xl bg-white border border-slate-200 hover:border-[#1793E8] text-slate-600 hover:text-[#1793E8] font-bold text-xs flex items-center justify-between transition-colors"
                      >
                        <span>{language === 'ID' ? 'Lihat Artikel Asli (RadyaLabs.com)' : 'View Original (RadyaLabs.com)'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator Footer */}
            <div className="flex items-center justify-between mt-4 text-xs font-semibold text-slate-400 px-2">
              <span>{language === 'ID' ? `Menampilkan ${articles.length} Artikel Blog` : `Showing ${articles.length} Blog Articles`}</span>
              <span className="flex items-center gap-1 text-[#1793E8]">
                <span>← {language === 'ID' ? 'Geser untuk artikel lain' : 'Swipe/scroll for more'} →</span>
              </span>
            </div>
          </div>
        )}

        {/* FAQ Accordion Sub-Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              {language === 'ID' ? 'Pertanyaan Sering Diajukan (FAQ)' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              {language === 'ID' ? 'Jawaban mengenai model kerjasama dan standar delivery Radya Labs' : 'Answers regarding engagement models, SLA guarantees, and security.'}
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-base text-[#0F172A] flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question[language]}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-[#1793E8]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer[language]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
