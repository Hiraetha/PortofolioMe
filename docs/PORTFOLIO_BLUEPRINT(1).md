# Portfolio Website — Neo-Brutalist Tech

Dokumen ini adalah blueprint/README utama untuk membangun portfolio developer menggunakan React, TypeScript, Tailwind CSS, Supabase, dan Vercel.

## 1. Tujuan

Membangun personal portfolio yang:

- Memiliki visual Neo-Brutalist Tech yang modern dan unik.
- Responsive untuk mobile, tablet, laptop, dan desktop.
- Menampilkan project, achievement, technology stack, profile, timeline, dan contact.
- Memiliki Admin Dashboard sehingga project dan achievement dapat ditambah/edit/hapus tanpa mengubah source code.
- Menggunakan Supabase untuk database, authentication, dan storage.
- Siap di-deploy ke Vercel.
- SEO-friendly, accessible, performant, dan mudah dikembangkan.

Referensi visual:
- https://www.rzidinc.com/

Gunakan referensi tersebut hanya untuk inspirasi kualitas visual, hierarchy, dan nuansa. Jangan menyalin source code, asset, layout secara identik, atau branding milik website tersebut.

---

## 2. Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router

### Backend / BaaS

- Supabase
  - PostgreSQL
  - Supabase Auth
  - Supabase Storage
  - Row Level Security

### Deployment

- Vercel
- GitHub

### Technologies yang ditampilkan pada portfolio

#### Frontend

- React
- React Native
- Expo
- TypeScript
- HTML
- Tailwind CSS
- Bootstrap

#### Backend

- NestJS
- Laravel
- PHP

#### Tools / Other

- Antigravity
- Git
- GitHub
- Supabase
- Vercel

> Catatan: Antigravity jangan disebut sebagai programming language. Tampilkan sebagai technology/tool.

---

## 3. Design Direction

Tema utama:

**Neo-Brutalist Tech Developer Portfolio**

Karakter visual:

- Bold typography
- High contrast
- Thick borders
- Hard box shadows
- Grid layout
- Asymmetric composition
- Large headings
- Monospace typography untuk technical elements
- Terminal/code-editor inspired UI
- Status badges
- Technical metadata
- Minimal tetapi expressive animation
- Interactive cards
- Strong hover states

Hindari:

- Glassmorphism berlebihan
- Gradient berlebihan
- Portfolio template yang generik
- Terlalu banyak rounded cards
- Animasi berlebihan
- Stock-photo aesthetic

### Design tokens

Buat CSS variables/design tokens agar tema mudah diganti.

Contoh konsep:

```css
:root {
  --background: ...;
  --foreground: ...;
  --surface: ...;
  --border: ...;
  --accent: ...;
  --shadow: ...;
}
```

Jangan mengunci seluruh desain ke warna tertentu. Gunakan sistem token sehingga warna dapat diubah dengan mudah.

---

## 4. Public Website

### Routes

```text
/
 /projects
 /projects/:slug
 /achievements
 /about
 /contact
 /admin
 /admin/login
 /admin/dashboard
 /admin/projects
 /admin/achievements
 /admin/profile
```

---

## 5. Home Page

### 5.1 Navbar

Isi:

- Logo / nama
- Home
- Projects
- Achievements
- About
- Contact
- Admin/Login

Fitur:

- Sticky navigation
- Responsive
- Mobile hamburger menu
- Active route indicator
- Accessible keyboard navigation

---

### 5.2 Hero

Hero harus menjadi section paling memorable.

Isi:

- Nama developer
- Role
- Short introduction
- CTA Projects
- CTA Contact
- Availability/status badge

Tambahkan elemen:

- Terminal window
- Code snippet
- Technical metadata
- Decorative brutalist shapes
- Small status indicator

Contoh copy:

```text
BUILDING DIGITAL PRODUCTS
WITH CODE & CURIOSITY.
```

Copy final harus dapat diedit dari profile/admin configuration jika memungkinkan.

---

