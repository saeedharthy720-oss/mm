# Architecture Decisions

## Confirmed before Stage 1

| Area | Decision | Why |
|---|---|---|
| Hosting | Undecided — architecture is fully env-driven | Must work equally as Docker Compose on a VPS or a PaaS (Render/Railway) with managed Postgres |
| Admin/Employee language | Bilingual Arabic+English with RTL, same as customer site | Overrides the brief's "English-only for v1" assumption — user requested full bilingual support from Stage 1 |
| Maps | Google Maps | Overrides the brief's OpenStreetMap/Leaflet default — user preferred Google Maps; requires a billing-enabled Google Cloud API key before Stage 7 |
| Payment | Thawani via a swappable `PaymentProvider` interface | Central Bank of Oman–licensed, hosted checkout, settles in OMR; adapter shape means swapping providers later is a config change |
| Database | PostgreSQL + Prisma ORM | Strong JSONB support for flexible per-category product attributes; Prisma chosen over Sequelize for type-safe queries and simpler migrations |

## Stack

- **Backend**: Express + Prisma + PostgreSQL, JWT access/refresh tokens as httpOnly cookies, Zod validation, permission-based RBAC (`roles` / `permissions` / `role_permissions` tables — not hardcoded role checks), pino logging.
- **Frontend**: Vite + React + TypeScript + TailwindCSS + React Query (no core business data in localStorage, per brief §16) + react-i18next with RTL via `<html dir>` and logical CSS properties.
- **Repo**: npm workspaces monorepo — `apps/api`, `apps/web` (customer), `apps/staff` (admin+employee, separate app), `packages/shared-i18n`, `packages/shared-types`, `packages/config`.
- **Storage**: `StorageProvider` interface (local disk for dev, S3-compatible for prod) selected via `STORAGE_PROVIDER` — hosting target is undecided and some PaaS options have ephemeral filesystems.

## Monetary precision

All monetary columns are `Decimal(10,3)` — OMR uses 3-decimal-place baisa precision. This was set correctly from migration 1 to avoid retrofitting precision (and risking rounding drift in historical orders) later.

## Stage 4: Thawani webhook verification

Thawani does not publish a documented webhook-signing scheme. Rather than trust an unverifiable
POST payload, `ThawaniPaymentProvider.parseWebhookEvent` re-queries the session status directly
from Thawani (server-to-server, authenticated with our own secret key) and treats that response —
not the webhook body — as the source of truth for whether a payment succeeded. This is a standard
defensive pattern for payment webhooks generally and sidesteps needing an exact, unverified
signature scheme. The integration is implemented against Thawani's publicly documented
checkout-session API but has not been exercised against a live account — verify field names
against current Thawani docs / a sandbox account before going live.

## Stage 6: Printable documents

Delivery note and customer invoice are implemented as standalone print-friendly routes
(`/orders/:id/delivery-note`, `/orders/:id/invoice` in `apps/staff`, outside `StaffLayout` so
there's no nav chrome to hide) using the browser's native `window.print()` — this covers both
"printable" and "downloadable" (via the browser's Save-as-PDF print target) without adding a
server-side PDF generation dependency. Both pull store info from the same public settings
endpoint Stage 3 already exposed.

## Stage 7: Google Maps location capture

`apps/web/src/checkout/LocationPicker.tsx` uses `@react-google-maps/api` (the standard,
well-maintained React wrapper) for pin-drop capture at checkout, writing `deliveryLat`/`deliveryLng`
into the existing (already-nullable, since Stage 1) order fields. Like Thawani, this degrades
gracefully with no API key configured: it shows a fallback message and the typed address alone is
used — checkout is never blocked by a missing or failed Maps key. **A billing-enabled Google Cloud
API key must be set as `VITE_GOOGLE_MAPS_API_KEY` before this is usable** — untested against a real
key in this environment. The employee-facing map link (Stage 5, order detail page) already handles
the "no location captured" case by simply not rendering when lat/lng are absent.

## Extensibility built into Stage 1

- **Roles**: data-driven (`roles`/`permissions`/`role_permissions`), so adding roles (manager, warehouse staff, accountant, delivery) later is a data change, not a redesign (brief §15).
- **Order statuses**: a table (`order_statuses`), not a hardcoded enum, so admin can manage the list later (brief §11).
- **Delivery charge rule**: v1 uses a simple per-order sum, stored as a `store_settings` entry (see `delivery-charge-rule.md`) rather than hardcoded, so zones/caps/thresholds can be added later without a schema migration (brief §6).
