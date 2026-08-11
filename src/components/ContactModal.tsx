'use client';
import React, { useState } from 'react';
import { Language, ArchitectureBlueprint } from '@/types';
import { X, Send, CheckCircle2, PhoneCall, Building, Mail, User, MessageSquare, Loader2 } from 'lucide-react';

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
  const [service, setService] = useState('Cloud Native & Microservices');
  const [budget, setBudget] = useState('Rp 100M - 250M');
  const [message, setMessage] = useState(
    initialBlueprint ? `Project Title: ${initialBlueprint.title}\nTimeline: ${initialBlueprint.estimatedTimeline}\n` : ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Lock background body scroll when contact modal is active
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }
  }, [isOpen]);

  // Close on Escape key
  React.useEffect(() => {
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
        body: JSON.stringify({ name, email, phone, company, service, budget, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setReferenceId(data.referenceId || 'RL-99201');
        if (data.whatsappUrl) {
          setWhatsappUrl(data.whatsappUrl);
        }
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
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ID' ? 'Kebutuhan Layanan Utama' : 'Primary Service Needed'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                  >
                    <option value="Cloud Native & Microservices">Cloud Native & Microservices</option>
                    <option value="AI Solutions & OCR Intelligence">AI Solutions & OCR Intelligence</option>
                    <option value="Digital Transformation Consulting">Digital Transformation Consulting</option>
                    <option value="DevOps & Infrastructure Automation">DevOps & Infrastructure Automation</option>
                    <option value="UI/UX Design & Product Strategy">UI/UX Design & Product Strategy</option>
                    <option value="IT Resource Augmentation">IT Resource Augmentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {language === 'ID' ? 'Estimasi Anggaran' : 'Estimated Budget Range'}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#1793E8]"
                  >
                    <option value="Rp 100M - 250M">Rp 100 Juta - 250 Juta</option>
                    <option value="Rp 250M - 500M">Rp 250 Juta - 500 Juta</option>
                    <option value="Rp 500M - 1B+">Rp 500 Juta - 1 Miliar+</option>
                    <option value="Enterprise Custom SLA">Enterprise Custom SLA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {language === 'ID' ? 'Catatan Proyek / Pertanyaan' : 'Project Scope & Notes'}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'ID'
                      ? 'Jelaskan tujuan proyek, tantangan teknis, atau ekspektasi timeline Anda...'
                      : 'Describe your core technical goals, timeline, or current infrastructure state...'
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
