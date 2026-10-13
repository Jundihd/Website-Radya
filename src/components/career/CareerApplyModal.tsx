'use client';

import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
  Mail,
  User,
  Phone,
  DollarSign,
  Clock,
} from 'lucide-react';

interface CareerApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPosition?: string;
}

export const CareerApplyModal: React.FC<CareerApplyModalProps> = ({
  isOpen,
  onClose,
  initialPosition = 'Talent Pool / General Application',
}) => {
  const [fullName, setFullName] = useState('');
  const [experienceYears, setExperienceYears] = useState('0');
  const [lastJobTitle, setLastJobTitle] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positionTitle, setPositionTitle] = useState(initialPosition);
  const [file, setFile] = useState<File | null>(null);
  const [fileDragActive, setFileDragActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initialPosition when modal opened
  React.useEffect(() => {
    if (initialPosition) {
      setPositionTitle(initialPosition);
    }
  }, [initialPosition]);

  if (!isOpen) return null;

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    if (!rawVal) {
      setExpectedSalary('');
      return;
    }
    const formatted = new Intl.NumberFormat('id-ID').format(Number(rawVal));
    setExpectedSalary(`Rp ${formatted}`);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setErrorMsg(null);
    const validExts = ['.pdf', '.doc', '.docx'];
    const nameLower = selectedFile.name.toLowerCase();
    const isValid = validExts.some((ext) => nameLower.endsWith(ext));

    if (!isValid) {
      setErrorMsg('Hanya berkas berformat PDF, DOC, atau DOCX yang diperbolehkan.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg('Ukuran berkas maksimal adalah 10 MB.');
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Nama lengkap wajib diisi.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Alamat email valid wajib diisi.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Nomor telepon / WhatsApp wajib diisi.');
      return;
    }
    if (!file) {
      setErrorMsg('Silakan unggah berkas CV / Portofolio Anda.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('experienceYears', experienceYears);
      formData.append('lastJobTitle', lastJobTitle);
      formData.append('expectedSalary', expectedSalary);
      formData.append('email', email);
      formData.append('phone', phone.startsWith('+') ? phone : `+62 ${phone.replace(/^0+/, '')}`);
      formData.append('positionTitle', positionTitle);
      formData.append('cvFile', file);

      const res = await fetch('/api/career/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal mengirimkan formulir lamaran.');
      }

      setSubmittedRefId(data.referenceId || 'RL-CAREER-SUCCESS');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi gangguan koneksi. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedRefId(null);
    setFullName('');
    setExperienceYears('0');
    setLastJobTitle('');
    setExpectedSalary('');
    setEmail('');
    setPhone('');
    setFile(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Modal */}
        <div className="bg-[#0F172A] text-white p-6 sm:p-7 relative border-b border-slate-800">
          <button
            onClick={handleResetAndClose}
            aria-label="Tutup formulir"
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1793E8]/20 text-[#29B6F6] text-xs font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Formulir Pendaftaran Kru</span>
          </div>

          <h3 className="font-exo font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            {submittedRefId ? 'Lamaran Terkirim!' : `Lamar: ${positionTitle}`}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Data dan berkas lamaran Anda akan dikirimkan langsung ke tim People &amp; Culture Radya Labs.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          {submittedRefId ? (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-exo font-bold text-xl text-slate-900">
                  Terima Kasih, {fullName}!
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
                  Lamaran kerja Anda untuk posisi <strong className="text-slate-800">{positionTitle}</strong> telah kami terima.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor Referensi:</span>
                  <strong className="font-mono text-slate-900">{submittedRefId}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email Tujuan:</span>
                  <span className="text-blue-600 font-semibold">join@radyalabs.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-600 font-semibold">Tersimpan dalam antrean seleksi</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Tim People &amp; Culture kami akan meninjau CV Anda dalam 3–5 hari kerja.
              </p>

              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-3 rounded-full bg-[#0F172A] hover:bg-[#1793E8] text-white font-bold text-sm transition-all shadow-md"
              >
                Selesai &amp; Tutup
              </button>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Posisi Terpilih (Hidden atau Readonly display) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Posisi yang Dilamar
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-sm font-semibold">
                  <Briefcase className="w-4 h-4 text-[#1793E8]" />
                  <span>{positionTitle}</span>
                </div>
              </div>

              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap Anda"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Grid 2 Kolom: Tahun Pengalaman & Jabatan Terakhir */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tahun Pengalaman Bekerja
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-14 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8] focus:border-transparent transition-all"
                    />
                    <span className="absolute right-3.5 text-xs font-semibold text-slate-400 pointer-events-none">
                      Tahun
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Jabatan Terakhir
                  </label>
                  <input
                    type="text"
                    value={lastJobTitle}
                    onChange={(e) => setLastJobTitle(e.target.value)}
                    placeholder="cth. Software Engineer / Mahasiswa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Gaji yang Diharapkan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Gaji yang Diharapkan
                </label>
                <input
                  type="text"
                  value={expectedSalary}
                  onChange={handleSalaryChange}
                  placeholder="Rp 0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1793E8] focus:border-transparent transition-all"
                />
              </div>

              {/* Grid 2 Kolom: Email & Nomor Telepon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-bold text-slate-500 pointer-events-none">
                      +62
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/^(\+62|0)/, ''))}
                      placeholder="8123456789"
                      className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1793E8] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Upload CV Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CV, Portofolio, dan/atau Cover Letter <span className="text-red-500">*</span>
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setFileDragActive(true);
                  }}
                  onDragLeave={() => setFileDragActive(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    fileDragActive
                      ? 'border-[#1793E8] bg-sky-50/50'
                      : file
                      ? 'border-emerald-400 bg-emerald-50/30'
                      : 'border-slate-300 hover:border-[#1793E8] bg-slate-50/50'
                  }`}
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-slate-900 truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {Math.round(file.size / 1024)} KB · Klik untuk mengganti berkas
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1793E8] flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-xs uppercase tracking-wide">
                          Upload File
                        </span>
                        <p className="text-xs text-slate-500 mt-2">
                          atau seret dan lepas berkas Anda ke sini (PDF, DOCX maks. 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-radya hover:brightness-110 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirimkan Lamaran...</span>
                    </>
                  ) : (
                    <span>Kirim Lamaran Sekarang</span>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Dengan mengirimkan formulir ini, Anda menyetujui evaluasi berkas oleh tim HR Radya Labs.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
