# magicvics-mirror (frontend mirror-first, demo build)

Local mirror of delivered frontend assets from:

- `https://magicvics.lockigesbrusthaar.cloud`

This project is **mirror-first** (not a redesign): it stores served HTML, JS/CSS bundles, fonts, and static assets so the app can be viewed with SPA route fallback.

---

## Demo-only behavior (important)

This mirror is currently configured as a **permanent demo build**.

- `demo-auth-shim.js` is always active.
- `/` and `/login` are force-rerouted to `/admin/dashboard`.
- Demo auth/session is auto-seeded on every load.
- Supabase REST/RPC/API calls are intercepted with in-memory mock behavior (no real backend writes).

> ⚠️ **DEMO ONLY**: this is an intentional auth bypass for local/demo usage, not production-safe behavior.

---

## What was mirrored

- Entry HTML: `index.html`
- JS/CSS bundles: `assets/*`
- App font files: `fonts/*`
- Inter webfont CSS + files (localized):
  - `styles/inter-local.css`
  - `external/fonts.gstatic.com/*`
- Lightweight SPA static server:
  - `server.mjs`
  - `start.cmd`

---

## Run locally

### Option 1 (Node)

```bash
cd C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror
node server.mjs
```

Open: `http://localhost:4173`

### Option 2 (npm)

```bash
cd C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror
npm start
```

### Option 3 (Windows script)

Double-click `start.cmd` (or run it in cmd/powershell).

---

## Railway deploy notes

This repo can be deployed as a static Node service using `server.mjs`.

- **Start command**: `node server.mjs`
- **Node version**: current LTS/newer (no native addons required)
- **Port**: provided by Railway via `PORT` env (already handled by `server.mjs`)

Suggested Railway setup:

1. New Project → Deploy from GitHub (this repo)
2. Service type: Node
3. Set Start Command: `node server.mjs`
4. Deploy

After deploy, opening the service root URL should land directly in `/admin/dashboard` due to the demo shim redirect.

---

## SPA route fallback

`server.mjs` serves existing files directly and falls back to `index.html` for non-file routes (e.g. `/dashboard`, `/employees/123`) so client-side routing works.

---

## Local Postgres backend (no Supabase)

A minimal backend scaffold now exists under `backend/` using:

- Express
- Prisma
- PostgreSQL

The frontend static server (`server.mjs`) now proxies `/api/*` requests to `API_TARGET` (default: `http://localhost:4000`).

### First-time setup

```bash
cd C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror
npm run db:up
npm run backend:install
copy backend\.env.example backend\.env
npm run backend:migrate
npm run backend:seed
```

### Run both services

Terminal 1 (backend):

```bash
cd C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror
npm run backend:dev
```

Terminal 2 (frontend mirror):

```bash
cd C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror
npm start
```

Open: `http://localhost:4173`

### Railway deployment path

1. Create Railway Postgres plugin and copy `DATABASE_URL`.
2. Deploy `backend/` as a Node service.
3. Set env vars:
   - `DATABASE_URL`
   - `PORT=4000` (or Railway default)
   - `FRONTEND_ORIGIN=*` (or your exact frontend URL)
4. Run migration command in Railway once:
   - `npm run prisma:deploy`
5. Optionally seed once:
   - `npm run prisma:seed`
6. Point mirror service proxy to Railway backend via `API_TARGET` env.

## Notes / limitations

- This mirrors **frontend-delivered** assets and wiring only.
- Demo mode intentionally avoids real backend dependency for core UI interactions.
- Writes are in-memory only for the running browser session (refresh-safe seeding, but not persistent storage).
- New local backend currently covers the initial wiring surface (health, dashboard summary, employee summary, phone provider/services/rent/list).

---

## Backend foundation (no Supabase)

A minimal Postgres + Prisma + Express backend now lives in `backend/`.

### What's included

- `docker-compose.yml` for local PostgreSQL (`postgres:16-alpine`)
- Prisma schema + initial migration for:
  - `Profile`
  - `Employee`
  - `Setting`
  - `PhoneNumber`
- Deterministic seed data (demo admin + 2 employees + provider/service settings + sample numbers)
- API endpoints:
  - `GET /api/health`
  - `GET /api/phone/providers`
  - `GET /api/phone/services`
  - `POST /api/phone/rent`
  - `GET /api/phone/list`
  - `GET /api/dashboard/summary`
  - `GET /api/employees/summary`

### Env templates

- Local: `backend/.env.example`
- Railway: `backend/.env.railway.example`

### Quick start (local)

```bash
cd C:\Users\adminMJ\.openclaw\workspace\magicvics-mirror
copy backend\.env.example backend\.env
npm run backend:install
docker compose up -d
npm run backend:migrate
npm run backend:seed
npm run backend:dev
```

Backend default URL: `http://localhost:4000`

### Railway notes (backend)

1. Deploy `backend/` as a Node service (or monorepo service rooted at `backend`).
2. Set env vars from `backend/.env.railway.example`.
3. Run migrations during deploy/start:
   - `npm run prisma:deploy`
4. Start command:
   - `npm run start`
