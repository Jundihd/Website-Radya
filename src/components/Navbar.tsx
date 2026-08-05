'use client';
import React, { useState, useEffect } from 'react';
import { Language } from '@/types';
import { SERVICES_LIST, CASE_STUDIES, INDUSTRIES_LIST } from '@/lib/data';
import { Menu, X, Globe, PhoneCall, Search } from 'lucide-react';

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

  // Search Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-radya p-0.5 flex items-center justify-center shadow-md shadow-[#1793E8]/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#29B6F6]" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#0F172A] flex items-center gap-1">
                  RADYA<span className="text-[#1793E8]">LABS</span>
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase -mt-1">
                  CLOUD NATIVE & AI PARTNER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#1793E8] rounded-full hover:bg-white transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              
              {/* Circular Search Icon Button (Placed to the LEFT of Language Switcher) */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#1793E8] hover:border-[#1793E8]/40 shadow-xs flex items-center justify-center transition-all duration-200 group"
                title={language === 'ID' ? 'Cari' : 'Search'}
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-slate-600 group-hover:text-[#1793E8] transition-colors" />
              </button>

              {/* Language Switcher */}
              <div className="relative flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => onToggleLanguage('ID')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    language === 'ID'
                      ? 'bg-white text-[#1793E8] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => onToggleLanguage('EN')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    language === 'EN'
                      ? 'bg-white text-[#1793E8] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Contact CTA */}
              <button
                onClick={onOpenContact}
                className="bg-gradient-radya text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#1793E8]/25 hover:shadow-lg hover:shadow-[#1793E8]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'ID' ? 'Jadwalkan Konsultasi Gratis' : 'Book your Free Consultation'}</span>
              </button>
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
          <div className="lg:hidden fixed inset-x-0 top-[70px] bg-white border-b border-slate-200 p-6 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl hover:text-[#1793E8] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full bg-gradient-radya text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>{language === 'ID' ? 'Jadwalkan Konsultasi Gratis' : 'Book your Free Consultation'}</span>
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
