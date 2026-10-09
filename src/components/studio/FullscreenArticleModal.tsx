'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Calendar,
  Clock,
  UserCheck,
  Edit3,
  Trash2,
  ChevronDown,
  Globe,
  Loader2,
  Tag,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { PostStatus, POST_STATUSES } from '@/lib/studio-md';

export interface FullscreenArticleData {
  slug: string;
  status: PostStatus | string;
  titleId: string;
  titleEn: string;
  subtitleId?: string;
  subtitleEn?: string;
  excerptId?: string;
  excerptEn?: string;
  contentId: string;
  contentEn?: string;
  directusId?: string;
  date?: string;
  author?: string;
  cover?: string;
  categoryId?: string;
  categoryEn?: string;
  tags?: string[];
}

interface FullscreenArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: FullscreenArticleData | null;
  onEdit?: (article: FullscreenArticleData) => void;
  onStatusChange?: (slug: string, newStatus: PostStatus) => Promise<void>;
  onDelete?: (slug: string) => void;
}

const STATUS_BADGES: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  published: {
    label: 'Published',
    bg: 'bg-emerald-500/15 border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  draft: {
    label: 'Draft',
    bg: 'bg-slate-500/15 border-slate-500/30',
    text: 'text-slate-300',
    dot: 'bg-slate-400',
  },
  under_review: {
    label: 'Under Review',
    bg: 'bg-orange-500/15 border-orange-500/30',
    text: 'text-orange-400',
    dot: 'bg-orange-400',
  },
  archived: {
    label: 'Archived',
    bg: 'bg-amber-500/15 border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
};

