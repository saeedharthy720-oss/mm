import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * The site serves two separate single-page apps from one domain, so an
 * unmatched path has to reach whichever app owns its prefix. That decision is
 * made by the Worker the build emits (see scripts/assemble-site.mjs).
 *
 * Getting it wrong is quiet: the storefront appears where the dashboard should
 * be, or a deep link redirects to the home page, and both only show up when
 * someone refreshes or shares a URL. These tests load the generated Worker and
 * exercise its routing against a stub asset store.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..", "..");
const workerPath = path.join(repoRoot, "dist", "_worker.js");

function loadWorkerSource(): string {
  try {
    return readFileSync(workerPath, "utf8");
  } catch {
    // The Worker is a build artifact; generate it if this is a clean checkout.
    execFileSync("npm", ["run", "build:site"], { cwd: repoRoot, stdio: "ignore", shell: true });
    return readFileSync(workerPath, "utf8");
  }
}

const source = loadWorkerSource();

/** Runs the generated Worker against a stub ASSETS binding. */
async function request(pathname: string, existingAssets: string[]) {
  const module = await import(
    `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
  );

  const env = {
    ASSETS: {
      fetch: async (req: Request) => {
        const requested = new URL(req.url).pathname;
        return existingAssets.includes(requested)
          ? new Response(`content-of:${requested}`, { status: 200 })
          : new Response("not found", { status: 404 });
      }
    }
  };

  const response = await module.default.fetch(new Request(`https://example.com${pathname}`), env);
  return { status: response.status, body: await response.text(), headers: response.headers };
}

const ASSETS = ["/", "/admin/", "/assets/app.js", "/admin/assets/app.js"];

describe("site routing worker", () => {
  it("serves a real file untouched", async () => {
    const res = await request("/assets/app.js", ASSETS);

    expect(res.status).toBe(200);
    expect(res.body).toBe("content-of:/assets/app.js");
  });

  it.each(["/login", "/register", "/products", "/products/abc", "/cart", "/account/orders"])(
    "falls back to the storefront for %s, with status 200",
    async (pathname) => {
      const res = await request(pathname, ASSETS);

      // 200 matters: a redirect here sent /login to the home page, and a 404
      // would keep product pages out of search results.
      expect(res.status).toBe(200);
      expect(res.body).toBe("content-of:/");
    }
  );

  it.each(["/admin", "/admin/", "/admin/orders", "/admin/products/new"])(
    "falls back to the dashboard for %s",
    async (pathname) => {
      const res = await request(pathname, ASSETS);

      expect(res.status).toBe(200);
      expect(res.body).toBe("content-of:/admin/");
    }
  );

  it("does not mistake a storefront path that merely starts with 'admin'", async () => {
    const res = await request("/administration", ASSETS);

    expect(res.body).toBe("content-of:/");
  });

  it("keeps the dashboard out of search results", async () => {
    expect((await request("/admin/orders", ASSETS)).headers.get("x-robots-tag")).toContain("noindex");
    expect((await request("/products", ASSETS)).headers.get("x-robots-tag")).toBeNull();
  });

  it("sets the security headers _headers used to provide", async () => {
    const res = await request("/products", ASSETS);

    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-frame-options")).toBe("DENY");
    expect(res.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
  });

  it("caches fingerprinted assets indefinitely, and nothing else", async () => {
    expect((await request("/assets/app.js", ASSETS)).headers.get("cache-control")).toContain("immutable");
    expect((await request("/admin/assets/app.js", ASSETS)).headers.get("cache-control")).toContain(
      "immutable"
    );
    // HTML must not be cached immutably, or a deploy would never reach anyone
    // still holding the old page.
    expect((await request("/", ASSETS)).headers.get("cache-control") ?? "").not.toContain("immutable");
  });
});
