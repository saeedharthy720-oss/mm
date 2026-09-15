# Building Materials Store

Production e-commerce + store-management platform: guest checkout, admin catalog, employee order dashboard, Thawani payments, bilingual (Arabic/English + RTL) storefront and staff dashboards.

Built in stages — see `docs/architecture/decisions.md` for the confirmed technical decisions and the original brief for the full 8-stage plan. This repo currently implements **Stage 1: Foundations**.

## Structure

```
apps/api      Express + Prisma + PostgreSQL backend
apps/web      Customer storefront (Vite + React, bilingual)
apps/staff    Admin + employee dashboard (Vite + React, bilingual)
packages/*    Shared i18n, types, and tooling config
```

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start Postgres
docker compose up -d postgres

# 3. Configure env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/staff/.env.example apps/staff/.env
# fill in JWT_ACCESS_SECRET / JWT_REFRESH_SECRET (any long random string) in apps/api/.env

# 4. Run migrations + seed data
npm run db:migrate
npm run db:seed

# 5. Run everything (separate terminals)
npm run dev:api      # http://localhost:4000
npm run dev:web      # http://localhost:5173
npm run dev:staff    # http://localhost:5174
```

Seeded accounts (see `apps/api/prisma/seed.ts`):
- Admin: `admin@example.com` / `Admin123!`
- Employee: `employee@example.com` / `Employee123!`

## Stage 1 verification checklist

See `docs/architecture/decisions.md` and the plan's "Done" checklist — health check, login/refresh/logout, RBAC (admin vs employee), and bilingual EN/AR + RTL toggle on both `apps/web` and `apps/staff`.
