/**
 * Turns a stored media path into something an <img> can load.
 *
 * Uploads go to object storage in production, where the stored value is already
 * an absolute URL, but to local disk in development, where it is a path served
 * by the API. Prefixing an absolute URL with the API origin produces a mangled
 * address and a broken image, which is exactly what the dashboard was doing.
 */
export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
