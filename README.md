# MEDICO — Pharmacy & Healthcare Education Platform

Responsive static website starter for MEDICO.

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser, or use a local development server.
3. Open `admin.html` only as a local content-studio prototype.

## Included
- Responsive homepage and navigation
- D.Pharm and B.Pharm programme explorer
- Disease, healthcare, article and video sections (content placeholders)
- Educational tools: BMI, unit conversion, mg/kg arithmetic practice and dilution
- Admin content-studio prototype with local draft records, JSON backup/restore and media metadata registration
- Cloudflare Pages `_headers` security-header configuration

## Important limitations
- The website is a frontend prototype; it is not a production CMS.
- Subject detail pages and medical content are placeholders until verified content is added.
- Admin records are stored only in the current browser's `localStorage`; they do not sync, publish or persist to a server.
- The media picker stores metadata only; it does not upload actual files.
- There is no login, database, backend or server-side authorization in this package.
- Calculators are educational prototypes only, not for diagnosis, prescribing or patient-care decisions.
- The contact address is a placeholder (`hello@medico.example`).

## Security — read before deployment
- `admin.html` is not password protected. Do not expose it publicly until Cloudflare Access (owner-only identity policy) is configured and tested.
- `_headers` adds baseline browser security headers for Cloudflare Pages. Headers and `robots.txt` do **not** authenticate users or prevent direct access to the admin page.
- Do not add passwords, API tokens, private keys or other secrets to HTML/JavaScript.
- A production CMS needs a server-side authenticated API, persistent database, protected file storage, upload validation, audit logging and backups.
- Review `TEST-AND-SECURITY-REPORT.md` for test results and mandatory launch gates.

## Recommended production architecture
- Static frontend: Cloudflare Pages
- Admin route protection: Cloudflare Access
- API: Cloudflare Worker with server-side authorization
- Content database: Cloudflare D1
- PDF/image storage: Cloudflare R2
- Secrets: Worker environment bindings, never browser code

Do not connect or deploy this build until the launch gates in the security report are completed.
