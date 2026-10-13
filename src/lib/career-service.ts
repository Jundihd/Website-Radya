import fs from 'fs';
import path from 'path';

export interface JobListing {
  id: string;
  slug: string;
  title: string;
  division: string;
  type: string;
  workModel: string;
  location: string;
  experienceLevel: string;
  isOpen: boolean;
  postedAt: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface CareerTestimonial {
  id: string;
  name: string;
  role: string;
  tenure: string;
  avatarInitial?: string;
  avatarColor?: string;
  avatarImage?: string;
  quote: string;
  isPublished: boolean;
}

const JOBS_FILE_PATH = path.join(process.cwd(), 'content', 'careers', 'jobs.json');
const TESTIMONIALS_FILE_PATH = path.join(process.cwd(), 'content', 'careers', 'testimonials.json');

const DEFAULT_JOBS: JobListing[] = [
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

const DEFAULT_TESTIMONIALS: CareerTestimonial[] = [
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

export async function getCareerJobs(): Promise<JobListing[]> {
  try {
    if (fs.existsSync(JOBS_FILE_PATH)) {
      const raw = fs.readFileSync(JOBS_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[career-service] Error reading jobs.json:', err);
  }
  return DEFAULT_JOBS;
}

export async function saveCareerJobs(jobs: JobListing[]): Promise<boolean> {
  try {
    const dir = path.dirname(JOBS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[career-service] Error writing jobs.json:', err);
    return false;
  }
}

export async function getCareerTestimonials(): Promise<CareerTestimonial[]> {
  try {
    if (fs.existsSync(TESTIMONIALS_FILE_PATH)) {
      const raw = fs.readFileSync(TESTIMONIALS_FILE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[career-service] Error reading testimonials.json:', err);
  }
  return DEFAULT_TESTIMONIALS;
}

export async function saveCareerTestimonials(testimonials: CareerTestimonial[]): Promise<boolean> {
  try {
    const dir = path.dirname(TESTIMONIALS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TESTIMONIALS_FILE_PATH, JSON.stringify(testimonials, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[career-service] Error writing testimonials.json:', err);
    return false;
  }
}
