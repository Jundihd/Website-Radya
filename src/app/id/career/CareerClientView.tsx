'use client';

import React, { useState, useEffect } from 'react';
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
  Laptop,
  Flame,
  Award,
} from 'lucide-react';
import { CareerApplyModal } from '@/components/career/CareerApplyModal';
import { JobDetailModal } from '@/components/career/JobDetailModal';
import type { JobListing, CareerTestimonial } from '@/lib/career-service';

const INITIAL_JOBS: JobListing[] = [
  {
    id: 'pm-2026-01',
    slug: 'project-manager',
    title: 'Project Manager',
    division: 'Product & Delivery',
    type: 'Penuh waktu',
    workModel: 'Hybrid',
    location: 'Bandung',
    experienceLevel: '2-4 Tahun',
    isOpen: true,
    postedAt: '2026-02-15',
    summary: 'Memimpin inisiasi, perencanaan, eksekusi, dan delivery proyek solusi digital enterprise berbasis cloud native dan AI bersama tim engineering.',
    responsibilities: [
      'Mengelola timeline, alokasi kru, dan scope pengerjaan proyek enterprise dari awal hingga serah terima.',
      'Menjadi jembatan komunikasi utama antara stakeholder klien dan tim teknis (Engineer, QA, UI/UX).',
      'Memastikan implementasi metode Agile/Scrum berjalan disiplin dan efektif tanpa hambatan birokrasi.',
      'Melakukan mitigasi risiko keterlambatan dan menjaga kepuasan klien sesuai SLA kualitas Radya Labs.',
    ],
    requirements: [
      'Pengalaman minimal 2 tahun sebagai Project Manager / Product Owner di industri software agency atau tech company.',
      'Memahami siklus Software Development Life Cycle (SDLC) dan framework Agile / Scrum.',
      'Memiliki kemampuan komunikasi interpersonal, negosiasi, dan kepemimpinan tim yang matang.',
      'Familiar dengan tools manajemen proyek seperti Jira, Trello, atau ClickUp.',
      'Mampu bekerja efektif dengan sistem kerja kolaboratif Hybrid (Bandung).',
    ],
    benefits: [
      'Sistem kerja fleksibel (Hybrid Bandung)',
      'BPJS Kesehatan & BPJS Ketenagakerjaan',
      'Bonus performa dan penyelesaian proyek',
      'Badminton rutin bersama kru',
    ],
  },
  {
    id: 'se-2026-02',
    slug: 'sales-executive',
    title: 'Sales Executive',
    division: 'Sales & Marketing',
    type: 'Freelance',
    workModel: 'Remote',
    location: 'Bandung / Remote',
    experienceLevel: '1-3 Tahun',
    isOpen: true,
    postedAt: '2026-02-10',
    summary: 'Membuka peluang kemitraan solusi IT, Cloud, dan AI dengan berbagai perusahaan korporasi, BUMN, dan startup berkembang di Indonesia.',
    responsibilities: [
      'Melakukan lead generation, prospecting, dan pendekatan ke calon klien korporat.',
      'Menyusun proposal solusi teknologi bekerja sama dengan solution architect Radya Labs.',
      'Membangun dan memelihara relasi jangka panjang dengan key decision maker (CTO, CIO, VP of IT).',
      'Mencapai target pipeline dan kesepakatan kontrak proyek digital.',
    ],
    requirements: [
      'Pengalaman di bidang B2B Sales, Account Executive, atau Business Development (diutamakan sektor IT/Software).',
      'Kemampuan presentasi dan komunikasi persuasif yang sangat baik.',
      'Memiliki pemahaman dasar mengenai solusi cloud, web application, dan arsitektur enterprise.',
      'Berorientasi pada target, proaktif, dan memiliki jaringan korporat yang luas.',
    ],
    benefits: [
      'Skema komisi menarik tanpa batasan',
      'Waktu kerja fleksibel (Remote / Freelance)',
      'Didukung langsung oleh tim Solution Architect & Engineer',
      'Akses materi promosi & portofolio enterprise lengkap',
    ],
  },
  {
    id: 'smc-2026-03',
    slug: 'social-media-content-creative',
    title: 'Social Media & Content Creative',
    division: 'Sales & Marketing',
    type: 'Magang',
    workModel: 'Hybrid',
    location: 'Bandung',
    experienceLevel: 'Fresh Graduate / Mahasiswa Tingkat Akhir',
    isOpen: true,
    postedAt: '2026-02-01',
    summary: 'Menciptakan konten digital inspiratif, edukatif, dan menarik mengenai inovasi teknologi, budaya kru, dan insight industri Radya Labs.',
    responsibilities: [
      'Membuat konten visual & video pendek (Reels, TikTok, LinkedIn) seputar AI, Cloud Native, dan kehidupan di balik layar Radya Labs.',
      'Menyusun copywriting kreatif dan content calendar bulanan bersama tim marketing.',
      'Menganalisis performa interaksi media sosial dan merumuskan strategi engagement baru.',
      'Mendokumentasikan kegiatan kantor, sharing session kru, dan event teknologi internal.',
    ],
    requirements: [
      'Mahasiswa tingkat akhir atau fresh graduate dari jurusan Komunikasi, DKV, Multimedia, atau bidang relevan.',
      'Kreatif, update dengan tren media sosial terkini, dan antusias dengan dunia teknologi.',
      'Mampu mengoperasikan tools desain/video seperti Canva, CapCut, Adobe Premiere, atau Figma.',
      'Memiliki kemampuan menulis copywriting bahasa Indonesia & Inggris yang komunikatif.',
      'Melampirkan portofolio karya konten media sosial.',
    ],
    benefits: [
      'Uang saku magang kompetitif',
      'Mentoring langsung dari tim Marketing & Creative senior',
      'Peluang direkrut menjadi kru tetap setelah masa magang',
      'Sertifikat magang resmi Radya Labs',
    ],
  },
  {
    id: 'fe-2026-04',
    slug: 'frontend-engineer',
    title: 'Frontend Engineer (React / Next.js)',
    division: 'Engineering',
    type: 'Penuh waktu',
    workModel: 'Hybrid',
    location: 'Bandung',
    experienceLevel: '2-3 Tahun',
    isOpen: true,
    postedAt: '2026-02-18',
    summary: 'Membangun antarmuka aplikasi enterprise modern yang responsif, cepat, aksesibel, dan berstandar industri dengan teknologi React dan Next.js.',
    responsibilities: [
      'Mengembangkan komponen web interaktif berperforma tinggi dengan React, Next.js, dan TypeScript.',
      'Mengintegrasikan antarmuka dengan REST API dan GraphQL.',
      'Bekerja sama dengan UI/UX Designer untuk menerjemahkan wireframe Figma ke kode pixel-perfect.',
      'Melakukan testing dan optimalisasi performa web (Core Web Vitals).',
    ],
    requirements: [
      'Pengalaman minimal 2 tahun dalam pengembangan web frontend modern.',
      'Mahir dalam JavaScript/TypeScript, React.js, Next.js, dan Tailwind CSS.',
      'Memahami prinsip responsive design, accessibility, dan state management.',
      'Terbiasa menggunakan Git, CI/CD, dan kolaborasi tim Agile.',
    ],
    benefits: [
      'Sistem kerja fleksibel (Hybrid Bandung)',
      'BPJS Kesehatan & Ketenagakerjaan',
      'Bonus performa proyek',
      'Badminton rutin kru',
    ],
  },
];

