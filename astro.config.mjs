import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// Cloudflare Pages デプロイ前提。
// 静的ページのみで構成しているため adapter は static モード相当で動くが、
// 後から Server Islands や Functions を追加できるよう adapter を有効化しておく。
export default defineConfig({
  site: "https://tanaka-kun.dev",
  integrations: [tailwind(), mdx()],
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
});
