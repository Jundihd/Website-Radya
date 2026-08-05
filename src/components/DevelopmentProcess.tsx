'use client';
import React from 'react';
import { Language } from '@/types';
import {
  Search,
  Layers,
  Cpu,
  ShieldCheck,
  Globe,
  Cloud,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Clock
} from 'lucide-react';

interface DevelopmentProcessProps {
  language: Language;
  onOpenContact?: () => void;
}

export const DevelopmentProcess: React.FC<DevelopmentProcessProps> = ({
  language,
  onOpenContact,
}) => {
  const processSteps = [
    {
      step: '01',
      icon: <Search className="w-5 h-5" />,
      duration: {
        ID: '1 - 2 Pekan',
        EN: '1 - 2 Weeks'
      },
      title: {
        ID: 'Discovery & Requirements',
        EN: 'Discovery & Requirements'
      },
      description: {
        ID: 'Kami mendalami tujuan bisnis, kebutuhan pengguna, dan batasan teknis Anda untuk merancang solusi yang paling tepat.',
        EN: 'We dig into your business goals, users, and constraints to frame the right solution.'
      },
      entryPoint: {
        ID: 'Anda baru memiliki ide awal atau konsep yang ingin divalidasi.',
        EN: 'You only have an early idea you want to validate.'
      }
    },
    {
      step: '02',
      icon: <Layers className="w-5 h-5" />,
      duration: {
        ID: '2 - 3 Pekan',
        EN: '2 - 3 Weeks'
      },
      title: {
        ID: 'Planning & Architecture',
        EN: 'Planning & Architecture'
      },
      description: {
        ID: 'Arsitektur sistem, alur kerja, dan desain UI/UX dipetakan secara detail sebelum penulisan kode dimulai.',
        EN: 'System architecture, flows, and UI are mapped out in detail before code is written.'
      },
      entryPoint: {
        ID: 'Anda sudah memiliki gambaran solusi dan membutuhkan cetak biru teknis.',
        EN: 'You already have a blueprint and just need execution.'
      }
    },
    {
      step: '03',
      icon: <Cpu className="w-5 h-5" />,
      duration: {
        ID: '4 - 12 Pekan',
        EN: '4 - 12 Weeks'
      },
      title: {
        ID: 'Agile Development',
        EN: 'Agile Development'
      },
      description: {
        ID: 'Tim engineer kami membangun aplikasi secara iteratif dalam sprint 2 mingguan dengan demo berkala.',
        EN: 'Our team builds iteratively in 2-week sprints with regular demos so progress is visible.'
      },
      entryPoint: {
        ID: 'Pengembangan sudah dimulai di tempat lain namun mengalami kendala.',
        EN: 'Development started elsewhere and stalled midway.'
      }
    },
    {
      step: '04',
      icon: <ShieldCheck className="w-5 h-5" />,
      duration: {
        ID: '2 - 3 Pekan',
        EN: '2 - 3 Weeks'
      },
      title: {
        ID: 'Testing & QA Security',
        EN: 'Testing & QA Security'
      },
      description: {
        ID: 'Setiap fitur melalui pengujian fungsionalitas, performa, uji penetrasi, dan kepatuhan standar keamanan.',
        EN: 'Every feature undergoes functional, load, penetration, and security compliance testing.'
      },
      entryPoint: {
        ID: 'Membutuhkan audit independen & pengujian QA sebelum peluncuran resmi.',
        EN: 'Independent audit & QA before launch.'
      }
    },
    {
      step: '05',
      icon: <Globe className="w-5 h-5" />,
      duration: {
        ID: '1 - 2 Pekan',
        EN: '1 - 2 Weeks'
      },
      title: {
        ID: 'CI/CD & Launch',
        EN: 'CI/CD & Launch'
      },
      description: {
        ID: 'Otomatisasi rilis dan deployment ke lingkungan produksi tanpa downtime untuk kestabilan maksimal.',
        EN: 'Zero-downtime automated release engineering for production environments.'
      },
      entryPoint: {
        ID: 'Sistem siap diluncurkan dan didistribusikan ke infrastruktur multi-region.',
        EN: 'Live product ready for production release & automated deployment.'
      }
    },
    {
      step: '06',
      icon: <Cloud className="w-5 h-5" />,
      duration: {
        ID: 'SLA 24/7',
        EN: '24/7 SLA'
      },
      title: {
        ID: 'Maintenance & Support',
        EN: 'Maintenance & Support'
      },
      description: {
        ID: 'Dukungan pasca-peluncuran dengan pemantauan SLA 24/7, optimasi performa, dan pembaruan berkelanjutan.',
        EN: 'Post-launch 24/7 SLA monitoring, performance optimization, and continuous enhancements.'
      },
      entryPoint: {
        ID: 'Aplikasi yang sudah berjalan membutuhkan perawatan atau peningkatan skala.',
        EN: 'Live product needs maintenance or scaling.'
      }
    }
  ];

  return (
    <section id="proses" className="py-24 bg-[#0A0F1D] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#1793E8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#43D3A4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#29B6F6] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'PROSES PENGEMBANGAN' : 'DEVELOPMENT PROCESS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'ID'
              ? 'Metodologi Delivery Terstruktur'
              : 'Disciplined & Transparent Delivery Playbook'}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {language === 'ID'
              ? 'Pendekatan iteratif berbasis Agile yang menjamin ketepatan waktu, kualitas kode tinggi, dan visibilitas transparan.'
              : 'Agile execution designed for predictable releases, zero downtime deployments, and complete transparency.'}
          </p>
        </div>

        {/* 6 Step Cards Horizontal Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-14 items-stretch">
          {processSteps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col">
              <div className="h-full group bg-slate-900/90 border border-slate-800 hover:border-[#1793E8]/60 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#1793E8]/10 hover:-translate-y-1">
                <div>
                  {/* Top Icon & Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#29B6F6] group-hover:bg-[#1793E8] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Estimasi Durasi Badge */}
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration[language]}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#29B6F6] transition-colors leading-snug">
                    {item.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.description[language]}
                  </p>
                </div>

                {/* Common Entry Point Footer */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#43D3A4] mb-1">
                    COMMON ENTRY POINT:
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium leading-snug">
                    {item.entryPoint[language]}
                  </p>
                </div>
              </div>

              {/* Connecting Right Arrow (Visible on desktop between steps) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlight Middle Box */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md mb-8">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            {language === 'ID'
              ? 'Apakah Anda baru memiliki ide awal, sudah memiliki blueprint teknis, mengalami kendala di tengah pengembangan, atau ingin mengoptimalkan produk yang sudah berjalan — kami siap membantu di tahap mana pun.'
              : "Whether you're starting from a blank page, already have a blueprint ready to execute, got stuck midway through development, or your product is live but something needs fixing — we can step in at any point in this journey."}
          </p>
        </div>

        {/* Centered CTA Button: Discuss Your Needs / Diskusikan Kebutuhan Anda */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (onOpenContact) {
                onOpenContact();
              }
            }}
            className="bg-gradient-radya text-white font-extrabold text-sm sm:text-base px-9 py-4 rounded-full shadow-lg shadow-[#1793E8]/30 hover:shadow-xl hover:shadow-[#1793E8]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 group"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{language === 'ID' ? 'Diskusikan Kebutuhan Anda' : 'Discuss Your Needs'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
