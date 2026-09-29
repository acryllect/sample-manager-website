import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { hasOpenPlaceholder } from "./src/config/pages.ts";

export default defineConfig({
  site: "https://samplelantern.com",
  integrations: [
    sitemap({
      // A support or policy page stays out of the sitemap, and noindex, while it prints an open
      // placeholder (see src/config/pages.ts and the README).
      filter: (page) => !hasOpenPlaceholder(new URL(page).pathname),
    }),
  ],
  output: "static",
  compressHTML: true,
});
