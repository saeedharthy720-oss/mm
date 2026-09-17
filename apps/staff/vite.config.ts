import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // The dashboard is served from /admin on the same site as the storefront, so
  // its asset URLs have to be prefixed. Applied in dev too, so the dev server
  // and production agree on paths rather than diverging in a way that only
  // shows up after deploying.
  base: "/admin/",
  server: { port: 5174 }
});
