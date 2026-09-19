import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Tests live next to the code they cover, across every workspace.
    include: ["apps/*/src/**/*.test.ts", "packages/*/src/**/*.test.ts"],
    environment: "node"
  }
});
