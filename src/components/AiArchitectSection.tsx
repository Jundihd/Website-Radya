'use client';
import React, { useState } from 'react';
import { Language, ArchitectureBlueprint } from '@/types';
import { Sparkles, Bot, ArrowRight, Loader2, Cpu, CheckCircle2, Shield, Clock, TrendingUp } from 'lucide-react';

interface AiArchitectSectionProps {
  language: Language;
  onOpenContactWithBlueprint: (blueprint: ArchitectureBlueprint) => void;
}

export const AiArchitectSection: React.FC<AiArchitectSectionProps> = ({
  language,
  onOpenContactWithBlueprint,
}) => {
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [industry, setIndustry] = useState<string>('FMCG & Retail');
  const [companySize, setCompanySize] = useState<string>('Enterprise (1000+ Employees)');
  const [primaryGoal, setPrimaryGoal] = useState<string>('Process Automation & Efficiency');
  const [loading, setLoading] = useState<boolean>(false);
  const [blueprint, setBlueprint] = useState<ArchitectureBlueprint | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sampleTemplates = [
    {
      label: language === 'ID' ? 'Otomatisasi Invoice & Dokumentasi' : 'Automate Invoice & Docs OCR',
      text: 'Kami perlu mengotomatiskan ekstraksi data dari 30.000+ invoice fisik dan PDF vendor per bulan dengan verifikasi otomatis ke ERP.'
    },
    {
      label: language === 'ID' ? 'Migrasi Legacy ke Kubernetes Cloud Native' : 'Legacy Monolith to Cloud Kubernetes',
      text: 'Aplikasi monolitik kami sering down saat spike traffic 100.000 user. Kami butuh arsitektur microservices di AWS EKS / GCP.'
    },
    {
      label: language === 'ID' ? 'Omnichannel AI Chatbot WhatsApp' : 'WhatsApp Omnichannel AI Agent',
      text: 'Tim customer support kami kewalahan melayani ribuan chat pelanggan mingguan. Butuh chatbot AI yang bisa menjawab FAQ dan membuat tiket otomatis.'
    }
  ];

  const handleGenerateBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/architect', {
        method: 'POST',
        headers: { 'Content-[#1793E8]': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemDescription,
          industry,
          companySize,
          primaryGoal,
        }),
      });

      const data = await response.json();
      if (data.success && data.blueprint) {
        setBlueprint(data.blueprint);
      } else {
        throw new Error(data.error || 'Failed to generate solution blueprint');
      }
    } catch (err: any) {
      console.error('Error generating AI blueprint:', err);
      setErrorMsg(language === 'ID' ? 'Gagal memuat rekomendasi AI. Menggunakan blueprint standar.' : 'Failed to fetch custom AI response. Using standard blueprint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-[#0F172A] to-slate-950 text-white relative overflow-hidden border-y border-slate-800">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radya opacity-10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-radya text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <Bot className="w-4 h-4" />
            <span>{language === 'ID' ? 'RADYA LABS AI ARCHITECT' : 'RADYA AI SOLUTION BLUEPRINT'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'ID'
              ? 'Dapatkan Rekomendasi Arsitektur AI & Cloud Instan'
              : 'Instant AI Solution & Architecture Recommender'}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {language === 'ID'
              ? 'Jelaskan tantangan teknis perusahaan Anda. Engine AI Radya Labs akan merancang cetak biru arsitektur, estimasi waktu, dan potensi ROI.'
              : 'Describe your organization technical challenge. Our AI Engine will generate a tailor-made Cloud & AI blueprint and ROI forecast.'}
          </p>
        </div>

        {/* Input Form & Template Pickers */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl backdrop-blur-xl mb-12">
          <form onSubmit={handleGenerateBlueprint} className="space-y-6">
            
            {/* Parameters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                  {language === 'ID' ? 'Industri' : 'Industry Sector'}
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#1793E8]"
                >
                  <option value="FMCG & Retail">FMCG & Retail</option>
                  <option value="Education & Universities">Education & Higher Ed</option>
                  <option value="Banking & Finance">Banking & Fintech</option>
                  <option value="Government & Public Sector">Government & Public Sector</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                  <option value="Healthcare">Healthcare & Life Sciences</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                  {language === 'ID' ? 'Skala Perusahaan' : 'Company Scale'}
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#1793E8]"
                >
                  <option value="Enterprise (1000+ Employees)">Enterprise (1000+ Employees)</option>
                  <option value="Mid-Market (100-1000 Employees)">Mid-Market (100-1000 Employees)</option>
                  <option value="Fast Growing Tech Startup">Fast Growing Tech Startup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                  {language === 'ID' ? 'Tujuan Utama' : 'Primary Objective'}
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#1793E8]"
                >
                  <option value="Process Automation & Efficiency">Process Automation & Efficiency</option>
                  <option value="High Scalability & Zero Downtime">High Scalability & Zero Downtime</option>
                  <option value="Cost Optimization & Cloud Migration">Cost Optimization & Cloud Migration</option>
                  <option value="Customer Experience & AI Chatbot">Customer Experience & AI Chatbot</option>
                </select>
              </div>
            </div>

            {/* Quick Templates */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">
                {language === 'ID' ? 'Atau Pilih Contoh Challenge:' : 'Or Select a Common Challenge Template:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleTemplates.map((tpl, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setProblemDescription(tpl.text)}
                    className="text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors"
                  >
                    💡 {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Description Text Area */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                {language === 'ID' ? 'Deskripsi Tantangan / Kebutuhan Sistem' : 'System Requirement or Bottleneck'}
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder={
                  language === 'ID'
                    ? 'Contoh: Kami ingin mengotomatiskan pemrosesan dokumen vendor dan memodernisasi infrastruktur server agar siap menghadapi peningkatan transaksi 3x lipat.'
                    : 'Example: We want to automate document processing and modernize our legacy infrastructure to handle a 3x traffic surge.'
                }
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#1793E8]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !problemDescription.trim()}
                className="bg-gradient-radya text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#1793E8]/30 hover:shadow-xl hover:brightness-110 disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{language === 'ID' ? 'Merancang Blueprint AI...' : 'Analyzing & Generating Blueprint...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{language === 'ID' ? 'RANCANG BLUEPRINT SEKARANG' : 'GENERATE AI BLUEPRINT'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Display Generated Blueprint */}
        {blueprint && (
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-[#1793E8]/40 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2 inline-block">
                  ✓ AI Architecture Proposal
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {blueprint.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-[#1793E8]" />
                <span>Timeline: {blueprint.estimatedTimeline}</span>
              </div>
            </div>

            {/* Executive Summary */}
            <p className="text-slate-300 text-base leading-relaxed mb-8 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              {blueprint.executiveSummary}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {blueprint.expectedMetrics.map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400 mb-1">{m.metric}</div>
                  <div className="text-xs font-semibold text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                {language === 'ID' ? 'Rekomendasi Tech Stack:' : 'Recommended Tech Stack:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {blueprint.recommendedTechStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-[#29B6F6]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button to Book Consultation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                {language === 'ID'
                  ? 'Blueprint ini dirancang secara khusus oleh AI Radya Labs.'
                  : 'This blueprint is tailored specifically for your scenario.'}
              </div>
              <button
                onClick={() => onOpenContactWithBlueprint(blueprint)}
                className="w-full sm:w-auto bg-gradient-radya text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
              >
                <span>{language === 'ID' ? 'DISKUSIKAN BLUEPRINT DENGAN TIM RADYA' : 'DISCUSS BLUEPRINT WITH RADYA TEAM'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
