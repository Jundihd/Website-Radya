'use client';
import React, { useState } from 'react';
import { Language } from '@/types';
import { TECH_ECOSYSTEM } from '@/lib/data';
import { Layers, CheckCircle2, Sparkles } from 'lucide-react';

interface TechEcosystemProps {
  language: Language;
}

export const TechEcosystem: React.FC<TechEcosystemProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = selectedCategory === 'all'
    ? TECH_ECOSYSTEM
    : TECH_ECOSYSTEM.filter((cat) => cat.category === selectedCategory);

  const filterTabs = [
    { id: 'all', label: language === 'ID' ? 'Semua Stack' : 'All Ecosystem' },
    { id: 'cloud', label: 'Cloud & Infrastructure' },
    { id: 'ai', label: 'AI & Generative ML' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & Microservices' },
    { id: 'devops', label: 'DevOps & CI/CD' },
    { id: 'database', label: 'Database & Ingestion' },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1793E8]/10 text-[#1793E8] text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'ID' ? 'EKOSISTEM TEKNOLOGI' : 'TECHNOLOGY ECOSYSTEM'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            {language === 'ID'
              ? 'Stack Modern untuk Skala Enterprise'
              : 'Battle-Tested Enterprise Technology Stack'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {language === 'ID'
              ? 'Mengadopsi teknologi terkemuka industri untuk menjamin kecepatan, keamanan, dan keandalan tinggi.'
              : 'Leveraging production-grade frameworks, cloud orchestration, and AI models.'}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#0F172A] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech Grid Display */}
        <div className="space-y-10">
          {filteredCategories.map((catGroup) => (
            <div key={catGroup.category} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-[#0F172A] mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-radya" />
                <span>{catGroup.title[language]}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {catGroup.items.map((tech) => (
                  <div
                    key={tech.name}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 ${
                      tech.highlight
                        ? 'bg-gradient-to-b from-slate-50 to-white border-[#1793E8]/30 shadow-xs hover:border-[#1793E8] hover:shadow-md'
                        : 'bg-white border-slate-200/70 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-extrabold text-xs text-[#0F172A] mb-2 group-hover:bg-[#1793E8]/10">
                      {tech.logo}
                    </div>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
