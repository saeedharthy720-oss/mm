# Deploying (free stack)

Four services, all on free tiers:

| Part | Host | Notes |
|---|---|---|
| Customer storefront | Netlify | `apps/web` |
| Staff dashboard | Netlify | `apps/staff` (separate site) |
| API | Render | `apps/api`, free web service |
| Database | Neon | free Postgres |
| Product images | Cloudflare R2 | 10 GB free |

**Known free-tier limits:** Render's free service sleeps after ~15 minutes idle, so the
first request after a quiet period takes ~50 seconds. Neon's free database also suspends
when idle. Fine for testing; upgrade Render to a paid instance (~$7/mo) before real customers use it.

---

## 1. Push to GitHub

All three hosts deploy from a Git repo.

```bash
git init
git add .
git commit -m "Building materials store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

`.env` files are gitignored — secrets are set in each host's dashboard instead.

## 2. Database — Neon

1. Sign up at [neon.tech](https://neon.tech), create a project (pick the region closest to Oman, e.g. Frankfurt).
2. Copy the connection string. It looks like:
   `postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`
3. Keep it for the next step — it becomes `DATABASE_URL`.

## 3. Image storage — Cloudflare R2

Render's free disk is wiped on every restart, so uploaded product images must go to object storage.

1. Cloudflare dashboard → R2 → create a bucket.
2. Allow public access on the bucket and note its public URL.
3. Create an R2 API token (Object Read & Write) → gives an access key id + secret.
4. You'll need these values:
   - `STORAGE_S3_ENDPOINT` → `https://<account-id>.r2.cloudflarestorage.com`
   - `STORAGE_S3_BUCKET` → your bucket name
   - `STORAGE_S3_ACCESS_KEY_ID` / `STORAGE_S3_SECRET_ACCESS_KEY`
   - `STORAGE_S3_PUBLIC_BASE_URL` → the bucket's public URL

## 4. API — Render

1. [render.com](https://render.com) → New → **Blueprint** → select your repo. It reads `render.yaml`.
2. Fill in the env vars it prompts for:
   - `DATABASE_URL` — from Neon
   - `CORS_ALLOWED_ORIGINS` — leave a placeholder for now, fix in step 6
   - the five `STORAGE_S3_*` values from R2
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — **required.** The seed refuses to run in
     production with the default `Admin123!` password.
   - `SEED_EMPLOYEE_EMAIL` / `SEED_EMPLOYEE_PASSWORD`
   - `WHATSAPP_STORE_NUMBER`
   - `THAWANI_*` — leave blank until you have sandbox keys. Card checkout returns a clear
     error while blank; pay-on-delivery keeps working.
3. Deploy. The build runs migrations and seeds reference data automatically.
4. Note the API URL, e.g. `https://bms-api.onrender.com`. Check `https://.../health` returns `{"status":"ok"}`.

## 5. Frontends — Netlify

Do this twice, once per app.

1. [netlify.com](https://netlify.com) → Add new site → Import from Git → your repo.
2. Set **Base directory** to `apps/web` (storefront) or `apps/staff` (dashboard).
   Build command and publish directory come from each app's `netlify.toml`.
3. Add environment variables:
   - `VITE_API_BASE_URL` → your Render API URL
   - `VITE_GOOGLE_MAPS_API_KEY` → optional; without it checkout still works, just no map pin
   - `VITE_DEFAULT_LANGUAGE` → `en` or `ar`
4. Deploy, then note each site's URL.

## 6. Connect them

Back in Render, set `CORS_ALLOWED_ORIGINS` to both Netlify URLs, comma-separated, no spaces:

```
https://your-store.netlify.app,https://your-staff.netlify.app
```

Redeploy the API. **This step is required** — without it the browser blocks every API call.

## 7. Check it works

1. Open the storefront → products load.
2. Open the staff site → log in with your `SEED_ADMIN_*` credentials.
3. Add a product with an image → the image should still be there after Render restarts.
4. Place a pay-on-delivery order on the storefront → it appears in the staff order queue.

---

## Custom domain (optional)

Netlify gives free HTTPS on custom domains. Point your domain at the storefront site and use
a subdomain (e.g. `staff.yourdomain.com`) for the dashboard. After changing domains, update
`CORS_ALLOWED_ORIGINS` on Render to match.

## Adding Thawani later

1. Get sandbox keys from [thawani.om](https://thawani.om).
2. Set `THAWANI_API_KEY`, `THAWANI_PUBLISHABLE_KEY` on Render; `THAWANI_BASE_URL` is already
   set to the UAT (test) endpoint.
3. Place a test card order end-to-end before switching `THAWANI_BASE_URL` to production.
4. Point the Thawani webhook at `https://your-api.onrender.com/api/v1/payments/thawani/webhook`.
