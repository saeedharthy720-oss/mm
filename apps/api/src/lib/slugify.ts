export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}
