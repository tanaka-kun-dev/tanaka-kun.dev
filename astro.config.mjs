import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// Cloudflare Pages デプロイ前提。
// 静的ページのみで構成しているため adapter は static モード相当で動くが、
// 後から Server Islands や Functions を追加できるよう adapter を有効化しておく。
export default defineConfig({
  site: "https://tanaka-kun.dev",
  integrations: [tailwind(), sitemap(), mdx()],
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  build: {
    inlineStylesheets: "auto",
  },
});
