import { describe, expect, it } from "vitest";
import { OMAN_GOVERNORATES, findGovernorate, formatDeliveryAddress } from "./oman.js";

describe("Oman administrative divisions", () => {
  it("has all 11 governorates", () => {
    expect(OMAN_GOVERNORATES).toHaveLength(11);
  });

  it("has all 61 wilayats", () => {
    const total = OMAN_GOVERNORATES.reduce((sum, g) => sum + g.wilayats.length, 0);
    expect(total).toBe(61);
  });

  it("gives every governorate and wilayat both names", () => {
    for (const governorate of OMAN_GOVERNORATES) {
      expect(governorate.nameEn.length).toBeGreaterThan(0);
      expect(governorate.nameAr.length).toBeGreaterThan(0);
      expect(governorate.wilayats.length).toBeGreaterThan(0);

      for (const wilayat of governorate.wilayats) {
        expect(wilayat.nameEn.length).toBeGreaterThan(0);
        expect(wilayat.nameAr.length).toBeGreaterThan(0);
      }
    }
  });

  it("uses each English name only once, since they key the selects", () => {
    const names = OMAN_GOVERNORATES.map((g) => g.nameEn);
    expect(new Set(names).size).toBe(names.length);

    for (const governorate of OMAN_GOVERNORATES) {
      const wilayatNames = governorate.wilayats.map((w) => w.nameEn);
      expect(new Set(wilayatNames).size).toBe(wilayatNames.length);
    }
  });

  it("includes the places most orders will come from", () => {
    const muscat = findGovernorate("Muscat");
    expect(muscat?.wilayats.map((w) => w.nameEn)).toContain("As Seeb");
    expect(findGovernorate("Dhofar")?.wilayats.map((w) => w.nameAr)).toContain("صلالة");
  });
});

describe("formatDeliveryAddress", () => {
  const parts = { governorate: "Muscat", wilayat: "As Seeb", area: "Al Khoudh", details: "Near the mosque" };

  it("reads outward-in in Arabic", () => {
    expect(formatDeliveryAddress(parts, "ar")).toBe(
      "سلطنة عُمان، مسقط، السيب، Al Khoudh، Near the mosque"
    );
  });

  it("reads outward-in in English", () => {
    expect(formatDeliveryAddress(parts, "en")).toBe(
      "Sultanate of Oman, Muscat, As Seeb, Al Khoudh, Near the mosque".replace(/, /g, "، ")
    );
  });

  it("omits the optional parts when they are blank", () => {
    expect(formatDeliveryAddress({ governorate: "Dhofar", wilayat: "Salalah" }, "ar")).toBe(
      "سلطنة عُمان، ظفار، صلالة"
    );
  });

  it("ignores whitespace-only optional parts", () => {
    const address = formatDeliveryAddress(
      { governorate: "Dhofar", wilayat: "Salalah", area: "   ", details: "" },
      "ar"
    );

    expect(address).toBe("سلطنة عُمان، ظفار، صلالة");
  });

  it("falls back to the raw value if a name is not recognised", () => {
    // Orders keep the address as text, so an old order referring to a place
    // that has since been renamed must still render rather than vanish.
    const address = formatDeliveryAddress({ governorate: "Atlantis", wilayat: "Nowhere" }, "en");

    expect(address).toContain("Atlantis");
    expect(address).toContain("Nowhere");
  });
});
