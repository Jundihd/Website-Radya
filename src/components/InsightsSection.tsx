'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language, InsightArticle } from '@/types';
import { INSIGHTS_ARTICLES, FAQS } from '@/lib/data';
import { BookOpen, ArrowRight, Clock, Calendar, ChevronDown, ChevronLeft, ChevronRight, UserCheck, Sparkles } from 'lucide-react';

interface InsightsSectionProps {
  language: Language;
  onSelectArticle?: (article: InsightArticle) => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({
  language,
}) => {
  const [articles, setArticles] = useState<InsightArticle[]>(INSIGHTS_ARTICLES);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Background non-blocking sync for CMS articles if available
  useEffect(() => {
    let isMounted = true;
    async function loadCmsArticles() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.articles && data.articles.length > 0) {
            setArticles(data.articles);
          }
        }
      } catch (err) {
        // Fallback already pre-rendered gracefully with INSIGHTS_ARTICLES
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

  const top5Articles = articles.slice(0, 5);

  return (
    <section id="insight" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {language === 'ID'
                ? 'Artikel & Insight Terbaru dari Radya Labs'
                : 'Official Articles & Thought Leadership'}
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl">
              {language === 'ID'
                ? 'Ditulis langsung oleh Principal Solutions Architect & Cloud Engineering Team Radya Labs.'
                : 'Written and peer-reviewed by Senior Solutions Architects at Radya Labs.'}
            </p>
          </div>

          {/* Navigation Controls & See All Link */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#1793E8] shadow-2xs hover:shadow-xs transition-all"
            >
              <span>{language === 'ID' ? 'Lihat Semua Artikel' : 'See All Articles'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-[#1793E8] text-slate-700 hover:text-white transition-all shadow-2xs hover:scale-105 active:scale-95"
                title={language === 'ID' ? 'Geser Kiri' : 'Scroll Left'}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-xl bg-slate-50 hover:bg-[#1793E8] text-slate-700 hover:text-white transition-all shadow-2xs hover:scale-105 active:scale-95"
                title={language === 'ID' ? 'Geser Kanan' : 'Scroll Right'}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track: 5 Latest Articles + 6th Card: "See More Articles" */}
        <div className="mb-20 relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1"
          >
            {/* 1 - 5 Latest Articles */}
            {top5Articles.map((art) => {
              const articleHref = `/insight/${art.slug || art.id}`;
              return (
                <article
                  key={art.id}
                  className="w-[85vw] sm:w-[350px] md:w-[370px] shrink-0 snap-start group bg-white rounded-3xl border border-slate-200/80 hover:border-[#1793E8]/50 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image with next/image */}
                    <Link
                      href={articleHref}
                      className="relative block h-52 overflow-hidden cursor-pointer bg-slate-100"
                    >
                      <Image
                        src={art.image}
                        alt={art.title[language] || art.title.ID}
                        fill
                        sizes="(max-width: 640px) 85vw, 370px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[10px] font-extrabold text-[#29B6F6] uppercase tracking-wider shadow-sm">
                          {typeof art.category === 'object' ? (art.category[language] || art.category.ID) : art.category}
                        </span>
                      </div>
                    </Link>

                    {/* Body */}
                    <div className="p-6">
                      {/* Meta dates & read time */}
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

                      {/* E-E-A-T Author Credential */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-2">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'ID' ? 'Oleh: Principal Solution Architect, Radya Labs' : 'By: Principal Solution Architect, Radya Labs'}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#1793E8] transition-colors leading-snug cursor-pointer line-clamp-2">
                        <Link href={articleHref}>
                          {art.title[language] || art.title.ID}
                        </Link>
                      </h3>

                      <p className="text-[#475569] text-sm leading-relaxed mb-4 line-clamp-3">
                        {art.summary[language] || art.summary.ID}
                      </p>

                      {/* Article Tags */}
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

                  {/* Action Button */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
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

            {/* 6th Card: "See More Articles" Link Card */}
            <div className="w-[85vw] sm:w-[350px] md:w-[370px] shrink-0 snap-start group bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#1793E8] rounded-3xl border border-slate-800 p-8 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#1793E8]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#29B6F6] flex items-center justify-center mb-6 border border-white/10">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#29B6F6]">
                  {language === 'ID' ? 'ARSIP ARTIKEL LENGKAP' : 'FULL ARTICLE ARCHIVE'}
                </span>
                <h3 className="text-2xl font-extrabold mt-2 mb-3 leading-snug">
                  {language === 'ID'
                    ? 'Jelajahi 79+ Artikel & Insight Teknikal'
                    : 'Explore 79+ Technical Articles & Insights'}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {language === 'ID'
                    ? 'Akses koleksi lengkap artikel arsitektur cloud native, implementasi AI, dan panduan DevOps dari tim engineer Radya Labs.'
                    : 'Access our full collection of cloud native architecture, AI implementations, and DevOps playbooks written by Radya Labs engineers.'}
                </p>
              </div>

              <Link
                href="/insight"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-radya text-white font-bold text-sm flex items-center justify-between shadow-lg hover:brightness-110 transition-all group-hover:translate-x-1"
              >
                <span>{language === 'ID' ? 'Lihat Semua Artikel' : 'See More Articles'}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Scroll Indicator Footer */}
          <div className="flex items-center justify-between mt-4 text-xs font-semibold text-slate-400 px-2">
            <span>{language === 'ID' ? `Menampilkan 5 Artikel Terbaru & Kartu Arsip` : `Showing 5 Latest Articles & Archive Link`}</span>
            <span className="flex items-center gap-1 text-[#1793E8]">
              <span>← {language === 'ID' ? 'Geser untuk artikel lain & opsi See More' : 'Swipe for more & See More option'} →</span>
            </span>
          </div>
        </div>

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
