# Deployment

## Production architecture
```text
GitHub
  ↓
Vercel
  ↓
React + Vite
  ↓
Supabase
  ├── PostgreSQL
  ├── Auth
  └── Storage
```

## Prerequisites
Accounts:
- GitHub
- Vercel
- Supabase

Local:
- Node.js
- npm
- Git

## Supabase
Create the production project and configure database, authentication, storage, and RLS. Run migration files in order.

## Authentication
Create the owner/admin account in Supabase. Never put credentials in source code. Verify login, logout, session persistence, and protected routes.

## Storage
Create:
```text
portfolio-images
```
Configure policies according to `SECURITY.md`. Test project, achievement, and profile image uploads.

## Local environment
Create `.env.local`:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Run:
```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## GitHub
```bash
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin <YOUR_REPOSITORY_URL>
git push -u origin main
```
Never push secrets.

## Vercel
1. Import the GitHub repository.
2. Verify React/Vite build settings.
3. Add `VITE_SUPABASE_URL`.
4. Add `VITE_SUPABASE_ANON_KEY`.
5. Deploy.

Configure environment variables for the appropriate Vercel environments.

## Custom domain
Add the domain in Vercel, configure DNS according to Vercel's instructions, wait for propagation, and verify HTTPS.

## Post-deployment tests
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
login/logout
project CRUD
achievement CRUD
image uploads
profile edit
```

## SEO
Verify page titles, descriptions, Open Graph, favicon, robots.txt, sitemap, and canonical URLs.

## Performance
Verify optimized images, no unnecessary large assets, acceptable mobile performance, and restrained animations.

## Rollback
Use Git commits and Vercel deployment history. Fix/revert broken commits rather than making undocumented production changes.

## Production checklist
```text
[ ] Supabase production ready
[ ] Migrations applied
[ ] RLS verified
[ ] Storage policies verified
[ ] Admin account verified
[ ] Environment variables configured
[ ] GitHub clean
[ ] Build passes
[ ] Vercel deployment passes
[ ] Domain connected
[ ] HTTPS active
[ ] Public routes tested
[ ] Admin routes tested
[ ] Image upload tested
[ ] SEO tested
[ ] Mobile tested
```
