# Architecture

## Overview
```text
Visitor
  ↓
React + Vite
  ↓
React Router
  ↓
Pages
  ↓
Service Layer
  ↓
Supabase Client
  ↓
PostgreSQL / Storage / Auth
```

Admin:
```text
Admin
  ↓
Supabase Auth
  ↓
Protected Route
  ↓
Admin Pages
  ↓
Service Layer
  ↓
Supabase
```

## Layers
UI layer: rendering, interaction, forms, loading/error/empty states.
Service layer: Supabase queries, CRUD, storage, query mapping.
Type layer: shared TypeScript types.
Infrastructure layer: `lib/supabase.ts`.

## Folder structure
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
├── pages/
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── Achievements.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── admin/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/
├── routes/
├── App.tsx
├── main.tsx
└── index.css
```

## Services
```text
services/projects.ts
services/achievements.ts
services/profile.ts
services/technologies.ts
```
Keep database logic outside UI components.

## Routes
Public:
```text
/
 /projects
 /projects/:slug
 /achievements
 /about
 /contact
```
Admin:
```text
/admin/login
/admin
/admin/projects
/admin/achievements
/admin/profile
/admin/settings
```

## Data flow
Project list:
```text
Projects page → getPublishedProjects() → Supabase → Project[] → ProjectGrid → ProjectCard
```

Project detail:
```text
/project/:slug → getProjectBySlug(slug) → Supabase → Project → ProjectDetail
```

Admin creation:
```text
ProjectForm → validate → upload image → createProject() → Supabase → feedback → refresh
```

## Public data rules
Only show projects where `published = true`. A typical ordering is `featured DESC, created_at DESC`.

## State management
Prefer local React state. Use shared auth state only where needed. Do not introduce a global state library without a real requirement.

## Error handling
Every async operation needs loading, success, empty, and error states. Never expose secrets in errors.

## Forms
Every form needs labels, validation, error messages, loading state, success feedback, and cancellation where appropriate.

## Image upload
```text
ImageUploader
  ↓
validate type/size
  ↓
Supabase Storage
  ↓
URL/path
  ↓
save URL/path to DB
```
Never store base64 images in PostgreSQL.

## Performance
Use lazy images, focused queries, pagination for large admin lists, route splitting when useful, and avoid unnecessary re-renders.

## SEO
Implement titles, meta descriptions, canonical URLs, Open Graph, robots.txt, sitemap where appropriate, and dynamic project metadata.

## Coding rules
- TypeScript first.
- Avoid `any`.
- Keep components focused.
- Keep DB logic outside UI.
- Reuse components.
- Avoid unnecessary dependencies.
- Keep the build passing after meaningful changes.
