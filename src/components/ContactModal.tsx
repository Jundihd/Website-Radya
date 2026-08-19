'use client';
import React, { useState, useEffect } from 'react';
import { Language, ArchitectureBlueprint } from '@/types';
import { X, Send, CheckCircle2, PhoneCall, Building, Mail, User, MessageSquare, Loader2, Layers, Briefcase } from 'lucide-react';
import { SERVICES_LIST, DEVELOPMENT_STAGES } from '@/lib/data';
import { trackLeadSubmission, trackWhatsAppClick } from '@/lib/analytics';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialBlueprint?: ArchitectureBlueprint | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
  initialBlueprint,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(SERVICES_LIST[0]?.title[language] || 'Cloud Native Development');
  const [stage, setStage] = useState(DEVELOPMENT_STAGES[0]?.name[language] || 'Semua Tahap (End-to-End Development)');
  const [message, setMessage] = useState(
    initialBlueprint ? `Project Title: ${initialBlueprint.title}\nTimeline: ${initialBlueprint.estimatedTimeline}\n` : ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Synchronize defaults on language change
  useEffect(() => {
    if (SERVICES_LIST.length > 0) {
      setService((prev) => {
        // If current service matches any service's other language, translate it
        const matched = SERVICES_LIST.find(
          (s) => s.title.ID === prev || s.title.EN === prev
        );
        return matched ? matched.title[language] : SERVICES_LIST[0].title[language];
      });
    }
    if (DEVELOPMENT_STAGES.length > 0) {
      setStage((prev) => {
        const matched = DEVELOPMENT_STAGES.find(
          (stg) => stg.name.ID === prev || stg.name.EN === prev
        );
        return matched ? matched.name[language] : DEVELOPMENT_STAGES[0].name[language];
      });
    }
  }, [language]);

  // Lock background body scroll when contact modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, service, stage, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setReferenceId(data.referenceId || 'RL-99201');
        if (data.whatsappUrl) {
          setWhatsappUrl(data.whatsappUrl);
        }
        trackLeadSubmission({ name, service, stage, company });
      } else {
        setErrorMessage(data.error || 'Gagal mengirimkan formulir.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(language === 'ID' ? 'Gagal terhubung ke server. Silakan coba lagi.' : 'Failed to connect to server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={handleCloseModal}
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overscroll-contain cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100 max-h-[90vh] overflow-y-auto overscroll-contain cursor-default"
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1793E8] uppercase tracking-wider mb-2">
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'ID' ? 'KONSULTASI GRATIS' : 'PROJECT INQUIRY'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-2">
              {language === 'ID' ? 'Mari Diskusikan Proyek Anda' : 'Book a Consultation with Lead Architect'}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {language === 'ID'
                ? 'Isi formulir singkat ini. Tim Solution Architect Radya Labs akan menghubungi Anda dalam 24 jam.'
                : 'Fill out this brief form. A Senior Principal Architect will contact you within 24 hours.'}
            </p>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ID' ? 'Nama Lengkap *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Budi Santoso"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ID' ? 'Email Perusahaan *' : 'Work Email *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ID' ? 'Nama Perusahaan' : 'Company Name'}
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. PT Enterprise Indonesia"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ID' ? 'Nomor Telepon / WA' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812 3456 7890"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#1793E8]" />
                    <span>{language === 'ID' ? 'Kebutuhan Layanan Utama' : 'Primary Service Needed'}</span>
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title[language]}>
                        {s.title[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#43D3A4]" />
                    <span>{language === 'ID' ? 'Tahap yang Dikembangkan' : 'Development Stage / Phase'}</span>
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                  >
                    {DEVELOPMENT_STAGES.map((stg) => (
                      <option key={stg.id} value={stg.name[language]}>
                        {stg.name[language]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#1793E8]" />
                  <span>{language === 'ID' ? 'Catatan / Pesan Tambahan' : 'Additional Notes / Message'}</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'ID'
                      ? 'Kirimkan Pesan atau Pertanyaan kepada kami terkait proyek Anda, atau jika ada permintaan khusus seperti Permintaan Demo Gratis...'
                      : 'Send us a message or inquiry regarding your project, or any specific requests such as a Free Demo Request...'
                  }
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#1793E8]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || !name || !email}
                  className="w-full bg-gradient-radya text-white font-extrabold text-base py-3.5 rounded-xl shadow-lg hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{language === 'ID' ? 'Mengirimkan Request...' : 'Submitting Request...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{language === 'ID' ? 'KIRIMKAN PERMINTAAN KONSULTASI' : 'SUBMIT CONSULTATION REQUEST'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">
              {language === 'ID' ? 'Permintaan Konsultasi Diterima!' : 'Consultation Request Received!'}
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              {language === 'ID'
                ? `Terima kasih, ${name}. Tim Solution Architect Radya Labs telah menerima permintaan Anda.`
                : `Thank you, ${name}. Our Solution Architect team received your request.`}
            </p>

            {/* Notification Status Badges */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 max-w-md mx-auto mb-6 space-y-2 text-left">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{language === 'ID' ? `No. Referensi: ${referenceId}` : `Reference ID: ${referenceId}`}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>
                  {language === 'ID'
                    ? '📧 Notifikasi Email terkirim otomatis ke tim Radya Labs'
                    : '📧 Email notification sent automatically to Radya Labs team'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span>
                  {language === 'ID'
                    ? '📊 Tersimpan di Google Sheet & Sistem Alert Internal'
                    : '📊 Saved to Google Sheet & Internal Alert System'}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Contact Modal Confirmation')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>{language === 'ID' ? '💬 Chat Langsung via WhatsApp' : '💬 Direct Chat via WhatsApp'}</span>
                </a>
              )}

              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto bg-[#0F172A] text-white font-bold text-xs px-8 py-3 rounded-full hover:bg-slate-800 transition-colors"
              >
                {language === 'ID' ? 'Tutup' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
