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
    "id": "bioaudit",
    "slug": "bioaudit",
    "client": "PT Bio Farma (Persero)",
    "logo": "BIO FARMA",
    "image": "https://admin.radyalabs.com/assets/e2cddcab-12f0-4c0d-a329-2b07f1e894c3",
    "category": {
      "ID": "AUDIT & GOVERNANCE",
      "EN": "AUDIT & GOVERNANCE"
    },
    "title": {
      "ID": "BioAudit",
      "EN": "BioAudit"
    },
    "summary": {
      "ID": "BioAudit untuk Biofarma adalah sistem Audit internal. Aplikasi satu atap dari perencanaan, pengawasan, hingga pelaksanaan audit.",
      "EN": "BioAudit for Biofarma is an internal Auditing system. The one stop application from planning, supervising, and executing audit."
    },
    "challenge": {
      "ID": "Mengurangi biaya alat tulis kantor dan menghilangkan kesulitan pengelolaan informasi yang ada dalam kerta kerja audit, Alur kerja dan pendelegasian wewenang kerja audit intern dapat dilakukan secara lebih jelas, Data dan informasi audit intern dapat diakses oleh pengguna yang berwenang dari banyak tempat secara online, Laporan audit PI menjadi lebih berkualitas dan dipertanggungjawabkan karena ketersediaan kerta kerja yang lengkap dan dikelola dengan baik",
      "EN": "Reduce the cost of office stationery and eliminate the difficulty of managing information contained in audit working papers, Workflow and delegation of internal audit work authority can be done more clearly, Internal audit data and information can be accessed by authorized users from many places online, PI audit reports become more qualified and accountable due to the availability of complete and well-managed working papers."
    },
    "solution": {
      "ID": "Memperhatikan kebutuhan PI akan manajemen audit intern yang lebih baik dan berkualitas serta masalah pengarsipan kertas kerja audit maka kami membutuhkan aplikasi audit manajemen system yang berdasar standar pelaksanaan audit internal yang di pubilkasikan oleh IIA.",
      "EN": "Considering PI's need for better and quality internal audit management and the issue of audit working paper archiving, we need an audit management system application based on the internal audit implementation standards published by the IIA."
    },
    "metrics": [
      {
        "value": "+85%",
        "label": {
          "ID": "Efisiensi Siklus Audit",
          "EN": "Audit Cycle Efficiency"
        }
      },
      {
        "value": "100%",
        "label": {
          "ID": "Kepatuhan Regulasi IIA",
          "EN": "IIA Regulatory Compliance"
        }
      },
      {
        "value": "Paperless",
        "label": {
          "ID": "Sistem Pelaporan",
          "EN": "Reporting Workflow"
        }
      }
    ],
    "tags": [
      "Protocol & report",
      "FRA",
      "DS",
      "FS",
      "URS",
      "Load Test",
      "User Manual",
      "Stress Test"
    ],
    "industry": "Healthcare & Pharmaceuticals",
    "featuresList": [
      {
        "name": {
          "ID": "Audit Planning",
          "EN": "Perencanaan Audit"
        },
        "description": {
          "ID": "Audit planning workflow in BioAudit application",
          "EN": "Alur kerja perencanaan audit dalam aplikasi BioAudit"
        }
      },
      {
        "name": {
          "ID": "Pelaporan Hasil Audits",
          "EN": "Pelaporan Hasil Audit"
        },
        "description": {
          "ID": "Alur kerja pelaporan audit dalam aplikasi BioAudit berdasarkan temuan pemeriksaan",
          "EN": "Alur kerja pelaporan audit dalam aplikasi BioAudit berdasarkan temuan pemeriksaan"
        }
      },
      {
        "name": {
          "ID": "Follow-up Monitoring of Audit Results",
          "EN": "Pemantauan Tindak Lanjut Hasil Audit"
        },
        "description": {
          "ID": "The workflow for monitoring follow-up audit results in the BioAudit application based on inspection findings.",
          "EN": "Alur kerja pemantauan tindak lanjut hasil audit dalam aplikasi BioAudit berdasarkan temuan pemeriksaan"
        }
      },
      {
        "name": {
          "ID": "Pelaksanaan Audits",
          "EN": "Pelaksanaan Audit"
        },
        "description": {
          "ID": "Alur kerja pelaksanaan audit dalam aplikasi BioAudit",
          "EN": "Alur kerja pelaksanaan audit dalam aplikasi BioAudit"
        }
      },
      {
        "name": {
          "ID": "Persiapan Audits",
          "EN": "Persiapan Audit"
        },
        "description": {
          "ID": "Alur kerja persiapan audit dalam aplikasi BioAudit",
          "EN": "Alur kerja persiapan audit dalam aplikasi BioAudit"
        }
      }
    ],
    "deliverables": [
      "Protocol & report",
      "FRA",
      "DS",
      "FS",
      "URS",
      "Load Test",
      "User Manual",
      "Stress Test"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/f43f2168-bcf6-4618-bca2-f9c01326fee8",
      "https://admin.radyalabs.com/assets/15847755-e733-47cb-933b-4cd9b99cc442"
    ],
    "backgroundColor": "#156384"
  },
  {
    "id": "asesmen-nasional-berbasis-komputer-anbk",
    "slug": "asesmen-nasional-berbasis-komputer-anbk",
    "client": "Pusmendik Kemendikbudristek",
    "logo": "PUSMENDIK",
    "image": "https://admin.radyalabs.com/assets/1cfa7fe1-685a-47d5-abc8-6dadb524fd3e",
    "category": {
      "ID": "PUBLIC SECTOR PLATFORM",
      "EN": "PUBLIC SECTOR PLATFORM"
    },
    "title": {
      "ID": "Asesmen Nasional Berbasis Komputer (ANBK)",
      "EN": "Asesmen Nasional Berbasis Komputer (ANBK)"
    },
    "summary": {
      "ID": "ANBK merupakan aplikasi yang memungkinkan peserta untuk melakukan asesmen nasional yang diselenggarakan oleh PUSMENDIK dan memungkinkan Admin dari pihak PUSMENDIK untuk mengelola pelaksanaan kegiatan tesnya mulai dari pengelolaan peserta, proktor hingga soal tes beserta jadwalnya.",
      "EN": "ANBK is an application that allows participants to carry out national assessments organized by PUSMENDIK and allows the Admin from PUSMENDIK to manage the implementation of test activities starting from managing participants, proctors to test questions and their schedules."
    },
    "challenge": {
      "ID": "Target proyek ANBK adalah dapat digunakan mulai dari pelaksanaan Uji Kesetaraan sampai pelaksanaan AN dari jenjang SMA Sederajat, SMK, Jenjang SMP Sederajat dan Jenjang SD Sederajat pada tahun 2023. Kedepannya ANBK ini akan dikembangkan lagi dengan penambahan fitur-fitur terbaru yang berisi informasi-informasi yang memudahkan pengguna dalam melaksanakan kegiatan tesnya",
      "EN": "The target of the ANBK project is that it can be used from the implementation of the Equivalency Test to the implementation of AN from SMA and Equivalent, SMK, SMP and Elementary School and Equivalent levels in 2023. In the future, ANBK will be further developed with the addition of the latest features containing information makes it easier for users to carry out their test activities"
    },
    "solution": {
      "ID": "Dengan adanya proses atau kegiatan ANBK ini, maka diperlukan sebuah aplikasi untuk dapat memaksimalkan peserta dan admin tes ANBK dalam melaksanakan kegiatan tes.",
      "EN": "With this ANBK process or activity, an application is needed to maximize ANBK test participants and admins in carrying out test activities."
    },
    "metrics": [
      {
        "value": "3.5M+",
        "label": {
          "ID": "Siswa Peserta Ujian",
          "EN": "Concurrent Students"
        }
      },
      {
        "value": "99.99%",
        "label": {
          "ID": "Ketersediaan Server",
          "EN": "Server Availability"
        }
      },
      {
        "value": "100K+",
        "label": {
          "ID": "Sekolah Terhubung",
          "EN": "Connected Schools"
        }
      }
    ],
    "tags": [
      "Load Test",
      "Kubernetes",
      "TSD",
      "Google Cloud Platform (GCP)",
      "UAT Document",
      "FSD"
    ],
    "industry": "Government & Education",
    "featuresList": [
      {
        "name": {
          "ID": "Web Proktor",
          "EN": "Proctor Web"
        },
        "description": {
          "ID": "Pengguna aplikasi dengan peran proktor dapat menggunakan aplikasi web ANBK untuk memonitor kegiatan peserta, status peserta, daftar peserta, kelompok tes, laporan pengolahan dan lain sebagainya.",
          "EN": "Application users with the role of proctor can use the ANBK web application to monitor participant activities, participant status, participant list, test groups, processing reports and so on."
        }
      },
      {
        "name": {
          "ID": "Web Helpdesk",
          "EN": "Helpdesk Web"
        },
        "description": {
          "ID": "Web yang digunakan oleh peran Helpdesk untuk melakukan kegiatan monitoring peserta, pengelolaan proktor dan status tes.activities, proctor management and test status.",
          "EN": "The website is used by the Helpdesk role to carry out participant monitoring activities, proctor management and test status."
        }
      },
      {
        "name": {
          "ID": "Web Admin",
          "EN": "Admin Web"
        },
        "description": {
          "ID": "Web yang digunakan oleh role Admin untuk melakukan pengelolaan data mulai dari Helpdesk, Proktor, Status Tes, Hak Akses, Peserta, sampai monitoring aktivitas peserta.",
          "EN": "The website is used by the Admin role to manage data starting from the Helpdesk, Proctor, Test Status, Access Rights, Participants, to monitoring participant activity."
        }
      },
      {
        "name": {
          "ID": "Web Siswa",
          "EN": "Student Web"
        },
        "description": {
          "ID": "Merupakan web utama yang digunakan oleh siswa, dari jenjang SD - SMA dan sederajat untuk melakukan kegiatan konfirmasi data, konfirmasi tes dan pelaksanaan (pengerjaan) tes.",
          "EN": "It is the main website used by students, from elementary to high school and equivalent levels, to carry out data confirmation activities, test confirmation and test implementation."
        }
      }
    ],
    "deliverables": [
      "Load Test",
      "Kubernetes",
      "TSD",
      "Google Cloud Platform (GCP)",
      "UAT Document",
      "FSD"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/cb780612-4e97-4a34-8bb7-4992b14c275b"
    ]
  },
  {
    "id": "sikepo",
    "slug": "sikepo",
    "client": "Otoritas Jasa Keuangan (OJK)",
    "logo": "OJK",
    "image": "https://admin.radyalabs.com/assets/04735d7c-36e9-4c60-b8bd-0950e1266408",
    "category": {
      "ID": "FINTECH & REGULATORY",
      "EN": "FINTECH & REGULATORY"
    },
    "title": {
      "ID": "SIKePO",
      "EN": "SIKePO"
    },
    "summary": {
      "ID": "Sistem Informasi Ketentuan Perbankan Online (SIKePO) merupakan layanan teknologi informasi yang menyajikan informasi seputar Landasan Hukum dan Ketentuan Terkaitnya mengenai perbankan dan industri jasa keuangan lain yang disajikan secara online oleh OJK (Otoritas Jasa Keuangan).",
      "EN": "Sistem Informasi Ketentuan Perbankan Online (SIKePO) is a rules and information searching application in regards of Banking and other Financial Institutions issued by OJK. User can search by tag, type, or topic, and the system will show all the rules related."
    },
    "challenge": {
      "ID": "Mempunyai kanal portal web CMS, portal web dan mobile apps untuk industri keuangan perbankan dan juga masyarakat umum yang mampu memenuhi kebutuhan latarbelakang di atas.",
      "EN": "Having a CMS web portal channel, web portal and mobile apps for the banking financial industry and also the general public that is able to meet the background needs above."
    },
    "solution": {
      "ID": "Membuat kanal portal web CMS untuk stakeholders yang langsung terkelola dan terintegrasi dengan portal web dan mobile apps untuk industri keuangan, perbankan dan juga masyarakat umum.",
      "EN": "Create a CMS web portal channel for stakeholders that is directly managed and integrated with web portals and mobile apps for the financial industry, banking and the general public."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Perbankan Nasional",
          "EN": "National Banks Access"
        }
      },
      {
        "value": "JDIHN",
        "label": {
          "ID": "Terintegrasi Resmi",
          "EN": "Officially Integrated"
        }
      },
      {
        "value": "<1 Detik",
        "label": {
          "ID": "Pencarian Regulasi",
          "EN": "Search Retrieval"
        }
      }
    ],
    "tags": [
      "FSD",
      "User Manual",
      "TSD",
      "Source Code"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "Informasi Perbankan",
          "EN": "Banking Information"
        },
        "description": {
          "ID": "SIKePO sebagai sarana berbagai informasi dari OJK terhadap perbankan, industri jasa keuangan lain dan masyarakat secara umum.",
          "EN": "SIKePO is a means of sharing information from OJK regarding banking, other financial services industries and the public in general."
        }
      },
      {
        "name": {
          "ID": "Survey",
          "EN": "Surveys"
        },
        "description": {
          "ID": "Menyediakan link survey terhadap ketentuan - ketentuan jasa keuangan yang OJK sediakan sebagai otoritas.",
          "EN": "Provides a survey link regarding the financial services provisions that OJK provides as an authority."
        }
      },
      {
        "name": {
          "ID": "Layanan informasi Landasan Hukum dan Ketentuan Terkait",
          "EN": "Information Services Legal Basis and Related Provisions"
        },
        "description": {
          "ID": "SIKePO sebagai sarana untuk mencari landasan hukum serta ketentuan-ketentuan yang berlaku dalam hal jasa keuangan, dalam hal ini SIKePO menyediakan file download untuk memudahkan perbankan, industri jasa keuangan lain dan masyarakat secara umum untuk membaca ketentuan-ketentuan yang terkait yang di butuhkan.",
          "EN": "SIKePO as a means to find the legal basis and provisions that apply in financial services, in this case SIKePO provides download files to make it easier for banks, other financial services industries and the public in general to read the related provisions that are needed."
        }
      }
    ],
    "deliverables": [
      "FSD",
      "User Manual",
      "TSD",
      "Source Code"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/3c2bd21b-1287-41f8-a975-a4f640e09fd9",
      "https://admin.radyalabs.com/assets/49edef48-249c-4765-ab65-23a418523642"
    ],
    "backgroundColor": "#97232E"
  },
  {
    "id": "muraqaba",
    "slug": "muraqaba",
    "client": "Muraqaba",
    "logo": "MURAQABA",
    "image": "https://admin.radyalabs.com/assets/740faad5-e53e-4d31-ae48-b039116b24f8",
    "category": {
      "ID": "MOBILE APP & STREAMING",
      "EN": "MOBILE APP & STREAMING"
    },
    "title": {
      "ID": "Muraqaba",
      "EN": "Muraqaba"
    },
    "summary": {
      "ID": "Aplikasi meditasi untuk memudahkan setiap orang untuk bermeditasi dengan audio-audio yang menenangkan",
      "EN": "Meditation app to make it easier for everyone to meditate with calming audios"
    },
    "challenge": {
      "ID": "Target utama dari Muraqaba Apps ini ada user Muslim di seluruh dunia, khususnya amerika atau negara dengan muslim yang minoritas maupun mayoritas.",
      "EN": "The main target of Muraqaba Apps is Muslim users worldwide who need mindfulness and meditation support with soothing audios."
    },
    "solution": {
      "ID": "Membuat aplikasi meditasi dengan sistem pengkategorian agar user bisa memilih metode meditasi dengan kebutuhan rohani yang ingin dicapai, misalnya menyelesaikan proble stress atau kecemasan berlebih pada jiwa.",
      "EN": "Creating a dedicated meditation mobile app with categorization systems so users can easily select calming content and premium subscriptions."
    },
    "metrics": [
      {
        "value": "4.8/5.0",
        "label": {
          "ID": "Rating Pengguna",
          "EN": "App Store Rating"
        }
      },
      {
        "value": "99.9%",
        "label": {
          "ID": "Stabilitas Audio",
          "EN": "Streaming Uptime"
        }
      },
      {
        "value": "In-App",
        "label": {
          "ID": "Sistem Langganan",
          "EN": "Subscription System"
        }
      }
    ],
    "tags": [
      "User Manual",
      "UAT Document"
    ],
    "industry": "Health & Wellness",
    "featuresList": [
      {
        "name": {
          "ID": "Features Stories",
          "EN": "Features Stories"
        },
        "description": {
          "ID": "Kumpulan-kumpulan artikel seputar kontrolisasi diri, manajemen stress dan lainnya untuk dibaca oleh para user",
          "EN": "A collection of articles about self-control, stress management and others for users to read."
        }
      },
      {
        "name": {
          "ID": "Subscribe",
          "EN": "Subscribe"
        },
        "description": {
          "ID": "Fitur payment jika ingin berlangganan untuk mendengarkan audio selanjutnya dari tim Muraqaba",
          "EN": "Payment feature if you want to subscribe to listen to the next audio from the Muraqaba team"
        }
      },
      {
        "name": {
          "ID": "Series dan Kategori Audio",
          "EN": "Audio Series and Categories"
        },
        "description": {
          "ID": "Kumpulan kategori dan audio meditasi untuk didengarkan para user ketika membutuhkan waktu penyegaran",
          "EN": "A collection of categories and meditation audio for users to listen to when they need a moment of refreshment."
        }
      }
    ],
    "deliverables": [
      "User Manual",
      "UAT Document"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/3f5dd77e-caf7-4201-9d0e-fb89aeb121cb"
    ]
  },
  {
    "id": "anteraja-aware",
    "slug": "anteraja-aware",
    "client": "Anteraja",
    "logo": "ANTERAJA",
    "image": "https://admin.radyalabs.com/assets/d2a7384a-c7c5-4ec7-acbb-a34e57dd73b9",
    "category": {
      "ID": "LOGISTICS & OPERATIONS",
      "EN": "LOGISTICS & OPERATIONS"
    },
    "title": {
      "ID": "Anteraja Aware",
      "EN": "Anteraja Aware"
    },
    "summary": {
      "ID": "Anteraja Aware adalah aplikasi internal untuk memantau absensi kurir dan manajemen tugas, melihat status Airway Bill, dan melihat laporan pengiriman di semua lokasi Anteraja",
      "EN": "Anteraja Aware is an internal application to monitor courier absences and task management, view Airway Bill status, and view delivery report in all of Anteraja location"
    },
    "challenge": {
      "ID": "Aplikasi mobile Anteraja ditargetkan selesai proses developmentnya selama 3 bulan dan untuk target penggunanya yang diutamakan adalah para Kurir pengantar parcel (Satria) Anteraja.",
      "EN": "The Anteraja mobile application is targeted to complete the development process within 3 months and the target users are primarily Anteraja parcel delivery couriers (Satria)."
    },
    "solution": {
      "ID": "Pembangunan aplikasi mobile Anteraja Aware akan memberikan solusi kepada Pengguna sehingga lebih memudahkan untuk diakses di smartphone-nya.",
      "EN": "The development of the Anteraja Aware mobile application will provide a solution to users so that it is easier to access on their smartphones."
    },
    "metrics": [
      {
        "value": "3 Bulan",
        "label": {
          "ID": "Waktu Go-Live Cepat",
          "EN": "Rapid Go-Live"
        }
      },
      {
        "value": "10K+",
        "label": {
          "ID": "Kurir Satria Aktif",
          "EN": "Daily Active Couriers"
        }
      },
      {
        "value": "-45%",
        "label": {
          "ID": "Pending AWB Alert",
          "EN": "Pending Parcel Lag"
        }
      }
    ],
    "tags": [
      "Source Code",
      "User Manual",
      "FSD"
    ],
    "industry": "Logistics & Supply Chain",
    "featuresList": [
      {
        "name": {
          "ID": "Dashboard Report",
          "EN": "Dashboard Report"
        },
        "description": {
          "ID": "Fitur ini berfungsi menampilkan informasi laporan terkait data parcel Pickup, InTransit, delivery, Undefined, Anomali, return, Cancel dan Alert Per harinya",
          "EN": "This feature functions to display report information related to Pickup, InTransit, Delivery, Undefined, Anomaly, Return, Cancel and Alert package data per day."
        }
      },
      {
        "name": {
          "ID": "Pending AWB",
          "EN": "Pending AWB"
        },
        "description": {
          "ID": "Fitur ini berfungsi untuk membantu melakukan pencatatan data parcel yang Pending",
          "EN": "Pending This feature functions to help record data on parcels that are pending."
        }
      },
      {
        "name": {
          "ID": "Pemantauan Absen",
          "EN": "Monitoring Absen"
        },
        "description": {
          "ID": "Fitur ini berfungsi untuk memonitoring data absen satria perharinya",
          "EN": "This feature functions to monitor Satria's daily absence data."
        }
      },
      {
        "name": {
          "ID": "Manajemen Tugas",
          "EN": "Task Management"
        },
        "description": {
          "ID": "Fitur ini berfungsi untuk menampilkan task list harian serta dapat memudahkan untuk Satri menyelesaikan task hariannya.",
          "EN": "This feature functions to display a daily task list and can make it easier for Satri to complete his daily tasks."
        }
      }
    ],
    "deliverables": [
      "Source Code",
      "User Manual",
      "FSD"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/8b78a2cf-d0f4-41cc-9e80-7fb85de9065c",
      "https://admin.radyalabs.com/assets/b1eff1e8-4a8c-45fb-8c28-3460e435379d"
    ]
  },
  {
    "id": "tokoparts-ec-sites",
    "slug": "tokoparts-ec-sites",
    "client": "Tokoparts",
    "logo": "TOKOPARTS",
    "image": "https://admin.radyalabs.com/assets/5741b455-8e2b-4f0f-abec-2b6e90e90d54",
    "category": {
      "ID": "E-COMMERCE & CMS",
      "EN": "E-COMMERCE & CMS"
    },
    "title": {
      "ID": "Tokoparts EC Sites",
      "EN": "Tokoparts EC Site"
    },
    "summary": {
      "ID": "Tokoparts merupakan perusahaan penyedia suku cadang berteknologi modern yang menawarkan one-stop shopping untuk suku cadang berbagai merek dan kategori. Untuk meningkatkan kualitas layanan dan mempermudah akses pelanggan, Tokoparts mengembangkan aplikasi e-Commerce yang dapat diakses oleh pelanggan untuk melakukan pemesanan produk secara online.",
      "EN": "Tokoparts is a modern technology spare parts provider company that offers one-stop shopping for spare parts of various brands and categories. To improve service quality and make customer access easier, Tokoparts developed an e-Commerce application that can be accessed by customers to order products online."
    },
    "challenge": {
      "ID": "Peningkatan aplikasi e-Commerce & CMS site Tokoparts ini memiliki target untuk menambahkan fitur-fitur terbaru yang berisi informasi-informasi maupun fitur yang memudahkan pengguna dalam melakukan pemesanan produk.",
      "EN": "The improvement of the Tokoparts e-Commerce & CMS site application has the target of adding the latest features containing information and features that make it easier for users to order products."
    },
    "solution": {
      "ID": "Melakukan pengembangan aplikasie-Commerce dan CMS dari Tokoparts untuk meningkatkan kemudahan pelanggan dalam melakukan pemesanan untuk produk spareparts kendaraan roda empat seperti kampas rem, oli, minyak rem, dan produk-produk spareparts lainnya dari setiap brand ternama di Indonesia. Pelanggan dapat memesan produk secara online tanpa harus datang ke lokasi.",
      "EN": "Developing e-Commerce and CMS applications from Tokoparts to improve customer convenience in ordering four-wheeled vehicle spare parts products such as brake pads, oil, brake fluid, and other spare parts products from every well-known brand in Indonesia. Customers can order products online without having to come to the location."
    },
    "metrics": [
      {
        "value": "50K+",
        "label": {
          "ID": "Katalog Suku Cadang",
          "EN": "Spare Parts SKUs"
        }
      },
      {
        "value": "+60%",
        "label": {
          "ID": "Pemesanan Online",
          "EN": "Online Order Growth"
        }
      },
      {
        "value": "<2 Detik",
        "label": {
          "ID": "Kecepatan Filter",
          "EN": "Filter Response Time"
        }
      }
    ],
    "tags": [
      "UAT Document",
      "User Manual",
      "FSD",
      "Load Test",
      "TSD"
    ],
    "industry": "Automotive & E-Commerce",
    "featuresList": [
      {
        "name": {
          "ID": "CMS - Manage Vehicle Model",
          "EN": "CMS  Manage Vehicle Model"
        },
        "description": {
          "ID": "Sebuah fitur yang memungkinkan admin untuk mengelola katalog model kendaraan.",
          "EN": "A feature that allows admins to manage a catalog of vehicle models."
        }
      },
      {
        "name": {
          "ID": "CMS - Manage Category",
          "EN": "CMS - Manage Category"
        },
        "description": {
          "ID": "Fitur ini digunakan oleh admin untuk mengelola kategori dan subkategori produk Tokoparts.",
          "EN": "This feature is used by the admin to manage categories and sub categories of Tokoparts products."
        }
      },
      {
        "name": {
          "ID": "Pencarian dengan Kategori",
          "EN": "Search by Category"
        },
        "description": {
          "ID": "Pengguna dapat mencari produk yang lebih spesifik berdasarkan kategori produk.",
          "EN": "Users can search for more specific products based on product category."
        }
      },
      {
        "name": {
          "ID": "CMS - Manage Brand",
          "EN": "CMS - Manage Brand"
        },
        "description": {
          "ID": "Melalui fitur ini, admin dapat mengelola merek, nama merek, informasi merek untuk produk yang dijual oleh Tokoparts.",
          "EN": "Through this feature, admins can manage brands, brand names, brand information for products sold by Tokoparts."
        }
      },
      {
        "name": {
          "ID": "Pengurutan Produk",
          "EN": "Product Sorting"
        },
        "description": {
          "ID": "Memudahkan pelanggan untuk melihat produk dengan mengurutkan produk berdasarkan kategori terlaris dan terpopuler.",
          "EN": "Make it easier for customers to view products by sorting products based on best-selling and most popular categories."
        }
      }
    ],
    "deliverables": [
      "UAT Document",
      "User Manual",
      "FSD",
      "Load Test",
      "TSD"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/959d280f-a3fe-47fe-9656-48e09db90788",
      "https://admin.radyalabs.com/assets/0ad9dea6-395b-479a-a19b-4e5b2ab5136f"
    ]
  },
  {
    "id": "imuni",
    "slug": "imuni",
    "client": "Imuni",
    "logo": "IMUNI",
    "image": "https://admin.radyalabs.com/assets/50c90664-cb28-403a-b4ca-80b2a0447ece",
    "category": {
      "ID": "HEALTHCARE & TELEMEDICINE",
      "EN": "HEALTHCARE & TELEMEDICINE"
    },
    "title": {
      "ID": "Imuni",
      "EN": "Imuni"
    },
    "summary": {
      "ID": "Imuni adalah layanan khusus vaksinasi on-site (di rumah atau di perusahaan Anda) untuk Anak dan Dewasa.Konsultasi sebelum pendaftaran, layanan tumbuh kembang, pemberian vaksinasi, hingga follow-up setelah vaksinasi di imuni dilakukan 100% oleh dokter khusus vaksinasi.",
      "EN": "Imuni is a special on-site vaccination service (at home or at your company) for Children and Adults. Consultation before registration, growth and development services, vaccination administration, to follow-up after vaccination at Imuni are carried out 100% by specialist vaccination doctors."
    },
    "challenge": {
      "ID": "Imuni ingin memberikan pelayanan Vaksinasi di Rumah (home service) atau Perusahaan pada (on-site) tanpa membuat pelanggan melakukan antrian secara manual dan datang ke klinik ataupun homecare lalu menunggu antrian ditempat untuk melakukan vaksin.",
      "EN": "Imuni wants to provide Vaccination services at Home (home service) or Company on (on-site) without making customers queue manually and come to the clinic or homecare and then wait in line at the location to get vaccinated."
    },
    "solution": {
      "ID": "Membuat Aplikasi agar pelanggan tidak perlu keluar rumah dan waktu yang diinginkan pelanggan dapat disesuaikan dengan keinginan pasien. serta vaksinasi juga menjadi lebih aman karena tiap proses vaksinasi diberikan 100% oleh Dokter Khusus Vaksinasi yang selalu mengutamakan protokol kesehatan ketat.",
      "EN": "Creating an Application so that customers do not need to leave the house and the time the customer wants can be adjusted to the patient's wishes. and vaccination is also safer because each vaccination process is given 100% by a Special Vaccination Doctor who always prioritizes strict health protocols."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Dokter Vaksin Khusus",
          "EN": "Certified Doctors"
        }
      },
      {
        "value": "0 Menit",
        "label": {
          "ID": "Antrean di Klinik",
          "EN": "Clinic Waiting Time"
        }
      },
      {
        "value": "10K+",
        "label": {
          "ID": "Sesi Vaksinasi",
          "EN": "Vaccination Sessions"
        }
      }
    ],
    "tags": [
      "Source Code",
      "User Manual",
      "FSD",
      "TSD"
    ],
    "industry": "Healthcare & Telemedicine",
    "featuresList": [
      {
        "name": {
          "ID": "Chat",
          "EN": "Chat"
        },
        "description": {
          "ID": "Chat langsung dengan Dokter Konsultan Vaksinasi",
          "EN": "Ngobrol langsung dengan Dokter Konsultan Vaksinasi"
        }
      }
    ],
    "deliverables": [
      "Source Code",
      "User Manual",
      "FSD",
      "TSD"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/16cab85f-2a9f-4bb5-b15b-ff31ea8a1efe",
      "https://admin.radyalabs.com/assets/5bfeb184-2ec7-4bc3-b051-310d7e544123"
    ]
  },
  {
    "id": "bi-smart",
    "slug": "bi-smart",
    "client": "PT Bio Farma (Persero)",
    "logo": "BIO FARMA",
    "image": "https://admin.radyalabs.com/assets/5a3eeda4-5316-4b49-9234-78eb80709820",
    "category": {
      "ID": "RISK MANAGEMENT & EWS",
      "EN": "RISK MANAGEMENT & EWS"
    },
    "title": {
      "ID": "Bi-SMaRT",
      "EN": "Bi-SMaRT"
    },
    "summary": {
      "ID": "Bi-SMaRT merupakan aplikasi yang dibuat untuk pelaporan profil risiko dan proses monitoring dan evaluasi risiko yang ada di lingkup Holding PT. Bio Farma. Melalui aplikasi ini, user dapat melakukan entry setiap profil risiko nya kemudian melakukan monitoring dan evaluasi risiko sesuai periode yang di tentukan. Kemudian profil risiko akan melewati proses approval oleh pejabat yang berwenang sesuai ketentuan yang ada di PT. Bio Farma.",
      "EN": "Bi-SMaRT is an application created for risk profile reporting and risk monitoring and evaluation processes within the scope of Holding PT. Bio Farma. Through this application, users can enter each risk profile and then monitor and evaluate risks according to the specified period. Then the risk profile will go through an approval process by authorized officials in accordance with existing provisions at PT. Bio Farma."
    },
    "challenge": {
      "ID": "PT. Bio Farma ingin kegiatan dan proses dari seluruh kegiatan dalam pelaporan resiko menjadi lebih mudah baik dari sisi penginputan, persetujuan, sampai monitoringnya.",
      "EN": "PT. Bio Farma wants the activities and processes of all risk reporting activities to be easier, both in terms of input, approval, and monitoring."
    },
    "solution": {
      "ID": "Membuat aplikasi yang fiturnya mencakup seluruh alur proses end to end dari pelaporan risiko yang ada di lingkup Holding PT. Bio Farma",
      "EN": "Develop an application whose features cover the entire end to end process flow of risk reporting within the scope of Holding PT. Bio Farma"
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Digitalisasi Profil Risiko",
          "EN": "Risk Digitization"
        }
      },
      {
        "value": "Real-time",
        "label": {
          "ID": "Early Warning System",
          "EN": "Early Warning System"
        }
      },
      {
        "value": "-70%",
        "label": {
          "ID": "Siklus Approval",
          "EN": "Approval Cycle Time"
        }
      }
    ],
    "tags": [
      "Load Test",
      "UAT Document",
      "TSD",
      "FSD",
      "User Manual",
      "Source Code"
    ],
    "industry": "Healthcare & Pharmaceuticals",
    "featuresList": [
      {
        "name": {
          "ID": "Dashboard",
          "EN": "Dashboard"
        },
        "description": {
          "ID": "Fitur yang menampilkan grafik-grafik mulai dari total profil risiko, total peristiwa risiko, nilai KRI, item risiko per kategori dan sebagainya.",
          "EN": "A feature that displays graphs ranging from total risk profile, total risk events, KRI values, risk items per category and so on."
        }
      },
      {
        "name": {
          "ID": "Stress Testing",
          "EN": "Stress Testing"
        },
        "description": {
          "ID": "Fitur untuk melakukan stress test terhadap item risiko yang sudah di monitoring untuk dijadikan acuan level risiko di tahun berikutnya.",
          "EN": "Feature for carrying out stress tests on risk items that have been monitored to be used as a reference for risk levels in the following year."
        }
      },
      {
        "name": {
          "ID": "Risk Profle",
          "EN": "Risk Profle"
        },
        "description": {
          "ID": "Fitur yang berfungsi untuk mengelola data profil risiko, melakukan proses approvalnya, hingga pembuatan laporan risiko.",
          "EN": "Features that function to manage risk profile data, carry out the approval process, and create risk reports."
        }
      },
      {
        "name": {
          "ID": "Monitoring & Evaluasi Profil Resiko",
          "EN": "Monitoring & Evaluasi Profil Resiko"
        },
        "description": {
          "ID": "Fitur yang berfungsi untuk mengelola data hasil monitoring & evaluasi terhadap risiko pada periode tertentu sesuai dengan yang sudah diinput di modul profil risiko. Juga, terdapat proses approval dari hasil monitoring dan evaluasi risiko.",
          "EN": "A feature that functions to manage monitoring & evaluation data on risks for a certain period according to what has been input in the risk profile module. Also, there is an approval process for the results of risk monitoring and evaluation."
        }
      },
      {
        "name": {
          "ID": "Early Warning System",
          "EN": "Early Warning System"
        },
        "description": {
          "ID": "Fitur untuk menampilkan dashboard untuk memantau nilai KRI dari masing-masing item risiko di setiap periode (per bulan/per triwulan).",
          "EN": "Feature to display a dashboard to monitor the KRI value of each risk item in each period (per month/quarterly)."
        }
      }
    ],
    "deliverables": [
      "Load Test",
      "UAT Document",
      "TSD",
      "FSD",
      "User Manual",
      "Source Code"
    ],
    "screenshots": [
      "https://admin.radyalabs.com/assets/211d705a-4e0a-49d0-a4f5-475828022cb3",
      "https://admin.radyalabs.com/assets/641c821d-14ff-4507-9f7b-c780b45282c3"
    ]
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
