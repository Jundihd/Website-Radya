'use client';
import React from 'react';
import Image from 'next/image';
import { Language } from '@/types';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ShieldCheck, Globe, MessageSquare } from 'lucide-react';
import { trackCtaClick, trackWhatsAppClick } from '@/lib/analytics';
import { COMPANY_CONFIG } from '@/lib/company-info';

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
            <a href="#" className="inline-flex items-center group py-1" aria-label="Radya Labs Homepage">
              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors shadow-inner">
                <Image
                  src="/images/logos/radya-logo.png"
                  alt="Radya Labs - Cloud Native & AI Solutions Partner"
                  width={210}
                  height={42}
                  className="h-9 sm:h-10 w-auto object-contain brightness-105"
                />
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
                <span>{COMPANY_CONFIG.address.fullFormatted}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1793E8] shrink-0" />
                <a href={`mailto:${COMPANY_CONFIG.contacts.email}`} className="hover:text-white transition-colors">
                  {COMPANY_CONFIG.contacts.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1793E8] shrink-0" />
                <a href={`tel:${COMPANY_CONFIG.contacts.phoneOfficeRaw}`} className="hover:text-white transition-colors">
                  {COMPANY_CONFIG.contacts.phoneOffice}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-emerald-400 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.contacts.salesWhatsAppRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Footer WhatsApp Link')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {COMPANY_CONFIG.contacts.salesWhatsApp}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_CONFIG.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Radya Labs LinkedIn"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Radya Labs Instagram"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Radya Labs YouTube"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Radya Labs Facebook"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-[#1793E8] transition-colors"
              >
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
              <li>
                <button
                  onClick={() => {
                    trackCtaClick('Careers', 'Footer');
                    onOpenContact();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {language === 'ID' ? 'Karir & Tim' : 'Careers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    trackCtaClick('Contact Us', 'Footer');
                    onOpenContact();
                  }}
                  className="hover:text-white transition-colors"
                >
                  {language === 'ID' ? 'Kontak Kami' : 'Contact Us'}
                </button>
              </li>
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
