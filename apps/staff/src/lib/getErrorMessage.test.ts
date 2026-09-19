import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./getErrorMessage.js";
import { formatPrice } from "./formatPrice.js";

function apiError(data: unknown, status = 422) {
  const error = new AxiosError("Request failed");
  error.response = { data, status, statusText: "", headers: {}, config: {} as never };
  return error;
}

describe("getErrorMessage", () => {
  it("names the fields that failed validation", () => {
    // "Validation failed" alone leaves the user hunting through ~15 inputs.
    const message = getErrorMessage(
      apiError({
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
          details: {
            formErrors: [],
            fieldErrors: {
              price: ["Number must be greater than or equal to 0"],
              nameEn: ["String must contain at least 1 character(s)"]
            }
          }
        }
      }),
      "FALLBACK"
    );

    expect(message).toContain("price:");
    expect(message).toContain("nameEn:");
    expect(message).not.toBe("FALLBACK");
  });

  it("uses the API's message when there are no field errors", () => {
    const message = getErrorMessage(
      apiError({ error: { code: "CONFLICT", message: "SKU already exists" } }, 409),
      "FALLBACK"
    );

    expect(message).toBe("SKU already exists");
  });

  it("falls back when the request never reached the server", () => {
    expect(getErrorMessage(new AxiosError("Network Error"), "FALLBACK")).toBe("FALLBACK");
  });

  it("falls back on an empty or unexpected error body", () => {
    expect(getErrorMessage(apiError({}), "FALLBACK")).toBe("FALLBACK");
    expect(getErrorMessage(apiError({ error: {} }), "FALLBACK")).toBe("FALLBACK");
    expect(getErrorMessage(apiError({ error: { details: { fieldErrors: {} } } }), "FALLBACK")).toBe(
      "FALLBACK"
    );
  });

  it("surfaces form-level errors when no field is implicated", () => {
    const message = getErrorMessage(
      apiError({ error: { message: "Validation failed", details: { formErrors: ["Cart is empty"] } } }),
      "FALLBACK"
    );

    expect(message).toBe("Cart is empty");
  });

  it("handles a plain Error", () => {
    expect(getErrorMessage(new Error("boom"), "FALLBACK")).toBe("boom");
  });

  it("falls back on a thrown non-error", () => {
    expect(getErrorMessage("just a string", "FALLBACK")).toBe("FALLBACK");
    expect(getErrorMessage(null, "FALLBACK")).toBe("FALLBACK");
  });
});

describe("formatPrice", () => {
  // OMR is a 3-decimal currency; rounding to 2 would silently lose baisa.
  it("always shows three decimals", () => {
    expect(formatPrice("11")).toBe("11.000 OMR");
    expect(formatPrice("0.5")).toBe("0.500 OMR");
    expect(formatPrice(0)).toBe("0.000 OMR");
  });

  it("keeps baisa precision", () => {
    expect(formatPrice("1.234")).toBe("1.234 OMR");
  });

  it("accepts another currency", () => {
    expect(formatPrice("11", "AED")).toBe("11.000 AED");
  });
});
