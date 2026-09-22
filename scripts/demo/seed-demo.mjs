// Populates a running store with a full demo catalogue: categories,
// subcategories, products, staff, customers and orders.
//
// It drives the public HTTP API rather than the database directly, so every
// record goes through the same validation, permission checks and stock
// arithmetic a real user would hit. That also means it needs no database
// credentials — only an admin login.
//
//   node scripts/demo/seed-demo.mjs
//
// Env:
//   API_BASE        default https://bms-api-5cgw.onrender.com
//   ADMIN_EMAIL     required
//   ADMIN_PASSWORD  required
//
// Safe to re-run: anything that already exists is skipped, not duplicated.

import { ApiClient, API_BASE } from "./api-client.mjs";
import { CATEGORIES } from "./data/categories.mjs";
import { STRUCTURAL_PRODUCTS } from "./data/products-structural.mjs";
import { FINISHING_PRODUCTS } from "./data/products-finishing.mjs";
import { FITOUT_PRODUCTS } from "./data/products-fitout.mjs";
import { CUSTOMERS, DEMO_PASSWORD, ORDERS, STAFF } from "./data/people.mjs";

const PRODUCTS = [...STRUCTURAL_PRODUCTS, ...FINISHING_PRODUCTS, ...FITOUT_PRODUCTS];

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const tally = { created: 0, skipped: 0, failed: 0 };

function log(symbol, message) {
  console.log(`${symbol} ${message}`);
}

/** Runs a create, treating "already exists" as success rather than an error. */
async function createOnce(label, fn) {
  try {
    const result = await fn();
    tally.created += 1;
    log("  +", label);
    return result;
  } catch (error) {
    if (error.status === 409) {
      tally.skipped += 1;
      log("  =", `${label} (already exists)`);
      return null;
    }
    tally.failed += 1;
    log("  ✗", `${label} — ${error.message}`);
    return null;
  }
}

async function seedCategories(client) {
  console.log("\nCategories");
  const existing = (await client.get("/categories")).categories;
  const idBySlug = new Map(existing.map((c) => [c.slug, c.id]));

  for (const [index, parent] of CATEGORIES.entries()) {
    if (!idBySlug.has(parent.slug)) {
      const created = await createOnce(parent.nameEn, () =>
        client.post("/categories", {
          nameEn: parent.nameEn,
          nameAr: parent.nameAr,
          slug: parent.slug,
          sortOrder: index,
          isActive: true
        })
      );
      if (created) idBySlug.set(parent.slug, created.category.id);
    } else {
      tally.skipped += 1;
      log("  =", `${parent.nameEn} (already exists)`);
    }

    const parentId = idBySlug.get(parent.slug);
    for (const [childIndex, child] of parent.children.entries()) {
      if (idBySlug.has(child.slug)) {
        tally.skipped += 1;
        continue;
      }
      const created = await createOnce(`   ↳ ${child.nameEn}`, () =>
        client.post("/categories", {
          nameEn: child.nameEn,
          nameAr: child.nameAr,
          slug: child.slug,
          parentId,
          sortOrder: childIndex,
          isActive: true
        })
      );
      if (created) idBySlug.set(child.slug, created.category.id);
    }
  }

  return idBySlug;
}

async function seedProducts(client, categoryIdBySlug) {
  console.log("\nProducts");
  const units = (await client.get("/units")).units;
  const unitIdByKey = new Map(units.map((u) => [u.key, u.id]));

  // One page per 100; the demo catalogue is larger than the default page size.
  const existingSkus = new Set();
  for (let page = 1; ; page += 1) {
    const result = await client.get(`/products?page=${page}&pageSize=100&includeInactive=true`);
    for (const product of result.items) existingSkus.add(product.sku);
    if (result.items.length < 100) break;
  }

  const idBySku = new Map();
  for (const product of PRODUCTS) {
    if (existingSkus.has(product.sku)) {
      tally.skipped += 1;
      continue;
    }

    const categoryId = categoryIdBySlug.get(product.cat);
    const unitId = unitIdByKey.get(product.unit);
    if (!categoryId || !unitId) {
      tally.failed += 1;
      log("  ✗", `${product.sku} — unknown ${!categoryId ? `category '${product.cat}'` : `unit '${product.unit}'`}`);
      continue;
    }

    const created = await createOnce(`${product.sku} — ${product.nameEn}`, () =>
      client.post("/products", {
        sku: product.sku,
        categoryId,
        unitId,
        customUnitLabel: product.customUnit ?? undefined,
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        descriptionEn: product.descriptionEn,
        descriptionAr: product.descriptionAr,
        price: product.price,
        quantityAvailable: product.qty,
        manualStockOverride: false,
        deliveryCharge: product.delivery,
        isActive: true,
        // Card payment is switched off shop-wide; keeping the per-product flag
        // false too means nothing promises a payment route that does not exist.
        allowCardPayment: false,
        allowPayOnDelivery: true,
        attributes: product.attributes ?? {}
      })
    );
    if (created) idBySku.set(product.sku, created.product.id);
  }

  // Re-read so orders can reference products that already existed from a
  // previous run, not just the ones created in this one.
  for (let page = 1; ; page += 1) {
    const result = await client.get(`/products?page=${page}&pageSize=100&includeInactive=true`);
    for (const product of result.items) idBySku.set(product.sku, product.id);
    if (result.items.length < 100) break;
  }

  return idBySku;
}

