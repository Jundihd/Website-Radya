'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Wand2,
  ChevronDown,
  Layers,
} from 'lucide-react';
import {
  AVAILABLE_IMAGE_MODELS,
  DEFAULT_IMAGE_MODEL,
  type ImageModelOption,
} from '@/lib/studio-image';

interface AiImageGeneratorProps {
  slug?: string;
  titleHint?: string;
  briefHint?: string;
  onImageGenerated: (coverUrl: string, modelUsed: string) => void;
  apiEndpoint?: string; // '/api/studio/generate-image' or '/api/admin/generate-image'
  compact?: boolean;
}

export function AiImageGenerator({
  slug = '',
  titleHint = '',
  briefHint = '',
  onImageGenerated,
  apiEndpoint = '/api/studio/generate-image',
  compact = false,
}: AiImageGeneratorProps) {
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_IMAGE_MODEL);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [switchAlert, setSwitchAlert] = useState<string>('');
  const [successInfo, setSuccessInfo] = useState<{ url: string; model: string } | null>(null);

  const activeModelMeta =
    AVAILABLE_IMAGE_MODELS.find((m) => m.id === selectedModel) ||
    AVAILABLE_IMAGE_MODELS[0];

  function handleAutoFillPrompt() {
    const topic = titleHint.trim() || briefHint.trim() || 'Modern enterprise technology';
    const autoPrompt = `Futuristic clean minimal editorial illustration for enterprise tech blog post about "${topic}". Clean corporate aesthetic, glowing digital neon accents, dark navy blue and cyan color palette, isometric server and cloud elements, 4k ultra-high resolution, no text overlay, award-winning visual.`;
    setPrompt(autoPrompt);
    setError('');
  }

  async function handleGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError('');
    setSwitchAlert('');
    setSuccessInfo(null);

    const activePrompt =
      prompt.trim() ||
      `Futuristic clean minimal editorial illustration for enterprise tech blog post about "${titleHint.trim() || 'enterprise digital solutions'}". Clean corporate aesthetic, cyan and navy gradient, 4k, no text overlay.`;

    setLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          model: selectedModel,
          slug: slug || 'blog-cover',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal generate gambar.');
      }

      if (data.switched && data.usedModel) {
        // Auto-switch occurred!
        setSelectedModel(data.usedModel);
        setSwitchAlert(
          data.switchReason ||
            `Model '${data.requestedModel}' tidak tersedia/kehabisan token. Otomatis beralih ke '${data.usedModel}' dan gambar berhasil dibuat!`,
        );
      }

      setSuccessInfo({ url: data.cover, model: data.usedModel });
      onImageGenerated(data.cover, data.usedModel);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat memproses gambar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-950/30 via-[#0d121c] to-[#0f172a] p-4 text-left shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-[#29B6F6]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              AI Cover Image Generator
            </h4>
            <p className="text-[11px] text-slate-400">
              API: aotianzz.xyz · Auto fallback bila token model habis
            </p>
          </div>
        </div>

        {/* Model Dropdown */}
        <div className="relative">
          <label className="sr-only">Pilih Model AI Image</label>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={loading}
              className="appearance-none rounded-xl border border-white/15 bg-[#0b0e14] py-1.5 pl-3 pr-8 text-xs font-bold text-sky-300 outline-none hover:border-sky-400 focus:border-sky-400 disabled:opacity-50 cursor-pointer"
            >
              {AVAILABLE_IMAGE_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#0b0e14] text-slate-200">
                  {m.name} {m.badge ? `(${m.badge})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2.5">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-400">
              Prompt Deskripsi Gambar
            </span>
            {(titleHint || briefHint) && (
              <button
                type="button"
                onClick={handleAutoFillPrompt}
                className="flex items-center gap-1 text-[11px] font-bold text-sky-400 hover:text-sky-300 transition"
              >
                <Wand2 className="h-3 w-3" />
                Auto-generate dari Judul
              </button>
            )}
          </div>
          <textarea
            rows={compact ? 2 : 3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              titleHint
                ? `Klik 'Auto-generate dari Judul' atau ketik prompt mis: Futuristic cloud computing infrastructure, neon blue glow...`
                : 'Ketik deskripsi visual cover, atau biarkan kosong untuk prompt otomatis...'
            }
            className="w-full rounded-xl border border-white/10 bg-[#07090e] px-3 py-2 text-xs leading-relaxed text-slate-200 outline-none placeholder:text-slate-600 focus:border-sky-400"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Layers className="h-3.5 w-3.5 text-sky-400" />
            <span>Resolusi: <strong className="text-slate-300">{activeModelMeta.resolution}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-[#1793E8] px-4 py-2 text-xs font-bold text-white shadow hover:brightness-110 disabled:opacity-50 transition"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImageIcon className="h-3.5 w-3.5" />
            )}
            <span>{loading ? 'Merender Gambar...' : 'Generate AI Cover'}</span>
          </button>
        </div>

        {/* Switch Alert Notification */}
        {switchAlert && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-200">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <span>{switchAlert}</span>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-200">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Info */}
        {successInfo && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              Cover berhasil dibuat dengan model: <strong>{successInfo.model}</strong>. File tersimpan di <code>{successInfo.url}</code>.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
