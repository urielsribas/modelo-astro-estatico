// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/site.config.ts";

export default defineConfig({
  site: site.url,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
  prefetch: { prefetchAll: true },
  image: { responsiveStyles: true },
});
