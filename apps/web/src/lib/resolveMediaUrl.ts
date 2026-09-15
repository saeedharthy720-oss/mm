export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
