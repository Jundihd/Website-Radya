# Dokumentasi Teknis & Panduan Handover Proyek Radya Labs Website

Selamat datang di dokumentasi resmi proyek website **PT Radya Anugrah Digital (Radya Labs)**. Dokumen ini disusun secara terstruktur per bab/section sebagai panduan komprehensif untuk *handover* kepada developer dan anggota tim internal yang akan memelihara, mengembangkan, atau mengelola website ini.

---

## Daftar Isi
1. [Bab 1: Ringkasan Proyek & Tech Stack](#bab-1-ringkasan-proyek--tech-stack)
2. [Bab 2: Arsitektur Halaman Website Utama (Public Site)](#bab-2-arsitektur-halaman-website-utama-public-site)
3. [Bab 3: Halaman Studio Blog & CMS Editor (/studio)](#bab-3-halaman-studio-blog--cms-editor-studio)
4. [Bab 4: Halaman Karir & Manajemen Kru (/career, /id/career, /studio/career)](#bab-4-halaman-karir--manajemen-kru)
5. [Bab 5: Konfigurasi Environment Variables (.env.local)](#bab-5-konfigurasi-environment-variables-envlocal)
6. [Bab 6: Panduan Menjalankan, Build, dan Deployment](#bab-6-panduan-menjalankan-build-dan-deployment)

---

## Bab 1: Ringkasan Proyek & Tech Stack

### 1.1 Profil Proyek
Website Radya Labs adalah platform digital korporat modern untuk mempresentasikan layanan transformasi digital, portofolio solusi *Enterprise*, wawasan teknologi (*Insight/Blog*), serta saluran rekrutmen talenta (*Career*).

### 1.2 Technology Stack
* **Framework:** [Next.js](https://nextjs.org/) v14.2 (App Router architecture)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/) v5.4 (Strict Type Checking)
* **Styling & UI:**
  * [Tailwind CSS](https://tailwindcss.com/) v3.4 (Utility-first styling & tema gradient khas Radya Labs)
  * [Lucide React](https://lucide.dev/) (Koleksi icon modern yang konsisten dan ringan)
  * Headless / Accessible UI patterns (Modals, Drawers, Dropdowns)
* **Content & CMS Architecture:**
  * Git-backed Flat-File CMS: Artikel blog disimpan dalam format Markdown (`content/posts/*.md`) dengan frontmatter `gray-matter`.
  * Data Karir & Testimoni disimpan dalam format JSON terstruktur (`content/careers/jobs.json` & `testimonials.json`).
* **Integrasi AI Tersemat (Studio AI):**
  * Text generation via Google Gemini API / OpenAI SDK.
  * Image generation via Image AI API.
* **Integrasi Notifikasi & Leads:**
  * Webhook Google Apps Script untuk pencatatan otomatis formulir ke Google Sheets & Google Drive.
  * Bot Notifikasi Telegram untuk notifikasi instan kepada tim manajemen/HR.
  * Direct Link WhatsApp interaktif.

### 1.3 Struktur Direktori Utama
```text
radya-labs-nextjs/
├── content/                     # Data CMS lokal (terintegrasi Git)
│   ├── careers/                 # File data posisi lowongan & testimoni kru
│   │   ├── jobs.json
│   │   └── testimonials.json
│   └── posts/                   # File artikel blog (*.md)
├── public/                      # Aset statis publik (logo, gambar tim, icons)
│   ├── images/
│   │   ├── logos/
│   │   └── portfolio/
│   └── uploads/careers/         # Tempat penyimpanan berkas CV pelamar
├── scripts/                     # Script automasi helper (export, zip)
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # Endpoint REST API backend
│   │   │   ├── career/          # API publik lamaran, lowongan, testimoni
│   │   │   ├── contact/         # API form konsultasi proyek
│   │   │   └── studio/          # API admin studio (auth, posts, AI, career)
│   │   ├── career/              # Rute karir kanonikal (EN/Global)
│   │   ├── id/career/           # Rute karir versi Indonesia
│   │   ├── insight/             # Halaman daftar artikel & blog
│   │   ├── portofolio/          # Halaman portofolio studi kasus
│   │   ├── studio/              # Portal CMS Studio Radya Labs
│   │   │   ├── career/          # Dashboard khusus manajemen lowongan & testimoni
│   │   │   └── login/           # Halaman login Studio
│   │   ├── layout.tsx           # Root layout aplikasi
│   │   └── page.tsx             # Halaman Beranda (Landing Page)
│   ├── components/              # Komponen UI modular
│   │   ├── career/              # Modal pendaftaran (CareerApplyModal) & detail lowongan (JobDetailModal)
│   │   └── studio/              # Editor artikel, StudioTabs, CareerAdminDashboard
│   └── lib/                     # Utilitas, koneksi, auth, dan service data
│       ├── career-service.ts    # Service reader/writer lowongan & testimoni
│       ├── company-info.ts      # Informasi profil, kontak, alamat resmi Radya Labs
│       ├── studio-auth.ts       # Helper session login cookie HMAC-SHA256
│       └── studio-git.ts        # Helper commit & push otomatis ke GitHub
├── .env.example                 # Panduan template environment variables
├── package.json
└── tailwind.config.js
```

---

## Bab 2: Arsitektur Halaman Website Utama (Public Site)

### 2.1 Halaman Beranda (`/` dan `/id`)
* **Hero Section:**
  * Headline dinamis menyoroti peran Radya Labs sebagai mitra *Cloud Native & AI Solutions*.
  * Tombol CTA langsung untuk konsultasi proyek dan eksplorasi portofolio.
  * Quick badges: Sertifikasi ISO 27001 dan kemitraan Microsoft.
* **Section Pilar Solusi (Services):**
  * *Cloud Native Architecture* (Microservices, Kubernetes, Azure/AWS).
  * *Enterprise AI Implementation* (LLM Integration, GenAI, Retrieval-Augmented Generation).
  * *High-scale Software Engineering* (Web & Mobile Apps skala perbankan dan BUMN).
  * *UI/UX & Digital Product Design*.
* **Section Portofolio Klien:**
  * Menampilkan proyek unggulan untuk korporasi terkemuka di Indonesia (BCA, Telkomsel, BRI, Pupuk Indonesia, dll.).
* **Footer:**
  * Navigasi global, info hak cipta, serta alamat resmi kantor pusat:  
    *Jl. Karawitan No.105a, Turangga, Bandung*.

### 2.2 Halaman Konsultasi & Alur Form Leads (`/api/contact`)
* **Formulir Konsultasi Proyek:**
  * Input: *Nama Lengkap, Email, Nomor Telepon/WA, Nama Perusahaan, Kategori Layanan, Tahap Pengembangan Proyek, dan Catatan Kebutuhan*.
* **Alur Pemrosesan:**
  1. Validasi input di frontend dan backend.
  2. Pembuatan nomor tiket referensi unik otomatis, format `RL-[5 digit acak]` (contoh: `RL-48912`).
  3. Sinkronisasi data ke Google Sheets melalui URL webhook `GOOGLE_SHEETS_WEBHOOK_URL`.
  4. Pengiriman notifikasi instan ke grup Telegram via `TELEGRAM_BOT_TOKEN` dan `TELEGRAM_CHAT_ID`.
  5. Pengembalian link WhatsApp otomatis untuk memudahkan calon klien melanjutkan obrolan langsung ke Solution Architect.

---

## Bab 3: Halaman Studio Blog & CMS Editor (/studio)

Studio Radya Labs dirancang agar tim media dan *marketing* dapat mengelola konten artikel wawasan (*Insights*) secara fleksibel tanpa memerlukan backend database yang berat.

### 3.1 Sistem Autentikasi Mandiri (`/studio/login`)
* **Mekanisme Keamanan:**
  * Menggunakan session cookie berbasis HMAC-SHA256 bernama `rl_studio_auth`.
  * Ditandatangani menggunakan Web Crypto API, sehingga kompatibel di Edge Middleware maupun Node.js runtime.
  * Masa berlaku sesi login adalah 12 jam.
  * Password admin dikonfigurasi melalui environment variable `BLOG_ADMIN_PASSWORD`.
* **Proteksi Akses:**
  * Seluruh halaman di bawah `/studio/*` (termasuk `/studio/career`) otomatis memeriksa sesi login melalui helper `verifyStudioSession`. Jika tidak valid, pengguna langsung dialihkan ke `/studio/login`.

### 3.2 Direktori & Editor Artikel
* **Direktori Artikel (`/studio`):**
  * Menampilkan daftar seluruh artikel blog yang tersimpan di `content/posts/*.md`.
  * Pencarian instan dan filter berdasarkan status publikasi (*Draft*, *Published*, *Scheduled*).
* **Editor Artikel (Write / Edit):**
  * Metadata lengkap: Judul Bahasa Indonesia & Inggris, Slug URL, Kategori, Nama Penulis, Gambar Sampul (*Cover*), Tag, serta Tanggal & Jam Terbit.
  * Penjadwalan posting otomatis: Artikel dengan tanggal masa depan akan berstatus *Scheduled* dan otomatis tayang pada waktunya.
* **Studio AI Assistant:**
  * Fitur bantuan AI untuk merumuskan outline, menyusun draft artikel, serta membuat ringkasan SEO.
  * Generator gambar AI terintegrasi untuk membuat ilustrasi cover artikel langsung dari Studio.

### 3.3 Sinkronisasi Git Otomatis (`src/lib/studio-git.ts`)
* **Mode Lokal (`npm run dev`):** Menggunakan Git CLI lokal dan akun mesin pengembang untuk membuat commit dan push artikel.
* **Mode Serverless / Vercel:** Karena Vercel memiliki filesystem *read-only*, Studio secara cerdas beralih menggunakan **GitHub REST API** menggunakan `GITHUB_TOKEN` untuk membuat commit langsung ke repositori `Jundihd/Website-Radya` cabang `main`.

---

## Bab 4: Halaman Karir & Manajemen Kru

Halaman Karir telah diperbarui secara menyeluruh berdasarkan masukan dan spesifikasi terbaru.

### 4.1 Halaman Publik Karir (`/career` & `/id/career`)
Komponen utama berada di [`src/app/id/career/CareerClientView.tsx`](file:///c:/Users/Jundi%20HD/.gemini/antigravity/scratch/radya-labs-nextjs/src/app/id/career/CareerClientView.tsx):

#### A. Hero & Fakta Singkat
* Headline: *"Di sini kami bukan karyawan. Kami kru."*
* Tombol CTA:
  * **"Lihat lowongan"**: Menggulir halus ke daftar lowongan kerja terbuka.
  * **"Gabung Talent Pool"**: Membuka langsung modal pop-up formulir pendaftaran untuk pelamar umum.
* Tiga Fakta Cepat:
  1. `8 jam sehari` (sebisa mungkin tanpa lembur).
  2. `50+ kru` (bertumbuh bersama di berbagai disiplin).
  3. `Bandung` (Jl. Karawitan No.105a, Turangga).

#### B. Empat Pilar Budaya Tim (Nilai & Prinsip Sehari-hari)
1. **Ruang untuk bertumbuh**  
   *“Kami menyediakan kesempatan untuk belajar, mencoba hal baru, dan mengembangkan kemampuan melalui pengalaman nyata maupun berbagi pengetahuan.”*  
   *Highlight:* Pelatihan online, sesi berbagi internal, dan eksplorasi teknologi.
2. **Mengutamakan efektivitas, bukan sekedar kesibukan**  
   *“Kami percaya hasil kerja yang baik datang dari fokus, perencanaan, dan kolaborasi yang efektif. Ada kalanya deadline menuntut usaha ekstra, tetapi kami berupaya agar lembur bukan menjadi kebiasaan.”*  
   *Highlight:* Fokus pada hasil terencana tanpa lembur berlarut-larut.
3. **Saling menghargai, tetap profesional**  
   *“Kami percaya kolaborasi yang baik dimulai dari rasa saling menghargai dan menghormati. Kami membangun lingkungan kerja yang terbuka terhadap perbedaan, menjunjung profesionalisme, dan menghargai kontribusi setiap individu. Kami percaya efektifitas kerja tumbuh dari komunikasi yang jujur, sikap saling menghormati, dan kesediaan untuk bertanggung jawab atas pekerjaan masing-masing.”*  
   *Highlight:* Komunikasi jujur, respek mutual, dan tanggung jawab pekerjaan.
4. **Bertumbuh Bersama**  
   *“Kami percaya hasil terbaik datang dari orang-orang yang terbuka untuk belajar, saling mendukung, dan berkolaborasi menyelesaikan tantangan.”*  
   *Highlight:* Kolaboratif, saling mendukung, dan sukses bersama.

#### C. Cerita Kepemimpinan Founder
* Menampilkan foto resmi dan atribusi kepemimpinan Pak **Puja Pramudya** (Co-Founder & CEO Radya Labs).
* Kutipan Utama:  
  > *“Sebagai orang yang punya tanggung jawab dalam memimpin Radya Labs, saya selalu mempunyai keinginan untuk selalu mengutamakan kebahagiaan karyawan (kita sebut kru).”*

#### D. Benefit & Fasilitas Aktual
Kategori fasilitas telah disaring dan diperbarui sesuai kondisi riil:
* **Kesehatan & Jaminan Resmi:** BPJS Kesehatan dan BPJS Ketenagakerjaan.
* **Pola Kerja Fleksibel:** Model kerja Remote / Hybrid adaptif, ritme 8 jam sehari.
* **Pengembangan Kapasitas:** *Learning by Doing* pada proyek enterprise nyata, pelatihan online, dan sesi berbagi internal.
* **Kebugaran & Komunitas:** Badminton rutin bersama kru, budaya saling suportif.
* **Apresiasi & Rekognisi:** Bonus performa dan penyelesaian proyek.

#### E. Testimoni Kru
* Menampilkan kutipan nyata dari kru di berbagai divisi (Project Manager, Finance, Engineering) yang datanya tersinkronisasi dari admin studio.

#### F. Daftar Lowongan & Filter Divisi
* Filter divisi: *Semua, Engineering, Product & Delivery, Sales & Marketing, Finance & Operations*.
* Setiap lowongan memiliki 2 tombol aksi:
  1. **"Lihat Detail"**: Membuka modal ringkasan peran, job description, requirements, dan benefit peran.
  2. **"Lamar posisi ini"**: Membuka modal form pendaftaran dengan posisi otomatis terpilih.

### 4.2 Modal Form Pendaftaran Pelamar (`CareerApplyModal.tsx`)
Komponen pop-up dialog interaktif [`src/components/career/CareerApplyModal.tsx`](file:///c:/Users/Jundi%20HD/.gemini/antigravity/scratch/radya-labs-nextjs/src/components/career/CareerApplyModal.tsx) dengan field sesuai spesifikasi:
* **Posisi yang Dilamar:** Menampilkan judul lowongan yang dipilih.
* **Nama Lengkap:** Input teks wajib.
* **Tahun Pengalaman Bekerja:** Input angka dengan satuan *Tahun*.
* **Jabatan Terakhir:** Input teks jabatan/posisi sebelumnya.
* **Gaji yang Diharapkan:** Format mata uang interaktif (`Rp ...`).
* **Alamat Email:** Validasi format email RFC.
* **Nomor Telepon / WhatsApp:** Validasi nomor Indonesia (+62).
* **Upload CV, Portofolio, atau Cover Letter:**
  * Mendukung drag-and-drop berkas.
  * Format diperbolehkan: `.pdf`, `.doc`, `.docx`.
  * Batas maksimal ukuran berkas: 10 MB.
* **Hasil Pengiriman:**
  * Pelamar menerima nomor referensi resmi (contoh: `RL-CAREER-71928`).
  * Muncul pesan konfirmasi bahwa data lamaran diproses ke tim HR Radya Labs.

### 4.3 Modal Detail Lowongan (`JobDetailModal.tsx`)
Komponen modal dialog [`src/components/career/JobDetailModal.tsx`](file:///c:/Users/Jundi%20HD/.gemini/antigravity/scratch/radya-labs-nextjs/src/components/career/JobDetailModal.tsx) menampilkan:
* Judul posisi, divisi, tipe pekerjaan, model kerja (Hybrid/Remote), lokasi, dan tingkat pengalaman.
* Gambaran umum peran (*Summary*).
* Poin-poin tanggung jawab pekerjaan (*Job Description*).
* Kualifikasi & persyaratan pelamar (*Requirements*).
* Benefit spesifik yang ditawarkan.
* Tombol CTA *"Lamar Posisi Ini"* yang langsung menyambungkan ke form pendaftaran.

### 4.4 Modul Admin Manajemen Karir di Studio (`/studio/career`)
Halaman khusus pengelola berada di [`src/app/studio/career/page.tsx`](file:///c:/Users/Jundi%20HD/.gemini/antigravity/scratch/radya-labs-nextjs/src/app/studio/career/page.tsx) dan [`src/components/studio/CareerAdminDashboard.tsx`](file:///c:/Users/Jundi%20HD/.gemini/antigravity/scratch/radya-labs-nextjs/src/components/studio/CareerAdminDashboard.tsx):
* **Akses & Login:** Menggunakan login terpusat `/studio/login`. Tombol menu **"💼 Karir & Testimoni"** tersedia langsung pada navbar atas Studio.
* **Tab 1: Manajemen Lowongan Kerja:**
  * Toggle status lowongan 1-klik (**Sedang Dibuka** / **Ditutup**).
  * Tombol **Tambah Lowongan Baru** (Modal editor untuk mengisi judul, divisi, tipe, model kerja, ringkasan, tanggung jawab per baris, dan persyaratan per baris).
  * Tombol **Edit** dan **Hapus** lowongan.
* **Tab 2: Manajemen Testimoni Kru:**
  * Tambah kutipan testimoni kru baru (Nama, Jabatan, Lama bekerja, Kutipan).
  * Toggle publikasi (**Tayang** / **Disembunyikan**).
  * Edit dan Hapus testimoni.
* **Penyimpanan:**
  * Data disimpan dalam format JSON di `content/careers/jobs.json` dan `content/careers/testimonials.json` melalui service helper `src/lib/career-service.ts`.

### 4.5 Alur Data Pendaftaran Pelamar (`/api/career/apply`)
Ketika pelamar mengirimkan formulir:
1. File CV diunggah dan disimpan di `public/uploads/careers/` dengan nama aman berawalan nomor referensi.
2. Metadata pelamar diteruskan ke **Google Sheets Webhook** untuk diarsipkan ke spreadsheet dan Google Drive HR.
3. Notifikasi instan dikirimkan ke **Telegram HR Alert** jika bot token terpasang.
4. Data pendaftar siap dialirkan ke email tujuan utama **`join@radyalabs.com`**.

---

## Bab 5: Konfigurasi Environment Variables (.env.local)

Salin berkas `.env.example` menjadi `.env.local` dan sesuaikan nilainya:

```bash
# ==========================================
# 1. Integrasi Google Sheets & Form Leads
# ==========================================
# URL Web App Google Apps Script untuk sinkronisasi form konsultasi & pendaftaran karir
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Target email penerima notifikasi form
NOTIFICATION_EMAIL=join@radyalabs.com,info@radyalabs.com

# ==========================================
# 2. Telegram Bot Instant Alert (Opsional)
# ==========================================
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=-1001234567890

# ==========================================
# 3. WhatsApp Direct Contact Link
# ==========================================
NEXT_PUBLIC_WHATSAPP_NUMBER=628131600130

# ==========================================
# 4. Studio Admin & Autentikasi CMS
# ==========================================
# Password untuk login ke portal /studio/login
BLOG_ADMIN_PASSWORD=buat-password-kuat-di-sini

# Secret string acak untuk HMAC token sesi cookie
STUDIO_SESSION_SECRET=string-acak-panjang-minimal-32-karakter-bebas

# ==========================================
# 5. Studio Git Auto-Push (Wajib untuk Deployment Vercel)
# ==========================================
# GitHub Personal Access Token (PAT) dengan permission: Contents (Read & Write)
GITHUB_TOKEN=ghp_your_github_personal_access_token_here
GITHUB_REPO=Jundihd/Website-Radya
GITHUB_BRANCH=main

# ==========================================
# 6. Studio Scheduler Cron (Opsional)
# ==========================================
CRON_SECRET=string-acak-untuk-otentikasi-vercel-cron

# ==========================================
# 7. Studio AI & Generator Gambar
# ==========================================
STUDIO_AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
STUDIO_AI_MODEL=gemini-3.5-flash-lite

IMAGE_AI_API_KEY=your_image_ai_key_here
IMAGE_AI_BASE_URL=https://aotianzz.xyz
IMAGE_AI_DEFAULT_MODEL=gpt-image-2.5-sunburst-4k
```

---

## Bab 6: Panduan Menjalankan, Build, dan Deployment

### 6.1 Prasyarat Sistem
* **Node.js:** Versi 18.18 atau lebih baru (Disarankan Node.js v20 LTS atau v22 LTS).
* **npm:** Versi 9.x atau 10.x+.
* **Git:** Terinstal pada mesin pengembang.

### 6.2 Menjalankan di Lingkungan Lokal (Development)
1. Buka terminal pada root direktori proyek.
2. Pasang seluruh dependensi:
   ```bash
   npm install
   ```
3. Pastikan berkas `.env.local` sudah dibuat dan memiliki nilai minimal:
   ```bash
   BLOG_ADMIN_PASSWORD=admin-radya-dev
   ```
4. Jalankan development server:
   ```bash
   npm run dev
   ```
5. Akses website pada browser:
   * **Website Utama:** `http://localhost:3000`
   * **Halaman Karir:** `http://localhost:3000/id/career` atau `http://localhost:3000/career`
   * **Studio Admin:** `http://localhost:3000/studio` (Login via `http://localhost:3000/studio/login`)
   * **Manajemen Karir Studio:** `http://localhost:3000/studio/career`

### 6.3 Pengecekan Kualitas & Type Check
Sebelum melakukan commit atau rilis, pastikan tidak ada kesalahan kompilasi TypeScript:
```bash
npx tsc --noEmit
```
Hasil yang diharapkan adalah selesai tanpa ada pesan kesalahan (*zero errors*).

### 6.4 Build Bundle Produksi
Untuk menguji hasil build produksi lokal:
```bash
npm run build
npm run start
```

### 6.5 Panduan Deployment ke Vercel
1. Hubungkan repositori GitHub `Jundihd/Website-Radya` ke proyek di dashboard **Vercel**.
2. Masuk ke **Settings** > **Environment Variables** pada proyek Vercel.
3. Masukkan seluruh variabel dari berkas `.env.local`, terutama:
   * `BLOG_ADMIN_PASSWORD`
   * `STUDIO_SESSION_SECRET`
   * `GITHUB_TOKEN` *(Sangat krusial agar fitur simpan artikel dan lowongan di Vercel dapat membuat commit otomatis ke GitHub)*
   * `GOOGLE_SHEETS_WEBHOOK_URL`
   * `NOTIFICATION_EMAIL`
4. Lakukan **Deploy** / **Redeploy**.
5. Vercel akan otomatis membangun aplikasi dan menyajikannya di URL produksi dengan performa tinggi (ISR, Server Components, dan Edge caching).

---

*Dokumen ini diperbarui secara resmi untuk tim pengembang Radya Labs. Jika terdapat pertanyaan lebih lanjut terkait arsitektur sistem, silakan menghubungi tim Solution Architect Radya Labs.*
