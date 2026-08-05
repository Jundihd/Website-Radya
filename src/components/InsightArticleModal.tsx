'use client';
import React from 'react';
import { Language, InsightArticle } from '@/types';
import { X, Calendar, Clock, ExternalLink, Tag } from 'lucide-react';

interface InsightArticleModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  language: Language;
}

export const InsightArticleModal: React.FC<InsightArticleModalProps> = ({
  article,
  onClose,
  language,
}) => {
  if (!article) return null;

  const originalUrl = article.originalUrl || `https://radyalabs.com/id/blog/${article.slug || article.id}`;
  const titleText = article.title[language] || article.title.ID;
  const summaryText = article.summary[language] || article.summary.ID;
  const contentText = article.content[language] || article.content.ID;

  const isHtml = contentText.includes('<p>') || contentText.includes('<div>') || contentText.includes('&ldquo;');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-6 bg-slate-100">
          <img
            src={article.image}
            alt={titleText}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-extrabold text-[#29B6F6] uppercase tracking-wider">
              {article.category}
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-400 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#1793E8]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#1793E8]" />
              {article.readTime}
            </span>
          </div>

          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#1793E8] text-slate-700 hover:text-white font-bold text-xs transition-colors"
          >
            <span>{language === 'ID' ? 'Buka Versi Asli di RadyaLabs.com' : 'Open Original on RadyaLabs.com'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
          {titleText}
        </h2>

        {/* Summary Highlight Box */}
        {summaryText && (
          <div className="mb-8 p-5 bg-gradient-to-r from-slate-50 to-sky-50/50 rounded-2xl border border-sky-100 text-slate-800 text-sm font-semibold leading-relaxed">
            {summaryText}
          </div>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed mb-8">
          {isHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: contentText }}
              className="space-y-4 [&_p]:mb-4 [&_a]:text-[#1793E8] [&_a]:font-bold [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0F172A] [&_h3]:mt-6 [&_h3]:mb-3"
            />
          ) : (
            <div className="whitespace-pre-line space-y-4">
              {contentText}
            </div>
          )}
        </div>

        {/* Tags list if available */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 pt-4 border-t border-slate-100">
            <Tag className="w-4 h-4 text-slate-400" />
            {article.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400">Radya Labs Official Blog Engine</span>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-800 hover:border-[#1793E8] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{language === 'ID' ? 'Buka Artikel Asli ↗' : 'View Original Article ↗'}</span>
            </a>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              {language === 'ID' ? 'Tutup Artikel' : 'Close Article'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
