-- ==============================================================================
-- UPDATE PROJECTS TO MATCH HIRAETHA GITHUB REPOSITORIES
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wtehlnkctmtdcstukgpq/sql/new
-- ==============================================================================

-- 1. Bersihkan data proyek lama
truncate table projects restart identity cascade;

-- 2. Masukkan 5 proyek asli dari GitHub @Hiraetha
insert into projects (
  title, 
  slug, 
  description, 
  long_description, 
  cover_image, 
  github_url, 
  github_repo_name, 
  demo_url, 
  technologies, 
  category, 
  featured, 
  published,
  last_commit_message,
  last_commit_sha,
  last_commit_author,
  last_commit_url,
  last_commit_at
)
values
  (
    'PortofolioMe — Neo-Brutalist Portfolio & Sync Engine',
    'portofoliome',
    'Personal engineering portfolio dengan arsitektur Neo-Brutalist, Supabase database, dan real-time GitHub webhook sync.',
    'Dibangun menggunakan React, TypeScript, Tailwind CSS, dan Supabase. Mengimplementasikan sinkronisasi commit otomatis via GitHub Webhook, Supabase Realtime channel, manajemen audit log, dan antarmuka Neo-Brutalist berkinerja tinggi.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/PortofolioMe',
    'Hiraetha/PortofolioMe',
    'https://github.com/Hiraetha/PortofolioMe',
    array['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Antigravity IDE'],
    'Frontend',
    true,
    true,
    'feat: sync projects with authentic GitHub repositories of Hiraetha',
    '38cb0fb',
    'iiibbnab',
    'https://github.com/Hiraetha/PortofolioMe/commit/38cb0fb',
    now()
  ),
  (
    'Web Promosi RPL — SMKN 12 Jakarta',
    'promosirpl',
    'Platform showcase dan promosi interaktif program keahlian Rekayasa Perangkat Lunak SMKN 12 Jakarta.',
    'Website profil dan promosi jurusan Rekayasa Perangkat Lunak (RPL) SMKN 12 Jakarta. Menampilkan keunggulan kurikulum industri, showcase karya siswa, dokumentasi kegiatan, dan informasi pendaftaran dengan performa cepat dan responsif.',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/promosiRPL',
    'Hiraetha/promosiRPL',
    'https://promosirpl.vercel.app',
    array['JavaScript', 'HTML', 'Tailwind CSS', 'Vercel'],
    'Frontend',
    true,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'Kantin Cermat Dubes — Digital Canteen System',
    'kantin-cermat-dubes',
    'Sistem otomasi transaksi dan pengolahan data kantin digital sekolah SMKN 12 Jakarta.',
    'Aplikasi digitalisasi sistem kantin sekolah (Dubes / SMKN 12 Jakarta). Mengakomodasi pencatatan pesanan digital, rekapitulasi data penjualan harian, pemantauan stok kantin, dan pelaporan keuangan berkala untuk menunjang transparansi operasional sekolah.',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/Kantin-Cermat-Dubes',
    'Hiraetha/Kantin-Cermat-Dubes',
    'https://github.com/Hiraetha/Kantin-Cermat-Dubes',
    array['TypeScript', 'React', 'Tailwind CSS', 'Git'],
    'Backend',
    true,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'LKS IT Software Solution for Business Simulation Engine',
    'lks-2026-lat',
    'Repository modul latihan dan simulasi kompetisi LKS SMK IT Software Solution for Business.',
    'Kumpulan kode, arsitektur database, dan implementasi modul untuk persiapan kompetisi Lomba Kompetensi Siswa (LKS) IT Software Solution for Business tingkat Jakarta Utara (Juara Harapan 2). Mengimplementasikan business logic enterprise, CRUD kompleks, relasi multi-tabel, dan integrasi reporting.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/LKS-2026-LAT',
    'Hiraetha/LKS-2026-LAT',
    'https://github.com/Hiraetha/LKS-2026-LAT',
    array['TypeScript', 'Supabase', 'Git'],
    'Backend',
    true,
    true,
    null,
    null,
    null,
    null,
    null
  ),
  (
    'Projek Absensi Siswa & Manajemen Kehadiran',
    'projek-absensi-final',
    'Aplikasi presensi digital dan pengelolaan data kehadiran siswa berbasis web.',
    'Sistem informasi absensi berbasis PHP untuk manajemen rekapitulasi kehadiran kelas, pencatatan izin dan sakit, autentikasi guru/petugas, serta ekspor laporan presensi otomatis untuk keperluan administrasi sekolah.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    'https://github.com/Hiraetha/Projek-Absensi-FInal',
    'Hiraetha/Projek-Absensi-FInal',
    'https://github.com/Hiraetha/Projek-Absensi-FInal',
    array['PHP', 'Bootstrap', 'Git'],
    'Backend',
    false,
    true,
    null,
    null,
    null,
    null,
    null
  );
