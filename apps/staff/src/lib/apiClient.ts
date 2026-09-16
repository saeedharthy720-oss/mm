import axios from "axios";

// Vite inlines this at build time — it is not read at runtime. When it is missing
// from a production build, axios falls back to relative URLs, which Netlify's SPA
// catch-all happily answers with index.html at status 200. The app then parses
// HTML as JSON and dies somewhere far away from the real cause, so fail here
// instead, where the message points at the actual problem.
const baseURL =
  import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:4000" : undefined);

if (!baseURL) {
  throw new Error(
    "VITE_API_BASE_URL was not set when this bundle was built. Set it in the hosting " +
      "provider's environment variables (Netlify: Project configuration -> Environment " +
      "variables, scoped to Builds) and redeploy — changing it later has no effect " +
      "without a rebuild."
  );
}

export const apiClient = axios.create({
  baseURL,
  withCredentials: true
});
