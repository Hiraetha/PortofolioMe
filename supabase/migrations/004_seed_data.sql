-- Migration 004: Seed Initial Technologies and Default Portfolio Content

-- 1. Insert Initial Technologies
insert into technologies (name, category, icon, description)
values
  -- Frontend
  ('React', 'Frontend', 'Code', 'Modern UI component library for scalable web interfaces'),
  ('React Native', 'Mobile', 'Smartphone', 'Cross-platform native mobile application framework'),
  ('Expo', 'Mobile', 'Boxes', 'Tooling and runtime workflow ecosystem for React Native apps'),
  ('TypeScript', 'Frontend', 'FileCode', 'Typed superset of JavaScript for robust software architecture'),
  ('HTML', 'Frontend', 'Globe', 'Semantic markup foundation for accessible web experiences'),
  ('Tailwind CSS', 'Frontend', 'Palette', 'Utility-first modern CSS framework for custom responsive design'),
  ('Bootstrap', 'Frontend', 'Layout', 'Component framework for rapid grid and layout prototyping'),
  
  -- Backend
  ('NestJS', 'Backend', 'Server', 'Progressive TypeScript enterprise-grade Node.js framework'),
  ('Laravel', 'Backend', 'Flame', 'Robust PHP web application framework with elegant syntax'),
  ('PHP', 'Backend', 'Cpu', 'Server-side scripting language for scalable backend systems'),
  
  -- Tools / Other (Antigravity is explicitly classified as Tool/Other)
  ('Antigravity', 'Tools / Other', 'Terminal', 'Next-generation agentic developer workflow and AI tooling'),
  ('Git', 'Tools / Other', 'GitBranch', 'Distributed version control system for collaborative engineering'),
  ('GitHub', 'Tools / Other', 'Github', 'Code hosting, collaboration, and continuous integration platform'),
  ('Supabase', 'Tools / Other', 'Database', 'Open-source backend-as-a-service with PostgreSQL, Auth, and Storage'),
  ('Vercel', 'Tools / Other', 'Cloud', 'Frontend cloud platform for zero-config global edge deployment')
on conflict (name) do update set
  category = excluded.category,
  icon = excluded.icon,
  description = excluded.description;

-- 2. Insert Sample Projects (Published & Featured for instant wow-factor preview)
insert into projects (title, slug, description, long_description, cover_image, github_url, demo_url, technologies, category, featured, published)
values
  (
    'Enterprise Cloud Platform API',
    'enterprise-cloud-platform-api',
    'High-throughput microservices architecture with NestJS, PostgreSQL, and event-driven caching.',
    'Engineered a distributed backend service handling millions of monthly requests with strict latency SLAs. Features role-based access control, distributed tracing, automated migrations, and zero-downtime rolling deployments.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    'https://github.com',
    'https://demo.example.com',
    array['NestJS', 'TypeScript', 'Supabase', 'Git'],
    'Backend',
    true,
    true
  ),
  (
    'Cross-Platform Mobile FinTech',
    'cross-platform-mobile-fintech',
    'Real-time financial analytics, biometric security, and transaction engine with React Native and Expo.',
    'Designed and developed a seamless cross-platform mobile application supporting instant biometric authentication, interactive budgeting graphs, encrypted local storage, and offline transaction syncing.',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    'https://github.com',
    'https://demo.example.com',
    array['React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
    'Mobile',
    true,
    true
  ),
  (
    'Interactive Developer Workspace UI',
    'interactive-developer-workspace-ui',
    'Neo-brutalist web application for live code editing, markdown documentation, and API debugging.',
    'Built with React, Tailwind CSS, and Framer Motion. Explores experimental brutalist design paradigms with high-contrast surfaces, snappy tactile feedback, and accessible keyboard-first navigation.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    'https://github.com',
    'https://demo.example.com',
    array['React', 'TypeScript', 'Tailwind CSS', 'Antigravity'],
    'Frontend',
    true,
    true
  ),
  (
    'E-Commerce Multi-Tenant Engine',
    'ecommerce-multi-tenant-engine',
    'Scalable multi-tenant retail management system with Laravel, MySQL, and modular plugin architecture.',
    'Implemented multi-tenancy database isolation, webhook dispatcher, dynamic inventory management, and automated receipt generation with high availability.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    'https://github.com',
    'https://demo.example.com',
    array['Laravel', 'PHP', 'Bootstrap', 'Git'],
    'Backend',
    false,
    true
  )
on conflict (slug) do nothing;

-- 3. Insert Sample Achievements
insert into achievements (title, description, issuer, date, image_url, certificate_url, featured)
values
  (
    'Juara Harapan 2 — LKS IT Software Solution for Business',
    'Juara Harapan 2 ajang Lomba Kompetensi Siswa (LKS) SMK Wilayah I Jakarta Utara (No: 05/SK-245/2026/LKS-SMK) mewakili SMKN 12 Jakarta. Kompetisi rekayasa solusi perangkat lunak bisnis enterprise, arsitektur database, dan implementasi aplikasi.',
    'Sudin Pendidikan Wilayah I Jakarta Utara',
    '2026-04-23',
    'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop&q=80',
    'https://disdik.jakarta.go.id',
    true
  ),
  (
    'Belajar Membuat Front-End Web untuk Pemula',
    'Sertifikasi kompetensi Front-End Web standar industri (45 Jam). Penguasaan manipulasi BOM & DOM dengan JavaScript, interaktivitas event handling, dan persistensi data dengan Web Storage API.',
    'Dicoding Indonesia',
    '2026-02-23',
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    'https://dicoding.com/certificates/MRZMWK04RPYQ',
    true
  ),
  (
    'Belajar Dasar Pemrograman Web',
    'Fondasi pembuatan website modern (41 Jam). Disusun bersama Google Developers Authorized Training Partner meliputi Semantic HTML5, styling CSS3 mendalam, Box Model, dan Responsive Layout dengan CSS Flexbox.',
    'Dicoding x Google Developers Partner',
    '2026-01-28',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    'https://dicoding.com/certificates/ERZR2RMEQPYV',
    true
  ),
  (
    'Belajar Dasar Cloud dan Gen AI di AWS',
    'Standar kompetensi internasional Amazon Web Services (13 Jam). Pemahaman infrastruktur global AWS, Amazon EC2, S3, DynamoDB, IAM Security, Well-Architected Framework, dan eksplorasi Generative AI.',
    'Dicoding Indonesia x AWS',
    '2026-01-18',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    'https://dicoding.com/certificates/2VX35DKO3PYQ',
    true
  ),
  (
    'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    'Standar okupasi Pengembang Software KBJI 2512.03. Lulus dengan Nilai Sempurna 100/100 (Ujian Akhir & Kelulusan Kelas). Menguasai logika pemrograman, flowchart sistem, JavaScript ES6, dan dokumentasi software.',
    'Dicoding Indonesia (Kartu Prakerja)',
    '2026-01-11',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    'https://dicoding.com/certificates/72ZDKNDEVPYW',
    true
  ),
  (
    'Sertifikat Uji Kemahiran Berbahasa Indonesia (UKBI)',
    'Uji kemahiran resmi Badan Pengembangan dan Pembinaan Bahasa Kemdikbudristek RI (No: SD-BB-0481420). Meraih Peringkat Semenjana (Skor 446) dengan skor Mendengarkan 530, Membaca 440, dan Merespons Kaidah 368.',
    'Kemdikbudristek RI',
    '2023-10-14',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
    'https://ukbi.kemdikbud.go.id',
    false
  )
on conflict do nothing;
