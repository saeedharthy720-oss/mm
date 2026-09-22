// Minimal cookie-aware client for the live API. The API keeps the access and
// refresh tokens in httpOnly cookies, so a plain fetch loses the session after
// login — this holds the jar and replays it on every request.

export const API_BASE = process.env.API_BASE ?? "https://bms-api-5cgw.onrender.com";

export class ApiClient {
  constructor(base = API_BASE) {
    this.base = base.replace(/\/$/, "");
    this.cookies = new Map();
  }

  #storeCookies(response) {
    // Node exposes every Set-Cookie separately through getSetCookie(); the
    // single joined header would split wrongly on the Expires= comma.
    const raw = response.headers.getSetCookie?.() ?? [];
    for (const line of raw) {
      const [pair] = line.split(";");
      const index = pair.indexOf("=");
      if (index > 0) this.cookies.set(pair.slice(0, index).trim(), pair.slice(index + 1).trim());
    }
  }

  get cookieHeader() {
    return [...this.cookies].map(([k, v]) => `${k}=${v}`).join("; ");
  }

  async request(method, path, body, extraHeaders = {}) {
    const headers = { ...extraHeaders };
    if (this.cookies.size) headers.cookie = this.cookieHeader;

    let payload = body;
    if (body !== undefined && !(body instanceof FormData)) {
      headers["content-type"] = "application/json";
      payload = JSON.stringify(body);
    }

    const response = await fetch(`${this.base}/api/v1${path}`, { method, headers, body: payload });
    this.#storeCookies(response);

    const text = await response.text();
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = text;
    }

    if (!response.ok) {
      const detail = typeof parsed === "string" ? parsed : JSON.stringify(parsed);
      const error = new Error(`${method} ${path} → ${response.status} ${detail}`);
      error.status = response.status;
      error.body = parsed;
      throw error;
    }

    return parsed;
  }

  get(path) {
    return this.request("GET", path);
  }
  post(path, body) {
    return this.request("POST", path, body);
  }
  patch(path, body) {
    return this.request("PATCH", path, body);
  }
  delete(path) {
    return this.request("DELETE", path);
  }

  async login(email, password) {
    return this.post("/auth/login", { email, password });
  }
}

/** Retries around Render's cold start, which 502s for the first ~50 seconds. */
export async function waitForApi(client, attempts = 12) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await fetch(`${client.base}/health`);
      return;
    } catch {
      /* keep waiting */
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  throw new Error("API did not come up");
}
