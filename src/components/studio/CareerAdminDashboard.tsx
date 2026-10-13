'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Users,
  Plus,
  ArrowLeft,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Save,
  X,
  Loader2,
  MapPin,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import type { JobListing, CareerTestimonial } from '@/lib/career-service';

export function CareerAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'jobs' | 'testimonials'>('jobs');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [testimonials, setTestimonials] = useState<CareerTestimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal State for Job
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [jobForm, setJobForm] = useState<{
    id?: string;
    title: string;
    division: string;
    type: string;
    workModel: string;
    location: string;
    experienceLevel: string;
    summary: string;
    responsibilitiesText: string;
    requirementsText: string;
    benefitsText: string;
    isOpen: boolean;
  }>({
    title: '',
    division: 'Engineering',
    type: 'Penuh waktu',
    workModel: 'Hybrid',
    location: 'Bandung',
    experienceLevel: '1-3 Tahun',
    summary: '',
    responsibilitiesText: '',
    requirementsText: '',
    benefitsText: '',
    isOpen: true,
  });

  // Modal State for Testimonial
  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);
  const [editingTesti, setEditingTesti] = useState<CareerTestimonial | null>(null);
  const [testiForm, setTestiForm] = useState<{
    id?: string;
    name: string;
    role: string;
    tenure: string;
    quote: string;
    isPublished: boolean;
  }>({
    name: '',
    role: '',
    tenure: '',
    quote: '',
    isPublished: true,
  });

  // Load Initial Data
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/studio/career');
      if (res.status === 401) {
        router.push('/studio/login');
        return;
      }
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
      if (data.testimonials) setTestimonials(data.testimonials);
    } catch (err) {
      console.error('Failed to load career data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleLogout = async () => {
    await fetch('/api/studio/logout', { method: 'POST' });
    router.push('/studio/login');
    router.refresh();
  };

  // --- JOB ACTIONS ---
  const handleToggleJob = async (jobId: string) => {
    try {
      const res = await fetch('/api/studio/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_job', jobId }),
      });
      const data = await res.json();
      if (data.success && data.jobs) {
        setJobs(data.jobs);
        showNotification('Status lowongan berhasil diperbarui!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewJobModal = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      division: 'Engineering',
      type: 'Penuh waktu',
      workModel: 'Hybrid',
      location: 'Bandung',
      experienceLevel: '1-3 Tahun',
      summary: '',
      responsibilitiesText: '',
      requirementsText: '',
      benefitsText: 'Sistem kerja fleksibel (Hybrid Bandung)\nBPJS Kesehatan & Ketenagakerjaan\nBonus performa proyek\nBadminton rutin kru',
      isOpen: true,
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job: JobListing) => {
    setEditingJob(job);
    setJobForm({
      id: job.id,
      title: job.title,
      division: job.division,
      type: job.type,
      workModel: job.workModel || 'Hybrid',
      location: job.location,
      experienceLevel: job.experienceLevel,
      summary: job.summary,
      responsibilitiesText: (job.responsibilities || []).join('\n'),
      requirementsText: (job.requirements || []).join('\n'),
      benefitsText: (job.benefits || []).join('\n'),
      isOpen: job.isOpen,
    });
    setIsJobModalOpen(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Yakin ingin menghapus posisi lowongan ini?')) return;
    const updated = jobs.filter((j) => j.id !== jobId);
    try {
      const res = await fetch('/api/studio/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_jobs', jobs: updated }),
      });
      if (res.ok) {
        setJobs(updated);
        showNotification('Lowongan berhasil dihapus.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const responsibilities = jobForm.responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const requirements = jobForm.requirementsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const benefits = jobForm.benefitsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = jobForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    let updatedList: JobListing[];
    if (editingJob) {
      updatedList = jobs.map((j) =>
        j.id === editingJob.id
          ? {
              ...j,
              title: jobForm.title,
              slug: slug || j.slug,
              division: jobForm.division,
              type: jobForm.type,
              workModel: jobForm.workModel,
              location: jobForm.location,
              experienceLevel: jobForm.experienceLevel,
              summary: jobForm.summary,
              responsibilities,
              requirements,
              benefits,
              isOpen: jobForm.isOpen,
            }
          : j
      );
    } else {
      const newJob: JobListing = {
        id: `job-${Date.now()}`,
        slug: slug || `posisi-${Date.now()}`,
        title: jobForm.title,
        division: jobForm.division,
        type: jobForm.type,
        workModel: jobForm.workModel,
        location: jobForm.location,
        experienceLevel: jobForm.experienceLevel,
        summary: jobForm.summary,
        responsibilities,
        requirements,
        benefits,
        isOpen: jobForm.isOpen,
        postedAt: new Date().toISOString().split('T')[0],
      };
      updatedList = [newJob, ...jobs];
    }

    try {
      const res = await fetch('/api/studio/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_jobs', jobs: updatedList }),
      });
      if (res.ok) {
        setJobs(updatedList);
        setIsJobModalOpen(false);
        showNotification(editingJob ? 'Perubahan lowongan tersimpan!' : 'Lowongan baru berhasil dibuat!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- TESTIMONIAL ACTIONS ---
  const handleToggleTesti = async (testiId: string) => {
    try {
      const res = await fetch('/api/studio/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_testimonial', testimonialId: testiId }),
      });
      const data = await res.json();
      if (data.success && data.testimonials) {
        setTestimonials(data.testimonials);
        showNotification('Status testimoni diperbarui!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewTestiModal = () => {
    setEditingTesti(null);
    setTestiForm({
      name: '',
      role: '',
      tenure: '',
      quote: '',
      isPublished: true,
    });
    setIsTestiModalOpen(true);
  };

  const openEditTestiModal = (t: CareerTestimonial) => {
    setEditingTesti(t);
    setTestiForm({
      id: t.id,
      name: t.name,
      role: t.role,
      tenure: t.tenure,
      quote: t.quote,
      isPublished: t.isPublished !== false,
    });
    setIsTestiModalOpen(true);
  };

  const handleDeleteTesti = async (testiId: string) => {
    if (!window.confirm('Hapus testimoni ini?')) return;
    const updated = testimonials.filter((t) => t.id !== testiId);
    try {
      const res = await fetch('/api/studio/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_testimonials', testimonials: updated }),
      });
      if (res.ok) {
        setTestimonials(updated);
        showNotification('Testimoni berhasil dihapus.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTesti = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedList: CareerTestimonial[];
    if (editingTesti) {
      updatedList = testimonials.map((t) =>
        t.id === editingTesti.id
          ? {
              ...t,
              name: testiForm.name,
              role: testiForm.role,
              tenure: testiForm.tenure,
              quote: testiForm.quote,
              isPublished: testiForm.isPublished,
            }
          : t
      );
    } else {
      const newTesti: CareerTestimonial = {
        id: `testi-${Date.now()}`,
        name: testiForm.name,
        role: testiForm.role,
        tenure: testiForm.tenure,
        avatarInitial: testiForm.name.charAt(0).toUpperCase() || 'K',
        avatarColor: 'from-[#1793E8] to-[#29B6F6]',
        quote: testiForm.quote,
        isPublished: testiForm.isPublished,
      };
      updatedList = [...testimonials, newTesti];
    }

    try {
      const res = await fetch('/api/studio/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_testimonials', testimonials: updatedList }),
      });
      if (res.ok) {
        setTestimonials(updatedList);
        setIsTestiModalOpen(false);
        showNotification(editingTesti ? 'Testimoni diperbarui!' : 'Testimoni baru ditambahkan!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 font-sans pb-16">
      
      {/* Top Navbar Studio */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0e14]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Studio Utama</span>
            </Link>
            <div className="border-l border-white/10 pl-3">
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Manajemen Karir &amp; Testimoni</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1793E8]/20 text-[#29B6F6]">
                  Admin
                </span>
              </h1>
              <p className="text-[11px] text-slate-500">
                Atur posisi yang dibuka/ditutup dan testimoni kru di radyalabs.com/career
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/id/career"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition"
            >
              <span>Lihat Halaman Publik</span>
              <Eye className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              title="Keluar dari Studio"
              className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        
        {/* Toast Alert */}
        {toastMsg && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-[#1793E8] text-white shadow'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Lowongan Karir ({jobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-[#1793E8] text-white shadow'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Testimoni Kru ({testimonials.length})</span>
            </button>
          </nav>

          <div>
            {activeTab === 'jobs' ? (
              <button
                onClick={openNewJobModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Lowongan Baru</span>
              </button>
            ) : (
              <button
                onClick={openNewTestiModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Testimoni Kru</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Loading State */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#1793E8]" />
            <span className="text-xs">Memuat data karir...</span>
          </div>
        ) : activeTab === 'jobs' ? (
          /* TAB 1: JOBS MANAGEMENT */
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-slate-400 text-sm">
                Belum ada lowongan pekerjaan. Klik "Tambah Lowongan Baru" di atas.
              </div>
            ) : (
              <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.07] transition"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-base text-white">
                          {job.title}
                        </span>
                        
                        {/* Status Badge */}
                        <button
                          onClick={() => handleToggleJob(job.id)}
                          title="Klik untuk mengubah status Buka / Tutup"
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition ${
                            job.isOpen !== false
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${job.isOpen !== false ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          <span>{job.isOpen !== false ? 'Sedang Dibuka' : 'Ditutup'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                        <span className="text-slate-300 font-semibold">{job.division}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.workModel || 'Hybrid'}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.experienceLevel}</span>
                      </div>
                      
                      <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                        {job.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                      {/* Toggle Quick Button */}
                      <button
                        onClick={() => handleToggleJob(job.id)}
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                      >
                        {job.isOpen !== false ? 'Tutup Lowongan' : 'Buka Lowongan'}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => openEditJobModal(job)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-[#1793E8] text-slate-300 hover:text-white transition cursor-pointer"
                        title="Edit detail lowongan"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 rounded-lg bg-white/10 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
                        title="Hapus lowongan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* TAB 2: TESTIMONIALS MANAGEMENT */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${testi.avatarColor || 'from-[#1793E8] to-[#29B6F6]'} text-white font-bold text-xs flex items-center justify-center`}>
                        {testi.avatarInitial || testi.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="block text-sm text-white font-bold">
                          {testi.name}
                        </strong>
                        <small className="text-xs text-slate-400">
                          {testi.role} · {testi.tenure}
                        </small>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleTesti(testi.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition ${
                        testi.isPublished !== false
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}
                    >
                      {testi.isPublished !== false ? 'Tayang' : 'Disembunyikan'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    “{testi.quote}”
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={() => openEditTestiModal(testi)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-[#1793E8] text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTesti(testi.id)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL EDIT / TAMBAH LOWONGAN */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsJobModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#111622] rounded-3xl p-6 sm:p-7 border border-white/10 z-10 my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="font-bold text-lg text-white">
                {editingJob ? `Edit: ${editingJob.title}` : 'Tambah Lowongan Baru'}
              </h3>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Judul Posisi
                </label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="cth. Senior Cloud Architect"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#1793E8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Divisi
                  </label>
                  <select
                    value={jobForm.division}
                    onChange={(e) => setJobForm({ ...jobForm, division: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Delivery">Product & Delivery</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Finance & Operations">Finance & Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Tipe Pekerjaan
                  </label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="Penuh waktu">Penuh waktu</option>
                    <option value="Kontrak">Kontrak</option>
                    <option value="Magang">Magang</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Model Kerja
                  </label>
                  <select
                    value={jobForm.workModel}
                    onChange={(e) => setJobForm({ ...jobForm, workModel: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b0e14] border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="Bandung"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Pengalaman
                  </label>
                  <input
                    type="text"
                    value={jobForm.experienceLevel}
                    onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}
                    placeholder="cth. 2-4 Tahun"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Ringkasan Posisi (Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={jobForm.summary}
                  onChange={(e) => setJobForm({ ...jobForm, summary: e.target.value })}
                  placeholder="Ringkasan tugas dan misi posisi ini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#1793E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Tanggung Jawab (1 baris per butir)
                </label>
                <textarea
                  rows={3}
                  value={jobForm.responsibilitiesText}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilitiesText: e.target.value })}
                  placeholder="Mengelola arsitektur...&#10;Melakukan code review...&#10;Koordinasi dengan klien..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#1793E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Persyaratan / Kualifikasi (1 baris per butir)
                </label>
                <textarea
                  rows={3}
                  value={jobForm.requirementsText}
                  onChange={(e) => setJobForm({ ...jobForm, requirementsText: e.target.value })}
                  placeholder="Minimal 2 tahun pengalaman...&#10;Menguasai TypeScript &amp; Next.js...&#10;Mampu bekerja dalam tim..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#1793E8]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isOpenCheck"
                  checked={jobForm.isOpen}
                  onChange={(e) => setJobForm({ ...jobForm, isOpen: e.target.checked })}
                  className="rounded border-white/10 text-[#1793E8] focus:ring-0"
                />
                <label htmlFor="isOpenCheck" className="text-xs font-bold text-white cursor-pointer">
                  Buka lowongan ini untuk publik
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1793E8] hover:bg-sky-400 text-white font-bold text-xs shadow"
                >
                  Simpan Lowongan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EDIT / TAMBAH TESTIMONI */}
      {isTestiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsTestiModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#111622] rounded-3xl p-6 border border-white/10 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-bold text-base text-white">
                {editingTesti ? `Edit Testimoni: ${editingTesti.name}` : 'Tambah Testimoni Kru'}
              </h3>
              <button
                onClick={() => setIsTestiModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTesti} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Nama Kru
                </label>
                <input
                  type="text"
                  required
                  value={testiForm.name}
                  onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })}
                  placeholder="cth. Nenden"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Role / Jabatan
                  </label>
                  <input
                    type="text"
                    required
                    value={testiForm.role}
                    onChange={(e) => setTestiForm({ ...testiForm, role: e.target.value })}
                    placeholder="Project Manager"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Lama Bekerja
                  </label>
                  <input
                    type="text"
                    required
                    value={testiForm.tenure}
                    onChange={(e) => setTestiForm({ ...testiForm, tenure: e.target.value })}
                    placeholder="3 tahun di Radya Labs"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Kutipan Testimoni (Quote)
                </label>
                <textarea
                  rows={4}
                  required
                  value={testiForm.quote}
                  onChange={(e) => setTestiForm({ ...testiForm, quote: e.target.value })}
                  placeholder="Kesan dan pengalaman bekerja di Radya Labs..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isTestiPublished"
                  checked={testiForm.isPublished}
                  onChange={(e) => setTestiForm({ ...testiForm, isPublished: e.target.checked })}
                  className="rounded border-white/10 text-[#1793E8]"
                />
                <label htmlFor="isTestiPublished" className="text-xs font-bold text-white cursor-pointer">
                  Tampilkan di halaman karir publik
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTestiModalOpen(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1793E8] text-white font-bold text-xs"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
