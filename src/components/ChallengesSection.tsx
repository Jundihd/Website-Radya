'use client';
import React from 'react';
import { Language } from '@/types';
import { Cpu, Clock, LayoutGrid, Globe, UserCheck, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface ChallengesSectionProps {
  language: Language;
}

export const ChallengesSection: React.FC<ChallengesSectionProps> = ({ language }) => {
  const challenges = [
    {
      id: 'ojk-sikepo',
      icon: Cpu,
      title: {
        ID: 'Sistem legacy sulit dikembangkan dan dipelihara',
        EN: 'Legacy systems are hard to develop and maintain',
      },
      caseStudyTag: 'CASE STUDY: OJK — SIKEPO',
    },
    {
      id: 'biofarma-bioaudit',
      icon: Clock,
      title: {
        ID: 'Proses manual memperlambat pekerjaan krusial',
        EN: 'Manual processes slow down critical work',
      },
      caseStudyTag: 'CASE STUDY: BIOFARMA — BIOAUDIT',
    },
    {
      id: 'imuni',
      icon: LayoutGrid,
      title: {
        ID: 'Data operasional tersebar di banyak sistem',
        EN: 'Operational data scattered across many systems',
      },
      caseStudyTag: 'CASE STUDY: IMUNI — IMUNI',
    },
    {
      id: 'pusmendik-anbk',
      icon: Globe,
      title: {
        ID: 'Sistem tidak dapat berskala untuk peluncuran nasional',
        EN: "Systems can't scale for a nationwide rollout",
      },
      caseStudyTag: 'CASE STUDY: PUSMENDIK — ANBK',
    },
    {
      id: 'anteraja-aware',
      icon: UserCheck,
      title: {
        ID: 'Tim IT internal kekurangan kapasitas untuk mengimbangi',
        EN: 'Internal IT team lacks capacity to keep up',
      },
      caseStudyTag: 'CASE STUDY: ANTERAJA — ANTERAJA AWARE',
    },
    {
      id: 'biofarma-bismart',
      icon: Shield,
      title: {
        ID: 'Pelaporan risiko & kepatuhan sulit dilacak',
        EN: 'Risk & compliance reporting is hard to track',
      },
      caseStudyTag: 'CASE STUDY: BIOFARMA — BI-SMART',
    },
  ];

  return (
    <section id="solusi" className="py-20 sm:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'KEAHLIAN RADYA LABS' : 'RADYA LABS EXPERTISE'}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID' ? 'Tantangan yang Kami Selesaikan' : 'Challenges We Solve'}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl">
            {language === 'ID'
              ? 'Masalah nyata yang telah kami bantu klien atasi — bukan sekadar teori.'
              : "Real problems we've helped our clients overcome — not just theory."}
          </p>
        </div>

        {/* Challenges 6-card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {challenges.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100/90 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug mb-8 group-hover:text-[#1793E8] transition-colors">
                    {item.title[language]}
                  </h3>
                </div>

                {/* Footer Link Tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] tracking-wider uppercase">
                  <span>{item.caseStudyTag}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