async function seedStaff(client) {
  console.log("\nStaff");
  const existing = (await client.get("/users")).users ?? [];
  const byEmail = new Map(existing.map((u) => [u.email.toLowerCase(), u]));

  for (const person of STAFF) {
    let user = byEmail.get(person.email.toLowerCase());

    if (!user) {
      const created = await createOnce(`${person.name} — ${person.jobTitleEn}`, () =>
        client.post("/users", {
          name: person.name,
          email: person.email,
          password: DEMO_PASSWORD,
          roleKey: person.roleKey,
          whatsappNumber: person.whatsappNumber || undefined,
          receivesOrderNotifications: person.receivesOrderNotifications
        })
      );
      user = created?.user;
    } else {
      tally.skipped += 1;
      log("  =", `${person.name} (already exists)`);
    }

    if (!user) continue;

    // Direct permissions and the disabled flag are update-only fields.
    try {
      await client.patch(`/users/${user.id}`, {
        extraPermissions: person.extraPermissions,
        whatsappNumber: person.whatsappNumber,
        receivesOrderNotifications: person.receivesOrderNotifications,
        isActive: !person.disabled
      });
      if (person.extraPermissions.length) {
        log("   ", `↳ extra permissions: ${person.extraPermissions.join(", ")}`);
      }
      if (person.disabled) log("   ", "↳ account disabled");
    } catch (error) {
      tally.failed += 1;
      log("  ✗", `${person.name} permissions — ${error.message}`);
    }
  }
}

async function seedCustomers() {
  console.log("\nCustomers");
  // Registration creates its own session, so each one uses a fresh client to
  // avoid trampling the admin cookies held by the main one.
  for (const customer of CUSTOMERS) {
    const guest = new ApiClient(API_BASE);
    await createOnce(`${customer.name} — ${customer.email}`, () =>
      guest.post("/auth/register", {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        password: DEMO_PASSWORD
      })
    );
  }
}

async function seedOrders(client, productIdBySku) {
  console.log("\nOrders");
  // Only demo orders count as "already seeded" — the store's own earlier test
  // orders must not stop this from running, and must not be touched either.
  const existing = await client.get("/orders?pageSize=100");
  const alreadySeeded = (existing.items ?? []).filter((order) =>
    String(order.customerPhone).replace(/\s/g, "").startsWith("+96899990")
  );
  if (alreadySeeded.length > 0) {
    log("  =", `${alreadySeeded.length} demo order(s) already present — skipping order seeding`);
    tally.skipped += alreadySeeded.length;
    return;
  }

  for (const order of ORDERS) {
    const items = order.items
      .map((line) => ({ productId: productIdBySku.get(line.sku), quantity: line.quantity }))
      .filter((line) => line.productId);

    if (items.length !== order.items.length) {
      tally.failed += 1;
      log("  ✗", `${order.customerName} — one or more products missing, order skipped`);
      continue;
    }

    const guest = new ApiClient(API_BASE);
    const created = await createOnce(`${order.customerName} — ${items.length} line(s)`, () =>
      guest.post("/orders", {
        customerName: order.customerName,
        customerPhone: order.phone,
        deliveryAddressText: order.address,
        deliveryNotes: order.deliveryNotes,
        orderNotes: order.orderNotes,
        paymentMethod: "pay_on_delivery",
        items
      })
    );
    if (!created) continue;

    const orderId = created.order.id;
    for (const statusKey of order.statusPath) {
      try {
        await client.patch(`/orders/${orderId}/status`, {
          statusKey,
          note: `تحديث تلقائي ضمن بيانات العرض التجريبي`
        });
      } catch (error) {
        log("  ✗", `${created.order.orderNumber} → ${statusKey}: ${error.message}`);
      }
    }
    log("   ", `↳ ${created.order.orderNumber} — ${created.order.total} OMR — ${order.finalStatus}`);
  }
}

async function seedStoreProfile(client) {
  console.log("\nStore profile");
  try {
    // /settings returns an object keyed by setting key, not an array.
    const current = (await client.get("/settings")).settings ?? {};
    const profile = current.store_profile ?? {};

    await client.patch("/settings/store_profile", {
      value: {
        ...profile,
        nameEn: profile.nameEn || "Riyadh Al-Thabti Building Materials",
        nameAr: profile.nameAr || "رياض الثابتي لتجارة مواد البناء",
        currency: profile.currency || "OMR",
        // Deliberately blank. A number left here is published in the storefront
        // footer and is where every WhatsApp order button points, so filling it
        // with anything but the owner's own number sends customers to a
        // stranger. The owner sets it from Settings in the dashboard.
        whatsappNumber: ""
      }
    });
    log("  +", "store_profile updated");
    tally.created += 1;
  } catch (error) {
    tally.failed += 1;
    log("  ✗", `store_profile — ${error.message}`);
  }
}

async function main() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running this.");
    process.exit(1);
  }
  if (DEMO_PASSWORD.length < 8) {
    console.error(
      "Set DEMO_PASSWORD (8+ characters) — the password the demo staff and customer accounts will use.\n" +
        "It is not stored in this repository because the repository is public."
    );
    process.exit(1);
  }

  const client = new ApiClient(API_BASE);
  console.log(`Seeding demo data into ${API_BASE}`);

  await client.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  log("✓", `signed in as ${ADMIN_EMAIL}`);

  const categoryIdBySlug = await seedCategories(client);
  const productIdBySku = await seedProducts(client, categoryIdBySlug);
  await seedStaff(client);
  await seedCustomers();
  await seedOrders(client, productIdBySku);
  await seedStoreProfile(client);

  console.log(
    `\nDone — ${tally.created} created, ${tally.skipped} already present, ${tally.failed} failed.`
  );
  process.exit(tally.failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("\nSeeding stopped:", error.message);
  process.exit(1);
});
