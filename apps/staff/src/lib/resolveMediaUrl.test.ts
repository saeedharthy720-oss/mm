import { describe, expect, it } from "vitest";
import { resolveMediaUrl } from "./resolveMediaUrl.js";

/**
 * The dashboard used to build image URLs by always prefixing the API origin.
 * In production uploads live in object storage and the stored value is already
 * absolute, so that produced "https://api.example.com https://storage…" and a
 * broken thumbnail — visible only as a missing image, with nothing in the
 * console to explain it.
 */
describe("resolveMediaUrl", () => {
  it("leaves an absolute URL alone", () => {
    const stored = "https://project.supabase.co/storage/v1/object/public/bms-media/photo.png";

    expect(resolveMediaUrl(stored)).toBe(stored);
  });

  it("does not prefix an absolute URL with the API origin", () => {
    const resolved = resolveMediaUrl("https://project.supabase.co/photo.png");

    expect(resolved?.startsWith("https://project.supabase.co")).toBe(true);
    expect(resolved).not.toContain("undefinedhttps");
  });

  it("prefixes a relative path, as local disk storage produces", () => {
    expect(resolveMediaUrl("/uploads/photo.png")).toContain("/uploads/photo.png");
  });

  it("returns null for nothing, so callers can show a placeholder", () => {
    expect(resolveMediaUrl(null)).toBeNull();
    expect(resolveMediaUrl(undefined)).toBeNull();
    expect(resolveMediaUrl("")).toBeNull();
  });
});
