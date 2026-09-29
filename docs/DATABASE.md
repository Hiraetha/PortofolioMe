# Database

## Database
Use Supabase PostgreSQL.

Primary tables:
```text
profiles
projects
achievements
technologies
```

## profiles
```sql
create table profiles (
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
```

## projects
```sql
create table projects (
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
);
```
Rules:
- Slug unique.
- Title and description required.
- `published=false` hides a project publicly.
- `featured=true` enables featured placement.

## achievements
```sql
create table achievements (
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
```

## technologies
```sql
create table technologies (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text,
  icon text,
  description text,
  created_at timestamptz default now()
);
```

Initial technologies:
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

## Optional future timeline
Do not implement unless needed:
```sql
create table timeline_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text,
  date date,
  created_at timestamptz default now()
);
```

## Storage
Bucket:
```text
portfolio-images
```
Paths:
```text
projects/
achievements/
profile/
```
Store URL or storage path in the database.

## Indexes
```sql
create index projects_published_idx on projects(published);
create index projects_featured_idx on projects(featured);
create index projects_created_at_idx on projects(created_at desc);
create index achievements_featured_idx on achievements(featured);
create index achievements_date_idx on achievements(date desc);
```

## Updated-at trigger
```sql
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
```
Attach it to mutable tables.

## Validation
Project: title, description, slug required; URLs valid when provided; technologies are strings; image types validated.
Achievement: title required; valid date and URL when provided; image type validated.

## Migrations
Track schema changes:
```text
supabase/
└── migrations/
    ├── 001_initial_schema.sql
    ├── 002_rls_policies.sql
    └── 003_storage_policies.sql
```
Never make untracked production schema changes.

## Backup
Use appropriate Supabase backup/recovery capabilities. Production content must not depend on a local database.