### 5.3 Tech Stack

Tampilkan:

```text
NestJS
React
React Native
Expo
TypeScript
Tailwind CSS
Bootstrap
Laravel
PHP
HTML
Antigravity
```

Gunakan kategori:

```text
Frontend
Backend
Mobile
Tools / Other
```

Setiap item dapat memiliki:

- Name
- Icon
- Short description
- Category
- Experience/usage label jika tersedia

Jangan mengarang level skill atau tahun pengalaman tanpa data dari owner.

---

### 5.4 Featured Projects

Project harus berasal dari Supabase.

Jangan menggunakan hard-coded array sebagai sumber data utama.

Card project memiliki:

- Cover image
- Title
- Short description
- Technology tags
- Category
- Date
- GitHub URL
- Live Demo URL
- Featured badge jika project featured

Query hanya mengambil project yang diperlukan.

---

### 5.5 Achievements

Achievement berasal dari Supabase.

Card memiliki:

- Title
- Issuer
- Date
- Description
- Certificate/image
- Certificate URL

Tampilkan beberapa achievement terbaru/featured di homepage dan sediakan halaman lengkap `/achievements`.

---

### 5.6 About

Isi:

- Introduction
- Development philosophy
- Interests
- Current focus
- Short personal statement

Jangan membuat klaim pribadi yang tidak diberikan oleh owner.

---

### 5.7 Journey / Timeline

Timeline dapat berisi:

- Learning milestones
- Projects
- Competitions
- Achievements
- Experience

Data timeline dapat dimulai statis jika diperlukan, tetapi struktur harus mudah dipindahkan ke Supabase pada tahap berikutnya.

---

### 5.8 Contact

Tampilkan:

- Email
- GitHub
- LinkedIn
- Social media jika tersedia

Jika contact form dibuat:

```text
name
email
message
```

Validasi:

- Required fields
- Email format
- Minimum message length
- Loading state
- Success state
- Error state

Jangan menyimpan credential atau secret API di frontend.

---

## 6. Project Detail

Route:

```text
/projects/:slug
```

Tampilkan:

- Project title
- Hero image
- Description
- Technologies
- Category
- Date
- Problem
- Solution
- Features
- Challenges
- Result
- GitHub
- Live Demo

Jika data Problem/Solution/Features/Challenges/Result belum tersedia, jangan mengarang. Sembunyikan section yang kosong.

Tambahkan:

- Back to projects
- Related projects

---

# 7. Admin Dashboard

Admin dashboard digunakan untuk mengelola content tanpa mengubah source code.

Route:

```text
/admin
```

Flow:

```text
/admin
  ↓
Login
  ↓
Supabase Auth
  ↓
Protected Dashboard
```

Admin harus menggunakan Supabase Authentication.

Jangan membuat password admin hard-coded.

---

## 8. Admin Dashboard Layout

Sidebar:

```text
Dashboard
Projects
Achievements
Profile
Settings
Logout
```

Dashboard overview:

```text
Total Projects
Total Achievements
Total Technologies
Recent Projects
Recent Achievements
```

Tambahkan:

- Loading state
- Empty state
- Error state
- Toast feedback
- Confirmation dialog untuk delete

---

# 9. Project CRUD

Admin dapat:

```text
Create
Read
Update
Delete
```

Form project:

```text
title
slug
description
long_description
cover_image
github_url
demo_url
technologies
category
featured
published
created_at
updated_at
```

### Project image

Gunakan Supabase Storage.

Flow:

```text
Admin
 ↓
Select Image
 ↓
Validate File
 ↓
Upload Supabase Storage
 ↓
Receive Public URL
 ↓
Save URL to PostgreSQL
```

Validasi file:

- image only
- reasonable maximum file size
- clear error message

Jangan menyimpan binary image langsung ke database.

---

# 10. Achievement CRUD

Admin dapat:

```text
Create
Read
Update
Delete
```

Form:

```text
title
description
issuer
date
image_url
certificate_url
featured
created_at
updated_at
```

