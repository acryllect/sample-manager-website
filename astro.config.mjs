import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://samplelantern.com",
  integrations: [
    sitemap({
      // Placeholder pages are noindex until their copy is final (see README).
      filter: (page) => !/\/(support|privacy)\/?$/.test(page),
    }),
  ],
  output: "static",
  compressHTML: true,
});
