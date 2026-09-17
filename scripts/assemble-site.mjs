// Combines the two front-end builds into a single publish directory, so the
// storefront and the staff dashboard can be served from one domain:
//
//   dist/          <- apps/web/dist     (customer storefront, "/")
//   dist/admin/    <- apps/staff/dist   (staff dashboard, "/admin")
//
// They stay separate builds on purpose. Merging them into one bundle would make
// every customer download the dashboard code, which is both slower and more
// than they need to know about the admin surface.

import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist");

const sources = [
  { from: path.join(root, "apps", "web", "dist"), to: outDir, name: "storefront" },
  { from: path.join(root, "apps", "staff", "dist"), to: path.join(outDir, "admin"), name: "dashboard" }
];

for (const { from, name } of sources) {
  try {
    await access(from);
  } catch {
    console.error(`Missing build output for the ${name}: ${from}`);
    console.error("Run the app builds first (npm run build:web && npm run build:staff).");
    process.exit(1);
  }
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const { from, to, name } of sources) {
  await cp(from, to, { recursive: true });
  console.log(`${name.padEnd(10)} ${path.relative(root, from)} -> ${path.relative(root, to) || "dist"}`);
}

console.log("Site assembled in dist/");