Image/sertifikat menggunakan Supabase Storage.

---

# 11. Profile Management

Admin dapat mengubah:

```text
name
role
bio
short_bio
email
github_url
linkedin_url
instagram_url
avatar_url
location_label
availability_status
hero_title
hero_description
```

Hindari menyimpan informasi pribadi yang tidak diperlukan.

---

# 12. Database Schema

## Table: profiles

```sql
id uuid primary key references auth.users(id),
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
```

## Table: projects

```sql
id uuid primary key default gen_random_uuid(),
title text not null,
slug text unique not null,
description text not null,
long_description text,
cover_image text,
github_url text,
demo_url text,
technologies text[] default '{}',
category text,
featured boolean default false,
published boolean default true,
created_at timestamptz default now(),
updated_at timestamptz default now()
```

## Table: achievements

```sql
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
```

## Table: technologies

```sql
id uuid primary key default gen_random_uuid(),
name text unique not null,
category text,
icon text,
description text,
created_at timestamptz default now()
```

Technology awal:

```text
NestJS
React
React Native
Expo
TypeScript
Tailwind CSS
Bootstrap
Laravel
PHP
HTML
Antigravity
```

---

# 13. Supabase Security

Aktifkan Row Level Security.

Public visitor:

```text
SELECT projects
SELECT achievements
SELECT profile
SELECT technologies
```

Authenticated admin:

```text
SELECT
INSERT
UPDATE
DELETE
```

Pastikan policy hanya memberikan write access kepada user/admin yang benar.

Jangan pernah memasukkan:

```text
SUPABASE_SERVICE_ROLE_KEY
```

ke browser/frontend.

Frontend hanya menggunakan public/anon key sesuai konfigurasi Supabase.

---

# 14. Storage Buckets

Buat bucket:

```text
portfolio-images
```

Struktur folder:

```text
portfolio-images/
├── projects/
├── achievements/
└── profile/
```

Jika certificate memiliki akses khusus, jangan otomatis membuat semua file public. Gunakan policy dan signed URL jika dibutuhkan.

---

# 15. Environment Variables

Buat file:

```text
.env.example
```

Isi:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Local:

```text
.env.local
```

Jangan commit:

```text
.env
.env.local
```

Tambahkan ke `.gitignore`.

---

# 16. Folder Structure

Gunakan struktur:

```text
src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── achievements/
│   └── admin/
│
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── Achievements.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── admin/
│       ├── Login.tsx
│       ├── Dashboard.tsx
│       ├── Projects.tsx
│       ├── Achievements.tsx
│       ├── Profile.tsx
│       └── Settings.tsx
│
├── hooks/
├── lib/
│   └── supabase.ts
│
├── services/
│   ├── projects.ts
│   ├── achievements.ts
│   ├── profile.ts
│   └── technologies.ts
│
├── types/
│   ├── project.ts
│   ├── achievement.ts
│   ├── profile.ts
│   └── technology.ts
│
├── utils/
├── routes/
├── App.tsx
├── main.tsx
└── index.css
```

Gunakan service layer agar komponen UI tidak langsung mencampurkan semua query database.

---

# 17. Reusable Components

Minimal:

```text
Navbar
Footer
Hero
TechStack
TechBadge
ProjectCard
ProjectGrid
AchievementCard
AchievementGrid
Timeline
ContactSection
TerminalCard
StatusBadge
Button
Modal
Toast
LoadingState
EmptyState
ErrorState
```

Admin:

```text
AdminLayout
AdminSidebar
AdminHeader
ProtectedRoute
ProjectForm
AchievementForm
ProfileForm
ImageUploader
DataTable
ConfirmDialog
```

---

# 18. TypeScript Types

Gunakan type/interface.

Contoh:

```ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  cover_image?: string;
  github_url?: string;
  demo_url?: string;
  technologies: string[];
  category?: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}
```

Jangan menggunakan `any` kecuali benar-benar diperlukan.

---

