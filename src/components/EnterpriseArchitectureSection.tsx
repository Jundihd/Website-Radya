'use client';
import React from 'react';
import { Language } from '@/types';
import { Shield, Clock, UserCheck, Cpu, Award } from 'lucide-react';

interface EnterpriseArchitectureSectionProps {
  language: Language;
}

export const EnterpriseArchitectureSection: React.FC<EnterpriseArchitectureSectionProps> = ({
  language,
}) => {
  const features = [
    {
      id: 'post-launch-support',
      icon: UserCheck,
      title: {
        ID: 'Kami Masih Mendampingi di Tahun Ke-5',
        EN: 'We\'re Still Here in Year Five',
      },
      description: {
        ID: 'Mayoritas vendor menyerahkan kode lalu menghilang. Kami mengelola sistem audit Bio Farma, platform Anteraja, dan infrastruktur ANBK selama bertahun-tahun.',
        EN: 'Most vendors hand over the code and disappear. We\'ve maintained Bio Farma\'s audit system, Anteraja\'s courier platform, and the ANBK exam infrastructure across multiple years and rollouts.',
      },
    },
    {
      id: 'uptime-sla',
      icon: Clock,
      title: {
        ID: '15 Tahun Tanpa Kegagalan Rilis',
        EN: '15 Years · 0 Missed Rollouts',
      },
      description: {
        ID: 'Tingkat keandalan 99.99% pada sistem berkonkuensi tinggi dengan jutaan pengguna serentak.',
        EN: '99.99% uptime reliability on high-concurrency platforms serving millions of concurrent users.',
      },
    },
    {
      id: 'certified-architects',
      icon: Shield,
      title: {
        ID: 'Certified Cloud & AI Architects',
        EN: 'Certified Cloud & AI Architects',
      },
      description: {
        ID: 'Tim insinyur berpengalaman yang tersertifikasi di Azure, AWS, GCP, dan AI Enterprise.',
        EN: 'Experienced engineering team certified across Azure, AWS, GCP, and Enterprise AI.',
      },
    },
    {
      id: 'agile-playbook',
      icon: Cpu,
      title: {
        ID: 'Agile & Transparansi Kode Penuh',
        EN: 'Agile & Full Code Transparency',
      },
      description: {
        ID: 'Siklus sprint 2 minggu yang transparan dengan CI/CD terotomatisasi, audit trail, dan demo berkala.',
        EN: 'Transparent 2-week sprint cycles with automated CI/CD, audit trails, and live demos.',
      },
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'KEUNGGULAN UTAMA' : 'WHAT SETS US APART'}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID'
              ? 'Keunggulan yang Tidak Anda Dapatkan di Tempat Lain'
              : 'What You Get That You Won\'t Get Elsewhere'}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl">
            {language === 'ID'
              ? 'Komitmen rekayasa perangkat lunak berskala mission-critical selama 15+ tahun dengan insinyur yang tetap mendampingi setelah rilis.'
              : 'Enterprise software engineering commitments built over 15+ years — with engineers who stay engaged long after launch.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0F172A] leading-snug mb-3 group-hover:text-[#1793E8] transition-colors">
                    {item.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description[language]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
