# Demo data

Fills a running store with a complete, presentable catalogue so the site can be
shown to a shop owner without looking empty.

Everything goes through the public HTTP API, not the database, so each record
passes the same validation, permission checks and stock arithmetic a real user
would hit. No database credentials needed — just an admin login.

## Running it

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=... DEMO_PASSWORD=... node scripts/demo/seed-demo.mjs
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=... node scripts/demo/seed-images.mjs
```

`DEMO_PASSWORD` is the password every demo staff and customer account will use.
It is **not** stored in this repository, and neither is the admin password:
this repository is public, and these are real logins on a live dashboard.
Anyone who read them here could change the catalogue, the prices, the staff
list and every order.

`API_BASE` defaults to the production API; set it to `http://localhost:4000`
to fill a local database instead.

Both scripts are safe to re-run. Anything already present is skipped, never
duplicated, and `seed-images.mjs` never overwrites a product that already has a
picture — so a real photo added by the store survives a re-run.

Registration and login share one rate limiter (10 per 15 minutes). Seeding four
customers plus an admin login sits just under it; a re-run inside the same
window will hit a 429 on the last customer. Wait fifteen minutes and run again.

## What it creates

| | Count |
|---|---|
| Departments | 9 |
| Subcategories | 37 |
| Products | 127, each with bilingual name, full description, attributes and an image |
| Staff | 6 (1 manager, 4 employees, 1 disabled ex-employee) |
| Customers | 4 registered accounts |
| Orders | 10, spread across every order status |

## Accounts

Every demo account uses whatever was passed as `DEMO_PASSWORD` when the seed
was last run. The value is not recorded here on purpose — see above.

These are real accounts on the live dashboard. Rotate the password or disable
them before the store handles real orders.

### Staff

| Name | Email | Role | Extra permissions |
|---|---|---|---|
| محمد بن راشد المعمري | mohammed.almamari@riyadh-althabti.com | admin | — (admin has everything) |
| سالم بن خالد البلوشي | salim.albalushi@riyadh-althabti.com | employee | `products:manage` |
| عائشة بنت سعيد الهنائية | aisha.alhinai@riyadh-althabti.com | employee | `products:manage`, `categories:manage` |
| يوسف بن ناصر الريامي | yousuf.alriyami@riyadh-althabti.com | employee | — |
| فاطمة بنت علي الكندية | fatma.alkindi@riyadh-althabti.com | employee | — |
| ناصر بن سالم الغافري | nasser.alghafri@riyadh-althabti.com | employee | account disabled |

The `employee` role grants `orders:view` and `orders:manage`. The extra column
is the per-person grant on top — the feature that lets one storeman also manage
products without inventing a role for one person. The disabled account is there
on purpose: it shows what withdrawing access looks like without deleting
anyone's history.

### Customers

| Name | Email |
|---|---|
| أحمد بن سعيد الوهيبي | ahmed.alwahaibi@example.com |
| خالد بن ناصر البادي | khalid.albadi@example.com |
| مريم بنت حمد الشكيلية | mariam.alshukailiya@example.com |
| شركة النهضة للمقاولات | alnahda.contracting@example.com |

Two of the ten orders are guest orders with no account at all, which is how a
walk-up customer actually buys.

## Phone numbers

Every demo number follows the pattern `+96899990xxx`. That is deliberate:
a realistic-looking number in a demo order is a number somebody actually owns,
and the dashboard has a button that opens WhatsApp to it.

The store's own WhatsApp number in Settings is left **blank** for the same
reason — it is published in the storefront footer and is where every order
button points. The owner sets it from Settings in the dashboard.

## Product images

`product-image.mjs` draws a branded card per product: department mark, Arabic
and English name, SKU. They are SVG — about 2 KB each, sharp at any size, and
Arabic renders correctly because the viewer supplies the font.

They are illustrated placeholders, not photographs. A demo needs something in
every tile, and inventing photographs of stock that has never been photographed
would be worse than an honest drawing. Replace them with real photos of real
stock before this is anything but a demo.

## Files

```
api-client.mjs              cookie-aware HTTP client (the API keeps its session in httpOnly cookies)
seed-demo.mjs               categories, products, staff, customers, orders, settings
seed-images.mjs             one generated card per product
product-image.mjs           the card generator
data/categories.mjs         9 departments, 37 subcategories
data/products-structural.mjs  cement, steel, plumbing
data/products-finishing.mjs   electrical, paint, tiles
data/products-fitout.mjs      doors, tools, timber
data/people.mjs             staff, customers, orders
```

Prices are indicative Omani retail prices in OMR chosen to look plausible. They
are not a quotation and should not be shown to a customer as one.