# 19. UX States

Semua data fetching harus memiliki:

### Loading

Gunakan skeleton/loading indicator.

### Empty

Contoh:

```text
No projects published yet.
```

### Error

Contoh:

```text
Something went wrong.
Please try again.
```

### Success

Contoh:

```text
Project published successfully.
```

---

# 20. Responsive Design

Target:

```text
320px+
375px
425px
768px
1024px
1280px
1440px+
```

Mobile harus menjadi prioritas.

Pastikan:

- Navbar tidak overflow
- Typography tidak keluar layar
- Card tidak terlalu kecil
- Image aspect ratio konsisten
- Table admin dapat di-scroll
- Form admin nyaman digunakan di mobile

---

# 21. Accessibility

Gunakan:

- Semantic HTML
- Proper heading hierarchy
- Alt text
- Accessible labels
- Keyboard navigation
- Focus states
- ARIA hanya ketika diperlukan
- Sufficient contrast
- Reduced motion preference

Pastikan button benar-benar menggunakan `<button>` dan link menggunakan `<a>`/router link.

---

# 22. SEO

Tambahkan:

```text
title
meta description
canonical URL
Open Graph
Twitter/X card
favicon
robots.txt
sitemap.xml
```

Gunakan project title dan description yang dinamis pada halaman project detail jika arsitektur aplikasi memungkinkan.

---

# 23. Performance

Gunakan:

- Lazy loading image
- Responsive images jika tersedia
- Route/code splitting jika diperlukan
- Optimized Supabase queries
- Pagination untuk admin jika data banyak
- Debounce untuk search
- Avoid unnecessary re-renders
- Minimize animation cost

Jangan melakukan query database berulang kali tanpa alasan.

---

# 24. Animation

Gunakan Framer Motion secara minimal.

Animasi yang disarankan:

- Fade/slide reveal
- Hover card
- Button press
- Image zoom
- Navigation transition
- Staggered project cards

Hindari:

- Constant moving background
- Excessive parallax
- Long animations
- Animasi yang mengganggu reading experience

Hormati:

```css
prefers-reduced-motion
```

---

# 25. Git Workflow

Repository:

```text
portfolio
```

Branch:

```text
main
develop
feature/*
```

Commit contoh:

```text
feat: add project management
feat: add achievement dashboard
fix: mobile navbar overflow
style: improve brutalist cards
refactor: move supabase queries to services
```

---

# 26. Deployment

## GitHub

Push project:

```bash
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```

## Vercel

1. Login ke Vercel.
2. Import GitHub repository.
3. Pilih framework React/Vite.
4. Tambahkan environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

5. Deploy.
6. Hubungkan custom domain jika diperlukan.

---

# 27. Supabase Setup Checklist

```text
[ ] Create Supabase project
[ ] Create database tables
[ ] Enable RLS
[ ] Create RLS policies
[ ] Enable Authentication
[ ] Create admin account
[ ] Create Storage bucket
[ ] Configure Storage policies
[ ] Add environment variables
[ ] Test CRUD
```

---

# 28. Vercel Checklist

```text
[ ] GitHub connected
[ ] Build succeeds
[ ] Environment variables configured
[ ] Supabase URL correct
[ ] Supabase anon key correct
[ ] Admin login works
[ ] Project CRUD works
[ ] Achievement CRUD works
[ ] Image upload works
[ ] Public pages work
[ ] Custom domain configured
[ ] SEO metadata checked
```

---

# 29. Definition of Done

Website dianggap selesai apabila:

### Public

- [ ] Homepage responsive
- [ ] Hero selesai
- [ ] Tech stack selesai
- [ ] Projects berasal dari Supabase
- [ ] Achievements berasal dari Supabase
- [ ] Project detail tersedia
- [ ] About tersedia
- [ ] Contact tersedia
- [ ] Responsive mobile
- [ ] SEO dasar selesai

### Admin

