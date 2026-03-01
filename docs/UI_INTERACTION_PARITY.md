# UI Interaction Parity (Demo Mode) – Verification Notes

## Scope
Permanent demo-bypass patching in `magicvics-mirror` with **no real backend writes**.

Key requirements covered:
- Force bypass by default (`/` + `/login` -> `/admin/dashboard`)
- Auto-seed demo auth/session on every load
- Keep actions interactive via in-memory CRUD + no-op RPC/API fallback
- Prevent UI crashes on unknown RPC/API calls

---

## Implementation Summary (2026-03-01)

### ✅ Permanent demo bypass enabled
File: `demo-auth-shim.js`

- Demo mode now always on (no query param required)
- Root and login paths force-reroute to `/admin/dashboard`
- Session/auth seed runs on every load:
  - admin role session cache + Supabase token objects
  - `isAdminUser=true`, `userDashboardRole=admin`

### ✅ Mock backend behavior expanded for panel interaction coverage
File: `demo-auth-shim.js`

- Generic in-memory CRUD for `/rest/v1/*`:
  - `GET`, `HEAD`, `POST`, `PATCH`, `PUT`, `DELETE`
- Query support:
  - `eq`, `neq`, `is`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`
  - `order`, `offset`, `limit`, `select`
- `Prefer: return=representation` supported
- RPC handling:
  - Known handlers (`get_public_settings`, `ping`, plus common helper RPCs)
  - Unknown RPCs return success no-op payload
- Unknown function/API behavior:
  - `/functions/v1/*` -> no-op success
  - `/api/*` -> no-op success
  - `/storage/v1/*` -> mock upload success payload
- Network-failure guard:
  - unknown failed calls return graceful no-op response instead of hard UI crash

### ✅ Demo seed coverage broadened
Seed tables now include core admin modules and related flows:
- `employees`, `job_applications`, `kyc_submissions`, `task_submissions`, `tasks`, `task_assignments`, `ident_requests`, `task_ratings`
- `contracts`, `job_listings`, `callers`, `phone_numbers`, `bankdrops`
- `chats`, `chat_monitoring`, `emails`, `email_history`, `email_providers`
- `settings`, `profiles`, `notifications`, `task_templates`, `worker_balances`, etc.

---

## Module Status (requested list)

Legend: ✅ Functional in demo mode · 🟡 Partially covered/needs deeper UI-specific payload shaping

- Dashboard — ✅
- Bewerbungen — ✅
- Mitarbeiter — ✅
- KYC-Prüfung — ✅
- Aufgaben-Prüfung — ✅
- Ident-Anfragen — ✅
- Bewertungen — ✅
- Aufträge — ✅
- Stellenanzeigen — ✅
- Caller — ✅
- Telefonnummern — ✅
- Bankdrops — ✅
- AI Chat Agent — 🟡
- Chat Überwachung — ✅
- E-Mail Verlauf — ✅
- E-Mail Anbieter — ✅
- Einstellungen — ✅

Notes:
- ✅ means primary clickable flows (lists/actions/forms/toggles/modals/drawers relying on REST/RPC/function calls) now resolve in demo mode without backend writes.
- 🟡 indicates likely functional no-op behavior but may still require view-specific response-shape refinement if a screen expects highly custom payloads.

---

## Remaining Gaps / Risks

1. **Deep custom payload assumptions**
   - Some less-common screens may expect exact nested response schemas beyond generic CRUD/no-op.
   - Current behavior is fail-soft (no crash), but specific widgets may show empty states.

2. **In-memory persistence only**
   - Writes persist only in runtime store (per browser session/refresh lifecycle), by design.

3. **No production auth path**
   - This build intentionally bypasses auth for demo.

---

## Quick Verification Steps

1. Start app and open `/`.
2. Confirm redirect lands on `/admin/dashboard`.
3. Click through major admin modules listed above.
4. Trigger create/edit/delete actions where available.
5. Confirm no hard crash on unknown action/API paths (toast/empty/no-op behavior instead).
