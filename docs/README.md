# Developer Portfolio — Neo-Brutalist Tech

Personal developer portfolio built with React, TypeScript, Vite, Tailwind CSS, Supabase, and Vercel.

## Vision
Build a memorable developer digital HQ rather than a generic portfolio template.

Core goals:
- Neo-Brutalist Tech visual identity.
- Public portfolio for projects, achievements, technologies, profile, and contact.
- Admin CMS for managing content without changing source code.
- Supabase for PostgreSQL, Authentication, Storage, and Row Level Security.
- Vercel-ready deployment.
- Responsive, accessible, SEO-friendly, and performant.

## Reference
https://www.rzidinc.com/

Use the reference only for inspiration. Do not copy its source code, assets, branding, or layout.

## Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React
- Supabase
- Vercel
- GitHub

## Technologies to showcase
Frontend: React, React Native, Expo, TypeScript, HTML, Tailwind CSS, Bootstrap.
Backend: NestJS, Laravel, PHP.
Tools / Other: Antigravity, Git, GitHub, Supabase, Vercel.

Antigravity must be presented as a technology/tool, not as a programming language.

## Documentation
- [DESIGN.md](./DESIGN.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DATABASE.md](./DATABASE.md)
- [SECURITY.md](./SECURITY.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [TODO.md](./TODO.md)

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

## Main capability
The owner can log in, create/edit/delete projects and achievements, upload images, edit profile content, and publish/unpublish content. Published content automatically appears on the public website.

## Local setup
```bash
npm install
npm run dev
```

Create `.env.local`:
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Validate:
```bash
npm run typecheck
npm run build
```

Never commit `.env*` files or expose the Supabase service role key.

## Definition of done
- Public pages work.
- Projects and achievements come from Supabase.
- Admin authentication and CRUD work.
- Image upload works.
- RLS is enabled and tested.
- Mobile layout works.
- SEO basics are implemented.
- Production build succeeds.
- Vercel deployment succeeds.
