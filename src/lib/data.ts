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
    "id": "anbk",
    "slug": "anbk",
    "client": "Pusmendik Kemendikbudristek",
    "logo": "KEMENDIKBUD",
    "image": "/images/portfolio/anbk-1.png",
    "images": [
      "/images/portfolio/anbk-1.png",
      "/images/portfolio/anbk-admin.png",
      "/images/portfolio/anbk-login.png",
      "/images/portfolio/anbk-soal.png"
    ],
    "category": {
      "ID": "PUBLIC SECTOR PLATFORM",
      "EN": "PUBLIC SECTOR PLATFORM"
    },
    "title": {
      "ID": "Asesmen Nasional Berbasis Komputer (ANBK)",
      "EN": "National Computer-Based Assessment (ANBK)"
    },
    "summary": {
      "ID": "ANBK merupakan platform asesmen online berskala nasional oleh Pusmendik Kemendikbudristek untuk mengelola ujian jutaan siswa SD, SMP, SMA/SMK dengan keandalan tinggi dan arsitektur cloud native.",
      "EN": "ANBK is a nationwide online assessment platform by Pusmendik Kemendikbudristek to manage examinations for millions of elementary, junior high, and high school students with high reliability and cloud-native architecture."
    },
    "challenge": {
      "ID": "Menangani beban jutaan peserta ujian serentak di seluruh Indonesia tanpa gangguan koneksi, menjamin keamanan integritas soal ujian, serta menyediakan dashboard pelaporan proktor real-time.",
      "EN": "Handling millions of concurrent exam participants across Indonesia without downtime, ensuring examination data integrity, and providing real-time proctor reporting dashboards."
    },
    "solution": {
      "ID": "Membangun arsitektur microservices berbasis Google Cloud Platform dan Kubernetes dengan auto-scaling otomatis, sistem sinkronisasi soal cerdas, dan antarmuka CBT responsif.",
      "EN": "Building a microservices architecture on Google Cloud Platform and Kubernetes with dynamic auto-scaling, intelligent test synchronization, and responsive CBT interface."
    },
    "metrics": [
      {
        "value": "99.99%",
        "label": {
          "ID": "Performa Uptime",
          "EN": "System Performance"
        }
      },
      {
        "value": "~3 Juta",
        "label": {
          "ID": "Siswa Peserta Ujian",
          "EN": "Exam Participants"
        }
      },
      {
        "value": "14 Ujian",
        "label": {
          "ID": "Rollout Ujian Nasional",
          "EN": "Nationwide Rollouts"
        }
      }
    ],
    "tags": [
      "Kubernetes",
      "GCP",
      "High Concurrency",
      "Online Assessment",
      "Education Tech"
    ],
    "industry": "Government & Education",
    "featuresList": [
      {
        "name": {
          "ID": "CBT Student Engine",
          "EN": "CBT Student Engine"
        },
        "description": {
          "ID": "Antarmuka ujian interaktif dengan enkripsi lembar jawaban dan countdown otomatis.",
          "EN": "Interactive test taking interface with encrypted answer sheets and auto countdown."
        }
      },
      {
        "name": {
          "ID": "Admin & Proctor Dashboard",
          "EN": "Admin & Proctor Dashboard"
        },
        "description": {
          "ID": "Pusat kendali helpdesk, status peserta online, dan verifikasi kehadiran.",
          "EN": "Helpdesk control center, real-time online participant telemetry, and attendance verification."
        }
      },
      {
        "name": {
          "ID": "National Assessment Analytics",
          "EN": "National Assessment Analytics"
        },
        "description": {
          "ID": "Pengolahan statistik hasil tes kesetaraan dan asesmen nasional secara otomatis.",
          "EN": "Automated statistical processing of national equivalency and competency assessments."
        }
      }
    ],
    "deliverables": [
      "Cloud Architecture",
      "CBT Engine",
      "Proctor Dashboard",
      "Security Hardening",
      "Load Testing Report"
    ],
    "screenshots": [
      "/images/portfolio/anbk-cms-mockup.png"
    ]
  },
  {
    "id": "pama-copilot",
    "slug": "pama-copilot",
    "client": "PT Pamapersada Nusantara (Astra)",
    "logo": "PAMA ASTRA",
    "image": "/images/portfolio/pama-1.png",
    "images": [
      "/images/portfolio/pama-1.png",
      "/images/portfolio/pama-2.png",
      "/images/portfolio/pama-3.png"
    ],
    "category": {
      "ID": "ENTERPRISE AI COPILOT",
      "EN": "ENTERPRISE AI COPILOT"
    },
    "title": {
      "ID": "PAMA Enterprise AI Copilot",
      "EN": "PAMA Enterprise AI Copilot"
    },
    "summary": {
      "ID": "Aplikasi AI enterprise yang menghubungkan analis operasional dengan data operasional pertambangan, menyajikan visualisasi data interaktif, dan mempercepat pemahaman SOP hingga 80%.",
      "EN": "An enterprise AI application connecting operations analysts with mining operational data, providing interactive data visualizations, and accelerating SOP understanding by up to 80%."
    },
    "challenge": {
      "ID": "Kompleksitas volume data operasional alat berat dan ratusan dokumen SOP pertambangan yang membutuhkan waktu lama jika dianalisis secara manual oleh tim analis lapangan.",
      "EN": "High complexity of heavy machinery operational telemetry and extensive mining SOP documentation that was time-consuming to analyze manually."
    },
    "solution": {
      "ID": "Mengembangkan asisten AI cerdas berbasis LLM dengan Retrieval-Augmented Generation (RAG), pemrosesan data real-time, dan dashboard visualisasi produktivitas alat berat.",
      "EN": "Developing an intelligent LLM copilot using Retrieval-Augmented Generation (RAG), real-time telemetry processing, and equipment productivity visualization dashboards."
    },
    "metrics": [
      {
        "value": "80%",
        "label": {
          "ID": "Lebih Cepat Analisis Data",
          "EN": "Faster Data Analysis"
        }
      },
      {
        "value": "24/7",
        "label": {
          "ID": "Virtual Analyst Siaga",
          "EN": "Virtual Analyst Standby"
        }
      },
      {
        "value": "100%",
        "label": {
          "ID": "Digitalisasi Knowledge SOP",
          "EN": "SOP Knowledge Automation"
        }
      }
    ],
    "tags": [
      "Generative AI",
      "LLM",
      "RAG",
      "Knowledge Management",
      "Mining Analytics"
    ],
    "industry": "Mining & Energy Services",
    "featuresList": [
      {
        "name": {
          "ID": "Conversational Analyst",
          "EN": "Conversational Analyst"
        },
        "description": {
          "ID": "Tanya-jawab interaktif seputar metrik produktivitas dan status distrik tambang.",
          "EN": "Interactive conversational queries on productivity metrics and district mining statuses."
        }
      },
      {
        "name": {
          "ID": "Interactive Data Charts",
          "EN": "Interactive Data Charts"
        },
        "description": {
          "ID": "Pembuatan grafik status review, approval, dan indeks performa peralatan otomatis.",
          "EN": "Automated generation of review statuses, approvals, and equipment index charts."
        }
      },
      {
        "name": {
          "ID": "SOP Assistant",
          "EN": "SOP Assistant"
        },
        "description": {
          "ID": "Pencarian aturan keselamatan kerja dan prosedur operasional standar secara instan.",
          "EN": "Instant lookup for mining safety regulations and standard operational procedures."
        }
      }
    ],
    "deliverables": [
      "LLM Architecture",
      "RAG Vector Pipeline",
      "Chat UI & Visualization",
      "Enterprise Security Integration"
    ],
    "screenshots": [
      "/images/portfolio/pama-1.png",
      "/images/portfolio/pama-2.png",
      "/images/portfolio/pama-3.png"
    ]
  },
  {
    "id": "komatsu-demand-forecasting",
    "slug": "komatsu-demand-forecasting",
    "client": "Komatsu Indonesia",
    "logo": "KOMATSU",
    "image": "/images/portfolio/komatsu-1.png",
    "images": [
      "/images/portfolio/komatsu-1.png"
    ],
    "category": {
      "ID": "PREDICTIVE ML & DATA",
      "EN": "PREDICTIVE ML & DATA"
    },
    "title": {
      "ID": "Komatsu Parts Demand Forecasting",
      "EN": "Komatsu Parts Demand Forecasting"
    },
    "summary": {
      "ID": "Model Machine Learning prediktif untuk meramalkan kebutuhan suku cadang alat berat Komatsu berdasarkan data historis penjualan, korelasi harga batubara, dan siklus perawatan.",
      "EN": "Predictive Machine Learning model forecasting heavy machinery spare parts demand based on historical sales data, coal price correlations, and maintenance cycles."
    },
    "challenge": {
      "ID": "Fluktuasi permintaan suku cadang alat berat yang dipengaruhi oleh komoditas energi, membutuhkan prediksi akurat untuk mencegah kehabisan stok maupun penumpukan inventaris.",
      "EN": "Heavy machinery spare parts demand fluctuations driven by energy commodity trends, requiring accurate forecasting to prevent stockouts and excess inventory."
    },
    "solution": {
      "ID": "Membangun pipeline pelatihan data frekuensi rendah dan tinggi, algoritma ML regresi canggih, serta dashboard visualisasi korelasi tren permintaan dan harga komoditas.",
      "EN": "Building low and high-frequency training data pipelines, advanced ML regression algorithms, and visualization dashboards correlating demand trends with commodity indices."
    },
    "metrics": [
      {
        "value": "Multi-Freq",
        "label": {
          "ID": "Data Pipeline Otomatis",
          "EN": "Automated Data Pipeline"
        }
      },
      {
        "value": "Real-time",
        "label": {
          "ID": "Korelasi Tren Pasar",
          "EN": "Market Trend Correlation"
        }
      },
      {
        "value": "Akurat",
        "label": {
          "ID": "Prediksi Suku Cadang",
          "EN": "Predictive Forecast Model"
        }
      }
    ],
    "tags": [
      "Machine Learning",
      "Data Pipelining",
      "Demand Forecasting",
      "Heavy Equipment"
    ],
    "industry": "Heavy Equipment & Manufacturing",
    "featuresList": [
      {
        "name": {
          "ID": "Predictive Engine",
          "EN": "Predictive Engine"
        },
        "description": {
          "ID": "Model estimasi jumlah pesanan dan nilai total suku cadang per periode.",
          "EN": "Estimation engine for order volume and spare parts valuation per forecast period."
        }
      },
      {
        "name": {
          "ID": "Commodity Correlation Analysis",
          "EN": "Commodity Correlation Analysis"
        },
        "description": {
          "ID": "Analisis korelasi antara harga komoditas batubara dengan laju konsumsi spare part.",
          "EN": "Correlation analysis linking coal commodity prices to spare parts consumption trends."
        }
      }
    ],
    "deliverables": [
      "ML Model Weights",
      "Data Pipeline Scripts",
      "Interactive Dashboard",
      "Evaluation Report"
    ],
    "screenshots": [
      "/images/portfolio/komatsu-1.png"
    ]
  },
  {
    "id": "sawit-weighbridge-ai",
    "slug": "sawit-weighbridge-ai",
    "client": "Palm Oil Enterprise",
    "logo": "PALM INDUSTRY",
    "image": "/images/portfolio/sawit-1.jpg",
    "images": [
      "/images/portfolio/sawit-1.jpg",
      "/images/portfolio/sawit-2.jpg",
      "/images/portfolio/sawit-3.png"
    ],
    "category": {
      "ID": "COMPUTER VISION AI",
      "EN": "COMPUTER VISION AI"
    },
    "title": {
      "ID": "AI Weighbridge Computer Vision",
      "EN": "AI Weighbridge Computer Vision"
    },
    "summary": {
      "ID": "Sistem Computer Vision berbasis CCTV cerdas untuk mendeteksi truk, orang, dan anomali pada jembatan timbang kelapa sawit secara real-time dengan akurasi di atas 90%.",
      "EN": "An intelligent CCTV Computer Vision system detecting trucks, personnel, and anomalies on palm oil weighbridges in real time with over 90% accuracy."
    },
    "challenge": {
      "ID": "Pencegahan manipulasi penimbangan muatan sawit, antrean panjang di pos timbang, dan perlunya pengawasan terpusat tanpa penambahan personel fisik di lapangan.",
      "EN": "Preventing weighbridge tampering during palm oil payload weighing, reducing truck queues, and enabling centralized remote monitoring without adding on-site personnel."
    },
    "solution": {
      "ID": "Mengintegrasikan model Object Detection berbasis edge AI dengan kamera CCTV, menghasilkan deteksi muatan dan kendaraan di bawah 3 detik per frame secara otomatis.",
      "EN": "Integrating edge AI object detection models with CCTV cameras to achieve vehicle and payload recognition in under 3 seconds per frame automatically."
    },
    "metrics": [
      {
        "value": ">90%",
        "label": {
          "ID": "Akurasi Deteksi CCTV",
          "EN": "CCTV Detection Accuracy"
        }
      },
      {
        "value": "<3 dtk",
        "label": {
          "ID": "Latensi Pemrosesan Frame",
          "EN": "Processing Latency/Frame"
        }
      },
      {
        "value": "Real-time",
        "label": {
          "ID": "Monitoring Jembatan Timbang",
          "EN": "Remote Weighbridge Telemetry"
        }
      }
    ],
    "tags": [
      "Computer Vision",
      "Object Detection",
      "Edge AI",
      "CCTV Stream",
      "AgriTech"
    ],
    "industry": "Agriculture & Palm Oil",
    "featuresList": [
      {
        "name": {
          "ID": "Vehicle & Cargo Detection",
          "EN": "Vehicle & Cargo Detection"
        },
        "description": {
          "ID": "Identifikasi posisi truk sawit tepat di area platform penimbangan.",
          "EN": "Real-time identification of palm truck alignment on the weigh platform."
        }
      },
      {
        "name": {
          "ID": "Anomaly & Person Alert",
          "EN": "Anomaly & Person Alert"
        },
        "description": {
          "ID": "Peringatan dini terhadap objek asing atau orang di area terlarang saat penimbangan.",
          "EN": "Instant alert triggers when personnel or foreign objects enter the restricted zone."
        }
      }
    ],
    "deliverables": [
      "Computer Vision Model",
      "Edge Stream Pipeline",
      "Real-time Alert Dashboard",
      "Deployment Setup"
    ],
    "screenshots": [
      "/images/portfolio/sawit-1.jpg",
      "/images/portfolio/sawit-2.jpg",
      "/images/portfolio/sawit-3.png"
    ]
  },
  {
    "id": "kemnaker-skilla",
    "slug": "kemnaker-skilla",
    "client": "Kementerian Ketenagakerjaan RI",
    "logo": "KEMNAKER",
    "image": "/images/portfolio/skilla-1.png",
    "images": [
      "/images/portfolio/skilla-1.png"
    ],
    "category": {
      "ID": "PUBLIC SERVICE CHATBOT",
      "EN": "PUBLIC SERVICE CHATBOT"
    },
    "title": {
      "ID": "Kemnaker Skilla (AI Virtual Assistant)",
      "EN": "Kemnaker Skilla (AI Virtual Assistant)"
    },
    "summary": {
      "ID": "Asisten virtual cerdas Kemnaker RI untuk melayani pertanyaan masyarakat seputar program pelatihan kerja, balai latihan (BLK), dan layanan ketenagakerjaan secara interaktif.",
      "EN": "An intelligent virtual assistant for Kemnaker RI providing conversational public services regarding vocational training, job training centers, and labor services."
    },
    "challenge": {
      "ID": "Tingginya volume pertanyaan publik mengenai pendaftaran pelatihan vokasi dan layanan ketenagakerjaan yang melebihi kapasitas helpdesk manual.",
      "EN": "High volume of public inquiries regarding vocational training registration and labor services overwhelming manual helpdesk teams."
    },
    "solution": {
      "ID": "Membangun chatbot NLU dengan percakapan natural berbahasa Indonesia yang terhubung dengan basis pengetahuan pusat bantuan Kemnaker.",
      "EN": "Developing an Indonesian NLU chatbot connected directly with Kemnaker official knowledge base for 24/7 automated assistance."
    },
    "metrics": [
      {
        "value": "24/7",
        "label": {
          "ID": "Layanan Publik Otomatis",
          "EN": "Automated Public Service"
        }
      },
      {
        "value": "100%",
        "label": {
          "ID": "Pemahaman Bahasa Natural",
          "EN": "Natural Language NLU"
        }
      },
      {
        "value": "Nasional",
        "label": {
          "ID": "Cakupan Informasi Pelatihan",
          "EN": "National Training Reach"
        }
      }
    ],
    "tags": [
      "Chatbot AI",
      "NLU",
      "Virtual Assistant",
      "Public Service",
      "Kemnaker"
    ],
    "industry": "Government & Public Affairs",
    "featuresList": [
      {
        "name": {
          "ID": "Training Recommendation",
          "EN": "Training Recommendation"
        },
        "description": {
          "ID": "Panduan pencarian dan pendaftaran program pelatihan kerja sesuai minat.",
          "EN": "Guidance on finding and registering for vocational training courses."
        }
      },
      {
        "name": {
          "ID": "Interactive FAQ",
          "EN": "Interactive FAQ"
        },
        "description": {
          "ID": "Jawaban instan untuk prosedur ketenagakerjaan dan regulasi tenaga kerja.",
          "EN": "Instant automated answers for labor regulations and administrative workflows."
        }
      }
    ],
    "deliverables": [
      "NLU Intent Engine",
      "Web Chat Widget",
      "Knowledge Base Sync",
      "Analytics Dashboard"
    ],
    "screenshots": [
      "/images/portfolio/skilla-1.png"
    ]
  },
  {
    "id": "kemendagri-rita",
    "slug": "kemendagri-rita",
    "client": "Kementerian Dalam Negeri RI",
    "logo": "KEMENDAGRI",
    "image": "/images/portfolio/rita-1.png",
    "images": [
      "/images/portfolio/rita-1.png"
    ],
    "category": {
      "ID": "HR & HELPDESK AI",
      "EN": "HR & HELPDESK AI"
    },
    "title": {
      "ID": "Kemendagri Rita (AI Virtual Assistant)",
      "EN": "Kemendagri Rita (AI Virtual Assistant)"
    },
    "summary": {
      "ID": "Virtual assistant kepegawaian untuk membantu ASN dan pegawai Kemendagri mengelola pengajuan cuti, absensi, serta informasi administrasi kepegawaian melalui Facebook & portal internal.",
      "EN": "An HR virtual assistant helping Kemendagri civil servants manage leave requests, attendance, and administrative inquiries via Facebook and internal portals."
    },
    "challenge": {
      "ID": "Penyampaian informasi kepegawaian dan proses pengajuan cuti puluhan ribu ASN yang tersebar di berbagai biro yang sebelumnya membutuhkan waktu birokrasi manual.",
      "EN": "Disseminating HR information and managing leave applications for thousands of civil servants spread across multiple bureaus efficiently."
    },
    "solution": {
      "ID": "Mengembangkan asisten cerdas multi-channel yang terintegrasi dengan database kepegawaian internal dan verifikasi hak cuti otomatis.",
      "EN": "Developing a multi-channel intelligent assistant integrated with internal HR databases for automated leave tracking and policy inquiries."
    },
    "metrics": [
      {
        "value": "24/7",
        "label": {
          "ID": "Helpdesk Cuti & Pegawai",
          "EN": "HR Leave Helpdesk"
        }
      },
      {
        "value": "Multi-Channel",
        "label": {
          "ID": "Facebook & Portal Web",
          "EN": "Facebook & Web Portal"
        }
      },
      {
        "value": "Instan",
        "label": {
          "ID": "Penyampaian Info Kepegawaian",
          "EN": "Instant HR Updates"
        }
      }
    ],
    "tags": [
      "HR Tech",
      "Virtual Assistant",
      "Kemendagri",
      "Public Sector HR",
      "Chatbot"
    ],
    "industry": "Government & Public Affairs",
    "featuresList": [
      {
        "name": {
          "ID": "Leave & Attendance Bot",
          "EN": "Leave & Attendance Bot"
        },
        "description": {
          "ID": "Pengecekan kuota cuti tahunan dan panduan pengajuan izin dinas.",
          "EN": "Leave quota verification and official duty absence guidance."
        }
      },
      {
        "name": {
          "ID": "Internal HR Directory",
          "EN": "Internal HR Directory"
        },
        "description": {
          "ID": "Pencarian kontak dan regulasi kepegawaian ASN terpadu.",
          "EN": "Centralized directory for civil service HR regulations and contacts."
        }
      }
    ],
    "deliverables": [
      "Chatbot Integration",
      "HR Database Connector",
      "Facebook Messenger Webhook",
      "User Manual"
    ],
    "screenshots": [
      "/images/portfolio/rita-1.png"
    ]
  },
  {
    "id": "kemenparekraf-vita",
    "slug": "kemenparekraf-vita",
    "client": "Kemenparekraf RI",
    "logo": "KEMENPAREKRAF",
    "image": "/images/portfolio/vita-1.png",
    "images": [
      "/images/portfolio/vita-1.png"
    ],
    "category": {
      "ID": "EVENT & GRANT CHATBOT",
      "EN": "EVENT & GRANT CHATBOT"
    },
    "title": {
      "ID": "Kemenparekraf Vita (AI Virtual Assistant)",
      "EN": "Kemenparekraf Vita (AI Virtual Assistant)"
    },
    "summary": {
      "ID": "Asisten virtual interaktif Kemenparekraf RI untuk memberikan informasi mengenai program Bantuan Pemerintah (BanPer), inisiatif Nyatakan.id, serta panduan proposal event.",
      "EN": "An interactive virtual assistant for Kemenparekraf RI providing information regarding Government Aid (BanPer), Nyatakan.id initiatives, and event proposal guidelines."
    },
    "challenge": {
      "ID": "Ribuan pelaku ekonomi kreatif dan komunitas pariwisata membutuhkan panduan persyaratan bantuan pemerintah dan jadwal event secara cepat dan akurat.",
      "EN": "Thousands of creative economy and tourism stakeholders requiring fast, accurate guidance on grant requirements and event submission timelines."
    },
    "solution": {
      "ID": "Membangun chatbot interaktif yang memberikan panduan langkah demi langkah pengajuan proposal, cek eligibility, dan jadwal pembukaan program hibah.",
      "EN": "Building an interactive chatbot offering step-by-step proposal submission guidance, eligibility checking, and grant program schedule alerts."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Panduan Hibah & BanPer",
          "EN": "Gov Aid Guide Coverage"
        }
      },
      {
        "value": "24/7",
        "label": {
          "ID": "FAQ & Timeline Proposal",
          "EN": "Proposal FAQ Timeline"
        }
      },
      {
        "value": "Interaktif",
        "label": {
          "ID": "Layanan Komunitas Kreatif",
          "EN": "Creative Community Help"
        }
      }
    ],
    "tags": [
      "Tourism Tech",
      "Creative Economy",
      "Kemenparekraf",
      "Chatbot",
      "Grant Management"
    ],
    "industry": "Tourism & Creative Economy",
    "featuresList": [
      {
        "name": {
          "ID": "Grant Eligibility Checker",
          "EN": "Grant Eligibility Checker"
        },
        "description": {
          "ID": "Pengecekan syarat penerima bantuan pemerintah sektor pariwisata.",
          "EN": "Verification of eligibility criteria for tourism & creative grants."
        }
      },
      {
        "name": {
          "ID": "Nyatakan.id Event Guide",
          "EN": "Nyatakan.id Event Guide"
        },
        "description": {
          "ID": "Panduan pengajuan event kreatif dan monitoring status kurasi.",
          "EN": "Creative event submission instructions and curation status checks."
        }
      }
    ],
    "deliverables": [
      "Virtual Assistant Engine",
      "Eligibility Logic",
      "Web Chat Widget",
      "Knowledge Base"
    ],
    "screenshots": [
      "/images/portfolio/vita-1.png"
    ]
  },
  {
    "id": "mnc-benefit",
    "slug": "mnc-benefit",
    "client": "MNC Bank",
    "logo": "MNC BANK",
    "image": "/images/portfolio/mnc-benefit-1.png",
    "images": [
      "/images/portfolio/mnc-benefit-1.png"
    ],
    "category": {
      "ID": "EMPLOYEE BENEFIT & LENDING",
      "EN": "EMPLOYEE BENEFIT & LENDING"
    },
    "title": {
      "ID": "MNC Bank PunyaBenefit",
      "EN": "MNC Bank PunyaBenefit"
    },
    "summary": {
      "ID": "Program employee benefit digital end-to-end bagi nasabah korporasi MNC Bank dengan fitur persetujuan multi-layer dari HR perusahaan hingga analis bank, BI checking, dan monitoring cicilan.",
      "EN": "An end-to-end digital employee benefit platform for MNC Bank corporate clients featuring multi-layer approval from company HR to bank credit analysts, BI checking, and installment monitoring."
    },
    "challenge": {
      "ID": "Proses pengajuan pinjaman karyawan manual yang memakan waktu lama, verifikasi HR yang lambat, dan risiko kredit yang sulit dipantau secara real-time.",
      "EN": "Manual employee loan submission workflows causing slow HR verification and difficulties in real-time credit risk monitoring."
    },
    "solution": {
      "ID": "Membangun platform portal HR dan aplikasi mobile pengajuan pinjaman dengan credit scoring otomatis, integrasi BI checking, dan manajemen limit terpusat.",
      "EN": "Developing an HR portal and mobile loan application with automated credit scoring, BI checking integration, and centralized credit limit controls."
    },
    "metrics": [
      {
        "value": "Multilayer",
        "label": {
          "ID": "Persetujuan HR & Analis Bank",
          "EN": "Multilayer Approval"
        }
      },
      {
        "value": "Otomatis",
        "label": {
          "ID": "Pemeriksaan BI Checking",
          "EN": "Automated BI Checking"
        }
      },
      {
        "value": "Real-time",
        "label": {
          "ID": "Monitoring Angsuran",
          "EN": "Installment Monitoring"
        }
      }
    ],
    "tags": [
      "FinTech",
      "Lending",
      "Credit Scoring",
      "HR Benefits",
      "Banking"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "HR Approval Portal",
          "EN": "HR Approval Portal"
        },
        "description": {
          "ID": "Verifikasi status kepegawaian dan persetujuan plafon pinjaman karyawan.",
          "EN": "Employee status verification and loan ceiling authorization portal."
        }
      },
      {
        "name": {
          "ID": "Automated Credit Assessment",
          "EN": "Automated Credit Assessment"
        },
        "description": {
          "ID": "Penilaian kelayakan kredit dan sinkronisasi data riwayat angsuran.",
          "EN": "Automated credit eligibility scoring and payment history synchronization."
        }
      }
    ],
    "deliverables": [
      "Admin HR Portal",
      "Mobile App",
      "Credit Scoring API",
      "BI Checking Integration"
    ],
    "screenshots": [
      "/images/portfolio/mnc-benefit-1.png"
    ]
  },
  {
    "id": "mnc-rumah",
    "slug": "mnc-rumah",
    "client": "MNC Bank",
    "logo": "MNC BANK",
    "image": "/images/portfolio/mnc-rumah-1.png",
    "images": [
      "/images/portfolio/mnc-rumah-1.png"
    ],
    "category": {
      "ID": "AR MORTGAGE SIMULATOR",
      "EN": "AR MORTGAGE SIMULATOR"
    },
    "title": {
      "ID": "MNC Bank PunyaRumah",
      "EN": "MNC Bank PunyaRumah"
    },
    "summary": {
      "ID": "Aplikasi pencarian properti dan simulasi KPR interaktif dengan teknologi Augmented Reality (AR) untuk memindai properti di sekitar pengguna serta pengajuan KPR digital instan.",
      "EN": "An interactive property discovery and mortgage simulation mobile app utilizing Augmented Reality (AR) to scan nearby properties and submit instant digital mortgage applications."
    },
    "challenge": {
      "ID": "Memberikan pengalaman pencarian rumah yang inovatif dan memudahkan nasabah menghitung simulasi cicilan KPR sesuai kemampuan finansial.",
      "EN": "Delivering an innovative property hunting experience and helping customers calculate realistic mortgage simulations seamlessly."
    },
    "solution": {
      "ID": "Mengintegrasikan peta lokasi berbasis GPS dengan kamera Augmented Reality dan kalkulator cicilan KPR yang langsung terhubung ke sistem pengajuan KPR MNC Bank.",
      "EN": "Integrating GPS property mapping with Augmented Reality camera scanning and mortgage calculators linked directly into MNC Bank loan origination."
    },
    "metrics": [
      {
        "value": "Augmented",
        "label": {
          "ID": "Pencarian Properti AR",
          "EN": "AR Property Scanning"
        }
      },
      {
        "value": "Instan",
        "label": {
          "ID": "Simulasi Perhitungan KPR",
          "EN": "Mortgage Calculator"
        }
      },
      {
        "value": "Paperless",
        "label": {
          "ID": "Pengajuan KPR Digital",
          "EN": "Digital Loan Submission"
        }
      }
    ],
    "tags": [
      "Augmented Reality",
      "Mortgage",
      "FinTech",
      "Real Estate Tech",
      "Mobile App"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "AR Property Radar",
          "EN": "AR Property Radar"
        },
        "description": {
          "ID": "Sorot kamera smartphone ke lingkungan sekitar untuk melihat properti yang dijual.",
          "EN": "Point your smartphone camera to discover nearby properties available for sale."
        }
      },
      {
        "name": {
          "ID": "Mortgage Simulator",
          "EN": "Mortgage Simulator"
        },
        "description": {
          "ID": "Simulasi uang muka, tenor, dan angsuran bulanan secara real-time.",
          "EN": "Real-time down payment, tenure, and monthly installment calculation."
        }
      }
    ],
    "deliverables": [
      "AR Engine Integration",
      "Mobile App (iOS/Android)",
      "Loan Application Backend",
      "Maps Integration"
    ],
    "screenshots": [
      "/images/portfolio/mnc-rumah-1.png"
    ]
  },
  {
    "id": "mnc-rekening",
    "slug": "mnc-rekening",
    "client": "MNC Bank",
    "logo": "MNC BANK",
    "image": "/images/portfolio/mnc-rekening-1.png",
    "images": [
      "/images/portfolio/mnc-rekening-1.png"
    ],
    "category": {
      "ID": "DIGITAL ONBOARDING & E-KYC",
      "EN": "DIGITAL ONBOARDING & E-KYC"
    },
    "title": {
      "ID": "MNC Bank PunyaRekening",
      "EN": "MNC Bank PunyaRekening"
    },
    "summary": {
      "ID": "Solusi pembukaan rekening tabungan MNC Bank secara digital dengan pengisian formulir instan, penjadwalan janji temu e-KYC bersama Account Executive, dan pelacakan status pembukaan rekening.",
      "EN": "A digital account opening platform for MNC Bank enabling quick form completion, e-KYC video appointment scheduling with Account Executives, and application progress tracking."
    },
    "challenge": {
      "ID": "Menghilangkan keharusan nasabah datang ke kantor cabang fisik untuk pembukaan rekening awal dengan tetap mematuhi regulasi ketat KYC perbankan.",
      "EN": "Eliminating the need for customers to visit brick-and-mortar branches for initial account opening while adhering to strict banking KYC compliance."
    },
    "solution": {
      "ID": "Membangun alur kerja pendaftaran digital yang terstruktur, verifikasi dokumen identitas, dan kalender penjadwalan verifikasi tatap muka digital.",
      "EN": "Building structured digital onboarding workflows, document verification pipelines, and digital video KYC scheduling calendars."
    },
    "metrics": [
      {
        "value": "100% Online",
        "label": {
          "ID": "Buka Rekening Digital",
          "EN": "Digital Account Opening"
        }
      },
      {
        "value": "e-KYC",
        "label": {
          "ID": "Janji Temu Account Exec",
          "EN": "e-KYC Appointment Flow"
        }
      },
      {
        "value": "Terpantau",
        "label": {
          "ID": "Tracking Status Pengajuan",
          "EN": "Application Status Tracker"
        }
      }
    ],
    "tags": [
      "Digital Onboarding",
      "e-KYC",
      "Mobile Banking",
      "FinTech"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "Digital Registration Form",
          "EN": "Digital Registration Form"
        },
        "description": {
          "ID": "Pengisian data pribadi dan upload dokumen identitas aman.",
          "EN": "Secure identity document upload and personal detail submissions."
        }
      },
      {
        "name": {
          "ID": "KYC Appointment Scheduler",
          "EN": "KYC Appointment Scheduler"
        },
        "description": {
          "ID": "Penjadwalan waktu verifikasi langsung dengan petugas bank.",
          "EN": "Direct verification appointment scheduling with bank representatives."
        }
      }
    ],
    "deliverables": [
      "Onboarding Mobile App",
      "AE Dashboard",
      "Document Verification Service"
    ],
    "screenshots": [
      "/images/portfolio/mnc-rekening-1.png"
    ]
  },
  {
    "id": "mnc-celengan",
    "slug": "mnc-celengan",
    "client": "MNC Bank",
    "logo": "MNC BANK",
    "image": "/images/portfolio/mnc-celengan-1.png",
    "images": [
      "/images/portfolio/mnc-celengan-1.png"
    ],
    "category": {
      "ID": "GAMIFIED SAVINGS PLATFORM",
      "EN": "GAMIFIED SAVINGS PLATFORM"
    },
    "title": {
      "ID": "MNC Bank PunyaCelengan",
      "EN": "MNC Bank PunyaCelengan"
    },
    "summary": {
      "ID": "Platform edukasi finansial dan tabungan gamifikasi untuk anak-anak dengan sistem penugasan harian oleh orang tua, virtual account terpisah, dan reward menabung interaktif.",
      "EN": "A gamified savings and financial education platform for children featuring parental chore assignments, dedicated virtual accounts, and interactive saving rewards."
    },
    "challenge": {
      "ID": "Mengajarkan konsep nilai uang, kerja keras, dan menabung kepada anak-anak generasi digital secara menyenangkan dan aman di bawah pengawasan orang tua.",
      "EN": "Teaching the value of money, chores, and savings habits to digital-native children in a fun and secure environment under parental supervision."
    },
    "solution": {
      "ID": "Mengembangkan aplikasi ramah anak dengan karakter animasi, daftar tugas berhadiah uang saku ke tabungan anak, dan dashboard kontrol orang tua.",
      "EN": "Developing a kid-friendly mobile interface with gamified chore completion quests crediting allowance into kids' savings accounts under parental control."
    },
    "metrics": [
      {
        "value": "Gamifikasi",
        "label": {
          "ID": "Edukasi Finansial Anak",
          "EN": "Financial Gamification"
        }
      },
      {
        "value": "Virtual",
        "label": {
          "ID": "Virtual Account Khusus",
          "EN": "Dedicated Virtual Account"
        }
      },
      {
        "value": "Misi & Reward",
        "label": {
          "ID": "Tugas Harian dari Orang Tua",
          "EN": "Chore Reward System"
        }
      }
    ],
    "tags": [
      "Gamification",
      "Kids FinTech",
      "Savings App",
      "Family Banking"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "Parent-Child Task Board",
          "EN": "Parent-Child Task Board"
        },
        "description": {
          "ID": "Pemberian tugas rumah dan reward saldo tabungan otomatis saat tugas selesai.",
          "EN": "Chore assignment with automated allowance payout upon task approval."
        }
      },
      {
        "name": {
          "ID": "Target Menabung Interaktif",
          "EN": "Interactive Savings Target"
        },
        "description": {
          "ID": "Visualisasi progres pencapaian impian barang yang ingin dibeli anak.",
          "EN": "Goal-based visual progress tracking for children saving up for dream items."
        }
      }
    ],
    "deliverables": [
      "Kids UI/UX App",
      "Parent Management Dashboard",
      "Virtual Account Core Connector"
    ],
    "screenshots": [
      "/images/portfolio/mnc-celengan-1.png"
    ]
  },
  {
    "id": "sikepo",
    "slug": "sikepo",
    "client": "Otoritas Jasa Keuangan (OJK)",
    "logo": "OJK",
    "image": "/images/portfolio/sikepo-main.jpg",
    "images": [
      "/images/portfolio/sikepo-main.jpg",
      "/images/portfolio/sikepo-1.jpg"
    ],
    "category": {
      "ID": "FINTECH & REGULATORY PORTAL",
      "EN": "FINTECH & REGULATORY PORTAL"
    },
    "title": {
      "ID": "OJK SIKePO (Ketentuan Perbankan)",
      "EN": "OJK SIKePO (Banking Regulations)"
    },
    "summary": {
      "ID": "Sistem Informasi Ketentuan Perbankan Online (SIKePO) merupakan portal dan aplikasi mobile pencarian landasan hukum, surat edaran, dan regulasi industri perbankan yang diterbitkan OJK.",
      "EN": "Sistem Informasi Ketentuan Perbankan Online (SIKePO) is a mobile app and legal portal for searching banking regulations, circular letters, and compliance rules issued by OJK."
    },
    "challenge": {
      "ID": "Banyaknya kodifikasi ketentuan perbankan yang tersebar dalam dokumen PDF dan perlunya platform pencarian cepat berbasis topik, jenis aturan, dan kata kunci bagi praktisi perbankan.",
      "EN": "Vast volume of banking regulations scattered across PDFs requiring a fast, indexed search engine by topic, regulation category, and keywords for industry professionals."
    },
    "solution": {
      "ID": "Membangun portal web dan aplikasi mobile lintas platform dengan mesin pengindeksan dokumen hukum, filter statistik regulasi, dan notifikasi aturan perbankan terbaru.",
      "EN": "Developing cross-platform mobile apps and web portals with legal text indexing engines, regulatory statistics filters, and instant push updates for new banking rules."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Regulasi Perbankan Terindeks",
          "EN": "Indexed Banking Rules"
        }
      },
      {
        "value": "<1 dtk",
        "label": {
          "ID": "Kecepatan Pencarian Aturan",
          "EN": "Search Query Speed"
        }
      },
      {
        "value": "JDIHN",
        "label": {
          "ID": "Standar Dokumentasi Hukum",
          "EN": "Legal Tech Standard"
        }
      }
    ],
    "tags": [
      "RegTech",
      "LegalTech",
      "OJK",
      "Search Portal",
      "Mobile App"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "Smart Legal Search",
          "EN": "Smart Legal Search"
        },
        "description": {
          "ID": "Pencarian cepat berdasarkan nomor PBI/POJK, tahun, kata kunci, dan kategori lembaga keuangan.",
          "EN": "Fast queries by regulation number, year, keyword, and institution type."
        }
      },
      {
        "name": {
          "ID": "Statistik Regulasi",
          "EN": "Regulation Statistics"
        },
        "description": {
          "ID": "Visualisasi grafik jumlah ketentuan terbaru yang diterbitkan per sektor.",
          "EN": "Visual charts analyzing regulatory trends issued per banking sector."
        }
      }
    ],
    "deliverables": [
      "Mobile Apps (iOS/Android)",
      "CMS Web Portal",
      "Search Indexing API",
      "Maintenance Support"
    ],
    "screenshots": [
      "/images/portfolio/sikepo-cms-mockup.png"
    ]
  },
  {
    "id": "koperasi-digital",
    "slug": "koperasi-digital",
    "client": "Platform Koperasi Indonesia",
    "logo": "KOPERASI DIGITAL",
    "image": "/images/portfolio/koperasi-1.jpg",
    "images": [
      "/images/portfolio/koperasi-1.jpg",
      "/images/portfolio/koperasi-2.jpg"
    ],
    "category": {
      "ID": "COOPERATIVE FINTECH",
      "EN": "COOPERATIVE FINTECH"
    },
    "title": {
      "ID": "Platform Koperasi Digital",
      "EN": "Digital Cooperative Platform"
    },
    "summary": {
      "ID": "Platform digital mobile untuk memodernisasi operasional koperasi, memungkinkan anggota membuka rekening, simpanan berjangka, pinjaman, dan melacak bagi hasil SHU otomatis.",
      "EN": "A mobile digital platform modernizing cooperative operations, allowing members to open accounts, subscribe to time deposits, apply for loans, and track SHU profit-sharing automatically."
    },
    "challenge": {
      "ID": "Pembukuan manual dan antrean administrasi fisik yang memperlambat ekspansi anggota koperasi dan transparansi bagi hasil simpan pinjam.",
      "EN": "Manual bookkeeping and in-person paperwork slowing down member expansion and transparency in cooperative lending & profit sharing."
    },
    "solution": {
      "ID": "Membangun aplikasi mobile lengkap dengan simulasi imbal jasa simpanan, pengajuan pinjaman online, penghitungan SHU otomatis, dan pelaporan keuangan real-time.",
      "EN": "Building a full-featured mobile app with deposit yield calculators, online loan submissions, automated dividend (SHU) tracking, and real-time bookkeeping."
    },
    "metrics": [
      {
        "value": "Otomatis",
        "label": {
          "ID": "Perhitungan SHU & Bagi Hasil",
          "EN": "Automated SHU Dividend"
        }
      },
      {
        "value": "Paperless",
        "label": {
          "ID": "Simpanan & Pinjaman Digital",
          "EN": "Paperless Lending & Savings"
        }
      },
      {
        "value": "Reward",
        "label": {
          "ID": "Poin Loyalitas Anggota",
          "EN": "Member Loyalty Points"
        }
      }
    ],
    "tags": [
      "Cooperative FinTech",
      "Lending",
      "Time Deposits",
      "Loyalty Points",
      "Bookkeeping"
    ],
    "industry": "Cooperative & Microfinance",
    "featuresList": [
      {
        "name": {
          "ID": "Digital Member Onboarding",
          "EN": "Digital Member Onboarding"
        },
        "description": {
          "ID": "Registrasi dan verifikasi data anggota koperasi secara online tanpa formulir fisik.",
          "EN": "Online member onboarding and identity verification without paperwork."
        }
      },
      {
        "name": {
          "ID": "Savings & Loan Simulator",
          "EN": "Savings & Loan Simulator"
        },
        "description": {
          "ID": "Kalkulator imbal jasa simpanan berjangka dan pengajuan pinjaman cepat.",
          "EN": "Time-deposit yield calculator and rapid loan disbursement application."
        }
      }
    ],
    "deliverables": [
      "Member Mobile App",
      "Cooperative Admin Portal",
      "SHU Ledger Engine",
      "Reporting Suite"
    ],
    "screenshots": [
      "/images/portfolio/koperasi-1.jpg",
      "/images/portfolio/koperasi-2.jpg"
    ]
  },
  {
    "id": "dbs-live-more",
    "slug": "dbs-live-more",
    "client": "Bank DBS",
    "logo": "DBS BANK",
    "image": "/images/portfolio/dbs-1.jpg",
    "images": [
      "/images/portfolio/dbs-1.jpg",
      "/images/portfolio/dbs-2.jpg",
      "/images/portfolio/dbs-3.png"
    ],
    "category": {
      "ID": "CAMPAIGN MICROSITE",
      "EN": "CAMPAIGN MICROSITE"
    },
    "title": {
      "ID": "DBS Live More Society",
      "EN": "DBS Live More Society"
    },
    "summary": {
      "ID": "Microsite interaktif untuk kampanye pemuda Bank DBS bertajuk Live Smart, Live Kind, and Live Awesome yang mendorong partisipasi aksi sosial, daur ulang, dan literasi finansial.",
      "EN": "An interactive campaign microsite for Bank DBS youth initiative #Live Smart, Live Kind, and Live Awesome promoting sustainability, recycling, and financial literacy."
    },
    "challenge": {
      "ID": "Membangun platform kampanye digital berkinerja tinggi yang mampu menangani lonjakan pengunjung saat event promosi dan festival pemuda berskala besar.",
      "EN": "Building a high-performance digital campaign portal capable of handling visitor surges during promotional festivals and sustainability campaigns."
    },
    "solution": {
      "ID": "Mengembangkan web portal modern dan responsif dengan integrasi formulir partisipasi online, artikel edukasi gaya hidup, dan pelacakan target donasi.",
      "EN": "Developing a modern responsive web portal with online pledge submissions, lifestyle educational articles, and campaign milestone tracking."
    },
    "metrics": [
      {
        "value": "Youth",
        "label": {
          "ID": "Platform Kampanye Interaktif",
          "EN": "Interactive Youth Campaign"
        }
      },
      {
        "value": "High-Traffic",
        "label": {
          "ID": "Arsitektur Web Skalabel",
          "EN": "Scalable Web Architecture"
        }
      },
      {
        "value": "Komunitas",
        "label": {
          "ID": "Keterlibatan Generasi Muda",
          "EN": "Digital Community Reach"
        }
      }
    ],
    "tags": [
      "Microsite",
      "Campaign Portal",
      "Bank DBS",
      "Responsive Web",
      "Sustainability"
    ],
    "industry": "Banking & Financial Services",
    "featuresList": [
      {
        "name": {
          "ID": "Campaign Pledge Tracker",
          "EN": "Campaign Pledge Tracker"
        },
        "description": {
          "ID": "Penghitungan dukungan partisipasi aksi hijau dan daur ulang secara real-time.",
          "EN": "Real-time tally of community environmental pledge commitments."
        }
      },
      {
        "name": {
          "ID": "Content & Event Hub",
          "EN": "Content & Event Hub"
        },
        "description": {
          "ID": "Katalog artikel inspiratif dan pendaftaran tiket festival pemuda.",
          "EN": "Inspirational article hub and youth festival ticket registration."
        }
      }
    ],
    "deliverables": [
      "Responsive Web Microsite",
      "CMS Backend",
      "Event Registration Engine",
      "Traffic Optimization"
    ],
    "screenshots": [
      "/images/portfolio/dbs-1.jpg",
      "/images/portfolio/dbs-2.jpg",
      "/images/portfolio/dbs-3.png"
    ]
  },
  {
    "id": "bioaudit",
    "slug": "bioaudit",
    "client": "PT Bio Farma (Persero)",
    "logo": "BIO FARMA",
    "image": "/images/portfolio/bioaudit-1.jpg",
    "images": [
      "/images/portfolio/bioaudit-1.jpg"
    ],
    "category": {
      "ID": "INTERNAL AUDIT SYSTEM",
      "EN": "INTERNAL AUDIT SYSTEM"
    },
    "title": {
      "ID": "BioAudit",
      "EN": "BioAudit"
    },
    "summary": {
      "ID": "Sistem audit internal holding PT Bio Farma yang mendigitalkan seluruh siklus audit secara paperless mulai dari perencanaan, kertas kerja audit, pengawasan, hingga pelaporan sesuai standar IIA.",
      "EN": "PT Bio Farma internal auditing system digitizing the complete audit cycle paperless from planning, audit working papers, supervision, to reporting aligned with IIA standards."
    },
    "challenge": {
      "ID": "Biaya alat tulis kantor yang tinggi, kesulitan pengarsipan kertas kerja fisik, dan kebutuhan pendelegasian wewenang audit internal yang transparan di lingkup holding farmasi.",
      "EN": "High physical stationery costs, paper archiving challenges, and the need for clear internal audit authority delegation across the pharmaceutical holding."
    },
    "solution": {
      "ID": "Mengembangkan sistem audit manajemen terenkripsi berbasis standar pelaksanaan audit internal internasional IIA dengan akses multi-entitas terpusat.",
      "EN": "Developing an encrypted audit management system adhering to international IIA internal audit standards with centralized multi-entity access."
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
          "ID": "Kertas Kerja Terenkripsi",
          "EN": "Encrypted Working Papers"
        }
      }
    ],
    "tags": [
      "Internal Audit",
      "Governance",
      "IIA Standards",
      "Bio Farma",
      "HealthTech"
    ],
    "industry": "Healthcare & Pharmaceuticals",
    "featuresList": [
      {
        "name": {
          "ID": "Audit Working Papers (KKA)",
          "EN": "Audit Working Papers (KKA)"
        },
        "description": {
          "ID": "Pembuatan dan pengarsipan kertas kerja audit digital dengan audit trail lengkap.",
          "EN": "Digital audit working papers creation with tamper-proof audit trails."
        }
      },
      {
        "name": {
          "ID": "Approval Delegation Matrix",
          "EN": "Approval Delegation Matrix"
        },
        "description": {
          "ID": "Alur persetujuan temuan audit berjenjang sesuai kewenangan pimpinan.",
          "EN": "Multi-tiered audit finding sign-off workflows matching leadership mandates."
        }
      }
    ],
    "deliverables": [
      "Audit Management Engine",
      "Report Generation Module",
      "Document Archiving System",
      "Security Hardening"
    ],
    "screenshots": [
      "/images/portfolio/bioaudit-cms-mockup.png"
    ]
  },
  {
    "id": "bi-smart",
    "slug": "bi-smart",
    "client": "PT Bio Farma (Persero)",
    "logo": "BIO FARMA",
    "image": "/images/portfolio/bismart-main.jpg",
    "images": [
      "/images/portfolio/bismart-main.jpg",
      "/images/portfolio/bismart-1.jpg"
    ],
    "category": {
      "ID": "RISK MANAGEMENT & EWS",
      "EN": "RISK MANAGEMENT & EWS"
    },
    "title": {
      "ID": "Bi-SMaRT",
      "EN": "Bi-SMaRT"
    },
    "summary": {
      "ID": "Aplikasi pelaporan profil risiko, proses monitoring dan evaluasi risiko, stress testing, serta dashboard Early Warning System (EWS) KRI di lingkup Holding PT Bio Farma.",
      "EN": "An enterprise application for risk profile reporting, monitoring and evaluation, stress testing, and Early Warning System (EWS) KRI dashboards across Holding PT Bio Farma."
    },
    "challenge": {
      "ID": "Penyusunan profil risiko manual yang terpisah di berbagai anak perusahaan holding dan kebutuhan pemantauan indikator risiko utama (KRI) secara cepat dan terintegrasi.",
      "EN": "Siloed manual risk profile compilation across holding subsidiaries requiring rapid, unified Key Risk Indicator (KRI) telemetry."
    },
    "solution": {
      "ID": "Membangun aplikasi manajemen risiko terpusat dengan modul entri profil risiko, matriks stress test tahunan, dashboard EWS per bulan/triwulan, dan approval pejabat berwenang.",
      "EN": "Building a centralized risk management portal with risk entry modules, annual stress test matrices, periodic EWS dashboards, and hierarchical approval workflows."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Digitalisasi Profil Risiko",
          "EN": "Risk Profile Digitization"
        }
      },
      {
        "value": "Real-time",
        "label": {
          "ID": "Early Warning System (KRI)",
          "EN": "Early Warning System (KRI)"
        }
      },
      {
        "value": "-70%",
        "label": {
          "ID": "Siklus Approval Risiko",
          "EN": "Approval Cycle Time"
        }
      }
    ],
    "tags": [
      "Risk Management",
      "Early Warning System",
      "Stress Testing",
      "Bio Farma",
      "Enterprise"
    ],
    "industry": "Healthcare & Pharmaceuticals",
    "featuresList": [
      {
        "name": {
          "ID": "Risk Profile Management",
          "EN": "Risk Profile Management"
        },
        "description": {
          "ID": "Pengelolaan data profil risiko, proses approval, dan pembuatan laporan risiko.",
          "EN": "Risk profile data management, approval processing, and reporting."
        }
      },
      {
        "name": {
          "ID": "Early Warning System Dashboard",
          "EN": "Early Warning System Dashboard"
        },
        "description": {
          "ID": "Pemantauan grafik nilai KRI dan status mitigasi risiko per kategori.",
          "EN": "Real-time visual monitoring of KRI scores and mitigation statuses."
        }
      }
    ],
    "deliverables": [
      "Risk Management System",
      "EWS Dashboard",
      "Stress Testing Engine",
      "User Manual"
    ],
    "screenshots": [
      "/images/portfolio/bismart-cms-mockup.png"
    ]
  },
  {
    "id": "imuni",
    "slug": "imuni",
    "client": "Imuni",
    "logo": "IMUNI",
    "image": "/images/portfolio/imuni-main.jpg",
    "images": [
      "/images/portfolio/imuni-main.jpg"
    ],
    "category": {
      "ID": "ON-DEMAND TELEMEDICINE",
      "EN": "ON-DEMAND TELEMEDICINE"
    },
    "title": {
      "ID": "Imuni (On-Site Vaccination)",
      "EN": "Imuni (On-Site Vaccination)"
    },
    "summary": {
      "ID": "Platform layanan vaksinasi on-site khusus anak dan dewasa di rumah, konsultasi dokter spesialis sebelum imunisasi, pemantauan tumbuh kembang, dan follow-up pasca vaksin.",
      "EN": "An on-demand on-site vaccination platform for children and adults at home, providing specialist doctor consultations, growth monitoring, and post-vaccination follow-ups."
    },
    "challenge": {
      "ID": "Kekhawatiran orang tua membawa anak ke klinik saat antrean panjang dan perlunya jadwal imunisasi digital yang terorganisir bagi seluruh anggota keluarga.",
      "EN": "Parental reluctance to take children into crowded clinic waiting rooms and the necessity for organized digital vaccination schedules for families."
    },
    "solution": {
      "ID": "Membangun aplikasi mobile pemesanan vaksinasi home service dengan rekomendasi vaksin cerdas, chat konsultasi dokter, dan rekam medis digital.",
      "EN": "Developing an on-demand home vaccination booking app with intelligent schedule reminders, doctor chat consultations, and digital medical history records."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Dokter Vaksinasi Khusus",
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
          "ID": "Sesi Vaksinasi Rumah",
          "EN": "Home Vaccination Sessions"
        }
      }
    ],
    "tags": [
      "Telemedicine",
      "Home Service",
      "Vaccination",
      "HealthTech",
      "Mobile App"
    ],
    "industry": "Healthcare & Telemedicine",
    "featuresList": [
      {
        "name": {
          "ID": "Home Vaccination Booking",
          "EN": "Home Vaccination Booking"
        },
        "description": {
          "ID": "Pemesanan vaksin anak & dewasa dengan dokter spesialis datang langsung ke rumah.",
          "EN": "Direct home-visit doctor vaccination appointment booking."
        }
      },
      {
        "name": {
          "ID": "Growth & Vaccine Tracker",
          "EN": "Growth & Vaccine Tracker"
        },
        "description": {
          "ID": "Catatan buku vaksin digital dan pemantauan kurva tumbuh kembang anak.",
          "EN": "Digital immunization booklet and child growth curve telemetry."
        }
      }
    ],
    "deliverables": [
      "Patient Mobile App",
      "Doctor Mobile App",
      "Admin Operations Portal",
      "Payment Gateway Integration"
    ],
    "screenshots": [
      "/images/portfolio/imuni-cms-mockup.png"
    ]
  },
  {
    "id": "danone-orderen",
    "slug": "danone-orderen",
    "client": "Danone AQUA",
    "logo": "DANONE AQUA",
    "image": "/images/portfolio/danone-1.png",
    "images": [
      "/images/portfolio/danone-1.png",
      "/images/portfolio/danone-2.png",
      "/images/portfolio/danone-3.png"
    ],
    "category": {
      "ID": "ORDER MANAGEMENT & DEVOPS",
      "EN": "ORDER MANAGEMENT & DEVOPS"
    },
    "title": {
      "ID": "Danone ORDERen & DevOps CI/CD",
      "EN": "Danone ORDERen & DevOps CI/CD"
    },
    "summary": {
      "ID": "Sistem manajemen order (ORDERen) untuk administrasi depot internal Danone guna memperlancar proses penerimaan pesanan, terintegrasi SAP, dan otomatisasi CI/CD Azure DevOps.",
      "EN": "An Order Management System (ORDERen) for Danone internal depot administration streamlining order taking, integrated with SAP, and implementing Azure DevOps CI/CD pipelines."
    },
    "challenge": {
      "ID": "Volume transaksi distribusi air mineral harian yang sangat tinggi pada ratusan depot serta kebutuhan pipeline deployment tanpa downtime di lingkungan cloud Danone.",
      "EN": "Massive daily beverage distribution order volumes across hundreds of depots requiring zero-downtime deployment pipelines in Danone cloud infrastructure."
    },
    "solution": {
      "ID": "Membangun aplikasi web ORDERen dengan sinkronisasi SAP otomatis, menerapkan best practice DevOps dengan automated CI/CD pipeline, SonarQube, dan monitoring real-time.",
      "EN": "Building the ORDERen web platform with automatic SAP ERP sync, Azure DevOps automated CI/CD pipelines, SonarQube code quality checks, and real-time observability."
    },
    "metrics": [
      {
        "value": "Automated",
        "label": {
          "ID": "CI/CD Azure DevOps Pipeline",
          "EN": "Azure DevOps CI/CD"
        }
      },
      {
        "value": "SAP Live",
        "label": {
          "ID": "Integrasi ERP Real-time",
          "EN": "Real-time ERP Integration"
        }
      },
      {
        "value": "24/7",
        "label": {
          "ID": "Observability & Monitoring",
          "EN": "Observability & Monitoring"
        }
      }
    ],
    "tags": [
      "DevOps",
      "Azure DevOps",
      "SAP Integration",
      "Order Management",
      "Supply Chain"
    ],
    "industry": "F&B Manufacturing & Distribution",
    "featuresList": [
      {
        "name": {
          "ID": "Depot Order Entry System",
          "EN": "Depot Order Entry System"
        },
        "description": {
          "ID": "Pencatatan sales order harian, open sales order, dan riwayat pengiriman produk.",
          "EN": "Daily sales order entry, open orders management, and product delivery history."
        }
      },
      {
        "name": {
          "ID": "Automated DevOps Pipeline",
          "EN": "Automated DevOps Pipeline"
        },
        "description": {
          "ID": "Pipeline Azure Repos -> SonarQube -> Build -> Release -> Staging & Production.",
          "EN": "Automated code push to Azure Repos, SonarQube testing, build, and automated staging/prod release."
        }
      }
    ],
    "deliverables": [
      "ORDERen Web Application",
      "Azure DevOps CI/CD Configuration",
      "SAP Connector API",
      "Monitoring Dashboard"
    ],
    "screenshots": [
      "/images/portfolio/danone-1.png",
      "/images/portfolio/danone-2.png",
      "/images/portfolio/danone-3.png"
    ]
  },
  {
    "id": "ezrx-portal",
    "slug": "ezrx-portal",
    "client": "Anugrah Pharmindo Lestari (APL)",
    "logo": "APL ZUELLIG",
    "image": "/images/portfolio/ezrx-1.jpg",
    "images": [
      "/images/portfolio/ezrx-1.jpg"
    ],
    "category": {
      "ID": "B2B PHARMA E-COMMERCE",
      "EN": "B2B PHARMA E-COMMERCE"
    },
    "title": {
      "ID": "eZRx B2B Customer Portal (APL / Zuellig Pharma)",
      "EN": "eZRx B2B Customer Portal (APL / Zuellig Pharma)"
    },
    "summary": {
      "ID": "Portal dan aplikasi mobile pemesanan produk farmasi B2B one-stop untuk rumah sakit, apotek, dan klinik rekanan APL di seluruh Indonesia dengan integrasi real-time SAP ERP.",
      "EN": "A one-stop B2B pharmaceutical customer portal and mobile app for hospitals, pharmacies, and clinics across Indonesia to order APL products with real-time SAP integration."
    },
    "challenge": {
      "ID": "Proses pemesanan obat manual yang rentan salah ketik, visibilitas stok distributor yang terbatas bagi apotek, dan pelacakan status pengiriman logistik medis.",
      "EN": "Manual pharmaceutical ordering prone to typographical errors, limited stock visibility for pharmacies, and the need for medical logistics tracking."
    },
    "solution": {
      "ID": "Membangun platform pemesanan mandiri (self-service) terintegrasi katalog APL, cek ketersediaan barang real-time, laporan piutang, dan pelacakan kurir obat.",
      "EN": "Building a self-service ordering platform with live APL catalog sync, stock availability checks, invoice/credit statement reports, and medicine dispatch tracking."
    },
    "metrics": [
      {
        "value": "SAP Live",
        "label": {
          "ID": "Integrasi Pemesanan ERP",
          "EN": "Live ERP Order Sync"
        }
      },
      {
        "value": "Nasional",
        "label": {
          "ID": "Akses RS & Apotek",
          "EN": "Hospital & Pharmacy Access"
        }
      },
      {
        "value": "24/7",
        "label": {
          "ID": "Visibilitas Stok Obat",
          "EN": "Pharma Stock Visibility"
        }
      }
    ],
    "tags": [
      "B2B e-Commerce",
      "PharmaTech",
      "SAP Integration",
      "Mobile App",
      "Supply Chain"
    ],
    "industry": "Pharmaceutical Distribution",
    "featuresList": [
      {
        "name": {
          "ID": "Self-Service Order Portal",
          "EN": "Self-Service Order Portal"
        },
        "description": {
          "ID": "Pencarian katalog produk medis, input surat pesanan digital, dan checkout instan.",
          "EN": "Medical catalog search, digital purchase order input, and instant checkout."
        }
      },
      {
        "name": {
          "ID": "Invoice & Stock Tracking",
          "EN": "Invoice & Stock Tracking"
        },
        "description": {
          "ID": "Laporan pembelian & piutang klinik serta pengecekan status pengiriman pesanan.",
          "EN": "Purchasing & accounts receivable statements with real-time delivery telemetry."
        }
      }
    ],
    "deliverables": [
      "B2B Web Portal",
      "B2B Mobile App",
      "SAP ERP Middleware",
      "Security Compliance"
    ],
    "screenshots": [
      "/images/portfolio/ezrx-1.jpg"
    ]
  },
  {
    "id": "tokoparts",
    "slug": "tokoparts",
    "client": "Tokoparts",
    "logo": "TOKOPARTS",
    "image": "/images/portfolio/tokoparts-1.jpg",
    "images": [
      "/images/portfolio/tokoparts-1.jpg",
      "/images/portfolio/tokoparts-main.jpg"
    ],
    "category": {
      "ID": "AUTOMOTIVE E-COMMERCE & CMS",
      "EN": "AUTOMOTIVE E-COMMERCE & CMS"
    },
    "title": {
      "ID": "Tokoparts e-Commerce & Headless CMS",
      "EN": "Tokoparts e-Commerce & Headless CMS"
    },
    "summary": {
      "ID": "Platform e-Commerce dan Headless CMS one-stop shopping untuk suku cadang berbagai brand kendaraan dengan katalog interaktif dan alur pemesanan online cepat.",
      "EN": "A one-stop shopping e-Commerce and Headless CMS platform for automotive spare parts across various vehicle brands with interactive catalogs and rapid online checkout."
    },
    "challenge": {
      "ID": "Kompleksitas puluhan ribu nomor suku cadang kendaraan yang berbeda dan kebutuhan bengkel serta pemilik kendaraan untuk memesan spare part tanpa datang ke toko fisik.",
      "EN": "Managing tens of thousands of complex vehicle spare parts SKUs and enabling workshops and car owners to order parts online conveniently."
    },
    "solution": {
      "ID": "Membangun platform storefront responsif dengan pencarian multi-kategori (merk, model mobil, part number) dan super administrator CMS untuk manajemen harga MSRP.",
      "EN": "Developing a responsive storefront with multi-level filtering (brand, vehicle model, part number) and super admin CMS for MSRP pricing and master data management."
    },
    "metrics": [
      {
        "value": "50K+",
        "label": {
          "ID": "SKU Suku Cadang Terdaftar",
          "EN": "Registered Parts SKU"
        }
      },
      {
        "value": "+60%",
        "label": {
          "ID": "Peningkatan Pesanan Online",
          "EN": "Online Order Surge"
        }
      },
      {
        "value": "<2 dtk",
        "label": {
          "ID": "Filter Brand & Model Cepat",
          "EN": "Catalog Filter Speed"
        }
      }
    ],
    "tags": [
      "e-Commerce",
      "Automotive",
      "Headless CMS",
      "Catalog Search",
      "Full Stack"
    ],
    "industry": "Automotive & E-Commerce",
    "featuresList": [
      {
        "name": {
          "ID": "Interactive Catalog Search",
          "EN": "Interactive Catalog Search"
        },
        "description": {
          "ID": "Pencarian spare parts berdasarkan merk (Toyota, Honda, Hino, Isuzu, dll).",
          "EN": "Spare parts lookup by brand (Toyota, Honda, Hino, Isuzu, etc.) and model year."
        }
      },
      {
        "name": {
          "ID": "Admin MSRP & Inventory CMS",
          "EN": "Admin MSRP & Inventory CMS"
        },
        "description": {
          "ID": "Pengaturan daftar harga, diskon, stok gudang, dan sinkronisasi pesanan.",
          "EN": "Master MSRP pricing, discounts, warehouse inventory, and order dispatch."
        }
      }
    ],
    "deliverables": [
      "Customer Storefront Web",
      "Super Admin CMS Portal",
      "Catalog Search Engine",
      "Payment Integration"
    ],
    "screenshots": [
      "/images/portfolio/tokoparts-cms-mockup.png"
    ]
  },
  {
    "id": "transfood",
    "slug": "transfood",
    "client": "Trans Group (TRANS F&B)",
    "logo": "TRANS F&B",
    "image": "/images/portfolio/transfood-1.png",
    "images": [
      "/images/portfolio/transfood-1.png",
      "/images/portfolio/transfood-2.png"
    ],
    "category": {
      "ID": "ON-DEMAND F&B ORDERING",
      "EN": "ON-DEMAND F&B ORDERING"
    },
    "title": {
      "ID": "TRANSFood (Wendy's, Coffee Bean, Baskin)",
      "EN": "TRANSFood (Wendy's, Coffee Bean, Baskin)"
    },
    "summary": {
      "ID": "Rangkaian aplikasi pemesanan online untuk seluruh waralaba F&B di bawah naungan Trans Group (Wendy’s, The Coffee Bean & Tea Leaf, Baskin Robbins) mencakup delivery, dine-in, dan pick-up.",
      "EN": "A comprehensive suite of online ordering applications for all F&B franchises under Trans Group (Wendy’s, The Coffee Bean & Tea Leaf, Baskin Robbins) covering delivery, dine-in, and pick-up."
    },
    "challenge": {
      "ID": "Menyatukan ekosistem pemesanan dari berbagai brand restoran waralaba yang berbeda ke dalam satu aplikasi terintegrasi dengan sistem promo dan loyalty reward.",
      "EN": "Unifying multi-brand franchise restaurant ordering workflows into a cohesive digital app with centralized promo campaigns and loyalty rewards."
    },
    "solution": {
      "ID": "Membangun aplikasi mobile terintegrasi dengan portal manajemen menu restoran, opsi pemesanan multi-metode (dine-in, delivery, take-away), dan integrasi pembayaran digital.",
      "EN": "Building an integrated mobile app with restaurant menu management dashboards, multi-fulfillment options (dine-in, delivery, pickup), and digital payment gateways."
    },
    "metrics": [
      {
        "value": "Multi-Brand",
        "label": {
          "ID": "Ekosistem Franchise Terpadu",
          "EN": "Unified Franchise Ecosystem"
        }
      },
      {
        "value": "Omnichannel",
        "label": {
          "ID": "Delivery, Dine-In & Pick-Up",
          "EN": "Delivery, Dine-in & Pickup"
        }
      },
      {
        "value": "Loyalty",
        "label": {
          "ID": "Manajemen Promo & Poin",
          "EN": "Promo & Loyalty System"
        }
      }
    ],
    "tags": [
      "F&B Tech",
      "Mobile App",
      "On-Demand Ordering",
      "Loyalty Program",
      "Omnichannel"
    ],
    "industry": "Food & Beverage Retail",
    "featuresList": [
      {
        "name": {
          "ID": "Multi-Brand Food Ordering",
          "EN": "Multi-Brand Food Ordering"
        },
        "description": {
          "ID": "Eksplorasi menu dan pemesanan makanan dari Wendy's, Coffee Bean, Baskin Robbins.",
          "EN": "Menu discovery and food ordering across multiple Trans F&B brands."
        }
      },
      {
        "name": {
          "ID": "Outlet & Revenue Dashboard",
          "EN": "Outlet & Revenue Dashboard"
        },
        "description": {
          "ID": "Dashboard performa penjualan harian, pesanan masuk, dan manajemen outlet.",
          "EN": "Daily sales telemetry, gross revenue charts, and outlet management portal."
        }
      }
    ],
    "deliverables": [
      "Customer Mobile App",
      "Outlet Admin Dashboard",
      "Menu Management Engine",
      "Payment Gateway"
    ],
    "screenshots": [
      "/images/portfolio/transfood-1.png",
      "/images/portfolio/transfood-2.png"
    ]
  },
  {
    "id": "anteraja-aware",
    "slug": "anteraja-aware",
    "client": "Anteraja",
    "logo": "ANTERAJA",
    "image": "/images/portfolio/anteraja-1.jpg",
    "images": [
      "/images/portfolio/anteraja-1.jpg",
      "/images/portfolio/anteraja-main.jpg"
    ],
    "category": {
      "ID": "LOGISTICS & COURIER OPS",
      "EN": "LOGISTICS & COURIER OPS"
    },
    "title": {
      "ID": "Anteraja Aware",
      "EN": "Anteraja Aware"
    },
    "summary": {
      "ID": "Aplikasi internal logistik untuk memantau check-in kurir (Satria), tugas harian penjemputan paket, status Airway Bill (AWB), dan laporan pengiriman di seluruh Indonesia.",
      "EN": "An internal logistics application to monitor courier (Satria) check-ins, daily pickup tasks, Airway Bill (AWB) statuses, and delivery reports across all Anteraja locations."
    },
    "challenge": {
      "ID": "Koordinasi puluhan ribu kurir logistik di lapangan setiap hari dan penyampaian update status resi pengiriman real-time tanpa penundaan.",
      "EN": "Coordinating tens of thousands of field couriers daily and delivering real-time parcel telemetry without tracking latency."
    },
    "solution": {
      "ID": "Membangun aplikasi mobile kurir tangguh berbasis cross-platform dengan offline task caching, geofencing absensi, pelaporan AWB terperinci, dan sistem apresiasi (Kudos).",
      "EN": "Developing a resilient cross-platform courier mobile app with offline task caching, geofenced attendance, detailed AWB status telemetry, and a peer appreciation system (Kudos)."
    },
    "metrics": [
      {
        "value": "50K+",
        "label": {
          "ID": "Kurir Satria Terhubung",
          "EN": "Connected Couriers"
        }
      },
      {
        "value": "99.9%",
        "label": {
          "ID": "Akurasi Pemantauan AWB",
          "EN": "AWB Tracking Accuracy"
        }
      },
      {
        "value": "Real-time",
        "label": {
          "ID": "Pelaporan Absen & Tugas",
          "EN": "Shift & Task Telemetry"
        }
      }
    ],
    "tags": [
      "Logistics",
      "Mobile App",
      "Courier Management",
      "Geo Tracking",
      "Supply Chain"
    ],
    "industry": "Logistics & Supply Chain",
    "featuresList": [
      {
        "name": {
          "ID": "Courier Task Management",
          "EN": "Courier Task Management"
        },
        "description": {
          "ID": "Daftar tugas briefing harian, target pickup, dan monitoring status pengiriman.",
          "EN": "Daily briefing tasks, pickup targets, and parcel delivery progress."
        }
      },
      {
        "name": {
          "ID": "Attendance & Performance Telemetry",
          "EN": "Attendance & Performance Telemetry"
        },
        "description": {
          "ID": "Pemantauan kehadiran Satria di hub dan laporan performa harian/bulanan.",
          "EN": "Hub attendance monitoring and daily/monthly performance telemetry."
        }
      }
    ],
    "deliverables": [
      "Cross-Platform Mobile App",
      "Dispatcher Web Dashboard",
      "Offline Sync Engine",
      "Push Notification Service"
    ],
    "screenshots": [
      "/images/portfolio/anteraja-cms-mockup.png"
    ]
  },
  {
    "id": "binus-school",
    "slug": "binus-school",
    "client": "Binus School",
    "logo": "BINUS SCHOOL",
    "image": "/images/portfolio/binus-1.png",
    "images": [
      "/images/portfolio/binus-1.png",
      "/images/portfolio/binus-2.png"
    ],
    "category": {
      "ID": "SCHOOL MANAGEMENT PLATFORM",
      "EN": "SCHOOL MANAGEMENT PLATFORM"
    },
    "title": {
      "ID": "Binus School Information System (BSIS)",
      "EN": "Binus School Information System (BSIS)"
    },
    "summary": {
      "ID": "Platform digital manajemen sekolah terpadu dari jenjang TK hingga SMA di Binus School untuk mengelola presensi, penilaian nilai, jadwal kelas, laporan perkembangan siswa, dan komunikasi guru-orang tua.",
      "EN": "An integrated school management digital platform from Kindergarten to High School at Binus School to manage attendance, grading, schedules, student progress, and teacher-parent communication."
    },
    "challenge": {
      "ID": "Integrasi sistem akademik dari berbagai kampus sekolah Binus dengan kurikulum internasional dan kebutuhan orang tua untuk memantau kemajuan belajar anak secara real-time.",
      "EN": "Integrating academic systems across multiple Binus School campuses running international curricula and providing parents real-time visibility into student progress."
    },
    "solution": {
      "ID": "Membangun portal web administrasi sekolah dan aplikasi mobile orang tua-siswa dengan kalender akademik dinamis, e-rapor, sistem pencatatan disiplin, dan portal event sekolah.",
      "EN": "Developing an administrative school web portal and parent-student mobile app featuring dynamic academic calendars, digital report cards, disciplinary tracking, and event management."
    },
    "metrics": [
      {
        "value": "TK - SMA",
        "label": {
          "ID": "Semua Jenjang Terintegrasi",
          "EN": "K-12 Integrated Levels"
        }
      },
      {
        "value": "100%",
        "label": {
          "ID": "Digitalisasi Absensi & Nilai",
          "EN": "Attendance & Grades"
        }
      },
      {
        "value": "Terpadu",
        "label": {
          "ID": "Portal Orang Tua & Guru",
          "EN": "Teacher-Parent Portal"
        }
      }
    ],
    "tags": [
      "EdTech",
      "School Management",
      "Mobile App",
      "Web Portal",
      "Education"
    ],
    "industry": "Education & School Management",
    "featuresList": [
      {
        "name": {
          "ID": "Academic Calendar & Event Portal",
          "EN": "Academic Calendar & Event Portal"
        },
        "description": {
          "ID": "Manajemen jadwal mata pelajaran, pendaftaran ekstrakurikuler, dan sertifikat prestasi.",
          "EN": "Subject schedule management, extracurricular registrations, and achievement certificates."
        }
      },
      {
        "name": {
          "ID": "Student Progress & Attendance",
          "EN": "Student Progress & Attendance"
        },
        "description": {
          "ID": "Pencatatan kehadiran harian siswa dan ringkasan perkembangan belajar terpadu.",
          "EN": "Daily student attendance recording and comprehensive academic progress summaries."
        }
      }
    ],
    "deliverables": [
      "School Admin Web Portal",
      "Parent & Student Mobile App",
      "Grading & Report Card Engine",
      "Database Architecture"
    ],
    "screenshots": [
      "/images/portfolio/binus-1.png",
      "/images/portfolio/binus-2.png"
    ]
  },
  {
    "id": "pertamina-envogas",
    "slug": "pertamina-envogas",
    "client": "PT Pertamina (Persero)",
    "logo": "PERTAMINA",
    "image": "/images/portfolio/envogas-1.jpg",
    "images": [
      "/images/portfolio/envogas-1.jpg"
    ],
    "category": {
      "ID": "LOCATION BASED SERVICES",
      "EN": "LOCATION BASED SERVICES"
    },
    "title": {
      "ID": "Pertamina Envogas (LBS Maps)",
      "EN": "Pertamina Envogas (LBS Maps)"
    },
    "summary": {
      "ID": "Aplikasi berbasis lokasi (LBS) untuk menemukan SPBG (Stasiun Pengisian Bahan Bakar Gas) terdekat, panduan instalasi kendaraan berbahan bakar gas (CNG), serta kalkulator penghematan biaya bahan bakar.",
      "EN": "A location-based service (LBS) application to find the nearest CNG gas filling stations (SPBG), installation guides for gas-fueled vehicles, and fuel cost savings calculators."
    },
    "challenge": {
      "ID": "Meningkatkan adopsi bahan bakar gas ramah lingkungan dengan mempermudah pengemudi menemukan stasiun SPBG aktif dan mengetahui manfaat penghematan finansial.",
      "EN": "Accelerating the adoption of eco-friendly gas fuels by making it effortless for drivers to locate active SPBG stations and calculate economic savings."
    },
    "solution": {
      "ID": "Mengintegrasikan peta interaktif berbasis GPS dengan rute navigasi real-time ke SPBG terdekat, kalkulator penghematan bahan bakar otomatis, dan direktori teknis bengkel konversi.",
      "EN": "Integrating GPS mapping with real-time navigation routes to the nearest SPBG, automated fuel cost savings calculators, and a certified conversion workshop directory."
    },
    "metrics": [
      {
        "value": "GPS Live",
        "label": {
          "ID": "Pencarian SPBG Terdekat",
          "EN": "Nearest SPBG Station Maps"
        }
      },
      {
        "value": "Kalkulator",
        "label": {
          "ID": "Estimasi Penghematan BBM",
          "EN": "Fuel Savings Calculator"
        }
      },
      {
        "value": "Panduan",
        "label": {
          "ID": "Info Perawatan Kendaraan Gas",
          "EN": "CNG Maintenance Guide"
        }
      }
    ],
    "tags": [
      "Location Based Service",
      "GPS Maps",
      "Energy Tech",
      "Pertamina",
      "Mobile App"
    ],
    "industry": "Energy & Gas Utilities",
    "featuresList": [
      {
        "name": {
          "ID": "Interactive SPBG Station Maps",
          "EN": "Interactive SPBG Station Maps"
        },
        "description": {
          "ID": "Peta rute lokasi SPBG aktif, jam operasional, dan ketersediaan bahan bakar gas.",
          "EN": "Active SPBG station mapping with operating hours and fuel availability."
        }
      },
      {
        "name": {
          "ID": "Fuel Cost Savings Calculator",
          "EN": "Fuel Cost Savings Calculator"
        },
        "description": {
          "ID": "Simulasi perbandingan biaya pengeluaran BBM konvensional vs Gas Envogas.",
          "EN": "Interactive comparison calculator of conventional gasoline vs Envogas CNG."
        }
      }
    ],
    "deliverables": [
      "Mobile Navigation App",
      "SPBG Database Backend",
      "Fuel Calculator Module"
    ],
    "screenshots": [
      "/images/portfolio/envogas-1.jpg"
    ]
  },
  {
    "id": "pertamina-cqms",
    "slug": "pertamina-cqms",
    "client": "Pertamina Hulu Energi ONWJ",
    "logo": "PERTAMINA PHE ONWJ",
    "image": "/images/portfolio/cqms-1.png",
    "images": [
      "/images/portfolio/cqms-1.png",
      "/images/portfolio/cqms-2.png"
    ],
    "category": {
      "ID": "QUALITY MANAGEMENT SYSTEM",
      "EN": "QUALITY MANAGEMENT SYSTEM"
    },
    "title": {
      "ID": "Pertamina CQMS (Quality Management)",
      "EN": "Pertamina CQMS (Quality Management)"
    },
    "summary": {
      "ID": "Collaborative Quality Management System (CQMS) untuk grup internal PHE ONWJ guna memastikan setiap aktivitas proyek migas dan inspeksi material berjalan efektif, patuh, dan terdokumentasi.",
      "EN": "A Collaborative Quality Management System (CQMS) for internal PHE ONWJ teams ensuring offshore oil & gas project activities and material inspections are conducted efficiently and compliantly."
    },
    "challenge": {
      "ID": "Tingginya standar keselamatan dan kepatuhan mutu operasional migas lepas pantai yang membutuhkan pemantauan sertifikasi, kontrol dokumen proyek, dan inspeksi material ketat.",
      "EN": "Stringent offshore oil & gas safety and quality standards requiring tight certification tracking, project document control, and material inspection governance."
    },
    "solution": {
      "ID": "Membangun portal web CQMS terpadu dengan modul laporan rutin audit, register temuan punchlist, kontrol dokumen proyek, dan pemantauan sertifikasi peralatan instalasi migas.",
      "EN": "Developing a unified CQMS web portal featuring audit routine reports, punchlist registers, project document controls, and offshore installation certification tracking."
    },
    "metrics": [
      {
        "value": "100%",
        "label": {
          "ID": "Project Document Control",
          "EN": "Project Document Control"
        }
      },
      {
        "value": "Eksplorasi",
        "label": {
          "ID": "Monitoring Sertifikasi & QC",
          "EN": "QC & Certification Monitor"
        }
      },
      {
        "value": "Kolaboratif",
        "label": {
          "ID": "Alur Kerja Internal PHE ONWJ",
          "EN": "PHE ONWJ Collaborative"
        }
      }
    ],
    "tags": [
      "Quality Management",
      "Oil & Gas",
      "PHE ONWJ",
      "Document Control",
      "Audit Trail"
    ],
    "industry": "Oil & Gas Quality Governance",
    "featuresList": [
      {
        "name": {
          "ID": "Project Document Control",
          "EN": "Project Document Control"
        },
        "description": {
          "ID": "Pusat repositori dan pelacakan status approval dokumen proyek eksplorasi.",
          "EN": "Centralized repository and approval status tracking for exploration project documents."
        }
      },
      {
        "name": {
          "ID": "Certification & Inspection Monitor",
          "EN": "Certification & Inspection Monitor"
        },
        "description": {
          "ID": "Pemantauan masa berlaku sertifikasi instalasi dan laporan inspeksi material.",
          "EN": "Monitoring of installation certification validities and material inspection reports."
        }
      }
    ],
    "deliverables": [
      "CQMS Web Portal",
      "Inspection Workflow Engine",
      "Document Control Module",
      "Audit Compliance Setup"
    ],
    "screenshots": [
      "/images/portfolio/cqms-1.png",
      "/images/portfolio/cqms-2.png"
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

export const DEVELOPMENT_STAGES = [
  {
    id: 'all-stages',
    name: {
      ID: 'Semua Tahap (End-to-End Development)',
      EN: 'All Stages (End-to-End Development)',
    },
  },
  {
    id: 'step-01',
    name: {
      ID: 'Discovery & Requirements (Validasi Ide & Kebutuhan)',
      EN: 'Discovery & Requirements (Idea Validation & Scope)',
    },
  },
  {
    id: 'step-02',
    name: {
      ID: 'Planning & Architecture (Arsitektur & Desain UI/UX)',
      EN: 'Planning & Architecture (Architecture & UI/UX)',
    },
  },
  {
    id: 'step-03',
    name: {
      ID: 'Agile Development (Pengembangan / Coding Sprint)',
      EN: 'Agile Development (Coding & Iterative Sprints)',
    },
  },
  {
    id: 'step-04',
    name: {
      ID: 'Testing & QA Security (Uji Performa & Keamanan)',
      EN: 'Testing & QA Security (QA & Security Testing)',
    },
  },
  {
    id: 'step-05',
    name: {
      ID: 'CI/CD & Launch (Rilis & Deployment Cloud)',
      EN: 'CI/CD & Launch (Cloud Release & Deployment)',
    },
  },
  {
    id: 'step-06',
    name: {
      ID: 'Maintenance & Support (Pemeliharaan & SLA 24/7)',
      EN: 'Maintenance & Support (24/7 Maintenance & SLA)',
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '793503fc-625b-4754-a958-218c563abb4b',
    name: 'Aqomy F. Fanany',
    role: 'VP IT Development',
    company: 'Anteraja',
    avatar: 'https://admin.radyalabs.com/assets/65d0931d-9e9e-4b13-9dbf-3897cf4cf2c5',
    quote: {
      ID: 'Pengalaman kami dengan Radya luar biasa. Keahlian mereka terbukti dalam mengembangkan aplikasi Aware Mobile lintas platform untuk membantu kami memantau operasi dan menyederhanakan alur kerja. Dukungan dari pengembang kontrak semakin meningkatkan kemampuan kami untuk memberikan lebih banyak solusi. Kami berterima kasih atas kontribusi Radya.',
      EN: 'Our experience with Radya was exceptional. Their expertise was evident in developing the cross-platform Aware Mobile app to help us monitor operations and streamline workflows. The support from contract developers further boosted our ability to deliver more solutions. We are grateful for Radya\'s contribution.'
    },
    rating: 5
  },
  {
    id: 'a423c003-df07-42c2-9cad-9793b2cfb770',
    name: 'Bernardus Sandi',
    role: 'Co-founder & CEO',
    company: 'Imuni',
    avatar: 'https://admin.radyalabs.com/assets/36a7b3e1-3b15-4866-bd5e-0d2dfee5a185',
    quote: {
      ID: 'Mewakili imuni, kami sangat berterima kasih kepada Radya Labs atas kerja samanya dari tahap diskusi, development, launching, sampai maintenance dan iterasi mobile apps imuni. Kompetensi yang luar biasa dari seluruh tim Radya Labs dan komunikasi yang baik antara kita semoga bisa dipertahankan ke depan. Sukses untuk Radya Labs!',
      EN: 'On behalf of Imuni, we are very grateful to Radya Labs for the collaboration from the discussion stage, development, launch, to the maintenance and iteration of the Imuni app. The exceptional competence of the entire team and the good communication between us will hopefully be maintained in the future. Wishing Radya Labs continued success!'
    },
    rating: 5
  },
  {
    id: 'b84195ca-1b77-406f-a982-9b30830aade9',
    name: 'Muhammad Natharisyah',
    role: 'Pengembang Penilaian Pendidikan Ahli Muda',
    company: 'PUSMENDIK, KEMENDIKBUDRISTEK',
    avatar: 'https://admin.radyalabs.com/assets/ddf62318-375e-43ec-8bb4-f7849d200a79',
    quote: {
      ID: 'Karena kami telah bekerja sama selama sekitar 2 tahun, sejauh ini Radya Labs selalu ditanggapi dengan cepat. Ketika ada permintaan langsung dari pimpinan untuk melaksanakan uji kesetaraan, tim Radya Labs sigap dan menyelesaikan pekerjaan pengembangan tepat waktu sehingga pelaksanaan ujian dapat dilakukan dengan sukses.',
      EN: 'Since we have been working together for about 2 years, so far Radya Labs has always been responsive. When there were immediate request from top management to conduct Equivalency test, Radya Labs team were alert, ready to go, and finished the development work on time so the test could be carried out successfully.'
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
