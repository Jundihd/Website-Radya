'use client';
import React from 'react';
import { Language } from '@/types';
import { TRUSTED_COMPANIES } from '@/lib/data';
import { Award } from 'lucide-react';

interface TrustedCompaniesProps {
  language: Language;
}

const renderCompanyLogo = (name: string) => {
  switch (name) {
    case 'Danone':
      return (
        <svg viewBox="0 0 140 40" className="h-10 w-auto">
          <path d="M12 28c15 6 35 6 50 0" stroke="#E60028" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <text x="5" y="22" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#004589" letterSpacing="-0.5">DANONE</text>
        </svg>
      );
    case 'Nestlé':
      return (
        <svg viewBox="0 0 140 40" className="h-10 w-auto">
          <path d="M10 24h120M25 10c-5 10 15 10 10 0" stroke="#005CA9" strokeWidth="2.5" fill="none" />
          <text x="15" y="24" fontFamily="serif, Times" fontWeight="bold" fontSize="24" fill="#005CA9">Nestlé</text>
        </svg>
      );
    case 'BINUS University':
      return (
        <svg viewBox="0 0 160 40" className="h-10 w-auto">
          <path d="M10 8h14v24H10z" fill="#0072C6" />
          <path d="M16 14h14v18H16z" fill="#F47920" />
          <text x="36" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="15" fill="#0F172A">BINUS</text>
          <text x="36" y="32" fontFamily="sans-serif" fontWeight="700" fontSize="9" fill="#0072C6" letterSpacing="1">UNIVERSITY</text>
        </svg>
      );
    case 'Mitsubishi Motors':
      return (
        <svg viewBox="0 0 180 40" className="h-10 w-auto">
          <path d="M18 6l6 10h-12zM12 16l6 10h-12zM24 16l6 10h-12z" fill="#E60012" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="900" fontSize="13" fill="#0F172A" letterSpacing="0.5">MITSUBISHI</text>
          <text x="36" y="31" fontFamily="sans-serif" fontWeight="700" fontSize="10" fill="#64748B" letterSpacing="1.5">MOTORS</text>
        </svg>
      );
    case 'Kompas Gramedia':
      return (
        <svg viewBox="0 0 190 40" className="h-10 w-auto">
          <circle cx="18" cy="20" r="12" fill="none" stroke="#0066B3" strokeWidth="3" />
          <path d="M18 8l4 12-4 4-4-4z" fill="#E30613" />
          <text x="38" y="20" fontFamily="sans-serif" fontWeight="900" fontSize="14" fill="#0066B3">KOMPAS</text>
          <text x="38" y="31" fontFamily="sans-serif" fontWeight="700" fontSize="10" fill="#475569" letterSpacing="1">GRAMEDIA</text>
        </svg>
      );
    case 'Trans7':
      return (
        <svg viewBox="0 0 130 40" className="h-10 w-auto">
          <rect x="6" y="8" width="26" height="24" rx="6" fill="#002D72" />
          <text x="13" y="26" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="#00A3E0">7</text>
          <text x="38" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="20" fill="#002D72" letterSpacing="-0.5">TRANS<tspan fill="#E03C31">7</tspan></text>
        </svg>
      );
    case 'kata.ai':
      return (
        <svg viewBox="0 0 130 40" className="h-10 w-auto">
          <circle cx="18" cy="20" r="11" fill="#00D285" />
          <path d="M14 20h8M18 16v8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <text x="35" y="25" fontFamily="sans-serif" fontWeight="800" fontSize="20" fill="#0F172A">kata<tspan fill="#00D285">.ai</tspan></text>
        </svg>
      );
    case 'DGNONE':
      return (
        <svg viewBox="0 0 130 40" className="h-10 w-auto">
          <path d="M8 10h12v20H8z" fill="#6366F1" />
          <path d="M22 10h12v20H22z" fill="#8B5CF6" />
          <text x="40" y="25" fontFamily="sans-serif" fontWeight="900" fontSize="19" fill="#0F172A" letterSpacing="0.5">DGNONE</text>
        </svg>
      );
    case 'Kemendikbudristek':
      return (
        <svg viewBox="0 0 190 40" className="h-10 w-auto">
          <path d="M18 8l8 12h-16zM18 20l10 12h-20z" fill="#00A2E8" />
          <circle cx="18" cy="14" r="3" fill="#FFF200" />
          <text x="36" y="19" fontFamily="sans-serif" fontWeight="800" fontSize="11" fill="#003366">KEMENDIKBUD</text>
          <text x="36" y="30" fontFamily="sans-serif" fontWeight="700" fontSize="9" fill="#64748B" letterSpacing="0.5">RISTEK</text>
        </svg>
      );
    case 'PT Antareja':
    case 'Anteraja':
      return (
        <svg viewBox="0 0 140 40" className="h-10 w-auto">
          <path d="M10 28L20 8l10 20h-5l-5-10-5 10z" fill="#EC008C" />
          <path d="M16 22h8" stroke="#EC008C" strokeWidth="3" />
          <text x="35" y="25" fontFamily="sans-serif" fontWeight="800" fontSize="19" fill="#333333" letterSpacing="-0.5">anter<tspan fill="#EC008C">aja</tspan></text>
        </svg>
      );
    default:
      return <span className="font-extrabold text-xl tracking-tight text-slate-700">{name}</span>;
  }
};

export const TrustedCompanies: React.FC<TrustedCompaniesProps> = ({ language }) => {
  return (
    <section className="py-14 bg-white border-y border-slate-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1793E8] mb-1">
              <Award className="w-4 h-4" />
              <span>{language === 'ID' ? 'KLIEN TERPERCAYA' : 'TRUSTED BY ENTERPRISES'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              {language === 'ID'
                ? 'Dipercaya Oleh Berbagai Organisasi Terkemuka'
                : 'Empowering Industry Leaders & Public Institutions'}
            </h3>
          </div>
        </div>
      </div>

      {/* Infinite Logo Marquee Slider */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Gradient Fades on Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 sm:gap-8">
          {/* Double array for seamless infinite marquee loop */}
          {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex flex-col items-center justify-center min-w-[170px] sm:min-w-[210px] px-6 py-4 rounded-2xl bg-slate-50/90 border border-slate-200/60 hover:border-[#1793E8]/40 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            >
              <div className="h-11 flex items-center justify-center">
                {renderCompanyLogo(company.name)}
              </div>
              <span className="text-[10px] font-semibold text-slate-400 group-hover:text-[#1793E8] uppercase tracking-wider mt-1.5 transition-colors">
                {company.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
