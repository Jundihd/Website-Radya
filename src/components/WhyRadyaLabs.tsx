'use client';
import React from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { CORE_VALUES } from '@/lib/data';
import {
  BarChart3,
  Cpu,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Building,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface WhyRadyaLabsProps {
  language: Language;
  onOpenContact: () => void;
}

export const WhyRadyaLabs: React.FC<WhyRadyaLabsProps> = ({
  language,
  onOpenContact,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Handshake':
        return <Handshake className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="tentang-kami" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Story & Values */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'ID' ? 'TENTANG RADYA LABS' : 'WHY RADYA LABS'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-tight">
              {language === 'ID'
                ? 'Partner Teknologi untuk Pertumbuhan Bisnis'
                : 'Your Strategic Enterprise Technology Partner'}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {language === 'ID'
                ? 'Sejak 2011, Radya Labs konsisten menghadirkan solusi digital yang inovatif dan andal. Kami membantu klien dari berbagai industri untuk bertransformasi, meningkatkan efisiensi, dan menciptakan nilai lebih melalui pemanfaatan teknologi terkini.'
                : 'Since 2011, Radya Labs has empowered organizations across Southeast Asia to innovate rapidly. Our multidisciplinary engineering teams bridge strategy, cloud infrastructure, and AI engineering.'}
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {CORE_VALUES.map((value, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-[#1793E8]/10 text-[#1793E8] shrink-0">
                    {getIcon(value.iconName)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0F172A] mb-1">
                      {value.title[language]}
                    </h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      {value.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onOpenContact}
              className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>{language === 'ID' ? 'LEBIH TENTANG KAMI' : 'DISCOVER OUR TEAM'}</span>
              <ArrowRight className="w-4 h-4 text-[#29B6F6]" />
            </button>
          </div>

          {/* Right Column - Team Activities Collage & Floating Metric Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-8">
            
            {/* Background Ambient Glow for Image Depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1793E8]/10 via-[#29B6F6]/10 to-[#43D3A4]/10 rounded-full blur-3xl -z-10 scale-95 pointer-events-none" />

            {/* Team Collage Visual */}
            <div className="relative w-full max-w-lg mx-auto group flex justify-center">
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-[1.02] flex justify-center w-full">
                <Image
                  src="/images/about-team-mosaic.png"
                  alt="Radya Labs Team Activities, Events, and Enterprise Workshops"
                  width={600}
                  height={720}
                  quality={100}
                  unoptimized
                  priority
                  className="w-full max-w-[480px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.18)] select-none"
                />
              </div>
            </div>

            {/* Floating Metric Card Overlay - 15+ Years Track Record */}
            <div className="absolute -bottom-2 left-0 sm:-bottom-4 sm:-left-2 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3 animate-float hover:shadow-2xl transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-radya text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#1793E8]/25 shrink-0">
                15+
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {language === 'ID' ? 'Tahun Rekam Jejak' : 'Years Track Record'}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {language === 'ID' ? 'Sejak 2011 di Bandung, Indonesia' : 'Founded in 2011'}
                </div>
              </div>
            </div>

            {/* Floating Metric Card Overlay - 98.5% Satisfaction */}
            <div className="absolute -top-2 right-0 sm:-top-4 sm:-right-2 z-20 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 animate-float-reverse hover:shadow-2xl transition-shadow">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">98.5% Client Satisfaction</div>
                <div className="text-[11px] text-slate-400 font-medium">Enterprise SLA Retention</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
