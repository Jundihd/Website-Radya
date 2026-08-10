import {
  StatItem,
  ServiceItem,
  CaseStudy,
  CoreValue,
  IndustryItem,
  TechCategory,
  ProcessStep,
  Testimonial,
  InsightArticle,
  FaqItem
} from '@/types';

export const HERO_STATS: StatItem[] = [
  {
    id: 'exp',
    value: '15+',
    numberValue: 15,
    suffix: '+',
    label: { ID: 'Tahun Pengalaman', EN: 'Years Experience' },
    iconName: 'Award'
  },
  {
    id: 'team',
    value: '100+',
    numberValue: 100,
    suffix: '+',
    label: { ID: 'Karyawan Ahli', EN: 'Expert Engineers' },
    iconName: 'Users'
  },
  {
    id: 'projects',
    value: '200+',
    numberValue: 200,
    suffix: '+',
    label: { ID: 'Proyek Sukses', EN: 'Successful Projects' },
    iconName: 'CheckCircle2'
  },
  {
    id: 'clients',
    value: '100+',
    numberValue: 100,
    suffix: '+',
    label: { ID: 'Klien Terpercaya', EN: 'Trusted Clients' },
    iconName: 'Building2'
  }
];

export const TRUSTED_COMPANIES = [
  { name: 'Danone', category: 'Enterprise', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80', tag: 'F&B FMCG' },
  { name: 'Nestlé', category: 'Enterprise', logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=300&auto=format&fit=crop&q=80', tag: 'Global FMCG' },
  { name: 'BINUS University', category: 'Education', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&auto=format&fit=crop&q=80', tag: 'Education Leader' },
  { name: 'Mitsubishi Motors', category: 'Enterprise', logo: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&auto=format&fit=crop&q=80', tag: 'Automotive' },
  { name: 'Kompas Gramedia', category: 'Enterprise', logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=80', tag: 'Media & Retail' },
  { name: 'Trans7', category: 'Enterprise', logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=80', tag: 'Broadcasting' },
  { name: 'kata.ai', category: 'Technology', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80', tag: 'Conversational AI' },
  { name: 'DGNONE', category: 'Technology', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=80', tag: 'Digital Media' },
  { name: 'Kemendikbudristek', category: 'Government', logo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&auto=format&fit=crop&q=80', tag: 'Public Sector' },
  { name: 'PT Antareja', category: 'Logistics', logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop&q=80', tag: 'Logistics & Express' }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'cloud-native',
    title: { ID: 'Cloud Native Development', EN: 'Cloud Native Development' },
    description: {
      ID: 'Membangun aplikasi modern yang scalable, secure, dan siap untuk masa depan menggunakan arsitektur microservices dan Kubernetes.',
      EN: 'Building modern, scalable, secure, and future-proof applications leveraging microservices and Kubernetes infrastructure.'
    },
    iconName: 'Cloud',
    tags: ['Kubernetes', 'Docker', 'Microservices', 'Serverless'],
    gradient: 'from-[#1793E8] to-[#29B6F6]',
    features: [
      { ID: 'Arsitektur Microservices & Event-driven', EN: 'Microservices & Event-driven Architecture' },
      { ID: 'Kubernetes Container Orchestration', EN: 'Kubernetes Container Orchestration' },
      { ID: 'Serverless Application Development', EN: 'Serverless Application Development' },
      { ID: 'High-Availability Cloud Migration', EN: 'High-Availability Cloud Migration' }
    ]
  },
  {
    id: 'ai-solutions',
    title: { ID: 'AI Solutions', EN: 'AI & Machine Learning Solutions' },
    description: {
      ID: 'Solusi AI praktis untuk mengotomatisasi proses bisnis, OCR cerdas, dan menghasilkan insight berharga dari data enterprise.',
      EN: 'Practical AI solutions to automate business workflows, intelligent OCR, LLM fine-tuning, and actionable enterprise analytics.'
    },
    iconName: 'Cpu',
    tags: ['Generative AI', 'Computer Vision', 'LLM', 'Predictive AI'],
    gradient: 'from-[#29B6F6] to-[#43D3A4]',
    features: [
      { ID: 'Enterprise OCR & Document Intelligence', EN: 'Enterprise OCR & Document Intelligence' },
      { ID: 'Generative AI & Custom LLM Chatbots', EN: 'Generative AI & Custom LLM Chatbots' },
      { ID: 'Predictive Analytics & Forecasting', EN: 'Predictive Analytics & Forecasting' },
      { ID: 'NLP & Automated Sentiment Analysis', EN: 'NLP & Automated Sentiment Analysis' }
    ]
  },
  {
    id: 'digital-transform',
    title: { ID: 'Digital Transformation', EN: 'Digital Transformation' },
    description: {
      ID: 'Pendampingan transformasi digital menyeluruh untuk mendorong inovasi, efisiensi operasional, dan daya saing pasar.',
      EN: 'End-to-end digital transformation consulting to drive innovation, operational velocity, and market competitiveness.'
    },
    iconName: 'Zap',
    tags: ['Enterprise System', 'Workflow Automation', 'Strategy'],
    gradient: 'from-[#1793E8] to-[#43D3A4]',
    features: [
      { ID: 'Modernisasi Legacy System', EN: 'Legacy System Modernization' },
      { ID: 'Otomatisasi Workflow Process (BPA)', EN: 'Business Process Automation (BPA)' },
      { ID: 'Integrasi API & Ecosystem Integration', EN: 'API & Ecosystem Integration' },
      { ID: 'Roadmap & Architecture Blueprint', EN: 'Roadmap & Architecture Blueprint' }
    ]
  },
  {
    id: 'devops-infra',
    title: { ID: 'DevOps & Infrastructure', EN: 'DevOps & Infrastructure' },
    description: {
      ID: 'Infrastruktur modern, aman, dan andal untuk mendukung otomatisasi CI/CD dan performa tinggi skala enterprise.',
      EN: 'Modern, secure, and reliable infrastructure supporting automated CI/CD pipelines and high-concurrency uptime.'
    },
    iconName: 'Server',
    tags: ['Terraform', 'CI/CD', 'AWS', 'GCP', 'Azure'],
    gradient: 'from-[#29B6F6] to-[#1793E8]',
    features: [
      { ID: 'Infrastructure as Code (IaC) Terraform', EN: 'Infrastructure as Code (IaC) Terraform' },
      { ID: 'Automated CI/CD Pipeline Setup', EN: 'Automated CI/CD Pipeline Setup' },
      { ID: 'Multi-cloud & Hybrid Operations', EN: 'Multi-cloud & Hybrid Operations' },
      { ID: '24/7 Monitoring & Incident Escalation', EN: '24/7 Monitoring & Incident Escalation' }
    ]
  },
  {
    id: 'uiux-design',
    title: { ID: 'UI/UX Design & Product', EN: 'UI/UX Design & Product Strategy' },
    description: {
      ID: 'Desain pengalaman pengguna yang intuitif, estetis, dan berdampak langsung pada conversion rate serta kepuasan pengguna.',
      EN: 'Intuitive, accessible, human-centered UI/UX design optimized for conversion rates and user adoption.'
    },
    iconName: 'Layout',
    tags: ['Design System', 'User Research', 'Prototyping', 'CRO'],
    gradient: 'from-[#43D3A4] to-[#1793E8]',
    features: [
      { ID: 'Enterprise Design Systems & UI Kits', EN: 'Enterprise Design Systems & UI Kits' },
      { ID: 'User Journey Mapping & Research', EN: 'User Journey Mapping & Research' },
      { ID: 'Interactive High-Fidelity Prototypes', EN: 'Interactive High-Fidelity Prototypes' },
      { ID: 'Usability Testing & CRO Optimization', EN: 'Usability Testing & CRO Optimization' }
    ]
  },
  {
    id: 'mobile-web',
    title: { ID: 'Mobile & Web Development', EN: 'Mobile & Web Development' },
    description: {
      ID: 'Pengembangan aplikasi mobile iOS/Android dan portal web performa tinggi dengan standar keamanan dan respon instan.',
      EN: 'High-performance native/cross-platform mobile apps and progressive web portals engineered for maximum security.'
    },
    iconName: 'Smartphone',
    tags: ['React Native', 'Flutter', 'Next.js', 'iOS', 'Android'],
    gradient: 'from-[#1793E8] to-[#29B6F6]',
    features: [
      { ID: 'Cross-platform Mobile Development', EN: 'Cross-platform Mobile Development' },
      { ID: 'Progressive Web Apps (PWA)', EN: 'Progressive Web Apps (PWA)' },
      { ID: 'High-Throughput API Gateway', EN: 'High-Throughput API Gateway' },
      { ID: 'Offline-First Data Syncing', EN: 'Offline-First Data Syncing' }
    ]
  },
  {
    id: 'it-outsourcing',
    title: { ID: 'IT Outsourcing & Dedicated Teams', EN: 'IT Resource Augmentation' },
    description: {
      ID: 'Tim engineer dedicated siap pakai yang ahli dalam teknologi terkini untuk mempercepat timeline pengembangan produk Anda.',
      EN: 'On-demand dedicated senior engineering pods to rapidly scale your technical roadmap and delivery velocity.'
    },
    iconName: 'Users',
    tags: ['Dedicated Engineers', 'Agile Pods', 'Scale Up'],
    gradient: 'from-[#29B6F6] to-[#43D3A4]',
    features: [
      { ID: 'Senior Full-stack & Cloud Engineers', EN: 'Senior Full-stack & Cloud Engineers' },
      { ID: 'Agile Scrum Pods with PM', EN: 'Agile Scrum Pods with PM' },
      { ID: 'Flexible Augmentation Models', EN: 'Flexible Augmentation Models' },
      { ID: 'Seamless Team Integration', EN: 'Seamless Team Integration' }
    ]
  },
  {
    id: 'product-engineering',
    title: { ID: 'Product Engineering', EN: 'Full Lifecycle Product Engineering' },
    description: {
      ID: 'Pengembangan produk software dari ideasi, arsitektur, hingga peluncuran komersial dengan standar standar enterprise.',
      EN: 'Full lifecycle software product engineering from conceptual discovery through architecture, QA, and market launch.'
    },
    iconName: 'Layers',
    tags: ['MVP Development', 'SaaS Architecture', 'Scale'],
    gradient: 'from-[#43D3A4] to-[#29B6F6]',
    features: [
      { ID: 'SaaS Platform Multi-tenancy', EN: 'SaaS Platform Multi-tenancy' },
      { ID: 'Enterprise MVP to Scale Strategy', EN: 'Enterprise MVP to Scale Strategy' },
      { ID: 'Continuous Quality Assurance', EN: 'Continuous Quality Assurance' },
      { ID: 'Security Auditing & SLA Support', EN: 'Security Auditing & SLA Support' }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'danone-orderen',
    client: 'Danone Indonesia',
    logo: 'DANONE',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80',
    category: { ID: 'CLOUD NATIVE & B2B', EN: 'CLOUD NATIVE & B2B' },
    title: {
      ID: 'ORDERen — Sistem Pemesanan B2B Terintegrasi Danone',
      EN: 'ORDERen — Integrated B2B Ordering Platform for Danone'
    },
    summary: {
      ID: 'Sistem pemesanan B2B terintegrasi untuk ratusan outlet distributor Danone di seluruh Indonesia dengan otomatisasi pemrosesan order dan ERP.',
      EN: 'An integrated distributor B2B ordering platform serving hundreds of retail outlets across Indonesia with automated ERP fulfillment.'
    },
    challenge: {
      ID: 'Proses pemesanan manual dari ratusan outlet distributor menyebabkan penundaan pengiriman, human error dalam pencatatan stok, serta keterbatasan visibilitas real-time.',
      EN: 'Manual ordering workflows across nationwide distributors caused fulfillment lag, stock reconciliation errors, and limited real-time supply chain telemetry.'
    },
    solution: {
      ID: 'Radya Labs merancang platform ORDERen berbasis cloud native microservices yang memfasilitasi pemesanan multi-channel, otomatisasi validasi stok, dan sinkronisasi ERP.',
      EN: 'Radya Labs architected the cloud-native ORDERen platform supporting multi-channel ordering, automated inventory verification, and seamless enterprise ERP synchronization.'
    },
    metrics: [
      { value: '+40%', label: { ID: 'Efisiensi Operasional', EN: 'Operational Efficiency' } },
      { value: '+30%', label: { ID: 'Pertumbuhan Order', EN: 'Order Volume Growth' } },
      { value: '100%', label: { ID: 'Akurasi Inventaris', EN: 'Inventory Accuracy' } }
    ],
    tags: ['Cloud Native', 'B2B Microservices', 'Supply Chain', 'Enterprise ERP'],
    industry: 'FMCG & Supply Chain'
  },
  {
    id: 'pusmendik-anbk',
    client: 'Pusmendik Kemendikbudristek',
    logo: 'PUSMENDIK',
    image: 'https://admin.radyalabs.com/assets/1cfa7fe1-685a-47d5-abc8-6dadb524fd3e',
    category: { ID: 'PUBLIC SECTOR PLATFORM', EN: 'PUBLIC SECTOR PLATFORM' },
    title: {
      ID: 'ANBK — Asesmen Nasional Berbasis Komputer Kemendikbudristek',
      EN: 'ANBK — Computer-Based National Assessment Platform'
    },
    summary: {
      ID: 'Platform ujian nasional berbasis komputer yang memfasilitasi pelaksanaan Asesmen Nasional untuk jutaan siswa SD, SMP, SMA & SMK di Indonesia.',
      EN: 'Nationwide computer-based assessment platform powering national examinations for millions of elementary to high school students.'
    },
    challenge: {
      ID: 'Peniadaan Ujian Nasional menuntut sistem baru yang mampu menangani jutaan peserta tes serentak dengan kestabilan tinggi tanpa server downtime.',
      EN: 'The abolition of traditional national exams required a new high-concurrency architecture capable of handling millions of simultaneous test takers.'
    },
    solution: {
      ID: 'Pengembangan aplikasi ANBK berarsitektur distributed cloud yang mengelola proktor, penjadwalan soal, dan sinkronisasi nilai tes secara real-time.',
      EN: 'Development of the ANBK platform leveraging distributed cloud infrastructure for proctor management, test scheduling, and instant result aggregation.'
    },
    metrics: [
      { value: 'Jutaan', label: { ID: 'Peserta Ujian', EN: 'Test Candidates' } },
      { value: '100%', label: { ID: 'Sekolah Terhubung', EN: 'Schools Connected' } },
      { value: '99.99%', label: { ID: 'Ketersediaan Sistem', EN: 'System Availability' } }
    ],
    tags: ['High Concurrency', 'Public Sector', 'Distributed Cloud', 'Assessment Tech'],
    industry: 'Government & Education'
  },
  {
    id: 'nestle-ocr',
    client: 'Nestlé Indonesia',
    logo: 'NESTLÉ',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    category: { ID: 'AI & OCR INTELLIGENCE', EN: 'AI & OCR INTELLIGENCE' },
    title: {
      ID: 'OCR Invoice Automation — Otomatisasi Dokumen Keuangan Nestlé',
      EN: 'Automated AI OCR Invoice Processing Engine for Nestlé'
    },
    summary: {
      ID: 'Solusi OCR berbasis AI untuk memproses puluhan ribu invoice vendor secara otomatis dengan presisi tinggi dan verifikasi instan ke sistem keuangan.',
      EN: 'AI-driven OCR document intelligence extracting vendor invoice data with high accuracy and instant accounting verification.'
    },
    challenge: {
      ID: 'Tim keuangan Nestlé harus memproses lebih dari 30.000 invoice fisik dan digital setiap bulan secara manual, memakan waktu hingga ribuan jam kerja.',
      EN: 'Nestlé Finance manually verified over 30,000 monthly vendor invoices, resulting in accounting bottlenecks and delayed vendor payments.'
    },
    solution: {
      ID: 'Pengembangan mesin Intelligent Document Processing (IDP) dengan model Deep Learning OCR yang secara otomatis mengekstrak line items, PPN, dan pencocokan PO.',
      EN: 'Deployment of an Intelligent Document Processing (IDP) engine powered by deep learning OCR that extracts line items and automatically matches POs.'
    },
    metrics: [
      { value: '90%', label: { ID: 'Lebih Cepat', EN: 'Faster Processing' } },
      { value: '30,000+', label: { ID: 'Invoice / Bulan', EN: 'Invoices / Month' } },
      { value: '99.2%', label: { ID: 'Akurasi Ekstraksi Data', EN: 'Extraction Accuracy' } }
    ],
    tags: ['Computer Vision', 'OCR AI', 'Document Intelligence', 'Finance Automation'],
    industry: 'FMCG & Finance'
  },
  {
    id: 'ojk-sikepo',
    client: 'Otoritas Jasa Keuangan (OJK)',
    logo: 'OJK',
    image: 'https://admin.radyalabs.com/assets/04735d7c-36e9-4c60-b8bd-0950e1266408',
    category: { ID: 'FINTECH & REGULATORY', EN: 'FINTECH & REGULATORY' },
    title: {
      ID: 'SIKePO — Sistem Informasi Ketentuan Perbankan Online OJK',
      EN: 'SIKePO — Online Banking Regulatory Information Portal'
    },
    summary: {
      ID: 'Portal sistem informasi hukum perbankan online yang dikelola OJK untuk akses ketentuan keuangan dan integrasi JDIHN bagi seluruh perbankan nasional.',
      EN: 'Regulatory information portal managed by OJK presenting online legal provisions, banking compliance search, and JDIHN integration.'
    },
    challenge: {
      ID: 'Pencarian ketentuan perbankan yang tersebar membuat pemangku kepentingan industri keuangan kesulitan menemukan landasan hukum terkini secara cepat.',
      EN: 'Scattered financial regulations made it difficult for banking stakeholders to search updated legal provisions efficiently.'
    },
    solution: {
      ID: 'Pengembangan kanal portal web CMS dan aplikasi mobile SIKePO terintegrasi dengan pencarian taksonomi hukum pintar, riwayat revisi, dan feedback kanal.',
      EN: 'Development of the SIKePO Web CMS portal & mobile apps equipped with smart legal taxonomy search, revision history, and stakeholder channels.'
    },
    metrics: [
      { value: '100%', label: { ID: 'Perbankan Nasional', EN: 'National Banks Access' } },
      { value: 'JDIHN', label: { ID: 'Terintegrasi Resmi', EN: 'Officially Integrated' } },
      { value: '<1 Detik', label: { ID: 'Pencarian Regulasi', EN: 'Regulation Search' } }
    ],
    tags: ['Fintech Compliance', 'Regulatory CMS', 'Legal Tech', 'Public Sector'],
    industry: 'Finance & Banking'
  },
  {
    id: 'kataai-jangkau',
    client: 'kata.ai',
    logo: 'KATA.AI',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&auto=format&fit=crop&q=80',
    category: { ID: 'GENERATIVE AI CHATBOT', EN: 'GENERATIVE AI CHATBOT' },
    title: {
      ID: 'Jangkau AI — Omnichannel Enterprise Chatbot Platform',
      EN: 'Jangkau AI — Enterprise Omnichannel Conversational Agent'
    },
    summary: {
      ID: 'Platform chatbot AI omnichannel untuk otomatisasi pelayanan pelanggan di WhatsApp, Web, dan Telegram skala enterprise dengan agen AI pintar.',
      EN: 'Enterprise omnichannel conversational agent automating customer engagement across WhatsApp, Web, and Telegram.'
    },
    challenge: {
      ID: 'Penanganan pertanyaan pelanggan berulang membutuhkan ratusan agen support manual dengan response time hingga beberapa jam.',
      EN: 'Handling high volumes of repetitive inquiries required massive manual customer support staff with multi-hour queue wait times.'
    },
    solution: {
      ID: 'Integrasi mesin NLU kata.ai dengan arsitektur backend Radya Labs untuk otomatisasi tiket, routing agen, dan penyelesaian masalah instan.',
      EN: 'Integration of NLU engines with Radya Labs robust microservices backend to automate ticketing, live handoff, and immediate query resolution.'
    },
    metrics: [
      { value: '+60%', label: { ID: 'Resolusi Otomatis', EN: 'Automated Resolution' } },
      { value: '+45%', label: { ID: 'Kepuasan Pelanggan', EN: 'CSAT Score Lift' } },
      { value: '<5 Detik', label: { ID: 'Waktu Respon', EN: 'Average Response Time' } }
    ],
    tags: ['Conversational AI', 'WhatsApp API', 'Omnichannel', 'NLP Automation'],
    industry: 'Technology & Telecom'
  },
  {
    id: 'biofarma-bioaudit',
    client: 'PT Bio Farma (Persero)',
    logo: 'BIO FARMA',
    image: 'https://admin.radyalabs.com/assets/e2cddcab-12f0-4c0d-a329-2b07f1e894c3',
    category: { ID: 'HEALTHCARE & AUDIT', EN: 'HEALTHCARE & AUDIT' },
    title: {
      ID: 'BioAudit — Sistem Audit Internal Terintegrasi Bio Farma',
      EN: 'BioAudit — Enterprise Internal Audit Management System'
    },
    summary: {
      ID: 'Sistem audit internal paperless terintegrasi untuk perencanaan, pengawasan, dan eksekusi audit sesuai standar IIA pada Holding PT. Bio Farma.',
      EN: 'Unified paperless internal audit management system covering planning, supervision, and execution compliant with IIA standards.'
    },
    challenge: {
      ID: 'Pengelolaan kertas kerja audit manual memicu pemborosan ATK, kesulitan penelusuran histori audit, serta keterlambatan laporan pengawasan internal.',
      EN: 'Manual paper-based audit working papers led to archiving friction, lack of centralized tracking, and reporting delays.'
    },
    solution: {
      ID: 'Pengembangan portal BioAudit berbasis standar IIA dengan pengarsipan digital terenkripsi, alur verifikasi multi-tier, dan audit trail otomatis.',
      EN: 'Development of the BioAudit portal compliant with IIA standards, featuring encrypted working papers, multi-tier approval, and audit trails.'
    },
    metrics: [
      { value: 'Paperless', label: { ID: 'Kertas Kerja Audit', EN: 'Digital Working Papers' } },
      { value: 'IIA Standard', label: { ID: 'Standar Internasional', EN: 'IIA Standard Compliant' } },
      { value: '100%', label: { ID: 'Akses Terverifikasi', EN: 'Secure Access Control' } }
    ],
    tags: ['Healthcare Pharma', 'Internal Audit', 'ISO / IIA Standard', 'Enterprise System'],
    industry: 'Healthcare & Life Sciences'
  }
];

export const CORE_VALUES: CoreValue[] = [
  {
    title: { ID: 'Pendekatan Berbasis Data', EN: 'Data-Driven Approach' },
    description: {
      ID: 'Setiap keputusan arsitektur dan produk didasarkan pada riset mendalam, analisis data, dan metrik kinerja terukur.',
      EN: 'Every architectural decision and feature specification is anchored in rigorous research, telemetry, and business impact.'
    },
    iconName: 'BarChart3'
  },
  {
    title: { ID: 'Teknologi Terkini', EN: 'Cutting-Edge Technology' },
    description: {
      ID: 'Mengadopsi cloud native, AI Generatif, dan best practice rekayasa perangkat lunak terbaru agar solusi selalu siap menghadapi masa depan.',
      EN: 'Pioneering cloud native architecture, Generative AI, and modern software engineering patterns for long-term scalability.'
    },
    iconName: 'Cpu'
  },
  {
    title: { ID: 'Kolaborasi Transparan', EN: 'Transparent Collaboration' },
    description: {
      ID: 'Komunikasi terbuka, sprint review rutin, dan visibilitas total terhadap progress pengembangan produk Anda.',
      EN: 'Uncompromising transparency through regular agile sprint reviews, live progress dashboards, and open channel communications.'
    },
    iconName: 'Handshake'
  },
  {
    title: { ID: 'Dukungan Berkelanjutan', EN: 'Continuous Support & SLA' },
    description: {
      ID: 'Dukungan pemeliharaan, monitoring 24/7, serta optimasi performa berkelanjutan pasca peluncuran aplikasi.',
      EN: 'Round-the-clock infrastructure monitoring, guaranteed SLA response, and continuous post-launch performance tuning.'
    },
    iconName: 'ShieldCheck'
  }
];

export const INDUSTRIES_LIST: IndustryItem[] = [
  {
    id: 'manufacturing',
    name: { ID: 'Manufacturing & Industry', EN: 'Manufacturing & Industry 4.0' },
    iconName: 'Factory',
    description: {
      ID: 'Otomatisasi pabrik, pemantauan IoT, dan prediksi pemeliharaan mesin berbasis AI.',
      EN: 'Smart factory automation, IoT telemetry monitoring, and AI predictive maintenance.'
    },
    useCases: [
      { ID: 'Otomatisasi Quality Control Vision AI', EN: 'Vision AI Quality Control Automation' },
      { ID: 'Real-time Supply Chain Visibility', EN: 'Real-time Supply Chain Visibility' }
    ],
    metrics: '-30% Downtime Fabrikasi'
  },
  {
    id: 'healthcare',
    name: { ID: 'Healthcare & Life Sciences', EN: 'Healthcare & Life Sciences' },
    iconName: 'HeartPulse',
    description: {
      ID: 'Sistem informasi rumah sakit, rekam medis elektronik (EMR), dan analitik pasien aman.',
      EN: 'Hospital information systems, compliant Electronic Health Records (EHR), and patient analytics.'
    },
    useCases: [
      { ID: 'HIPAA/Permenkes Compliant EMR Platform', EN: 'Compliant EMR Platform' },
      { ID: 'AI Telemedicine & Appointment Engine', EN: 'AI Telemedicine & Appointment Engine' }
    ],
    metrics: '99.9% Data Security Standards'
  },
  {
    id: 'government',
    name: { ID: 'Government & Public Sector', EN: 'Government & Public Sector' },
    iconName: 'Building',
    description: {
      ID: 'Layanan publik digital, portal e-government, dan integrasi data antar lembaga.',
      EN: 'Digital public services, e-government portals, and inter-agency data interoperability.'
    },
    useCases: [
      { ID: 'Portal Layanan Satu Data Terpadu', EN: 'Unified Public Service Data Portal' },
      { ID: 'Sistem Perizinan Otomatis', EN: 'Automated Licensing Approval System' }
    ],
    metrics: '100+ Proyek Sektor Publik'
  },
  {
    id: 'education',
    name: { ID: 'Education & EdTech', EN: 'Education & Higher EdTech' },
    iconName: 'GraduationCap',
    description: {
      ID: 'Learning Management System (LMS) berskala tinggi, portal mahasiswa, dan e-learning AI.',
      EN: 'High-scale Learning Management Systems, student portals, and adaptive AI learning.'
    },
    useCases: [
      { ID: 'LMS High-concurrency Examination', EN: 'High-concurrency LMS Examination' },
      { ID: 'Portal Portal Akademik Terintegrasi', EN: 'Integrated Campus Operations' }
    ],
    metrics: '150k+ Concurrent Student Capacity'
  },
  {
    id: 'retail',
    name: { ID: 'Retail & E-Commerce', EN: 'Retail & Modern E-Commerce' },
    iconName: 'ShoppingBag',
    description: {
      ID: 'Platform e-commerce omnichannel, sistem poin loyalitas, dan mesin rekomendasi AI.',
      EN: 'Omnichannel e-commerce platforms, loyalty engine, and personalized AI recommendation engines.'
    },
    useCases: [
      { ID: 'Headless Commerce Architecture', EN: 'Headless Commerce Architecture' },
      { ID: 'Real-time POS Inventory Sync', EN: 'Real-time POS Inventory Sync' }
    ],
    metrics: '+45% Conversion Lift'
  },
  {
    id: 'finance',
    name: { ID: 'Finance & Banking', EN: 'Finance, Banking & Fintech' },
    iconName: 'CreditCard',
    description: {
      ID: 'Core banking microservices, fraud detection AI, dan gerbang pembayaran aman.',
      EN: 'Microservices banking portals, AI fraud detection, and compliant payment gateways.'
    },
    useCases: [
      { ID: 'Automated e-KYC & OCR Processing', EN: 'Automated e-KYC & OCR Processing' },
      { ID: 'PCI-DSS Compliant Payment Gateway', EN: 'PCI-DSS Compliant Payment Gateway' }
    ],
    metrics: '0.001s Transaction Latency'
  },
  {
    id: 'mining',
    name: { ID: 'Mining & Energy', EN: 'Mining, Energy & Resources' },
    iconName: 'HardHat',
    description: {
      ID: 'Monitoring aset lapangan, keselamatan kerja IoT, dan pelaporan emisi otomatis.',
      EN: 'Field asset monitoring, IoT worker safety tracking, and automated ESG reporting.'
    },
    useCases: [
      { ID: 'IoT Heavy Machinery Fleet Tracker', EN: 'IoT Heavy Machinery Fleet Tracker' },
      { ID: 'ESG & Carbon Emissions Analytics', EN: 'ESG & Carbon Emissions Analytics' }
    ],
    metrics: '24/7 Field Asset Uptime'
  },
  {
    id: 'logistics',
    name: { ID: 'Logistics & Supply Chain', EN: 'Logistics & Supply Chain' },
    iconName: 'Truck',
    description: {
      ID: 'Warehouse Management System (WMS), pelacakan pengiriman GPS, dan optimasi rute.',
      EN: 'Warehouse Management Systems (WMS), GPS delivery tracking, and automated route dispatch.'
    },
    useCases: [
      { ID: 'AI Smart Route Dispatcher', EN: 'AI Smart Route Dispatcher' },
      { ID: 'Warehouse Barcode Scan & Sync', EN: 'Warehouse Barcode Scan & Sync' }
    ],
    metrics: '-35% Fuel & Fleet Expenses'
  }
];

export const TECH_ECOSYSTEM: TechCategory[] = [
  {
    category: 'cloud',
    title: { ID: 'Cloud Platform & Infrastructure', EN: 'Cloud Platform & Infrastructure' },
    items: [
      { name: 'Amazon Web Services', logo: 'AWS', highlight: true },
      { name: 'Google Cloud Platform', logo: 'GCP', highlight: true },
      { name: 'Microsoft Azure', logo: 'Azure', highlight: true },
      { name: 'Kubernetes', logo: 'K8s', highlight: true },
      { name: 'Docker', logo: 'Docker' },
      { name: 'Terraform', logo: 'Terraform' }
    ]
  },
  {
    category: 'ai',
    title: { ID: 'AI, Machine Learning & LLM', EN: 'AI, Machine Learning & LLM' },
    items: [
      { name: 'OpenAI GPT-4o', logo: 'OpenAI', highlight: true },
      { name: 'Google Vertex AI', logo: 'Vertex', highlight: true },
      { name: 'PyTorch', logo: 'PyTorch' },
      { name: 'TensorFlow', logo: 'TensorFlow' },
      { name: 'LangChain', logo: 'LangChain' },
      { name: 'Tesseract OCR', logo: 'OCR' }
    ]
  },
  {
    category: 'frontend',
    title: { ID: 'Frontend & UI Frameworks', EN: 'Frontend & UI Frameworks' },
    items: [
      { name: 'React.js', logo: 'React', highlight: true },
      { name: 'Next.js', logo: 'Next', highlight: true },
      { name: 'TypeScript', logo: 'TS', highlight: true },
      { name: 'Tailwind CSS', logo: 'Tailwind' },
      { name: 'Vue.js', logo: 'Vue' },
      { name: 'Framer Motion', logo: 'Motion' }
    ]
  },
  {
    category: 'backend',
    title: { ID: 'Backend & APIs', EN: 'Backend & APIs' },
    items: [
      { name: 'Node.js', logo: 'Node', highlight: true },
      { name: 'Go (Golang)', logo: 'Go', highlight: true },
      { name: 'Python FastAPI', logo: 'Python', highlight: true },
      { name: 'Java Spring Boot', logo: 'Java' },
      { name: 'GraphQL', logo: 'GraphQL' },
      { name: 'RESTful API', logo: 'REST' }
    ]
  },
  {
    category: 'devops',
    title: { ID: 'DevOps & CI/CD Pipelines', EN: 'DevOps & CI/CD Pipelines' },
    items: [
      { name: 'GitLab CI/CD', logo: 'GitLab', highlight: true },
      { name: 'GitHub Actions', logo: 'GitHub' },
      { name: 'ArgoCD', logo: 'Argo' },
      { name: 'Jenkins', logo: 'Jenkins' },
      { name: 'Helm', logo: 'Helm' },
      { name: 'Prometheus & Grafana', logo: 'Grafana' }
    ]
  },
  {
    category: 'database',
    title: { ID: 'Database & Data Ingestion', EN: 'Database & Data Ingestion' },
    items: [
      { name: 'PostgreSQL', logo: 'Postgres', highlight: true },
      { name: 'Redis', logo: 'Redis', highlight: true },
      { name: 'Apache Kafka', logo: 'Kafka', highlight: true },
      { name: 'MongoDB', logo: 'Mongo' },
      { name: 'Firebase', logo: 'Firebase' },
      { name: 'Elasticsearch', logo: 'Elastic' }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: { ID: 'Discover & Align', EN: 'Discover & Alignment' },
    description: {
      ID: 'Memahami kebutuhan bisnis, tantangan teknis, dan tujuan strategis proyek secara mendalam.',
      EN: 'Deep dive analysis into your strategic business drivers, technical constraints, and KPI objectives.'
    },
    duration: '1-2 Minggu'
  },
  {
    step: '02',
    title: { ID: 'Research & Audit', EN: 'Research & Technical Audit' },
    description: {
      ID: 'Audit arsitektur eksisting, analisis risiko keamanan, dan studi kelayakan teknologi.',
      EN: 'Systematic architectural audit, vulnerability assessment, and technology feasibility evaluation.'
    },
    duration: '1 Minggu'
  },
  {
    step: '03',
    title: { ID: 'Strategy & Blueprint', EN: 'Strategy & Architecture Blueprint' },
    description: {
      ID: 'Perancangan cetak biru sistem, spesifikasi API, pilihan cloud stack, dan roadmap implementasi.',
      EN: 'Designing system blueprints, cloud stack specifications, API contracts, and implementation roadmaps.'
    },
    duration: '2 Minggu'
  },
  {
    step: '04',
    title: { ID: 'UI/UX Design', EN: 'Human-Centered UI/UX Design' },
    description: {
      ID: 'Pembuatan design system, wireframe interaktif, dan pengujian aksesibilitas pengguna.',
      EN: 'Developing reusable design systems, interactive prototypes, and usability testing validation.'
    },
    duration: '2-3 Minggu'
  },
  {
    step: '05',
    title: { ID: 'Agile Development', EN: 'Agile Cloud & AI Development' },
    description: {
      ID: 'Coding iteratif berbasis sprint 2 mingguan dengan demo langsung dan integrasi CI/CD.',
      EN: 'Bi-weekly sprint iterations delivering tested code, live staging demos, and automated CI/CD releases.'
    },
    duration: '6-12 Minggu'
  },
  {
    step: '06',
    title: { ID: 'Testing & Security Audit', EN: 'Quality Assurance & Security Audit' },
    description: {
      ID: 'Pengujian beban (load test), penetration testing, dan validasi fungsional menyeluruh.',
      EN: 'Rigorous load testing, automated end-to-end QA, penetration testing, and security hardening.'
    },
    duration: '2 Minggu'
  },
  {
    step: '07',
    title: { ID: 'Deployment & Launch', EN: 'Zero-Downtime Deployment' },
    description: {
      ID: 'Peluncuran tanpa downtime menggunakan strategi Canary / Blue-Green deployment.',
      EN: 'Zero-downtime production deployment executing Canary / Blue-Green release patterns.'
    },
    duration: '1 Minggu'
  },
  {
    step: '08',
    title: { ID: 'Support & Optimization', EN: '24/7 Managed Support & SLA' },
    description: {
      ID: 'Pemantauan performa 24/7, manajemen patch, dan peningkatan fitur berkelanjutan.',
      EN: 'Continuous telemetry monitoring, proactive maintenance, SLA support, and iterative evolution.'
    },
    duration: 'Berkelanjutan / Ongoing'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Agomy F. Fanany',
    role: 'VP IT Development',
    company: 'PT Antareja Express',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    quote: {
      ID: 'Pengalaman kami dengan Radya Labs luar biasa. Mereka memahami kebutuhan bisnis kami dan memberikan solusi yang tepat serta berdampak nyata bagi efisiensi operasional.',
      EN: 'Working with Radya Labs has been extraordinary. They grasped our complex logistics requirements immediately and delivered a scalable system that created tangible efficiency gains.'
    },
    rating: 5
  },
  {
    id: 't2',
    name: 'Bernardus Sandi',
    role: 'Co-founder & CEO',
    company: 'Itnusi Tech Solutions',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    quote: {
      ID: 'Radya Labs adalah partner teknologi yang profesional, responsif, dan selalu memberikan hasil terbaik. Kolaborasinya sangat menyenangkan dan tepat waktu.',
      EN: 'Radya Labs is a deeply professional, responsive technology partner that consistently exceeds delivery standards. Their transparent communication makes working together seamless.'
    },
    rating: 5
  },
  {
    id: 't3',
    name: 'Muhammad Miftahriyah',
    role: 'Pusbang Pentalis Pendidikan ANMI',
    company: 'PUSDATIN KEMENDIKBUDRISTEK',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    quote: {
      ID: 'Dengan dukungan Radya Labs, proses bisnis kami menjadi lebih efisien dan terukur. Mereka benar-benar memahami kebutuhan sektor publik yang kompleks.',
      EN: 'With Radya Labs technical leadership, our public sector educational portals became significantly more resilient and measurable under peak traffic demands.'
    },
    rating: 5
  }
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'art-1',
    title: {
      ID: 'Bagaimana AI Dapat Meningkatkan Efisiensi Operasional Perusahaan',
      EN: 'How Enterprise Generative AI Drives Measureable Operational Efficiency'
    },
    summary: {
      ID: 'Panduan praktis mengadopsi Generative AI dan Machine Learning untuk otomatisasi pemrosesan dokumen, layanan pelanggan, dan analitik data.',
      EN: 'A practical framework for adopting Generative AI and ML to streamline document pipelines, customer engagement, and predictive decisioning.'
    },
    content: {
      ID: 'Di era transformasi digital yang melaju cepat, keberhasilan perusahaan enterprise tidak lagi hanya ditentukan oleh skala operasional, tetapi oleh kecepatan dalam mengambil keputusan berbasis data. Penerapan Artificial Intelligence (AI) seperti Intelligent Document Processing (IDP), Large Language Models (LLM), dan Computer Vision kini bukan sekadar tren melainkan kebutuhan mendasar.\n\nDalam artikel ini, Radya Labs membagikan metodologi integrasi AI yang aman (enterprise-grade security), transparan, dan terukur secara finansial (ROI)...',
      EN: 'In an era of rapid digital evolution, enterprise success hinges on decision speed and operational automation. Applying AI techniques such as Intelligent Document Processing (IDP), LLM orchestrations, and Computer Vision is no longer optional.\n\nHere, Radya Labs outlines our enterprise AI framework ensuring zero data leakages, SOC2 compliance, and quantifiable return on investment...'
    },
    category: { ID: 'AI & INOVASI', EN: 'AI & INNOVATION' },
    date: '22 Mei 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art-2',
    title: {
      ID: '5 Alasan Migrasi ke Cloud Native adalah Langkah Tepat untuk Bisnis',
      EN: '5 Strategic Reasons Migrating to Cloud Native Architectures Drives Growth'
    },
    summary: {
      ID: 'Mengapa arsitektur Cloud Native berbasis Kubernetes dan Microservices menjadi kunci skalabilitas dan ketahanan infrastruktur modern.',
      EN: 'Why containerized Kubernetes microservices and serverless paradigms are essential for resilient, cost-optimized enterprise computing.'
    },
    content: {
      ID: 'Sistem monolitik tradisional sering kali menjadi penghambat utama saat bisnis mengalami lonjakan pengguna secara mendadak. Migrasi ke Cloud Native memungkinkan aplikasi untuk melakukan auto-scaling secara otomatis dalam hitungan detik, menekan biaya server idle hingga 40%, dan meminimalkan resiko downtime...\n\nPelajari langkah-langkah strategi migrasi dari Radya Labs...',
      EN: 'Legacy monolithic backends frequently bottleneck rapid customer growth. Cloud Native migration enables automatic multi-region scaling within seconds, cuts idle cloud spend by 40%, and virtually eliminates deployment downtime...\n\nExplore Radya Labs cloud migration framework...'
    },
    category: { ID: 'CLOUD NATIVE', EN: 'CLOUD NATIVE' },
    date: '15 Mei 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'art-3',
    title: {
      ID: 'DevOps Best Practices untuk Mempercepat Delivery Aplikasi Enterprise',
      EN: 'DevOps Best Practices for Accelerating Enterprise Software Delivery'
    },
    summary: {
      ID: 'Strategi penerapan Infrastructure as Code (IaC), otomatisasi CI/CD, dan observabilitas 24/7 untuk siklus rilis yang lebih stabil.',
      EN: 'Implementing Infrastructure as Code (IaC), automated testing gates, and continuous observability for rapid, zero-defect release cycles.'
    },
    content: {
      ID: 'Kecepatan rilis software yang tinggi tanpa mengorbankan kualitas adalah cawan suci bagi tim engineering enterprise. Melalui penerapan Infrastructure as Code dengan Terraform dan pipeline CI/CD yang terotomatisasi penuh, tim dapat merilis fitur baru puluhan kali sehari secara aman...\n\nBahas panduan teknis bersama para pakar Radya Labs...',
      EN: 'Achieving rapid software delivery without sacrificing stability is the ultimate engineering goal. By leveraging Infrastructure as Code via Terraform and automated CI/CD pipelines, enterprises release updates with high confidence...\n\nRead our technical playbook...'
    },
    category: { ID: 'DEVOPS & INFRA', EN: 'DEVOPS & INFRA' },
    date: '08 Mei 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: {
      ID: 'Model kerjasamanya seperti apa yang ditawarkan oleh Radya Labs?',
      EN: 'What engagement models does Radya Labs offer?'
    },
    answer: {
      ID: 'Kami menawarkan 3 model utama: (1) Project-Based (Fixed Price / Time & Material) untuk proyek dengan ruang lingkup terdefinisi, (2) Dedicated Agile Engineering Pods (IT Outsourcing) untuk melengkapi tim internal Anda, dan (3) Managed Services & SLA Support untuk pemeliharaan infrastruktur 24/7.',
      EN: 'We provide 3 flexible models: (1) Project-Based delivery for fixed or T&M defined scopes, (2) Dedicated Engineering Pods to augment your internal teams, and (3) Managed Services & 24/7 SLA Support for ongoing cloud infrastructure operation.'
    }
  },
  {
    question: {
      ID: 'Berapa lama estimasi waktu pengerjaan untuk proyek enterprise?',
      EN: 'What is the typical timeline for an enterprise project?'
    },
    answer: {
      ID: 'Untuk MVP atau solusi spesifik (seperti OCR AI atau modul microservice), timeline umum berkisar antara 8–12 minggu. Proyek transformasi digital berskala besar biasanya berjalan dalam fase 3–6 bulan dengan delivery iteratif setiap 2 minggu.',
      EN: 'Targeted solutions or MVPs (e.g., AI OCR or microservice modules) typically span 8–12 weeks. Comprehensive digital transformation projects operate across 3–6 month phases with bi-weekly working deliverables.'
    }
  },
  {
    question: {
      ID: 'Bagaimana keamanan data dan Hak Kekayaan Intelektual (IP) dikelola?',
      EN: 'How is data security and Intellectual Property (IP) handled?'
    },
    answer: {
      ID: 'Seluruh Hak Kekayaan Intelektual (source code, arsitektur, dokumentasi) sepenuhnya menjadi milik klien 100%. Kami menandatangani NDA ketat sebelum proyek dimulai, dan menerapkan standar ISO 27001 & OWASP Top 10.',
      EN: '100% of Intellectual Property (source code, architecture blueprints, patents) belongs exclusively to the client upon project completion. We execute strict NDAs and strictly enforce ISO 27001 and OWASP security standards.'
    }
  },
  {
    question: {
      ID: 'Apakah Radya Labs menyediakan dukungan pasca peluncuran (SLA support)?',
      EN: 'Does Radya Labs provide post-launch SLA support and maintenance?'
    },
    answer: {
      ID: 'Ya, setiap proyek kami menyertakan garansi pemeliharaan pasca peluncuran serta opsi SLA Managed Services 24/7 dengan waktu respon bergaransi hingga sub-15 menit untuk insiden kritis.',
      EN: 'Yes! Every engagement includes a warranty post-launch phase alongside options for 24/7 SLA Managed Services with guaranteed sub-15 minute response times for critical system events.'
    }
  }
];
