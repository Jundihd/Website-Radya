'use client';

import React, { useState } from 'react';
import { Language, CaseStudy, InsightArticle, ArchitectureBlueprint } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TrustedCompanies } from '@/components/TrustedCompanies';
import { ServicesSection } from '@/components/ServicesSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { WhyRadyaLabs } from '@/components/WhyRadyaLabs';
import { IndustriesSection } from '@/components/IndustriesSection';
import { DevelopmentProcess } from '@/components/DevelopmentProcess';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ChallengesSection } from '@/components/ChallengesSection';
import { EnterpriseArchitectureSection } from '@/components/EnterpriseArchitectureSection';
import { VideoSection } from '@/components/VideoSection';
import { InsightsSection } from '@/components/InsightsSection';
import { FinalCtaBanner } from '@/components/FinalCtaBanner';
import { Footer } from '@/components/Footer';
import { ContactModal } from '@/components/ContactModal';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { InsightArticleModal } from '@/components/InsightArticleModal';
import { AiAssistantWidget } from '@/components/AiAssistantWidget';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ID');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [activeBlueprint, setActiveBlueprint] = useState<ArchitectureBlueprint | null>(null);

  const handleToggleLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleOpenContactWithBlueprint = (blueprint: ArchitectureBlueprint) => {
    setActiveBlueprint(blueprint);
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#1793E8]/20 selection:text-[#1793E8]">
      {/* 01 Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenContact={() => {
          setActiveBlueprint(null);
          setContactModalOpen(true);
        }}
      />

      {/* Main Page Layout Sections */}
      <main>
        {/* 02 Hero & Statistics */}
        <HeroSection
          language={language}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />

        {/* 04 Trusted Companies Marquee */}
        <TrustedCompanies language={language} />

        {/* Challenges We Solve (After Klien Terpercaya / Trusted Companies) */}
        <ChallengesSection language={language} />

        {/* Enterprise Architecture / Why Enterprise Leaders Choose Radya Labs */}
        <EnterpriseArchitectureSection language={language} />

        {/* 05 Services Grid */}
        <ServicesSection
          language={language}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />

        {/* 06 Featured Case Studies */}
        <CaseStudiesSection
          language={language}
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />

        {/* 07 Why Radya Labs */}
        <WhyRadyaLabs
          language={language}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />

        {/* 08 Industries We Serve */}
        <IndustriesSection
          language={language}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />

        {/* 10 Development Process Timeline */}
        <DevelopmentProcess
          language={language}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />

        {/* 11 Testimonials */}
        <TestimonialsSection language={language} />

        {/* Video Placeholder (After Testimonials) */}
        <VideoSection language={language} />

        {/* 12 Latest Insights & FAQ */}
        <InsightsSection
          language={language}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 13 Final CTA Banner */}
        <FinalCtaBanner
          language={language}
          onOpenContact={() => {
            setActiveBlueprint(null);
            setContactModalOpen(true);
          }}
        />
      </main>

      {/* 14 Premium Footer */}
      <Footer
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenContact={() => {
          setActiveBlueprint(null);
          setContactModalOpen(true);
        }}
      />

      {/* Dialog Modals */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        language={language}
        initialBlueprint={activeBlueprint}
      />

      <CaseStudyModal
        study={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        language={language}
        onOpenContact={() => {
          setSelectedCaseStudy(null);
          setActiveBlueprint(null);
          setContactModalOpen(true);
        }}
      />

      <InsightArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        language={language}
      />
    </div>
  );
}
