'use client';
import React, { useState } from 'react';
import { Language, ServiceItem } from '@/types';
import { SERVICES_LIST } from '@/lib/data';
import {
  Cloud,
  Cpu,
  Zap,
  Server,
  Layout,
  Smartphone,
  Users,
  Layers,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  language: Language;
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onOpenContact,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Server':
        return <Server className="w-6 h-6" />;
      case 'Layout':
        return <Layout className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      default:
        return <Cloud className="w-6 h-6" />;
    }
  };

  return (
    <section id="layanan" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              {language === 'ID'
                ? 'Titik Awal Klien Memilih Radya Labs'
                : 'Where Teams Usually Bring Us In'}
            </h2>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <p className="text-slate-600 text-base leading-relaxed">
              {language === 'ID'
                ? 'Mayoritas klien datang dengan salah satu tantangan utama ini. Kami merancang sisanya setelah memahami batasan teknis Anda.'
                : 'Most clients arrive with one of these core challenges. We scope the rest once we understand your constraints.'}
            </p>
          </div>
        </div>

        {/* Services Card Grid - Strictly 3 top, 3 bottom (3 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Subtle Gradient Hover Backdrop */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-[#1793E8]/10 text-[#1793E8] flex items-center justify-center mb-6 transition-colors">
                  {getIcon(service.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#1793E8] transition-colors">
                  {service.title[language]}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description[language]}
                </p>

                {/* Key Bullet Features */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#43D3A4] shrink-0 mt-0.5" />
                      <span className="break-words">{feat[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1793E8]">
                <span>{language === 'ID' ? 'Lihat Implementasi Produksi' : 'See this in production'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Banner Box */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-radya opacity-20 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#29B6F6] shrink-0 border border-white/10">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                {language === 'ID'
                  ? 'Ragu Apakah Tantangan Anda Membutuhkan Kami?'
                  : 'Not sure if your problem needs us?'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                {language === 'ID'
                  ? 'Ceritakan situasi Anda dalam beberapa kalimat. Jika tidak cocok, kami akan berterus terang dan mengarahkan Anda ke solusi yang lebih baik.'
                  : 'Send us the situation in a few sentences. If it\'s not a fit, we\'ll tell you and point you somewhere better.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="shrink-0 bg-gradient-radya text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <span>{language === 'ID' ? 'Bicara dengan Engineer' : 'Ask an Engineer'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#1793E8]/10 text-[#1793E8] flex items-center justify-center mb-4">
              {getIcon(selectedService.iconName)}
            </div>

            <h3 className="text-2xl font-extrabold text-[#0F172A] mb-3">
              {selectedService.title[language]}
            </h3>

            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {selectedService.description[language]}
            </p>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
                {language === 'ID' ? 'Cakupan Layanan:' : 'Key Capabilities:'}
              </h4>
              <ul className="space-y-2.5">
                {selectedService.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#43D3A4] shrink-0" />
                    <span>{feat[language]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedService.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50"
              >
                {language === 'ID' ? 'Tutup' : 'Close'}
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenContact();
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-radya text-white font-bold text-sm shadow-md"
              >
                {language === 'ID' ? 'Mulai Proyek Ini' : 'Initiate Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
