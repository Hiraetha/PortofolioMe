-- ==============================================================================
-- MASTER SUPABASE SETUP FOR IBNU.DEV / HIRAETHA PORTFOLIO
-- Project Reference: wtehlnkctmtdcstukgpq
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wtehlnkctmtdcstukgpq/sql/new
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. HELPER FUNCTIONS
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 3. CORE TABLES
-- Profiles Table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text,
  bio text,
  short_bio text,
  email text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  avatar_url text,
  location_label text,
  availability_status text,
  hero_title text,
  hero_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Projects Table (with GitHub Webhook & Realtime Commit tracking)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  long_description text,
  cover_image text,
  github_url text,
  github_repo_name text,
  demo_url text,
  technologies text[] default '{}',
  category text,
  featured boolean default false,
  published boolean default true,
  last_commit_message text,
  last_commit_at timestamptz,
  last_commit_url text,
  last_commit_author text,
  last_commit_sha text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure GitHub Webhook columns exist if table was already created
alter table projects add column if not exists github_repo_name text;
alter table projects add column if not exists last_commit_message text;
alter table projects add column if not exists last_commit_at timestamptz;
alter table projects add column if not exists last_commit_url text;
alter table projects add column if not exists last_commit_author text;
alter table projects add column if not exists last_commit_sha text;

-- Achievements Table
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  issuer text,
  date date,
  image_url text,
  certificate_url text,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Technologies Table
create table if not exists technologies (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text,
  icon text,
  description text,
  created_at timestamptz default now()
);

-- Timeline Items Table
create table if not exists timeline_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text,
  date date,
  created_at timestamptz default now()
);

-- GitHub Activity Logs Table
create table if not exists github_activity_logs (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  repo_name text not null,
  commit_message text,
  commit_url text,
  commit_author text,
  commit_sha text,
  raw_payload jsonb,
  created_at timestamptz default now()
);

-- 4. INDEXES
create index if not exists projects_published_idx on projects(published);
create index if not exists projects_featured_idx on projects(featured);
create index if not exists projects_created_at_idx on projects(created_at desc);
create index if not exists idx_projects_github_repo_name on projects(github_repo_name);
create index if not exists achievements_featured_idx on achievements(featured);
create index if not exists achievements_date_idx on achievements(date desc);
create index if not exists idx_github_activity_created_at on github_activity_logs(created_at desc);

-- 5. TRIGGERS
drop trigger if exists set_profiles_updated_at on profiles;
create trigger set_profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

drop trigger if exists set_projects_updated_at on projects;
create trigger set_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

drop trigger if exists set_achievements_updated_at on achievements;
create trigger set_achievements_updated_at
  before update on achievements
  for each row execute function set_updated_at();

-- 6. ROW LEVEL SECURITY (RLS)
alter table profiles enable row level security;
alter table projects enable row level security;
alter table achievements enable row level security;
alter table technologies enable row level security;
alter table timeline_items enable row level security;
alter table github_activity_logs enable row level security;

-- Profiles Policies
drop policy if exists "Public can view profiles" on profiles;
create policy "Public can view profiles" on profiles for select using (true);

drop policy if exists "Authenticated users can insert profile" on profiles;
create policy "Authenticated users can insert profile" on profiles for insert to authenticated with check (auth.uid() = id);

drop policy if exists "Authenticated users can update profile" on profiles;
create policy "Authenticated users can update profile" on profiles for update to authenticated using (auth.uid() = id);

drop policy if exists "Authenticated users can delete profile" on profiles;
create policy "Authenticated users can delete profile" on profiles for delete to authenticated using (auth.uid() = id);

-- Projects Policies
drop policy if exists "Public can view published projects" on projects;
create policy "Public can view published projects" on projects for select using (published = true);

drop policy if exists "Authenticated users can view all projects" on projects;
create policy "Authenticated users can view all projects" on projects for select to authenticated using (true);

drop policy if exists "Authenticated users can insert projects" on projects;
create policy "Authenticated users can insert projects" on projects for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update projects" on projects;
create policy "Authenticated users can update projects" on projects for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete projects" on projects;
create policy "Authenticated users can delete projects" on projects for delete to authenticated using (true);

-- Allow service role and anon webhook updates to projects
drop policy if exists "Service role can update projects" on projects;
create policy "Service role can update projects" on projects for update using (true) with check (true);

-- Achievements Policies
drop policy if exists "Public can view achievements" on achievements;
create policy "Public can view achievements" on achievements for select using (true);

drop policy if exists "Authenticated users can insert achievements" on achievements;
create policy "Authenticated users can insert achievements" on achievements for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update achievements" on achievements;
create policy "Authenticated users can update achievements" on achievements for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete achievements" on achievements;
create policy "Authenticated users can delete achievements" on achievements for delete to authenticated using (true);

-- Technologies Policies
drop policy if exists "Public can view technologies" on technologies;
create policy "Public can view technologies" on technologies for select using (true);

drop policy if exists "Authenticated users can manage technologies" on technologies;
create policy "Authenticated users can manage technologies" on technologies for all to authenticated using (true) with check (true);

-- Timeline Items Policies
drop policy if exists "Public can view timeline items" on timeline_items;
create policy "Public can view timeline items" on timeline_items for select using (true);

drop policy if exists "Authenticated users can manage timeline items" on timeline_items;
create policy "Authenticated users can manage timeline items" on timeline_items for all to authenticated using (true) with check (true);

-- GitHub Activity Logs Policies
drop policy if exists "Allow public read access to github_activity_logs" on github_activity_logs;
create policy "Allow public read access to github_activity_logs" on github_activity_logs for select using (true);

