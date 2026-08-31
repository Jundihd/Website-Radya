'use client';
import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { SERVICES_LIST, CASE_STUDIES, INDUSTRIES_LIST } from '@/lib/data';
import { trackCtaClick } from '@/lib/analytics';
import { Menu, X, Globe, PhoneCall, Search, ChevronDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAffiliatePinned, setIsAffiliatePinned] = useState(false);
  const [isAffiliateHovered, setIsAffiliateHovered] = useState(false);

  // Search Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const affiliateDropdownRef = React.useRef<HTMLDivElement>(null);
  const isAffiliateOpen = isAffiliatePinned || isAffiliateHovered;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Scrolling closes the affiliate dropdown (pinned or hovered)
      setIsAffiliatePinned(false);
      setIsAffiliateHovered(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (affiliateDropdownRef.current && !affiliateDropdownRef.current.contains(e.target as Node)) {
        setIsAffiliatePinned(false);
        setIsAffiliateHovered(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close search modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '#solusi', label: language === 'ID' ? 'Solusi' : 'Solutions' },
    { href: '#layanan', label: language === 'ID' ? 'Layanan' : 'Services' },
    { href: '#portofolio', label: language === 'ID' ? 'Portofolio' : 'Portfolio' },
    { href: '#tentang-kami', label: language === 'ID' ? 'Tentang Kami' : 'About Us' },
    { href: '#industri', label: language === 'ID' ? 'Industri' : 'Industries' },
    { href: '#insight', label: language === 'ID' ? 'Insight' : 'Insights' },
  ];

  const affiliateLinks = [
    {
      name: 'Alkademi',
      url: 'https://alkademi.id',
      desc: 'Tech & Talent Academy',
    },
    {
      name: 'Sinaptik',
      url: 'https://sinaptik.id',
      desc: 'AI & Data Science Labs',
    },
    {
      name: 'Jangkau AI',
      url: 'https://jangkau.ai',
      desc: 'WhatsApp & Omnichannel AI',
    },
  ];

  // Searchable items
  const searchableItems = [
    ...SERVICES_LIST.map((s) => ({
      title: s.title[language],
      desc: s.description[language],
      href: '#layanan',
      type: language === 'ID' ? 'Layanan' : 'Service',
    })),
    ...CASE_STUDIES.map((c) => ({
      title: `${c.client} — ${c.title[language]}`,
      desc: c.summary[language],
      href: '#portofolio',
      type: language === 'ID' ? 'Portofolio' : 'Portfolio',
    })),
    ...INDUSTRIES_LIST.map((i) => ({
      title: i.name[language],
      desc: i.description[language],
      href: '#industri',
      type: language === 'ID' ? 'Industri' : 'Industry',
    })),
  ];

  const searchResults = searchQuery.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Official Radya Labs Logo - Strictly Fixed & Left Aligned */}
            <a href="#" className="flex items-center group py-0.5 shrink-0" aria-label="Radya Labs Homepage">
              <Image
                src="/images/logos/radya-logo.png"
                alt="Radya Labs - Cloud Native & AI Solutions Partner"
                width={195}
                height={38}
                priority
                className="h-8 sm:h-9 md:h-9.5 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-slate-700 hover:text-[#1793E8] rounded-full hover:bg-white transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}

              {/* Separate Affiliate Dropdown Menu with Radya Labs Color Palette & Click/Hover/Scroll support */}
              <div
                ref={affiliateDropdownRef}
                className="relative"
                onMouseEnter={() => setIsAffiliateHovered(true)}
                onMouseLeave={() => setIsAffiliateHovered(false)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAffiliatePinned((prev) => !prev);
                  }}
                  className={`px-3.5 xl:px-4 py-2 text-xs xl:text-sm font-extrabold rounded-full transition-all duration-200 flex items-center gap-1.5 border shadow-2xs ${
                    isAffiliateOpen
                      ? 'bg-[#1793E8] text-white border-[#1793E8] shadow-md'
                      : 'bg-[#1793E8]/10 text-[#1793E8] border-[#1793E8]/30 hover:bg-[#1793E8] hover:text-white hover:border-[#1793E8]'
                  }`}
                >
                  <span>Affiliate</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isAffiliateOpen ? 'rotate-180 text-white' : 'text-[#1793E8]'
                    }`}
                  />
                </button>

                {/* Dropdown Menu Overlay */}
                {isAffiliateOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1793E8] border-b border-slate-100 mb-1">
                      {language === 'ID' ? 'Ekosistem Affiliate' : 'Affiliate Ecosystem'}
                    </div>
                    {affiliateLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setIsAffiliatePinned(false);
                          setIsAffiliateHovered(false);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 hover:text-[#1793E8] transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>{item.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {item.desc}
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1793E8] transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Buttons: [Jadwalkan Konsultasi] -> [Search] -> [Language Toggle] */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
              
              {/* 1. Contact CTA (Left of Search & Language) */}
              <button
                onClick={() => {
                  trackCtaClick('Book a Consultation', 'Navbar Desktop');
                  onOpenContact();
                }}
                className="bg-gradient-radya text-white text-xs xl:text-sm font-bold px-4 xl:px-5 py-2.5 rounded-full shadow-md shadow-[#1793E8]/25 hover:shadow-lg hover:shadow-[#1793E8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-1.5 shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{language === 'ID' ? 'Jadwalkan Konsultasi' : 'Book a Consultation'}</span>
              </button>

              {/* 2. Circular Search Icon Button (Positioned to the RIGHT of Jadwalkan Konsultasi) */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#1793E8] hover:border-[#1793E8]/40 shadow-xs flex items-center justify-center transition-all duration-200 group shrink-0"
                title={language === 'ID' ? 'Cari' : 'Search'}
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-slate-600 group-hover:text-[#1793E8] transition-colors" />
              </button>

              {/* 3. Language Switcher (Rightmost Element) */}
              <div className="relative flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 shrink-0">
                <button
                  onClick={() => onToggleLanguage('ID')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    language === 'ID'
                      ? 'bg-white text-[#1793E8] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => onToggleLanguage('EN')}
                  className={`px-2.5 py-1 rounded-full transition-all ${
                    language === 'EN'
                      ? 'bg-white text-[#1793E8] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => onToggleLanguage(language === 'ID' ? 'EN' : 'ID')}
                className="p-2 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5 text-[#1793E8]" />
                <span>{language === 'ID' ? 'EN' : 'ID'}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[70px] bg-white border-b border-slate-200 p-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl hover:text-[#1793E8] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Affiliate Links */}
              <div className="pt-3 border-t border-slate-100 my-1">
                <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {language === 'ID' ? 'Ekosistem Affiliate' : 'Affiliate Ecosystem'}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {affiliateLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    trackCtaClick('Book a Consultation', 'Navbar Mobile Menu');
                    onOpenContact();
                  }}
                  className="w-full bg-gradient-radya text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{language === 'ID' ? 'Jadwalkan Konsultasi' : 'Book a Consultation'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Pop-up Search Modal Dialog matching exact user screenshot */}
      {isSearchModalOpen && (
        <div
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-[28px] shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col font-sans"
          >
            
            {/* Modal Search Header - matching user screenshot */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-4 bg-white">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ID'
                    ? 'Cari layanan, tech stack, portofolio, artikel...'
                    : 'Search services, tech stack, portfolio, articles...'
                }
                className="flex-1 bg-transparent text-slate-700 text-sm sm:text-base font-normal placeholder:text-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close search modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-10 max-h-96 overflow-y-auto">
              {searchQuery.trim() ? (
                searchResults.length > 0 ? (
                  <div className="space-y-2 text-left">
                    {searchResults.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex flex-col p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all group"
                      >
                        <div className="flex items-center justify-between text-sm font-bold text-slate-800 group-hover:text-[#1793E8]">
                          <span>{item.title}</span>
                          <span className="text-[10px] bg-[#1793E8]/10 text-[#1793E8] font-extrabold px-2.5 py-0.5 rounded-full uppercase shrink-0">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <p className="text-sm font-semibold">
                      {language === 'ID'
                        ? `Tidak ditemukan hasil untuk "${searchQuery}"`
                        : `No results found for "${searchQuery}"`}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === 'ID'
                        ? 'Coba kata kunci seperti Cloud, AI, EMR, atau Portofolio.'
                        : 'Try searching for Cloud, AI, EMR, or Portfolio.'}
                    </p>
                  </div>
                )
              ) : (
                /* Empty state prompt matching user screenshot text */
                <div className="py-6 text-center text-slate-400">
                  <p className="text-sm font-medium leading-relaxed">
                    {language === 'ID'
                      ? 'Mulai ketik untuk mencari layanan, tech stack, portofolio, atau artikel.'
                      : 'Start typing to search services, tech stack, portfolio, or articles.'}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
