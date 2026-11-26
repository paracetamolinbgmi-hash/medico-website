# MEDICO — Step 7 Testing & Security Report

Date: 26 November 2026
Build reviewed: MEDICO Admin Dashboard V1 + MEDICO Website V3

## Test results

| Check | Result | Notes |
|---|---|---|
| JavaScript syntax — `script.js` | PASS | `node --check` completed without errors. |
| JavaScript syntax — `admin.js` | PASS | `node --check` completed without errors. |
| HTML ID uniqueness | PASS | No duplicate IDs found in `index.html` or `admin.html`. |
| Local asset references | PASS | All local script and stylesheet references found. |
| BMI calculation logic | PASS (formula review) | Uses kg / metres² and adult screening cut-offs. Browser interaction not automated. |
| Dilution calculation logic | PASS (formula review) | Uses C1V1 = C2V2 and rejects target concentration above stock concentration. |
| Unit conversion logic | PASS (formula review) | Linear conversions and temperature offsets are implemented. Browser interaction not automated. |
| Dose arithmetic practice | PASS (formula review) | mg/kg/day, administrations/day and mg/mL arithmetic; educational-only warning is present. |
| CMS create/edit/delete/import/export | NOT FULLY TESTED | Static code review only; browser workflow and backup round-trip need manual verification. |
| Mobile/accessibility/browser compatibility | NOT FULLY TESTED | Requires real-device/browser checks. |

## Security findings

### Critical before deployment

1. **Admin dashboard is not authenticated.** `admin.html` is a static public page. The localStorage dashboard is not a secure owner-only CMS. Do not put confidential content or credentials in it.
2. **No server-side publishing/storage exists.** Draft/published labels are local browser records only; they do not publish content to the public website and do not sync across devices.
3. **Media upload is not implemented.** The file picker stores only file metadata in localStorage; file bytes are not uploaded.
4. **No database or server-side authorization exists.** A client-side password would not solve this and has deliberately not been added.

### Hardening added in this build

- Added Cloudflare Pages `_headers` with CSP, MIME sniffing protection, clickjacking protection, referrer policy, restrictive permissions policy and HSTS.
- Added `X-Robots-Tag: noindex, nofollow, noarchive` for `/admin.html` and `robots.txt` disallowing crawler indexing of that path. These are crawler/privacy hints, **not access control**.
- Removed the public footer link to `admin.html` to reduce casual discovery. The URL remains reachable unless protected at the hosting edge.

## Mandatory launch gate

Before connecting the site to production or entering real content:

1. Create a Cloudflare Access application for the exact admin path/hostname and allow only the owner's verified email identity.
2. Test in a private/incognito browser: signed-out access must be denied; the owner account must be allowed; a different account must be denied.
3. Implement a server-side API with authenticated authorization and persistent storage (for example Cloudflare Worker + D1, with R2 for files). Keep secrets only in server-side environment bindings.
4. Enforce upload allowlists, file-size limits, content-type validation, randomized object names and malware scanning/quarantine where available.
5. Add audit logs, scheduled backups and a tested restore procedure.
6. Validate clinical/medical content and calculators with qualified review before public use. Keep educational disclaimers visible.

## Current security status

**NOT PRODUCTION-READY.** The static site has basic response-header hardening, but the admin route is not protected until Cloudflare Access is configured and verified. This build intentionally does not claim otherwise.