const INITIAL_TESTIMONIALS: CareerTestimonial[] = [
  {
    id: 'testi-01',
    name: 'Nenden',
    role: 'Project Manager',
    tenure: '3 tahun di Radya Labs',
    avatarInitial: 'N',
    avatarColor: 'from-[#1793E8] to-[#29B6F6]',
    quote: 'Radya Labs bukan hanya tempat bekerja, tapi seperti kampus tempat terus bertumbuh. Kami mendapatkan pelatihan online, sesi berbagi internal, dan kesempatan belajar langsung dari proyek-proyek teknologi nyata.',
    isPublished: true,
  },
  {
    id: 'testi-02',
    name: 'Nofri',
    role: 'Finance',
    tenure: '2 tahun di Radya Labs',
    avatarInitial: 'N',
    avatarColor: 'from-[#29B6F6] to-[#43D3A4]',
    quote: 'Lingkungan kerjanya nyaman, rekan kerja saling mendukung, dan ritme kerjanya terencana dengan baik. Para pimpinan selalu membimbing serta membuka ruang seluas-luasnya untuk pengembangan potensi setiap kru.',
    isPublished: true,
  },
  {
    id: 'testi-03',
    name: 'Rian',
    role: 'Senior Software Engineer',
    tenure: '4 tahun di Radya Labs',
    avatarInitial: 'R',
    avatarColor: 'from-[#0F172A] to-slate-700',
    quote: 'Manajemennya jelas, koordinasi tim sangat terbuka, dan kultur saling menghargai terasa nyata setiap hari. Menyenangkan bisa mendiskusikan arsitektur sistem dan tantangan teknologi bersama orang-orang yang berdedikasi.',
    isPublished: true,
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
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Dynamic Data States
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [testimonials, setTestimonials] = useState<CareerTestimonial[]>(INITIAL_TESTIMONIALS);

  // Modals States
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [applyPositionTitle, setApplyPositionTitle] = useState<string>('Talent Pool / General Application');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // Fetch jobs & testimonials from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [jobsRes, testiRes] = await Promise.all([
          fetch('/api/career/jobs'),
          fetch('/api/career/testimonials'),
        ]);

        if (jobsRes.ok) {
          const jData = await jobsRes.json();
          if (jData.jobs && Array.isArray(jData.jobs)) {
            setJobs(jData.jobs);
          }
        }

        if (testiRes.ok) {
          const tData = await testiRes.json();
          if (tData.testimonials && Array.isArray(tData.testimonials)) {
            setTestimonials(tData.testimonials.filter((t: CareerTestimonial) => t.isPublished !== false));
          }
        }
      } catch (err) {
        console.warn('[Career View] Using initial dataset as fallback:', err);
      }
    }
    loadData();
  }, []);

  const openApplyModal = (position = 'Talent Pool / General Application') => {
    setApplyPositionTitle(position);
    setIsApplyModalOpen(true);
  };

  const openJobDetail = (job: JobListing) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const filteredJobs = jobs.filter(
    (job) => (activeDivision === 'Semua' || job.division === activeDivision) && job.isOpen !== false
  );

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('join@radyalabs.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#1793E8] selection:text-white">
      
      {/* Pop-up Modal Form Pendaftaran */}
      <CareerApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        initialPosition={applyPositionTitle}
      />

      {/* Pop-up Modal Detail Pekerjaan (Job Description & Requirements) */}
      <JobDetailModal
        isOpen={isDetailModalOpen}
        job={selectedJob}
        onClose={() => setIsDetailModalOpen(false)}
        onApply={(pos) => openApplyModal(pos)}
      />

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
                
                {/* Brand Logo & Tagline */}
                <div className="flex items-center gap-3 pb-1">
                  <Image
                    src="/images/logos/radya-logo.png"
                    alt="Radya Labs"
                    width={150}
                    height={34}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                  <span className="text-xs font-semibold text-slate-400 pl-3 border-l border-slate-200">
                    Karier &amp; Budaya Kru
                  </span>
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

                  <button
                    onClick={() => openApplyModal('Talent Pool / General Application')}
                    className="inline-flex items-center gap-2 bg-white text-slate-800 border-2 border-slate-200 hover:border-slate-400 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full hover:-translate-y-0.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Gabung Talent Pool</span>
                  </button>
                </div>

                {/* Tiga Fakta Cepat: Diperbarui Sesuai PDF Masukan */}
                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm mb-0.5">
                      <Clock className="w-4 h-4 text-[#1793E8]" />
                      <span>8 jam sehari</span>
                    </div>
                    <p className="text-slate-500">sebisa mungkin tanpa lembur</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm mb-0.5">
                      <Users className="w-4 h-4 text-[#29B6F6]" />
                      <span>50+ kru</span>
                    </div>
                    <p className="text-slate-500">bertumbuh bersama di berbagai disiplin</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm mb-0.5">
                      <MapPin className="w-4 h-4 text-[#43D3A4]" />
                      <span>Bandung</span>
                    </div>
                    <p className="text-slate-500">Jl. Karawitan No.105a, Turangga</p>
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
        {/* SECTION 2: #pilar (Pilar Budaya - 4 Nilai Baru)          */}
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

            {/* Grid 2x2 Garis Tipis Sesuai Masukan PDF Page 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              
              {/* Pilar 1: Ruang untuk bertumbuh */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1793E8] border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Ruang untuk bertumbuh
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Kami menyediakan kesempatan untuk belajar, mencoba hal baru, dan mengembangkan kemampuan melalui pengalaman nyata maupun berbagi pengetahuan.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#1793E8]">
                  Pelatihan online, sesi berbagi internal, dan eksplorasi teknologi
                </div>
              </article>

              {/* Pilar 2: Mengutamakan efektivitas, bukan sekedar kesibukan */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#29B6F6] border border-sky-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Mengutamakan efektivitas, bukan sekedar kesibukan
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Kami percaya hasil kerja yang baik datang dari fokus, perencanaan, dan kolaborasi yang efektif. Ada kalanya deadline menuntut usaha ekstra, tetapi kami berupaya agar lembur bukan menjadi kebiasaan.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-[#29B6F6]">
                  Fokus pada hasil terencana tanpa lembur berlarut-larut
                </div>
              </article>

              {/* Pilar 3: Saling menghargai, tetap profesional */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#43D3A4] border border-emerald-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Saling menghargai, tetap profesional
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Kami percaya kolaborasi yang baik dimulai dari rasa saling menghargai dan menghormati. Kami membangun lingkungan kerja yang terbuka terhadap perbedaan, menjunjung profesionalisme, dan menghargai kontribusi setiap individu. Kami percaya efektifitas kerja tumbuh dari komunikasi yang jujur, sikap saling menghormati, dan kesediaan untuk bertanggung jawab atas pekerjaan masing-masing.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600">
                  Komunikasi jujur, respek mutual, dan tanggung jawab pekerjaan
                </div>
              </article>

              {/* Pilar 4: Bertumbuh Bersama */}
              <article className="bg-white p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0F172A] border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-exo font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                    Bertumbuh Bersama
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Kami percaya hasil terbaik datang dari orang-orang yang terbuka untuk belajar, saling mendukung, dan berkolaborasi menyelesaikan tantangan.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-800">
                  Kolaboratif, saling mendukung, dan sukses bersama
                </div>
              </article>

            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: #cerita (Cerita & Quotes Pak Puja Pramudya)   */}
        {/* ======================================================== */}
        <section id="cerita" className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden">
          {/* Ambient Radial Lights */}
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#1793E8] opacity-15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#43D3A4] opacity-10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Kolom Kiri: Foto Pak Puja Pramudya */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
                  <div className="aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 relative overflow-hidden rounded-2xl">
                    <Image
                      src="/images/satya-radya-discussion.png"
                      alt="Puja Pramudya, Co-Founder & CEO Radya Labs"
                      fill
                      className="object-cover object-center filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-85" />
                    
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300">
                      <div className="flex items-center gap-2 font-bold text-white mb-0.5">
                        <Building className="w-3.5 h-3.5 text-[#29B6F6]" />
                        <span>Puja Pramudya</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Co-Founder &amp; CEO Radya Labs
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Kutipan Baru Pak Puja (Sesuai Halaman 2 PDF) */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-[#29B6F6]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Prinsip Kepemimpinan Kami</span>
                </div>

                <div>
                  <blockquote className="font-raleway font-bold text-xl sm:text-2xl md:text-3xl text-slate-100 leading-snug tracking-tight">
                    “Sebagai orang yang punya tanggung jawab dalam memimpin Radya Labs, saya selalu mempunyai keinginan untuk selalu mengutamakan kebahagiaan karyawan <span className="text-[#29B6F6]">(kita sebut kru)</span>.”
                  </blockquote>
                </div>

                {/* Attribution Resmi */}
                <div className="pt-2 border-t border-slate-800 text-sm">
                  <p className="font-bold text-white flex items-center gap-2">
                    <span>Puja Pramudya</span>
                    <span className="text-slate-400 font-normal">· Co-Founder &amp; CEO Radya Labs</span>
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: #benefit (Yang Didapat Sebagai Kru - Aktual)   */}
        {/* ======================================================== */}
        <section id="benefit" className="py-20 sm:py-28 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Benefit &amp; Fasilitas Kru</span>
              </div>
              <h2 className="font-exo font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Yang kamu dapat sebagai kru
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Dikelompokkan secara transparan dan akurat. Hanya fasilitas yang benar-benar ada untuk mendukung kenyamanan kerjamu.
              </p>
            </div>

            {/* Kategori Benefit Relevan (Sesuai Masukan PDF Page 5) */}
            <div className="space-y-4">
              
              {/* Row 1: Kesehatan & Keamanan */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Kesehatan &amp; Jaminan Resmi</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Perlindungan jaminan sosial ketenagakerjaan</p>
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

              {/* Row 2: Pola Kerja Fleksibel (Baru & Relevan) */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-[#1793E8]" />
                    <span>Pola Kerja Fleksibel</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Keseimbangan dan fleksibilitas ritme kerja</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100/70 text-blue-900 border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5 text-[#1793E8]" />
                    <span>Model Kerja Remote / Hybrid</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100/70 text-blue-900 border border-blue-200">
                    <Clock className="w-3.5 h-3.5 text-[#1793E8]" />
                    <span>Jam kerja efektif 8 jam sehari</span>
                  </span>
                </div>
              </div>

              {/* Row 3: Belajar & Berkembang Nyata */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <span>Pengembangan Kapasitas</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Tumbuh melalui praktik dan proyek riil</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100/70 text-indigo-900 border border-indigo-200">
                    <span>Learning by Doing pada proyek nyata</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100/70 text-indigo-900 border border-indigo-200">
                    <span>Pelatihan online &amp; sharing internal</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    <span>Eksplorasi Cloud Native &amp; AI</span>
                  </span>
                </div>
              </div>

              {/* Row 4: Aktif & Kebugaran */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-sky-600" />
                    <span>Kebugaran &amp; Komunitas</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kegiatan olahraga rutin bersama tim</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-sky-100/70 text-sky-900 border border-sky-200">
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                    <span>Badminton rutin kru</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    <span>Komunitas kerja saling suportif</span>
                  </span>
                </div>
              </div>

              {/* Row 5: Apresiasi Performa */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h3 className="font-exo font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>Apresiasi &amp; Rekognisi</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Penghargaan atas kontribusi proyek</p>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-amber-100/70 text-amber-900 border border-amber-200">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bonus performa &amp; proyek</span>
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

            {/* Testimoni Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testi) => (
                <figure
                  key={testi.id}
                  className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all hover:shadow-md hover:border-[#1793E8]/40"
                >
                  <div>
                    <div className="w-8 h-1 rounded-full bg-[#1793E8] mb-6" />
                    <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                      “{testi.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-100">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${testi.avatarColor || 'from-[#1793E8] to-[#29B6F6]'} text-white font-exo font-bold text-lg flex items-center justify-center shrink-0 shadow-xs`}>
                      {testi.avatarInitial || testi.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {testi.name}
                      </div>
                      <small className="text-slate-500 text-xs block">
                        {testi.role} · {testi.tenure}
                      </small>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: #lowongan (Filter Lowongan & Pop-up Modal)     */}
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
                Pilih divisi untuk menyaring. Klik pada lowongan untuk membaca detail persyaratan dan mengisi formulir pendaftaran.
              </p>
            </div>

            {/* Filter Chips per Divisi */}
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

            {/* List Lowongan */}
            <div id="jobs-container" aria-live="polite">
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
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-slate-600">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                            {job.division}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#1793E8]">
                            {job.type}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700">
                            {job.workModel || 'Hybrid'}
                          </span>
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{job.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2.5 pt-2 md:pt-0">
                        {/* Tombol Lihat Detail */}
                        <button
                          onClick={() => openJobDetail(job)}
                          className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                        >
                          Lihat Detail
                        </button>

                        {/* Tombol Lamar Posisi Ini (Membuka Modal Pop-up) */}
                        <button
                          onClick={() => openApplyModal(job.title)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0F172A] text-white hover:bg-[#1793E8] transition-all shadow-xs cursor-pointer"
                        >
                          <span>Lamar posisi ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State */
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
                    <button
                      onClick={() => openApplyModal(`Talent Pool - Divisi ${activeDivision}`)}
                      className="inline-flex items-center gap-2 bg-[#0F172A] text-white hover:bg-[#1793E8] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Masuk daftar minat</span>
                    </button>
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

            {/* 4 Tahap dengan Penomoran */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
              {/* Step 1 */}
              <li className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative hover:border-[#1793E8]/50 transition-colors">
                <div>
                  <div className="font-exo font-extrabold text-3xl sm:text-4xl text-[#1793E8] mb-4">
                    01
                  </div>
                  <h3 className="font-exo font-bold text-lg text-slate-900 mb-2">
                    Seleksi CV &amp; Form
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Tim People &amp; Culture meninjau formulir pendaftaran dan portofolio secara teliti.
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
                    Uji studi kasus teknis atau review portofolio mendalam sesuai dengan peran yang dilamar.
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
            <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#1793E8]" />
                <span>Rata-rata 2–3 minggu dari pengiriman formulir sampai keputusan penawaran.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 8: #kontak (CTA Penutup / Talent Pool)            */}
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
                  Kirimkan CV dan portofolio terbaikmu via formulir pendaftaran atau email ke{' '}
                  <code className="bg-slate-800 text-[#29B6F6] font-mono px-2 py-0.5 rounded border border-slate-700 text-sm">
                    join@radyalabs.com
                  </code>
                  . Tim kami akan menyimpannya ke dalam <strong className="text-white">Talent Pool</strong> dan segera menghubungimu saat ada posisi baru yang relevan.
                </p>

                {/* Tombol Tindakan */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => openApplyModal('Talent Pool / General Application')}
                    className="inline-flex items-center gap-2 bg-gradient-radya text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Gabung Talent Pool Sekarang</span>
                  </button>

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
                  <span>Setiap berkas yang masuk ditinjau langsung oleh tim People &amp; Culture Radya Labs.</span>
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
              <span>Jl. Karawitan No.105a, Turangga, Bandung · info@radyalabs.com</span>
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