- [ ] Login aman
- [ ] Protected route
- [ ] Dashboard
- [ ] Project CRUD
- [ ] Achievement CRUD
- [ ] Profile management
- [ ] Image upload
- [ ] Loading states
- [ ] Empty states
- [ ] Error handling
- [ ] Delete confirmation

### Security

- [ ] RLS aktif
- [ ] Service role key tidak ada di frontend
- [ ] Environment variables aman
- [ ] Storage policy benar
- [ ] Admin write access terbatas

### Deployment

- [ ] GitHub
- [ ] Vercel
- [ ] Supabase production
- [ ] Environment variables
- [ ] Custom domain jika ada

---

# 30. Development Order

Implementasikan dalam urutan berikut:

```text
1. Project initialization
        ↓
2. Tailwind + design system
        ↓
3. Routing
        ↓
4. Public layout
        ↓
5. Hero
        ↓
6. Tech stack
        ↓
7. Supabase connection
        ↓
8. Database schema
        ↓
9. Public projects
        ↓
10. Project detail
        ↓
11. Achievements
        ↓
12. Admin authentication
        ↓
13. Admin dashboard
        ↓
14. Project CRUD
        ↓
15. Achievement CRUD
        ↓
16. Image upload
        ↓
17. Profile management
        ↓
18. Security/RLS
        ↓
19. SEO
        ↓
20. Performance optimization
        ↓
21. Responsive QA
        ↓
22. Vercel deployment
```

---

# 31. Important Rules for AI Coding Agent

Saat mengembangkan website:

1. Jangan menghapus fitur yang sudah bekerja tanpa alasan.
2. Jangan mengganti stack utama tanpa persetujuan.
3. Jangan hard-code project/achievement sebagai sumber data utama.
4. Jangan membuat credential palsu.
5. Jangan expose Supabase service role key.
6. Jangan menggunakan `any` secara berlebihan.
7. Jangan membuat UI yang tidak responsive.
8. Jangan menyalin website referensi secara langsung.
9. Jangan mengarang informasi pribadi, achievement, experience, atau skill level.
10. Gunakan reusable components.
11. Pisahkan database logic dari UI.
12. Setiap perubahan besar harus menjaga build tetap berjalan.
13. Setelah perubahan, lakukan type-check/build.
14. Gunakan error handling yang jelas.
15. Prioritaskan accessibility.
16. Pastikan admin CRUD tidak dapat diakses visitor biasa.
17. Pastikan data publik hanya menampilkan content yang `published = true`.
18. Gunakan slug yang stabil untuk project detail.
19. Jangan menghapus data database tanpa confirmation.
20. Jangan menyimpan file upload sebagai base64 di database.

---

# 32. Final Product Vision

Website final harus terasa seperti:

```text
A DEVELOPER'S DIGITAL HQ
```

bukan sekadar:

```text
A GENERIC PORTFOLIO TEMPLATE
```

Pengunjung harus dapat dengan cepat memahami:

```text
WHO ARE YOU?
      ↓
WHAT DO YOU BUILD?
      ↓
WHAT TECHNOLOGIES DO YOU USE?
      ↓
WHAT HAVE YOU ACHIEVED?
      ↓
HOW CAN THEY CONTACT YOU?
```

Admin harus dapat mengelola seluruh content utama melalui dashboard tanpa membuka source code.

Target arsitektur:

```text
             ┌─────────────────────┐
             │      VISITOR        │
             └──────────┬──────────┘
                        ↓
                React + Vite
                        ↓
                 Public Website
                        ↓
                    Supabase
                 ↙      ↓      ↘
             Projects Achievements Profile


             ┌─────────────────────┐
             │       ADMIN         │
             └──────────┬──────────┘
                        ↓
                 Supabase Auth
                        ↓
                Protected Dashboard
                   ↙         ↘
              Project CRUD  Achievement CRUD
                   ↓         ↓
                  Storage + PostgreSQL
                        ↓
                  Public Website


                   GitHub
                      ↓
                   Vercel
                      ↓
                Production Site
```
