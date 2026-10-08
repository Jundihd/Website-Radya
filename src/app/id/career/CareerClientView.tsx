'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Lightbulb,
  Rocket,
  BookOpen,
  Clock,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MapPin,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Briefcase,
  AlertCircle,
  Eye,
  EyeOff,
  Building,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  division: string;
  type: string;
  location: string;
}

const JOBS_DATA: Job[] = [
  {
    id: 'pm-2026-01',
    title: 'Project Manager',
    division: 'Product & Delivery',
    type: 'Penuh waktu',
    location: 'Bandung',
  },
  {
    id: 'se-2026-02',
    title: 'Sales Executive',
    division: 'Sales & Marketing',
    type: 'Freelance',
    location: 'Bandung',
  },
  {
    id: 'smc-2026-03',
    title: 'Social Media & Content Creative',
    division: 'Sales & Marketing',
    type: 'Magang',
    location: 'Bandung',
  },
];

const DIVISIONS = [
  'Semua',
  'Engineering',
  'Product & Delivery',
  'Sales & Marketing',
  'Finance & Operations',
];

export const CareerClientView: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<string>('Semua');
  const [showTodo, setShowTodo] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const filteredJobs = JOBS_DATA.filter(
    (job) => activeDivision === 'Semua' || job.division === activeDivision
  );

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('join@radyalabs.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getApplyMailto = (position: string) => {
    return `mailto:join@radyalabs.com?subject=${encodeURIComponent(
      `Lamaran – ${position}`
    )}`;
  };

  const getInterestMailto = (division: string) => {
    return `mailto:join@radyalabs.com?subject=${encodeURIComponent(
      `Daftar minat – ${division}`
    )}`;
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#1793E8] selection:text-white ${showTodo ? 'show-todo-active' : ''}`}>
      
      {/* ======================================================== */}
      {/* 0. QA & REVIEW BANNER: Toggle Penanda Konfirmasi        */}
      {/* ======================================================== */}
      <aside aria-label="Review Banner" className="bg-[#0F172A] text-slate-200 border-b border-slate-800 text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#1793E8] text-white uppercase tracking-wider">
              Career Preview
            </span>
            <span className="text-slate-300">
              Halaman Karier Resmi Radya Labs. Konten bertanda <strong className="text-amber-400 font-semibold">[KONFIRMASI]</strong> wajib disetujui HR/Manajemen sebelum rilis final.
            </span>
          </div>

          <button
            onClick={() => setShowTodo((prev) => !prev)}
            aria-pressed={showTodo}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              showTodo
                ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-sm font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:border-slate-500'
            }`}
          >
            {showTodo ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-900" />
                <span>Sembunyikan Label Konfirmasi</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Tandai konten yang perlu konfirmasi</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* STICKY HEADER / NAVBAR KHAS RADYA LABS                   */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Radya Labs Beranda">
            <Image
              src="/images/logos/radya-logo.png"
              alt="Radya Labs"
              width={160}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigasi Desktop */}
          <nav aria-label="Navigasi Karier" className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#1793E8] transition-colors">
              Beranda
            </Link>
            <a href="#hero" className="hover:text-[#1793E8] transition-colors">
              Tentang Kru
            </a>
            <a href="#pilar" className="hover:text-[#1793E8] transition-colors">
              Pilar Budaya
            </a>
            <a href="#cerita" className="hover:text-[#1793E8] transition-colors">
              Cerita Founder
            </a>
            <a href="#benefit" className="hover:text-[#1793E8] transition-colors">
              Benefit
            </a>
            <a href="#testimoni" className="hover:text-[#1793E8] transition-colors">
              Testimoni
            </a>
            <a href="#lowongan" className="text-[#1793E8] font-bold border-b-2 border-[#1793E8] pb-1">
              Lowongan
            </a>
            <a href="#proses" className="hover:text-[#1793E8] transition-colors">
              Proses
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#lowongan"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#1793E8] px-3 py-2 rounded-lg transition-colors"
            >
              Lihat Posisi
            </a>
            <a
              href="#kontak"
              className="bg-gradient-radya text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-full shadow-sm hover:brightness-110 hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Kirim CV Spontan</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ======================================================== */}
        {/* SECTION 1: #hero                                         */}
        {/* ======================================================== */}
        <section id="hero" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-white border-b border-slate-100">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radya opacity-10 blur-3xl rounded-full pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#43D3A4] opacity-5 blur-3xl rounded-full pointer-events-none -ml-20 -mb-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Kolom Kiri: Pesan Utama & CTA */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badge Tagline */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800">
                  <Sparkles className="w-3.5 h-3.5 text-[#1793E8]" />
                  <span>Karier & Budaya Tim di Radya Labs</span>
                </div>

                {/* H1 Heading */}
                <h1 className="font-exo font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] text-slate-900 tracking-tight leading-[1.12]">
                  Di sini kami bukan karyawan. <br className="hidden sm:inline" />
                  <span className="text-gradient-radya">Kami kru.</span>
                </h1>

                {/* Paragraf Lead */}
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  Sejak 2011 kami membangun aplikasi dan sistem untuk perusahaan di seluruh Indonesia dari Bandung. Kami mencari orang yang mau terus belajar, senang membuat sesuatu yang berguna, dan tetap punya waktu untuk hidup di luar kantor.
                </p>

                {/* Tombol CTA Row */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#lowongan"
                    className="inline-flex items-center gap-2 bg-gradient-radya text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-md hover:brightness-110 hover:-translate-y-0.5 transition-all"
                  >
                    <span>Lihat lowongan</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#kontak"
                    className="inline-flex items-center gap-2 bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-400 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full hover:-translate-y-0.5 transition-all shadow-xs"
                  >
                    <span>Kirim CV spontan</span>
                  </a>
                </div>

                {/* Tiga Fakta Cepat */}
                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm mb-0.5">
                      <Clock className="w-4 h-4 text-[#1793E8]" />
                      <span>8 jam sehari</span>
                    </div>
                    <p className="text-slate-500">sebisa mungkin tanpa lembur</p>
                  </div>

                  <div
                    data-todo
                    className={`p-3 rounded-xl transition-all ${
                      showTodo
                        ? 'bg-amber-50 border-2 border-dashed border-amber-400 text-amber-900'
                        : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm mb-0.5">
                      <Users className="w-4 h-4 text-[#29B6F6]" />
                      <span>51–200 kru</span>
                      {showTodo && (
                        <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded font-extrabold ml-auto">
                          [KONFIRMASI]
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500">angka terbaru perlu konfirmasi (LinkedIn)</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm mb-0.5">
                      <MapPin className="w-4 h-4 text-[#43D3A4]" />
                      <span>Bandung</span>
                    </div>
                    <p className="text-slate-500">Sukaluyu, Cibeunying Kaler</p>
                  </div>
                </div>

              </div>

              {/* Kolom Kanan: Blok Besar P / I / C (People, Innovation, Creation) */}
              <div className="lg:col-span-5" aria-label="Misi kami: PIC">
                <div className="space-y-3.5">
                  
                  {/* Card P (People) */}
                  <div className="group p-5 sm:p-6 rounded-2xl bg-[#0F172A] text-white border border-slate-800 shadow-md hover:border-[#43D3A4]/40 hover:-translate-y-1 transition-all flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0">
                      <span className="font-exo font-extrabold text-4xl text-[#43D3A4]">
                        P
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-exo font-bold text-xl text-white tracking-wide">
                          People
                        </strong>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
                          Manusia
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1 leading-snug">
                        Kru yang tumbuh bersama secara kapasitas, karakter, dan kesejahteraan.
                      </p>
                    </div>
                  </div>

                  {/* Card I (Innovation) */}
                  <div className="group p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1793E8] to-[#29B6F6] text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0">
                      <span className="font-exo font-extrabold text-4xl text-white">
                        I
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-exo font-bold text-xl text-white tracking-wide">
                          Innovation
                        </strong>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                          Inovasi
                        </span>
                      </div>
                      <p className="text-white/90 text-sm mt-1 leading-snug">
                        Cara baru dan arsitektur modern yang benar-benar berguna menyelesaikan masalah.
                      </p>
                    </div>
                  </div>

                  {/* Card C (Creation) */}
                  <div className="group p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md hover:border-[#1793E8]/40 hover:-translate-y-1 transition-all flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-[#1793E8]/20 border border-[#1793E8]/30 flex items-center justify-center shrink-0">
                      <span className="font-exo font-extrabold text-4xl text-[#29B6F6]">
                        C
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-exo font-bold text-xl text-white tracking-wide">
                          Creation
                        </strong>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 font-semibold border border-sky-500/20">
                          Karya
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1 leading-snug">
                        Produk digital dan sistem skala enterprise yang bisa dibanggakan seluruh tim.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: #pilar (Pilar Budaya)                        */}
        {/* ======================================================== */}
        <section id="pilar" className="py-20 sm:py-28 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Section */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#1793E8] mb-3">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Nilai & Prinsip Sehari-hari</span>
              </div>
              <h2 className="font-exo font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Empat alasan kru betah di Radya Labs
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Bukan sekadar slogan di dinding, tapi komitmen nyata yang dirasakan setiap kru sejak hari pertama.
              </p>
            </div>

            {/* Grid 2x2 Garis Tipis (Sesuai Spesifikasi Brief) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              
              {/* Pilar 1: Belajar Terus */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1793E8] border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Belajar terus
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Kursus bahasa Inggris, pelatihan online, sesi berbagi internal, dan seminar dari pembicara luar. Banyak kru menyebut kantor ini <em className="font-semibold text-slate-800 not-italic">“seperti kampus tempat bertumbuh”</em>.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#1793E8]">
                  Kapasitas teknis & non-teknis diasah rutin
                </div>
              </article>

              {/* Pilar 2: Kerja Efektif, Bukan Lembur */}
              <article
                data-todo
                className={`bg-white p-8 sm:p-10 flex flex-col justify-between transition-colors group ${
                  showTodo ? 'bg-amber-50/70 border-2 border-dashed border-amber-400' : 'hover:bg-slate-50/80'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#29B6F6] border border-sky-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900">
                      Kerja efektif, bukan lembur
                    </h3>
                    {showTodo && (
                      <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded">
                        [KONFIRMASI]
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Jam kerja 8 jam sehari dan kami berusaha menghindari lembur. Kami percaya kerja yang fokus dan terencana jauh lebih bernilai dibanding kerja yang berlarut-larut.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#29B6F6]">
                  Work-life balance nyata untuk hidup di luar kantor
                </div>
              </article>

              {/* Pilar 3: Dipedulikan, Bukan Sekadar Digaji */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#43D3A4] border border-emerald-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Dipedulikan, bukan sekadar digaji
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Dari BPJS lengkap sampai bonus proyek. Pimpinan kami menganggap kebahagiaan dan kenyamanan kru sebagai bagian dari pekerjaan, bukan sekadar bonus tambahan.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600">
                  Kepedulian manusiawi dari para leader
                </div>
              </article>

              {/* Pilar 4: Tim Hebat, Bukan Individu Hebat */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0F172A] border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Tim hebat, bukan individu hebat
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Kami mencari pemain tim yang mau belajar hal baru, membuat aplikasi bernilai, dan saling membantu agar perusahaan ikut berkembang bersama-sama.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-800">
                  Ego dikesampingkan demi solusi terbaik
                </div>
              </article>

            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: #cerita (Cerita Founder: Happy Employee)       */}
        {/* ======================================================== */}
        <section id="cerita" className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden">
          {/* Ambient Radial Lights */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1793E8] opacity-15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#43D3A4] opacity-10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Kolom Kiri: Foto Asli di Kantor */}
              <div className="lg:col-span-5">
                <div
                  data-todo
                  className={`relative rounded-3xl overflow-hidden border transition-all ${
                    showTodo
                      ? 'border-2 border-dashed border-amber-400 bg-amber-950/40 p-1'
                      : 'border-slate-800 bg-slate-900/60 shadow-2xl'
                  }`}
                >
                  <div className="aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 relative overflow-hidden rounded-2xl">
                    <Image
                      src="/images/satya-radya-discussion.png"
                      alt="Pendiri & Kru Radya Labs saat sesi diskusi kerja"
                      fill
                      className="object-cover object-center filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300">
                      <div className="flex items-center gap-2 font-bold text-white mb-0.5">
                        <Building className="w-3.5 h-3.5 text-[#29B6F6]" />
                        <span>Kru & Pimpinan Radya Labs</span>
                        {showTodo && (
                          <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded ml-auto">
                            [KONFIRMASI FOTO]
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Foto otentik tim saat mendiskusikan inovasi teknologi di Bandung.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Kutipan Otentik dari Tulisan "Happy Employee" */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-[#29B6F6]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cerita dari Founder</span>
                </div>

                <div data-todo className={showTodo ? 'p-3 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-950/20' : ''}>
                  <blockquote className="font-raleway font-bold text-xl sm:text-2xl md:text-3xl text-slate-100 leading-snug tracking-tight">
                    “Waktu itu kami baru berdua. Kas kosong, yang ada hanya piutang yang jatuh tempo bulan depan. Gaji tetap harus dibayar, jadi saya pinjam uang ke CTO. Sejak hari itu pesan saya ke diri sendiri sederhana: <span className="text-[#29B6F6]">jaga kru supaya tetap happy.</span>”
                  </blockquote>
                </div>

                {/* Attribution & Context */}
                <div data-todo className={`pt-2 space-y-2 border-t border-slate-800 text-sm ${showTodo ? 'p-3 rounded-xl border border-dashed border-amber-400' : ''}`}>
                  <p className="font-bold text-white flex items-center gap-2 flex-wrap">
                    <span>Puja Pramudya</span>
                    <span className="text-slate-400 font-normal">· Co-Founder & CEO Radya Labs</span>
                    {showTodo && (
                      <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded">
                        [KONFIRMASI: KUTIPAN & JABATAN]
                      </span>
                    )}
                  </p>
                  
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Ringkasan dari esai refleksi pendiri berjudul <a href="https://medium.com/blackdesk/happy-employee-3def89e8ac0e" target="_blank" rel="noopener noreferrer" className="text-[#29B6F6] underline hover:text-white transition-colors">“Happy Employee” di Medium</a>. Menjadi pedoman dasar kenapa kami selalu menempatkan keselamatan dan kesejahteraan kru di atas segalanya.
                  </p>
                </div>

                {/* Wujud Nyata Sekarang */}
                <div data-todo className={`p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-300 ${showTodo ? 'border-amber-400 border-dashed' : ''}`}>
                  <strong className="text-white block mb-1 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#43D3A4]" />
                    <span>Wujud komitmen saat ini:</span>
                    {showTodo && (
                      <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1 rounded ml-auto">
                        [KONFIRMASI KEBIJAKAN]
                      </span>
                    )}
                  </strong>
                  <span>
                    Bonus proyek, bonus makan siang, ruang bermain dengan PlayStation, serta alokasi anggaran buku tahunan untuk setiap kru.
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: #benefit (Yang Didapat Sebagai Kru)           */}
        {/* ======================================================== */}
        <section id="benefit" className="py-20 sm:py-28 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Benefit & Fasilitas</span>
              </div>
              <h2 className="font-exo font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Yang kamu dapat sebagai kru
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Dikelompokkan secara transparan tanpa klaim berlebihan. Hanya apa yang benar-benar ada untuk mendukungmu.
              </p>
            </div>

            {/* 5 Kategori Benefit Berbentuk Baris + Chip (Inspirasi Accenture) */}
            <div className="space-y-4">
              
              {/* Row 1: Kesehatan & Keamanan */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900">
                    Kesehatan &amp; Keamanan
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Perlindungan jaminan sosial resmi</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>BPJS Kesehatan</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>BPJS Ketenagakerjaan</span>
                  </span>
                </div>
              </div>

              {/* Row 2: Keseimbangan Kerja */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900">
                    Keseimbangan Kerja
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Waktu istirahat dan penyegaran tim</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100/70 text-blue-900 border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Days out tiap bulan</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100/70 text-blue-900 border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Outing tahunan</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    <span>PlayStation di akhir hari</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    <span>Ruang bermain &amp; sofa istirahat</span>
                  </span>
                </div>
              </div>

              {/* Row 3: Aktif & Sehat */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900">
                    Aktif &amp; Sehat
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kebugaran fisik bersama rekan kerja</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-sky-100/70 text-sky-900 border border-sky-200">
                    <span>Futsal rutin</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-sky-100/70 text-sky-900 border border-sky-200">
                    <span>Badminton rutin</span>
                  </span>
                </div>
              </div>

              {/* Row 4: Belajar & Berkembang */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900">
                    Belajar &amp; Berkembang
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Akselerasi keahlian tanpa henti</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100/70 text-indigo-900 border border-indigo-200">
                    <span>Kursus bahasa Inggris</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100/70 text-indigo-900 border border-indigo-200">
                    <span>Pelatihan online</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    <span>Sharing session internal</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    <span>Seminar eksternal</span>
                  </span>
                  <span
                    data-todo
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      showTodo
                        ? 'bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <span>Anggaran buku tahunan</span>
                    {showTodo && <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded font-bold">[KONFIRMASI]</span>}
                  </span>
                </div>
              </div>

              {/* Row 5: Apresiasi */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900">
                    Apresiasi &amp; Kebersamaan
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Penghargaan atas dedikasi proyek</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span
                    data-todo
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      showTodo
                        ? 'bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400'
                        : 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    <span>Bonus proyek</span>
                    {showTodo && <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded font-bold">[KONFIRMASI]</span>}
                  </span>

                  <span
                    data-todo
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      showTodo
                        ? 'bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400'
                        : 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    <span>Bonus makan siang</span>
                    {showTodo && <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded font-bold">[KONFIRMASI]</span>}
                  </span>

                  <span
                    data-todo
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      showTodo
                        ? 'bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400'
                        : 'bg-emerald-100/70 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    <span>Makan siang bersama tiap Jumat</span>
                    {showTodo && <span className="text-[10px] bg-amber-400 text-slate-900 px-1 rounded font-bold">[KONFIRMASI]</span>}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: #testimoni (Kata Kru)                         */}
        {/* ======================================================== */}
        <section id="testimoni" className="py-20 sm:py-28 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#1793E8] mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>Suara Kru</span>
              </div>
              <h2 className="font-exo font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Kata kru yang sudah bekerja di sini
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Kisah otentik dari rekan-rekan yang menjalani keseharian di berbagai lini divisi.
              </p>
            </div>

            {/* 3 Kolom Desktop / 1 Kolom Mobile (Inspirasi Biznet & Liferay) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Testimoni 1: Nenden (Project Manager) */}
              <figure
                data-todo
                className={`bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                  showTodo ? 'border-2 border-dashed border-amber-400 bg-amber-50/30' : 'hover:border-[#1793E8]/40'
                }`}
              >
                <div>
                  <div className="w-8 h-1 rounded-full bg-[#1793E8] mb-6" />
                  <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    “Radya Labs bukan hanya tempat bekerja, tapi seperti kampus tempat terus belajar. Kami dapat kursus bahasa Inggris, pelatihan online, dan sesi berbagi dari tim maupun pihak luar.”
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1793E8] to-[#29B6F6] text-white font-exo font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                    N
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>Nenden</span>
                      {showTodo && (
                        <span className="text-[9px] bg-amber-400 text-slate-900 px-1 rounded font-extrabold">
                          [KONFIRMASI]
                        </span>
                      )}
                    </div>
                    <small className="text-slate-500 text-xs block">
                      Project Manager · [lama bekerja]
                    </small>
                  </div>
                </figcaption>
              </figure>

              {/* Testimoni 2: Nofri (Finance) */}
              <figure
                data-todo
                className={`bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                  showTodo ? 'border-2 border-dashed border-amber-400 bg-amber-50/30' : 'hover:border-[#29B6F6]/40'
                }`}
              >
                <div>
                  <div className="w-8 h-1 rounded-full bg-[#29B6F6] mb-6" />
                  <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    “Lingkungan kerjanya nyaman, rekan kerja saling mendukung, dan atasan selalu membimbing serta membangun potensi setiap kru.”
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#29B6F6] to-[#43D3A4] text-white font-exo font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                    N
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>Nofri</span>
                      {showTodo && (
                        <span className="text-[9px] bg-amber-400 text-slate-900 px-1 rounded font-extrabold">
                          [KONFIRMASI]
                        </span>
                      )}
                    </div>
                    <small className="text-slate-500 text-xs block">
                      Finance · [lama bekerja]
                    </small>
                  </div>
                </figcaption>
              </figure>

              {/* Testimoni 3: Mobile Developer */}
              <figure
                data-todo
                className={`bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                  showTodo ? 'border-2 border-dashed border-amber-400 bg-amber-50/30' : 'hover:border-[#43D3A4]/40'
                }`}
              >
                <div>
                  <div className="w-8 h-1 rounded-full bg-[#43D3A4] mb-6" />
                  <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    “Manajemennya jelas, koordinasi tim baik, dan CEO-nya peduli dengan kru. Saya senang bertukar pikiran dengan orang-orang yang ahli di bidangnya.”
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0F172A] to-slate-700 text-[#43D3A4] font-exo font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>[Nama Kru]</span>
                      {showTodo && (
                        <span className="text-[9px] bg-amber-400 text-slate-900 px-1 rounded font-extrabold">
                          [KONFIRMASI]
                        </span>
                      )}
                    </div>
                    <small className="text-slate-500 text-xs block">
                      Mobile Developer · [lama bekerja]
                    </small>
                  </div>
                </figcaption>
              </figure>

            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: #lowongan (Filter Lowongan & Empty State)      */}
        {/* ======================================================== */}
        <section id="lowongan" className="py-20 sm:py-28 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#1793E8] mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Peluang Terbuka</span>
              </div>
              <h2 className="font-exo font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Lowongan terbuka
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Pilih divisi untuk menyaring. Kalau belum ada yang cocok, tinggalkan CV dan kami hubungi saat ada posisi yang pas untukmu.
              </p>
            </div>

            {/* Filter Chips per Divisi (Inspirasi Mekari & Nodeflux) */}
            <div
              role="group"
              aria-label="Filter divisi lowongan"
              className="flex flex-wrap gap-2 sm:gap-3 my-8"
            >
              {DIVISIONS.map((division) => {
                const isActive = activeDivision === division;
                return (
                  <button
                    key={division}
                    onClick={() => setActiveDivision(division)}
                    aria-pressed={isActive}
                    className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {division}
                  </button>
                );
              })}
            </div>

            {/* List Lowongan atau Empty State */}
            <div
              id="jobs-container"
              aria-live="polite"
              data-todo
              className={showTodo ? 'p-2 rounded-2xl border-2 border-dashed border-amber-400' : ''}
            >
              {filteredJobs.length > 0 ? (
                <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 px-4 -mx-4 rounded-xl transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-exo font-bold text-lg sm:text-xl text-slate-900">
                            {job.title}
                          </h3>
                          {showTodo && (
                            <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded">
                              [KONFIRMASI DATA]
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-600">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                            {job.division}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#1793E8]">
                            {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{job.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 pt-2 md:pt-0">
                        <a
                          href={getApplyMailto(job.title)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white text-slate-900 border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-xs"
                        >
                          <span>Lamar posisi ini</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State Wajib (Pelajaran dari GITS.ID: Jangan biarkan tanpa aksi) */
                <div className="p-8 sm:p-12 rounded-3xl bg-amber-50/70 border border-amber-200/80 text-slate-900 my-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>Belum ada lowongan aktif</span>
                    </div>
                    <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900">
                      Belum ada lowongan di divisi {activeDivision}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      Kami tetap senang berkenalan! Tinggalkan CV dan portofoliomu, kami masukkan ke <strong className="text-slate-800">daftar minat prioritas</strong> dan akan menghubungimu begitu posisi di divisi ini dibuka.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <a
                      href={getInterestMailto(activeDivision)}
                      className="inline-flex items-center gap-2 bg-[#0F172A] text-white hover:bg-[#1793E8] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Masuk daftar minat</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 7: #proses (Dari Lamaran sampai Bergabung)        */}
        {/* ======================================================== */}
        <section id="proses" className="py-20 sm:py-28 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#1793E8] mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Tahapan Rekrutmen</span>
              </div>
              <h2 className="font-exo font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Dari lamaran sampai bergabung
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Empat tahap rekrutmen dengan estimasi waktu yang transparan dan terukur. Kami menghargai waktumu.
              </p>
            </div>

            {/* 4 Tahap dengan Penomoran Nyata (Inspirasi Mekari & BTS.id) */}
            <ol
              data-todo
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0 ${
                showTodo ? 'p-3 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/20' : ''
              }`}
            >
              {/* Step 1 */}
              <li className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative hover:border-[#1793E8]/50 transition-colors">
                <div>
                  <div className="font-exo font-extrabold text-3xl sm:text-4xl text-[#1793E8] mb-4">
                    01
                  </div>
                  <h3 className="font-exo font-bold text-lg text-slate-900 mb-2">
                    Seleksi CV
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Tim HR membaca CV dan portofolio karya secara teliti, lalu mengabari hasil evaluasinya.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1793E8] border border-blue-100">
                    3–5 hari kerja
                  </span>
                </div>
              </li>

              {/* Step 2 */}
              <li className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative hover:border-[#29B6F6]/50 transition-colors">
                <div>
                  <div className="font-exo font-extrabold text-3xl sm:text-4xl text-[#29B6F6] mb-4">
                    02
                  </div>
                  <h3 className="font-exo font-bold text-lg text-slate-900 mb-2">
                    Tes sesuai posisi
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Uji studi kasus teknis atau review portofolio mendalam, disesuaikan dengan peran yang dilamar.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] border border-sky-100">
                    1 minggu
                  </span>
                </div>
              </li>

              {/* Step 3 */}
              <li className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative hover:border-[#43D3A4]/50 transition-colors">
                <div>
                  <div className="font-exo font-extrabold text-3xl sm:text-4xl text-[#43D3A4] mb-4">
                    03
                  </div>
                  <h3 className="font-exo font-bold text-lg text-slate-900 mb-2">
                    Wawancara
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Ngobrol santai namun mendalam dengan calon pimpinan tim dan rekan kerja masa depanmu.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    1 minggu
                  </span>
                </div>
              </li>

              {/* Step 4 */}
              <li className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative hover:border-slate-800 transition-colors">
                <div>
                  <div className="font-exo font-extrabold text-3xl sm:text-4xl text-slate-800 mb-4">
                    04
                  </div>
                  <h3 className="font-exo font-bold text-lg text-slate-900 mb-2">
                    Penawaran
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Kami mengirimkan penawaran resmi tertulis dan siap menjawab semua pertanyaanmu.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    2–3 hari
                  </span>
                </div>
              </li>
            </ol>

            {/* Ringkasan Estimasi Total */}
            <div data-todo className={`mt-8 p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between flex-wrap gap-3 ${showTodo ? 'border-amber-400 border-dashed bg-amber-50/50' : ''}`}>
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1793E8]" />
                <span>Rata-rata 2–3 minggu dari pengiriman lamaran sampai keputusan penawaran.</span>
              </div>
              {showTodo && (
                <span className="text-[10px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded font-extrabold">
                  [KONFIRMASI: ESTIMASI HR]
                </span>
              )}
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 8: #kontak (CTA Penutup)                         */}
        {/* ======================================================== */}
        <section id="kontak" className="py-20 sm:py-28 bg-[#0F172A] relative overflow-hidden">
          {/* Radial Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radya opacity-20 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#43D3A4] opacity-10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-gradient-to-br from-slate-900/90 via-[#0F172A] to-slate-900/90 border border-slate-700/60 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative">
              
              <div className="max-w-2xl space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-[#29B6F6]">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kanal Kontak Spontan</span>
                </div>

                <h2 className="font-exo font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Belum menemukan posisi yang cocok?
                </h2>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                  Kirimkan CV dan portofolio terbaikmu ke{' '}
                  <code className="bg-slate-800 text-[#29B6F6] font-mono px-2 py-0.5 rounded border border-slate-700 text-sm">
                    join@radyalabs.com
                  </code>
                  . Tulis subjek email:{' '}
                  <code className="bg-slate-800 text-amber-300 font-mono px-2 py-0.5 rounded border border-slate-700 text-sm">
                    Nama – Posisi yang diminati
                  </code>
                  . Tim kami akan menyimpannya dan segera menghubungimu saat ada posisi baru yang relevan.
                </p>

                {/* Tombol Tindakan */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:join@radyalabs.com?subject=Nama%20%E2%80%93%20Posisi%20yang%20diminati"
                    className="inline-flex items-center gap-2 bg-gradient-radya text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Kirim CV spontan</span>
                  </a>

                  <button
                    onClick={copyEmailToClipboard}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm px-5 py-3.5 rounded-full transition-all cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-[#43D3A4]" />
                        <span className="text-[#43D3A4]">Email tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        <span>Salin join@radyalabs.com</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#43D3A4]" />
                  <span>Setiap email yang masuk diperiksa langsung oleh tim People &amp; Culture Radya Labs.</span>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* FOOTER KHAS RADYA LABS                                   */}
      {/* ======================================================== */}
      <footer className="bg-[#0B1120] text-slate-400 border-t border-slate-800/80 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/radya-logo.png"
                alt="Radya Labs"
                width={130}
                height={30}
                className="h-7 w-auto object-contain brightness-110"
              />
              <span className="text-slate-500 font-semibold pl-3 border-l border-slate-700">
                PT Radya Anugrah Digital
              </span>
            </div>

            <div className="flex items-center gap-6 font-semibold text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">
                Beranda
              </Link>
              <Link href="/portofolio" className="hover:text-white transition-colors">
                Portofolio
              </Link>
              <Link href="/insight" className="hover:text-white transition-colors">
                Insight
              </Link>
              <a href="#hero" className="text-[#1793E8] hover:text-white transition-colors">
                Karier
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Jl. Sidomukti No.14 / Jl. Karawitan No.105A, Bandung · info@radyalabs.com</span>
            </div>
            <div>
              © {new Date().getFullYear()} Radya Labs (PT Radya Anugrah Digital). Hak cipta dilindungi undang-undang.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