drop policy if exists "Allow service role insert into github_activity_logs" on github_activity_logs;
create policy "Allow service role insert into github_activity_logs" on github_activity_logs for insert with check (true);

-- 7. SUPABASE REALTIME REPLICATION
-- Adds projects and activity logs to realtime publication
do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'projects'
  ) then
    alter publication supabase_realtime add table projects;
  end if;

  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'github_activity_logs'
  ) then
    alter publication supabase_realtime add table github_activity_logs;
  end if;
end $$;

-- 8. STORAGE BUCKET CONFIGURATION
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

drop policy if exists "Public Access for Portfolio Images" on storage.objects;
create policy "Public Access for Portfolio Images" on storage.objects for select using (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated Upload Portfolio Images" on storage.objects;
create policy "Authenticated Upload Portfolio Images" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated Update Portfolio Images" on storage.objects;
create policy "Authenticated Update Portfolio Images" on storage.objects for update to authenticated using (bucket_id = 'portfolio-images');

drop policy if exists "Authenticated Delete Portfolio Images" on storage.objects;
create policy "Authenticated Delete Portfolio Images" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-images');

-- 9. SEED DATA
-- Technologies
insert into technologies (name, category, icon, description)
values
  ('React', 'Frontend', 'Code', 'Modern UI component library for scalable web interfaces'),
  ('React Native', 'Mobile', 'Smartphone', 'Cross-platform native mobile application framework'),
  ('Expo', 'Mobile', 'Boxes', 'Tooling and runtime workflow ecosystem for React Native apps'),
  ('TypeScript', 'Frontend', 'FileCode', 'Typed superset of JavaScript for robust software architecture'),
  ('HTML', 'Frontend', 'Globe', 'Semantic markup foundation for accessible web experiences'),
  ('Tailwind CSS', 'Frontend', 'Palette', 'Utility-first modern CSS framework for custom responsive design'),
  ('Bootstrap', 'Frontend', 'Layout', 'Component framework for rapid grid and layout prototyping'),
  ('NestJS', 'Backend', 'Server', 'Progressive TypeScript enterprise-grade Node.js framework'),
  ('Laravel', 'Backend', 'Flame', 'Robust PHP web application framework with elegant syntax'),
  ('PHP', 'Backend', 'Cpu', 'Server-side scripting language for scalable backend systems'),
  ('Antigravity IDE', 'Tools / Other', 'Terminal', 'Next-generation agentic developer workflow and AI tooling'),
  ('Git', 'Tools / Other', 'GitBranch', 'Distributed version control system for collaborative engineering'),
  ('GitHub', 'Tools / Other', 'Github', 'Code hosting, collaboration, and continuous integration platform'),
  ('Supabase', 'Tools / Other', 'Database', 'Open-source backend-as-a-service with PostgreSQL, Auth, and Storage'),
  ('Vercel', 'Tools / Other', 'Cloud', 'Frontend cloud platform for zero-config global edge deployment')
on conflict (name) do update set
  category = excluded.category,
  icon = excluded.icon,
  description = excluded.description;

-- Projects (Configured for GitHub user Hiraetha)
insert into projects (title, slug, description, long_description, cover_image, github_url, github_repo_name, demo_url, technologies, category, featured, published)
values
  (
    'Interactive Developer Workspace UI',
    'interactive-developer-workspace-ui',
    'Neo-brutalist web application for live code editing, markdown documentation, and real-time webhook sync.',
    'Built with React, Tailwind CSS, and Framer Motion. Explores experimental brutalist design paradigms with high-contrast surfaces, snappy tactile feedback, and instant GitHub commit streaming via Supabase Realtime.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/PortofolioMe',
    'Hiraetha/PortofolioMe',
    'https://demo.example.com',
    array['React', 'TypeScript', 'Tailwind CSS', 'Antigravity IDE'],
    'Frontend',
    true,
    true
  ),
  (
    'Enterprise Cloud Platform API',
    'enterprise-cloud-platform-api',
    'High-throughput microservices architecture with NestJS, PostgreSQL, and event-driven caching.',
    'Engineered a distributed backend service handling millions of monthly requests with strict latency SLAs. Features role-based access control, distributed tracing, automated migrations, and zero-downtime rolling deployments.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/cloud-platform-api',
    'Hiraetha/cloud-platform-api',
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
    'https://github.com/Hiraetha/cross-platform-fintech',
    'Hiraetha/cross-platform-fintech',
    'https://demo.example.com',
    array['React Native', 'Expo', 'TypeScript', 'Tailwind CSS'],
    'Mobile',
    true,
    true
  ),
  (
    'Kantin Cermat Dubes — Digital Canteen System',
    'kantin-cermat-dubes',
    'Sistem otomasi transaksi dan pengolahan data kantin digital sekolah.',
    'Aplikasi manajemen dan digitalisasi alur transaksi kantin sekolah (Dubes / SMKN 12 Jakarta) dengan sistem rekapitulasi data pesanan, pengelolaan stok, dan pencatatan transaksi yang efisien.',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/Kantin-Cermat-Dubes',
    'Hiraetha/Kantin-Cermat-Dubes',
    'https://github.com/Hiraetha/Kantin-Cermat-Dubes',
    array['PHP', 'Laravel', 'Bootstrap', 'Git'],
    'Backend',
    true,
    true
  )
on conflict (slug) do update set
  github_url = excluded.github_url,
  github_repo_name = excluded.github_repo_name,
  technologies = excluded.technologies;

-- Achievements (Authentic Certifications & Competitions of Ibnu Abi Ad-Dunya)
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
