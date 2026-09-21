'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, ChevronDown } from 'lucide-react';
import type { StudioPostFields } from '@/lib/studio-md';

export interface AiReady {
  configured: boolean;
  provider?: string;
  model?: string;
}

type LengthOpt = 'short' | 'medium' | 'long';

/**
 * Panel "Create with AI": user menulis brief, AI mengisi field yang masih kosong
 * (judul, subtitle, excerpt, konten ID+EN, tags, kategori).
 * Tidak pernah menimpa field yang sudah diisi manual.
 */
export function AiCreatePanel({
  titleId,
  titleEn,
  brief,
  onBriefChange,
  length,
  onLengthChange,
  aiReady,
  onApply,
}: {
  titleId: string;
  titleEn: string;
  brief: string;
  onBriefChange: (v: string) => void;
  length: LengthOpt;
  onLengthChange: (v: LengthOpt) => void;
  aiReady: AiReady | null;
  onApply: (patch: Partial<StudioPostFields>) => string[];
}) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastFilled, setLastFilled] = useState<string[]>([]);

  async function handleGenerate() {
    setError('');
    setLastFilled([]);
    if (brief.trim().length < 20) {
      setError('Brief minimal 20 karakter. Ceritakan topik, sudut pandang, dan poin penting artikel.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'full',
          brief,
          length,
          titleHintId: titleId,
          titleHintEn: titleEn,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Generate AI gagal.');
        return;
      }
      const filled = onApply({
        titleId: data.titleId,
        titleEn: data.titleEn,
        subtitleId: data.subtitleId,
        subtitleEn: data.subtitleEn,
        excerptId: data.excerptId,
        excerptEn: data.excerptEn,
        contentId: data.contentId,
        contentEn: data.contentEn,
        tags: data.tags,
        categoryId: data.categoryId,
        categoryEn: data.categoryEn,
      });
      setLastFilled(filled);
    } catch {
      setError('Tidak bisa menghubungi server AI.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/60 via-[#12161f] to-[#12161f]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 px-5 py-4 text-left"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
          <Sparkles className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-extrabold text-white">
            Create with AI
          </span>
          <span className="block text-xs text-slate-400">
            Tulis brief → AI buatkan draf lengkap. Field yang sudah kamu isi tidak akan ditimpa.
          </span>
        </span>
        <ChevronDown
          className={`ml-auto h-5 w-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-white/10 px-5 py-4">
          {aiReady && !aiReady.configured ? (
            <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-200">
              AI belum dikonfigurasi di server (STUDIO_AI_API_KEY kosong). Minta admin teknis
              mengisi API key dulu — lihat <code>.env.example</code> bagian “Studio AI”.
              Sementara itu semua field tetap bisa diisi manual.
            </p>
          ) : (
            <>
              <textarea
                value={brief}
                onChange={(e) => onBriefChange(e.target.value)}
                placeholder="Contoh brief: Artikel untuk developer backend tentang cara menerapkan rate limiting di API Node.js dengan Redis — bahas kenapa perlu, algoritma token bucket vs fixed window, contoh kode, dan jebakan umum di production…"
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-[#0b0e14] px-4 py-3 text-sm leading-relaxed text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-400"
              />
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-1.5">
                  {(
                    [
                      { v: 'short', label: '~500 kata' },
                      { v: 'medium', label: '~800 kata' },
                      { v: 'long', label: '~1400 kata' },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => onLengthChange(o.v)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        length === o.v
                          ? 'bg-violet-500 text-white'
                          : 'border border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || aiReady === null}
                  className="ml-auto flex items-center gap-1.5 rounded-xl bg-violet-500 px-4 py-2 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {loading ? 'Menulis draf…' : 'Generate Draf Blog'}
                </button>
              </div>
              {aiReady?.configured && (
                <p className="text-[11px] text-slate-500">
                  Model: {aiReady.provider}/{aiReady.model} · hasil selalu bisa kamu edit ulang di bawah.
                </p>
              )}
            </>
          )}

          {error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-200">
              {error}
            </p>
          )}
          {lastFilled.length > 0 && (
            <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-200">
              Draf terisi: {lastFilled.join(', ')}. Silakan review & edit sebelum disimpan.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
