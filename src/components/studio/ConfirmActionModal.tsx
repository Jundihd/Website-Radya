'use client';

import React from 'react';
import { AlertTriangle, Trash2, Check, X, Loader2 } from 'lucide-react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmActionModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmActionModalProps) {
  if (!isOpen) return null;

  const btnBg =
    variant === 'danger'
      ? 'bg-rose-600 hover:bg-rose-500 text-white'
      : variant === 'warning'
      ? 'bg-amber-600 hover:bg-amber-500 text-white'
      : 'bg-[#1793E8] hover:bg-[#29B6F6] text-white';

  const iconBg =
    variant === 'danger'
      ? 'bg-rose-500/20 text-rose-400'
      : variant === 'warning'
      ? 'bg-amber-500/20 text-amber-400'
      : 'bg-[#1793E8]/20 text-[#29B6F6]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0f141e] p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
            {variant === 'danger' ? (
              <Trash2 className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition shadow-lg disabled:opacity-50 ${btnBg}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Memproses…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
