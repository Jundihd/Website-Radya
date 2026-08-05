'use client';
import React from 'react';
import { Language } from '@/types';
import { INDUSTRIES_LIST } from '@/lib/data';
import {
  Factory,
  HeartPulse,
  Building,
  GraduationCap,
  ShoppingBag,
  CreditCard,
  HardHat,
  Truck,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface IndustriesSectionProps {
  language: Language;
  onOpenContact?: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  language,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory':
        return <Factory className="w-6 h-6" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6" />;
      case 'Building':
        return <Building className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6" />;
      case 'HardHat':
        return <HardHat className="w-6 h-6" />;
      case 'Truck':
        return <Truck className="w-6 h-6" />;
      default:
        return <Factory className="w-6 h-6" />;
    }
  };

  return (
    <section id="industri" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'INDUSTRI YANG KAMI LAYANI' : 'INDUSTRIES WE SERVE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            {language === 'ID'
              ? 'Spesialisasi Sektor Berpengalaman'
              : 'Deep Domain Expertise Across Key Sectors'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {language === 'ID'
              ? 'Kami memahami regulasi dan tantangan unik setiap industri untuk merancang solusi yang relevan.'
              : 'Architected to address strict regulatory compliance and domain operational workflows.'}
          </p>
        </div>

        {/* Industry Cards Grid - Hover Highlight Effect (Non-clickable, Active effect triggers on hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES_LIST.map((ind) => (
            <div
              key={ind.id}
              className="group p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-gradient-to-br hover:from-[#0F172A] hover:to-slate-900 hover:border-slate-800 hover:text-white hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white text-[#1793E8] shadow-xs group-hover:bg-gradient-radya group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                  {getIcon(ind.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-white mb-3 transition-colors">
                  {ind.name[language]}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 group-hover:text-slate-300 mb-6 transition-colors leading-relaxed">
                  {ind.description[language]}
                </p>

                {/* Use Cases / Tailored Solutions */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider block text-[#1793E8] group-hover:text-[#29B6F6] transition-colors">
                    {language === 'ID' ? 'Contoh Solusi:' : 'Tailored Solutions:'}
                  </span>
                  {ind.useCases.map((uc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 group-hover:text-slate-200 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#1793E8] group-hover:text-[#43D3A4] mt-0.5 transition-colors" />
                      <span>{uc[language]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metric Bar */}
              <div className="pt-4 border-t border-slate-200 group-hover:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">
                <span>{ind.metrics}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
