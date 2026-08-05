'use client';
import React from 'react';
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

          {/* Right Column - Photo Grid & Floating Metric Cards */}
          <div className="lg:col-span-6 relative">
            
            {/* Asymmetric Photo Grid */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 h-56 group">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
                    alt="Radya Labs Engineering Team"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 h-40 group">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80"
                    alt="Client Workshop Presentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 h-40 group">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80"
                    alt="AI Architecture Workshop"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 h-56 group">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80"
                    alt="Enterprise Executive Review"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Floating Metric Card Overlay */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-float">
              <div className="w-12 h-12 rounded-xl bg-gradient-radya text-white flex items-center justify-center font-black text-lg">
                13+
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {language === 'ID' ? 'Tahun Rekam Jejak' : 'Years Track Record'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {language === 'ID' ? 'Sejak 2011 di Bandung, Indonesia' : 'Founded in 2011'}
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 z-20 bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 animate-float-reverse">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">98.5% Client Satisfaction</div>
                <div className="text-[11px] text-slate-400">Enterprise SLA Retention</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
