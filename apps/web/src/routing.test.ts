import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * The storefront's routes are served by explicit rules in _redirects rather
 * than a "/*" catch-all, because a catch-all also swallows the dashboard at
 * /admin (see scripts/assemble-site.mjs).
 *
 * The cost of that is two lists which must agree. Adding a route to App.tsx and
 * forgetting the rule produces a page that works when you click to it and 404s
 * when you refresh or share the link — the kind of fault nobody notices until a
 * customer hits it. This test is what keeps them in step.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..", "..");

const appSource = readFileSync(path.join(here, "App.tsx"), "utf8");
const assembleSource = readFileSync(path.join(repoRoot, "scripts", "assemble-site.mjs"), "utf8");

function routesFromApp(): string[] {
  return [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]!);
}

function rulesFromAssembleScript(): string[] {
  // The rules live in a template literal in the build script.
  return [...assembleSource.matchAll(/^\/(\S*)\s+\/index\.html\s+200$/gm)].map((match) => `/${match[1]!}`);
}

function isCovered(routePath: string, rules: string[]): boolean {
  // React Router ":id" segments and _redirects "*" both stand for one or more
  // path segments, so compare on a normalised shape.
  const normalised = `/${routePath}`.replace(/\/:[^/]+/g, "/*");

  return rules.some((rule) => {
    if (rule === normalised) return true;
    if (rule.endsWith("/*")) {
      const prefix = rule.slice(0, -1);
      return normalised.startsWith(prefix);
    }
    return false;
  });
}

describe("storefront routing rules", () => {
  const routes = routesFromApp();
  const rules = rulesFromAssembleScript();

  it("finds the routes and the rules", () => {
    expect(routes.length).toBeGreaterThan(0);
    expect(rules.length).toBeGreaterThan(0);
  });

  it.each(routesFromApp())("serves /%s on a direct visit", (routePath) => {
    expect(isCovered(routePath, rules)).toBe(true);
  });

  it("never claims a path under /admin, which belongs to the dashboard", () => {
    for (const rule of rules) {
      expect(rule.startsWith("/admin")).toBe(false);
    }
  });

  it("has no catch-all, which would swallow the dashboard", () => {
    expect(rules).not.toContain("/*");
  });
});
