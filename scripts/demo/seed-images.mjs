// Uploads one generated product card per demo product.
//
//   node scripts/demo/seed-images.mjs           upload to every image-less product
//   node scripts/demo/seed-images.mjs CEM-OPC-50  just one, for checking
//
// Products that already have an image are left alone, so a real photo added by
// the store is never overwritten by a placeholder.

import { ApiClient, API_BASE } from "./api-client.mjs";
import { productCardSvg } from "./product-image.mjs";
import { CATEGORIES } from "./data/categories.mjs";
import { STRUCTURAL_PRODUCTS } from "./data/products-structural.mjs";
import { FINISHING_PRODUCTS } from "./data/products-finishing.mjs";
import { FITOUT_PRODUCTS } from "./data/products-fitout.mjs";

const PRODUCTS = [...STRUCTURAL_PRODUCTS, ...FINISHING_PRODUCTS, ...FITOUT_PRODUCTS];
const only = process.argv[2];

const departmentBySubcategory = new Map();
for (const department of CATEGORIES) {
  for (const child of department.children) departmentBySubcategory.set(child.slug, department);
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running this.");
    process.exit(1);
  }

  const client = new ApiClient(API_BASE);
  await client.login(email, password);
  console.log(`Signed in as ${email}`);

  const live = new Map();
  for (let page = 1; ; page += 1) {
    const result = await client.get(`/products?page=${page}&pageSize=100&includeInactive=true`);
    for (const product of result.items) live.set(product.sku, product);
    if (result.items.length < 100) break;
  }

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const product of PRODUCTS) {
    if (only && product.sku !== only) continue;

    const liveProduct = live.get(product.sku);
    if (!liveProduct) {
      console.log(`  ✗ ${product.sku} — not in the store`);
      failed += 1;
      continue;
    }
    if (liveProduct.images?.length > 0) {
      skipped += 1;
      continue;
    }

    const department = departmentBySubcategory.get(product.cat);
    const svg = productCardSvg(product, department);
    const form = new FormData();
    form.append("file", new Blob([svg], { type: "image/svg+xml" }), `${product.sku}.svg`);

    try {
      const result = await client.request("POST", `/products/${liveProduct.id}/images`, form);
      uploaded += 1;
      console.log(`  + ${product.sku} → ${result.image.url}`);
    } catch (error) {
      failed += 1;
      console.log(`  ✗ ${product.sku} — ${error.message}`);
    }
  }

  console.log(`\nDone — ${uploaded} uploaded, ${skipped} already had an image, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("Stopped:", error.message);
  process.exit(1);
});
