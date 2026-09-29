# Security

## Goals
Protect admin accounts, write operations, uploaded files, database access, and secrets.

## Authentication
Use Supabase Authentication. Do not build a custom password system without a strong reason.

Flow:
```text
/admin/login → Supabase Auth → session → protected routes
```

## Authorization
Authentication is not authorization. Database RLS must enforce who can write.

For a single-owner portfolio, restrict write policies to the owner/admin identity.

Never rely only on hidden frontend links or frontend route guards.

## Row Level Security
Enable RLS:
```sql
alter table projects enable row level security;
alter table achievements enable row level security;
alter table technologies enable row level security;
alter table profiles enable row level security;
```

Public policies should expose only intended public content. Admin write policies must verify the authenticated user.

Do not create unrestricted write policies such as:
```sql
USING (true)
```

## Frontend keys
Allowed:
```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Never expose:
```text
SUPABASE_SERVICE_ROLE_KEY
```

## Environment
Ignore:
```text
.env
.env.local
.env.production
```
Commit only `.env.example` with empty placeholders.

## Storage
Validate MIME type, extension, and maximum size. Generate safe storage paths. Suggested:
```text
projects/{uuid}-{safe-name}
achievements/{uuid}-{safe-name}
profile/{uuid}-{safe-name}
```

Allowed image types can be:
```text
image/jpeg
image/png
image/webp
```
Only allow SVG if its security implications are intentionally handled.

## URLs
Validate GitHub, demo, certificate, and social URLs. Prefer HTTPS. Do not allow executable protocols.

## XSS
Avoid `dangerouslySetInnerHTML`. If rich text is added later, sanitize it before rendering.

## Delete
Require confirmation before deletion. Consider archive/soft delete if recovery becomes important.

## Errors
Never expose credentials, access tokens, service keys, SQL, stack traces, or sensitive infrastructure details.

## Logging
Never log passwords, access tokens, service role keys, or sensitive personal data.

## Dependencies
Run:
```bash
npm audit
npm run typecheck
npm run build
```
Review high-severity vulnerabilities before release.

## Security checklist
```text
[ ] Supabase Auth enabled
[ ] RLS enabled
[ ] Public read policies reviewed
[ ] Admin write policies reviewed
[ ] Service role key absent from frontend
[ ] Environment files ignored
[ ] Upload validation
[ ] URL validation
[ ] Admin route protection
[ ] Delete confirmation
[ ] Sensitive logs removed
[ ] Production build checked
```
