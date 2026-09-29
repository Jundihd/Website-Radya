'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Loader2,
  ChevronDown,
  Image as ImageIcon,
  Key,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import type { StudioPostFields } from '@/lib/studio-md';
import {
  AVAILABLE_IMAGE_MODELS,
  DEFAULT_IMAGE_MODEL,
} from '@/lib/studio-image-models';

export interface AiReady {
  configured: boolean;
  provider?: string;
  model?: string;
}

type LengthOpt = 'short' | 'medium' | 'long';

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
  const [stepProgress, setStepProgress] = useState('');
  const [error, setError] = useState('');
  const [switchWarning, setSwitchWarning] = useState('');
  const [lastFilled, setLastFilled] = useState<string[]>([]);

  // Image Generation Settings
  const [generateCover, setGenerateCover] = useState(true);
  const [selectedImageModel, setSelectedImageModel] = useState<string>(DEFAULT_IMAGE_MODEL);

  // Gemini API Key Override (if server doesn't have one set in .env.local)
  const [clientGeminiKey, setClientGeminiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('radya_gemini_api_key');
    if (saved) setClientGeminiKey(saved);
  }, []);

  function handleSaveGeminiKey(val: string) {
    setClientGeminiKey(val);
    if (val.trim()) {
      localStorage.setItem('radya_gemini_api_key', val.trim());
    } else {
      localStorage.removeItem('radya_gemini_api_key');
    }
  }

  const isGeminiAvailable = Boolean(aiReady?.configured || clientGeminiKey.trim());

  async function handleGenerate() {
    setError('');
    setSwitchWarning('');
    setLastFilled([]);
    setStepProgress('');

    if (brief.trim().length < 20) {
      setError('Brief minimal 20 karakter. Ceritakan topik, sudut pandang, dan poin penting artikel.');
      return;
    }

    if (!isGeminiAvailable) {
      setError(
        'Google Gemini API Key belum diset. Masukkan API Key di bawah atau isi GEMINI_API_KEY di .env.local.',
      );
      setShowKeyInput(true);
      return;
    }

    setLoading(true);
    setStepProgress('1/2: Menulis artikel lengkap dengan Google Gemini API...');

    try {
      // 1. Generate Blog Text via Gemini API
      const res = await fetch('/api/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: 'full',
          brief,
          length,
          titleHintId: titleId,
          titleHintEn: titleEn,
          apiKey: clientGeminiKey.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Generate tulisan artikel gagal.');
      }

      let generatedCoverUrl = '';

      // 2. Generate Cover Image if option enabled
      if (generateCover) {
        setStepProgress('2/2: Merender cover image dengan AI (aotianzz.xyz)...');

        try {
          const imgTopic = data.titleId || titleId || brief.slice(0, 100);
          const imgPrompt = `Futuristic clean minimal editorial illustration for enterprise tech blog post titled "${imgTopic}". Clean corporate aesthetic, glowing digital neon accents, dark navy blue and cyan palette, 4k ultra-high resolution, professional composition, no text overlay.`;

          const imgRes = await fetch('/api/studio/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: imgPrompt,
              model: selectedImageModel,
              slug: (data.titleId || 'blog').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
            }),
          });

          const imgData = await imgRes.json();
          if (imgRes.ok && imgData.cover) {
            generatedCoverUrl = imgData.cover;

            if (imgData.switched && imgData.usedModel) {
              setSelectedImageModel(imgData.usedModel);
              setSwitchWarning(
                imgData.switchReason ||
                  `Model '${imgData.requestedModel}' tidak tersedia/kehabisan token. Otomatis dialihkan ke '${imgData.usedModel}' dan berhasil dibuat!`,
              );
            }
          } else {
            console.warn('[AI Image Generator] Gagal generate cover:', imgData.error);
          }
        } catch (imgErr) {
          console.warn('[AI Image Generator] Fetch error:', imgErr);
        }
      }

      // Apply to form
      const patch: Partial<StudioPostFields> = {
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
      };

      if (generatedCoverUrl) {
        patch.cover = generatedCoverUrl;
      }

      const filled = onApply(patch);
      if (generatedCoverUrl) {
        filled.push('Cover Image AI');
      }

      setLastFilled(filled);
    } catch (err: any) {
      setError(err.message || 'Tidak bisa menghubungi server AI.');
    } finally {
      setLoading(false);
      setStepProgress('');
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
        <div>
          <span className="block text-sm font-extrabold text-white">
            Create with AI (Google Gemini + AI Image Generator)
          </span>
          <span className="block text-xs text-slate-400">
            Tulis brief → AI tulis draf artikel lengkap (Gemini) + render foto cover otomatis dengan fallback model.
          </span>
        </div>
        <ChevronDown
          className={`ml-auto h-5 w-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/10 px-5 py-4">
          {/* Gemini API Key warning / input banner */}
          {!aiReady?.configured && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-bold">Google Gemini API Key belum terkonfigurasi di server.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowKeyInput((v) => !v)}
                  className="text-xs font-bold text-sky-400 underline hover:text-sky-300"
                >
                  {showKeyInput ? 'Tutup Input' : 'Masukkan API Key di sini'}
                </button>
              </div>

              {showKeyInput && (
                <div className="pt-2 border-t border-amber-500/20 space-y-2">
                  <p className="text-[11px] text-amber-100">
                    Kamu bisa memasukkan Google Gemini API Key langsung di bawah (tersimpan di browsermu) atau isi <code>GEMINI_API_KEY</code> di <code>.env.local</code>. Gratis dari{' '}
                    <a
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-300 underline font-bold"
                    >
                      Google AI Studio ↗
                    </a>.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={clientGeminiKey}
                      onChange={(e) => handleSaveGeminiKey(e.target.value)}
                      className="flex-1 rounded-lg border border-amber-500/30 bg-[#080b10] px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-amber-400 font-mono"
                    />
                    {clientGeminiKey && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Siap
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Brief Textarea */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Brief / Topik Artikel
            </label>
            <textarea
              value={brief}
              onChange={(e) => onBriefChange(e.target.value)}
              placeholder="Contoh brief: Artikel untuk developer enterprise tentang integrasi Microservices dengan Event-Driven Architecture menggunakan Apache Kafka. Bahas arsitektur, pola CQRS, tantangan data consistency, dan studi kasus implementasi nyata..."
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-[#0b0e14] px-4 py-3 text-sm leading-relaxed text-slate-100 outline-none placeholder:text-slate-500 focus:border-violet-400"
            />
          </div>

          {/* AI Settings Bar: Length & Image Model Selection */}
          <div className="grid gap-3 sm:grid-cols-2 pt-1 border-t border-white/5">
            {/* Length selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                Panjang Artikel (Google Gemini)
              </label>
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
            </div>

            {/* Cover Image Options */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateCover}
                    onChange={(e) => setGenerateCover(e.target.checked)}
                    className="rounded border-white/20 bg-[#0b0e14] text-violet-500 focus:ring-0"
                  />
                  <span>Generate Foto Cover (AI)</span>
                </label>
                <span className="text-[10px] text-slate-500">Auto-switch fallback</span>
              </div>

              {generateCover && (
                <div className="relative">
                  <select
                    value={selectedImageModel}
                    onChange={(e) => setSelectedImageModel(e.target.value)}
                    disabled={loading}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#0b0e14] py-1.5 pl-3 pr-8 text-xs font-semibold text-sky-300 outline-none hover:border-sky-400 focus:border-sky-400 cursor-pointer"
                  >
                    {AVAILABLE_IMAGE_MODELS.map((m) => (
                      <option key={m.id} value={m.id} className="bg-[#0b0e14] text-slate-200">
                        {m.name} {m.badge ? `(${m.badge})` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-400 space-y-0.5">
              <div>
                Teks: <span className="font-semibold text-violet-300">Google Gemini API</span>
              </div>
              {generateCover && (
                <div>
                  Foto: <span className="font-semibold text-sky-300">{selectedImageModel}</span> (aotianzz.xyz)
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-[#1793E8] px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:brightness-110 disabled:opacity-50 transition"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              <span>{loading ? 'Sedang Memproses AI...' : 'Generate Tulisan & Foto'}</span>
            </button>
          </div>

          {/* Live Progress Step */}
          {loading && stepProgress && (
            <div className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold text-violet-200 animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin text-violet-300" />
              <span>{stepProgress}</span>
            </div>
          )}

          {/* Auto Switch Notification */}
          {switchWarning && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <span>{switchWarning}</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Success */}
          {lastFilled.length > 0 && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <div>
                <strong>Berhasil dibuat!</strong> Field terisi: {lastFilled.join(', ')}. Silakan periksa atau sesuaikan sebelum disimpan.
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