export function FullscreenArticleModal({
  isOpen,
  onClose,
  article,
  onEdit,
  onStatusChange,
  onDelete,
}: FullscreenArticleModalProps) {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [rendering, setRendering] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fetch rendered markdown -> HTML
  useEffect(() => {
    if (!article || !isOpen) return;

    let alive = true;
    setRendering(true);
    const markdown =
      lang === 'ID'
        ? article.contentId
        : article.contentEn?.trim() || article.contentId;

    fetch('/api/studio/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown }),
    })
      .then((res) => (res.ok ? res.json() : { html: '<p>Gagal render preview.</p>' }))
      .then((data) => {
        if (alive) setHtmlContent(data.html || '<p><em>Konten kosong.</em></p>');
      })
      .catch(() => {
        if (alive) setHtmlContent('<p>Gagal render preview.</p>');
      })
      .finally(() => {
        if (alive) setRendering(false);
      });

    return () => {
      alive = false;
    };
  }, [article, lang, isOpen]);

  if (!isOpen || !article) return null;

  const currentStatus = String(article.status || 'draft').toLowerCase();
  const statusInfo = STATUS_BADGES[currentStatus] || STATUS_BADGES.draft;

  const activeTitle =
    lang === 'ID' ? article.titleId : article.titleEn || article.titleId;
  const activeExcerpt =
    lang === 'ID' ? article.excerptId : article.excerptEn || article.excerptId;
  const activeCategory =
    lang === 'ID'
      ? article.categoryId || 'INSIGHT'
      : article.categoryEn || article.categoryId || 'INSIGHT';

  const readWords = (
    lang === 'ID' ? article.contentId : article.contentEn || article.contentId
  )
    .trim()
    .split(/\s+/).length;
  const readTime = `${Math.max(1, Math.round(readWords / 200))} min read`;

  async function handleSelectStatus(newStatus: PostStatus) {
    if (!article || !onStatusChange || newStatus === currentStatus) {
      setStatusDropdownOpen(false);
      return;
    }
    setStatusDropdownOpen(false);
    setUpdatingStatus(true);
    try {
      await onStatusChange(article.slug, newStatus);
    } finally {
      setUpdatingStatus(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0b0e14] overflow-hidden animate-fadeIn">
      {/* Top Studio Admin Control Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#0f141e]/95 px-4 py-3 backdrop-blur sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-lg bg-sky-500/20 px-2.5 py-1 text-xs font-black text-[#29B6F6]">
            <FileText className="h-3.5 w-3.5" />
            STUDIO ARTICLE PREVIEW
          </span>

          {/* Status Badge & Quick Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setStatusDropdownOpen((prev) => !prev)}
              disabled={updatingStatus}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition hover:brightness-110 ${statusInfo.bg} ${statusInfo.text}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />
              <span>Status: {statusInfo.label}</span>
              {updatingStatus ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            {statusDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#161d2b] p-1.5 shadow-2xl z-50">
                <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Ubah Status Artikel
                </p>
                {POST_STATUSES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => handleSelectStatus(s.value)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                      s.value === currentStatus
                        ? 'bg-sky-500/20 text-[#29B6F6]'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{s.label}</span>
                    {s.value === currentStatus && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <div className="flex items-center rounded-xl border border-white/10 bg-[#0b0e14] p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setLang('ID')}
              className={`rounded-lg px-2.5 py-1 transition ${
                lang === 'ID'
                  ? 'bg-[#1793E8] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bahasa ID
            </button>
            <button
              type="button"
              onClick={() => setLang('EN')}
              className={`rounded-lg px-2.5 py-1 transition ${
                lang === 'EN'
                  ? 'bg-[#1793E8] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Edit Button */}
          {onEdit && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(article);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-sky-500/20 px-3.5 py-1.5 text-xs font-bold text-sky-300 transition hover:bg-sky-500/30"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Artikel</span>
            </button>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(article.slug)}
              className="flex items-center gap-1.5 rounded-xl bg-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-300 transition hover:bg-rose-500/30"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Hapus</span>
            </button>
          )}

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            title="Tutup (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main True-to-Life Article Viewport (Scrollable) */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC] text-[#0F172A] font-sans">
        <main className="mx-auto max-w-4xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Beranda</span>
            <span>/</span>
            <span>Insight & Artikel</span>
            <span>/</span>
            <span className="truncate max-w-xs font-bold text-[#1793E8]">
              {activeTitle}
            </span>
          </nav>

          {/* Header Metadata */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#1793E8]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#1793E8]">
                {activeCategory}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-[#1793E8]" />
                <time>{article.date || 'Tanggal tidak diset'}</time>
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Clock className="h-3.5 w-3.5 text-[#1793E8]" />
                {readTime}
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl leading-tight">
              {activeTitle}
            </h1>

            {/* Author Credential Badge */}
            <div className="mb-6 flex w-fit items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1793E8]/10 text-[#1793E8]">
                <UserCheck className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="block font-bold text-slate-800">
                  {article.author || 'Radya Labs Engineering Team'}
                </span>
                <span className="font-normal text-slate-500">
                  Principal Solutions Architect
                </span>
              </div>
            </div>

            {/* Excerpt */}
            {activeExcerpt && (
              <p className="rounded-2xl border border-slate-200 bg-slate-100/70 p-5 text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
                {activeExcerpt}
              </p>
            )}
          </header>

          {/* Featured Cover Image */}
          {article.cover && (
            <div className="relative mb-10 h-[320px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-xl sm:h-[450px]">
              {article.cover.startsWith('data:image') || article.cover.startsWith('http') || article.cover.startsWith('/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.cover}
                  alt={activeTitle}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
          )}

          {/* Article Body Content */}
          <div className="mb-12">
            {rendering ? (
              <div className="flex items-center justify-center py-20 text-slate-400">
                <Loader2 className="mr-3 h-6 w-6 animate-spin text-[#1793E8]" />
                <span className="text-sm font-semibold">Merender artikel…</span>
              </div>
            ) : (
              <article
                className="prose prose-slate max-w-none text-base sm:text-lg text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </div>

          {/* Article Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="border-t border-slate-200 pt-6">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                Topik / Tag Terkait:
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-600 shadow-2xs"
                  >
                    <Tag className="h-3 w-3 text-[#1793E8]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
