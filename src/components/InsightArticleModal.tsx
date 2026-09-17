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
  // Lock background body scroll ONLY when an article modal is actively open
  React.useEffect(() => {
    if (article) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [article]);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && article) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const originalUrl = article.originalUrl || `https://radyalabs.com/id/blog/${article.slug || article.id}`;
  const titleText = article.title[language] || article.title.ID;
  const summaryText = article.summary[language] || article.summary.ID;
  const contentText = article.content[language] || article.content.ID;

  const isHtml = contentText.includes('<p>') || contentText.includes('<div>') || contentText.includes('&ldquo;');

  const renderContentHtml = () => {
    if (isHtml) return contentText;
    // Simple client-side markdown formatter for modal preview
    let html = contentText
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[#0F172A] mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-[#0F172A] mt-8 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-[#0F172A] mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-[#0F172A]">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#1793E8] font-bold hover:underline">$1</a>')
      .replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-5 list-disc mb-1">$1</li>');

    return html
      .split(/\n\s*\n/)
      .map((p) => {
        const trimmed = p.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<h1') || trimmed.startsWith('<h2') || trimmed.startsWith('<h3') || trimmed.startsWith('<li')) {
          return trimmed;
        }
        return `<p class="mb-4 leading-relaxed">${trimmed.replace(/\n/g, '<br />')}</p>`;
      })
      .join('');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[90vh] overflow-y-auto overscroll-contain cursor-default"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors z-10 cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-semibold text-slate-500">
          <span className="px-3 py-1 rounded-full bg-[#1793E8]/10 text-[#1793E8] font-bold uppercase tracking-wider">
            {typeof article.category === 'object' ? (article.category[language] || article.category.ID) : article.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#1793E8]" />
            <time dateTime={article.date}>{article.date}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#1793E8]" />
            {article.readTime}
          </span>
        </div>

        {/* Featured Cover Image */}
        {article.image && (
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-900">
            <img
              src={article.image}
              alt={titleText}
              className="w-full h-full object-cover"
            />
          </div>
        )}

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
          <div
            dangerouslySetInnerHTML={{ __html: renderContentHtml() }}
            className="space-y-4 [&_p]:mb-4 [&_a]:text-[#1793E8] [&_a]:font-bold [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0F172A] [&_h3]:mt-6 [&_h3]:mb-3"
          />
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
          <span className="text-xs font-bold text-slate-400">Radya Labs Article Engine</span>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            {language === 'ID' ? 'Tutup Artikel' : 'Close Article'}
          </button>
        </div>

      </div>
    </div>
  );
};
