'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InsightArticle } from '@/types';
import { ContactModal } from '@/components/ContactModal';
import {
  ArrowLeft,
  Calendar,
  Clock,
  UserCheck,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  Tag,
} from 'lucide-react';

interface InsightArticleClientViewProps {
  article: InsightArticle;
}

export const InsightArticleClientView: React.FC<InsightArticleClientViewProps> = ({ article }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const categoryName =
    typeof article.category === 'object'
      ? article.category.ID
      : article.category;

  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(article.content.ID);
  const paragraphs = article.content.ID.split('\n\n').filter((p) => p.trim());

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/#insight"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#1793E8] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Artikel Insight</span>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/#insight" className="hover:text-slate-700 transition-colors">
            Insight & Artikel
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-[#1793E8] font-bold truncate max-w-xs">{article.title.ID}</span>
        </nav>

        {/* Header Metadata */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-extrabold tracking-wider uppercase">
              {categoryName}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-[#1793E8]" />
              <time dateTime={article.date}>{article.date}</time>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#1793E8]" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-6">
            {article.title.ID}
          </h1>

          {/* Author Credential Badge */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs w-fit mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1793E8]/10 text-[#1793E8] flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4 text-[#1793E8]" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">Radya Labs Engineering Team</span>
              <span className="text-slate-500 font-normal">Principal Solutions Architect</span>
            </div>
          </div>

          {article.summary.ID && (
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium bg-slate-100/60 p-5 rounded-2xl border border-slate-200/60">
              {article.summary.ID}
            </p>
          )}
        </header>

        {/* Featured Cover Image */}
        {article.image && (
          <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 mb-10 bg-slate-900">
            <Image
              src={article.image}
              alt={article.title.ID}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body Content */}
        {hasHtmlTags ? (
          <article
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg mb-12"
            dangerouslySetInnerHTML={{ __html: article.content.ID }}
          />
        ) : (
          <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg mb-12 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </article>
        )}

        {/* Article Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs mb-12">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              <Tag className="w-3.5 h-3.5 text-[#1793E8]" />
              <span>TOPIK TERKAIT</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-[#1793E8]/10 hover:text-[#1793E8] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Conversion CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-slate-900 to-[#1793E8] p-8 sm:p-12 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#29B6F6] text-xs font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KONSULTASI SOLUSI DIGITAL</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Siap Mengimplementasikan Teknologi Modern di Perusahaan Anda?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Diskusikan arsitektur Cloud Native, solusi AI, dan strategi otomatisasi bisnis bersama Senior Solution Architect Radya Labs.
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
                href="/#insight"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Lihat Artikel Lainnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Direct Contact Modal Dialog Popup */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language="ID"
      />
    </div>
  );
};
