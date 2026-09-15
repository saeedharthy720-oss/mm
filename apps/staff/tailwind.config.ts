import type { Config } from "tailwindcss";
import sharedTailwindPreset from "../../packages/config/tailwind-preset.js";

export default {
  presets: [sharedTailwindPreset as Config],
  content: ["./index.html", "./src/**/*.{ts,tsx}"]
} satisfies Config;
