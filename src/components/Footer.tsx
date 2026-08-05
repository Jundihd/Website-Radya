'use client';
import React from 'react';
import { Language } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ShieldCheck, Globe } from 'lucide-react';

interface FooterProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onToggleLanguage,
  onOpenContact,
}) => {
  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-radya p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#29B6F6]" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                  RADYA<span className="text-[#1793E8]">LABS</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
                  CLOUD NATIVE & AI SOLUTIONS PARTNER
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {language === 'ID'
                ? 'Mitra teknologi terpercaya untuk membantu bisnis berinovasi, bertumbuh, dan berdampak nyata di era digital.'
                : 'Enterprise technology partner empowering global organizations with cloud native architectures and AI automation.'}
            </p>

            <div className="space-y-3 text-xs font-semibold text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1793E8] shrink-0 mt-0.5" />
                <span>
                  Jl. Karawitan No.105A, Kel. Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40054
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1793E8] shrink-0" />
                <a href="mailto:info@radyalabs.com" className="hover:text-white transition-colors">
                  info@radyalabs.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1793E8] shrink-0" />
                <a href="tel:02263750660" className="hover:text-white transition-colors">
                  (022) 63750660
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Layanan */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {language === 'ID' ? 'Layanan' : 'Services'}
            </h4>
            <ul className="space-y-3 text-xs font-medium text-slate-400">
              <li><a href="#layanan" className="hover:text-white transition-colors">Cloud Native Development</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">AI & OCR Solutions</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">Digital Transformation</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">DevOps & Infrastructure</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">UI/UX Design & Product Strategy</a></li>
              <li><a href="#layanan" className="hover:text-white transition-colors">IT Resource Augmentation</a></li>
            </ul>
          </div>

          {/* Column 3 - Solusi Industri */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {language === 'ID' ? 'Industri' : 'Industries'}
            </h4>
            <ul className="space-y-3 text-xs font-medium text-slate-400">
              <li><a href="#industri" className="hover:text-white transition-colors">FMCG & Supply Chain</a></li>
              <li><a href="#industri" className="hover:text-white transition-colors">Education & EdTech</a></li>
              <li><a href="#industri" className="hover:text-white transition-colors">Government & Public Sector</a></li>
              <li><a href="#industri" className="hover:text-white transition-colors">Finance & Banking</a></li>
              <li><a href="#industri" className="hover:text-white transition-colors">Healthcare & Life Sciences</a></li>
              <li><a href="#industri" className="hover:text-white transition-colors">Logistics & Express</a></li>
            </ul>
          </div>

          {/* Column 4 - Perusahaan */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              {language === 'ID' ? 'Perusahaan' : 'Company'}
            </h4>
            <ul className="space-y-3 text-xs font-medium text-slate-400">
              <li><a href="#tentang-kami" className="hover:text-white transition-colors">{language === 'ID' ? 'Tentang Kami' : 'About Us'}</a></li>
              <li><a href="#portofolio" className="hover:text-white transition-colors">{language === 'ID' ? 'Portofolio & Case Study' : 'Case Studies'}</a></li>
              <li><a href="#insight" className="hover:text-white transition-colors">{language === 'ID' ? 'Insight & Blog' : 'Insights & Blog'}</a></li>
              <li><button onClick={onOpenContact} className="hover:text-white transition-colors">{language === 'ID' ? 'Karir & Tim' : 'Careers'}</button></li>
              <li><button onClick={onOpenContact} className="hover:text-white transition-colors">{language === 'ID' ? 'Kontak Kami' : 'Contact Us'}</button></li>
            </ul>

            {/* Security Certification Pill */}
            <div className="mt-6 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] font-bold text-slate-300">
                ISO 27001 Certified
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <div>
            © {new Date().getFullYear()} PT Radya Anugrah Digital (Radya Labs). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
            
            {/* Lang Switcher in Footer */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-full border border-slate-800">
              <button
                onClick={() => onToggleLanguage('ID')}
                className={`px-2 py-0.5 rounded-full text-[10px] ${language === 'ID' ? 'bg-[#1793E8] text-white' : 'text-slate-400'}`}
              >
                ID
              </button>
              <button
                onClick={() => onToggleLanguage('EN')}
                className={`px-2 py-0.5 rounded-full text-[10px] ${language === 'EN' ? 'bg-[#1793E8] text-white' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
