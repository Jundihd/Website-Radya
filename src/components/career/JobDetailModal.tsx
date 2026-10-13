'use client';

import React from 'react';
import {
  X,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import type { JobListing } from '@/lib/career-service';

interface JobDetailModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (jobTitle: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="bg-[#0F172A] text-white p-6 sm:p-8 relative border-b border-slate-800">
          <button
            onClick={onClose}
            aria-label="Tutup detail lowongan"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1793E8]/20 text-[#29B6F6]">
              {job.division}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-300">
              {job.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300">
              {job.workModel || 'Hybrid'}
            </span>
          </div>

          <h3 className="font-exo font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            {job.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#43D3A4]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#29B6F6]" />
              <span>Pengalaman: {job.experienceLevel}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Ringkasan Peran */}
          <div>
            <h4 className="font-exo font-bold text-base text-slate-900 mb-2">
              Tentang Peran Ini
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {job.summary}
            </p>
          </div>

          {/* Tanggung Jawab Utama */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h4 className="font-exo font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#1793E8]" />
                <span>Tanggung Jawab Pekerjaan</span>
              </h4>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1793E8] mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kualifikasi & Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="font-exo font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#43D3A4]" />
                <span>Persyaratan &amp; Kualifikasi</span>
              </h4>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#43D3A4] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefit yang didapat */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-exo font-bold text-sm text-slate-900 mb-2.5 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#29B6F6]" />
                <span>Yang Kamu Dapatkan</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((ben, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs"
                  >
                    <span>{ben}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Siap mengambil tantangan ini bersama tim Radya Labs?
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(job.title);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-radya hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Lamar Posisi Ini</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
