import { AxiosError } from "axios";

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    // Zod's flatten() output, attached by the API's errorHandler on 422s.
    details?: { formErrors?: string[]; fieldErrors?: Record<string, string[]> };
  };
}

/**
 * Turns an API failure into something a staff member can act on.
 *
 * A bare "Validation failed" tells the user nothing about which of the ~15
 * fields on the product form is wrong, so field errors are named explicitly.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof AxiosError)) {
    return error instanceof Error && error.message ? error.message : fallback;
  }

  if (!error.response) {
    // No response at all: offline, DNS failure, CORS, or the free-tier API
    // still waking up.
    return fallback;
  }

  const body = error.response.data as ApiErrorBody | undefined;
  const apiError = body?.error;

  const fieldErrors = apiError?.details?.fieldErrors;
  if (fieldErrors) {
    const named = Object.entries(fieldErrors)
      .filter(([, messages]) => messages && messages.length > 0)
      .map(([field, messages]) => `${field}: ${messages!.join(", ")}`);

    if (named.length > 0) {
      return named.join(" · ");
    }
  }

  const formErrors = apiError?.details?.formErrors;
  if (formErrors && formErrors.length > 0) {
    return formErrors.join(" · ");
  }

  return apiError?.message || fallback;
}
