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
      id: 'iso-security',
      icon: Shield,
      title: {
        ID: 'ISO 27001 Security Standard',
        EN: 'ISO 27001 Security Standard',
      },
      description: {
        ID: 'Manajemen keamanan informasi ketat yang melindungi data enterprise sensitif & kepatuhan.',
        EN: 'Strict information security management protecting sensitive enterprise data & compliance.',
      },
    },
    {
      id: 'uptime-sla',
      icon: Clock,
      title: {
        ID: '99.9% Uptime SLA Guarantee',
        EN: '99.9% Uptime SLA Guarantee',
      },
      description: {
        ID: 'Infrastruktur cloud andal dan arsitektur microservices berkeandalan tinggi.',
        EN: 'Reliable cloud infrastructure and high-availability microservices architecture.',
      },
    },
    {
      id: 'certified-architects',
      icon: UserCheck,
      title: {
        ID: 'Certified Cloud & AI Architects',
        EN: 'Certified Cloud & AI Architects',
      },
      description: {
        ID: 'Tim insinyur berpengalaman yang tersertifikasi di Azure, AWS, Google Gemini, dan Kata.ai.',
        EN: 'Experienced engineering team certified in Azure, AWS, Google Gemini, and Kata.ai.',
      },
    },
    {
      id: 'agile-playbook',
      icon: Cpu,
      title: {
        ID: 'Agile Scrum Playbook',
        EN: 'Agile Scrum Playbook',
      },
      description: {
        ID: 'Siklus sprint 2 minggu yang transparan dengan deliverable jelas, CI/CD, dan live demo.',
        EN: 'Transparent 2-week sprint cycles with clear deliverables, CI/CD, and live demos.',
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
            <span>{language === 'ID' ? 'MENGAPA RADYA LABS?' : 'WHY RADYA LABS?'}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            {language === 'ID'
              ? 'Mengapa Pemimpin Enterprise Memilih Radya Labs'
              : 'Why Enterprise Leaders Choose Radya Labs'}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl">
            {language === 'ID'
              ? 'Dibangun di atas standar keamanan ketat, insinyur tersertifikasi, dan 15+ tahun penyampaian perangkat lunak.'
              : 'Built on rigorous security standards, certified engineers, and 15+ years of software delivery.'}
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
