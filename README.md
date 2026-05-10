# tanaka-kun.dev

> tanaka-kun-dev のポートフォリオサイト。Astro + Tailwind + Cloudflare Pages。

## ローカル開発

```bash
pnpm install
pnpm dev
```

→ http://localhost:4321

## ビルド

```bash
pnpm build
```

→ `dist/` に出力

## デプロイ

Cloudflare Pages に GitHub 連携してデプロイ。詳細手順は [`CLOUDFLARE_DEPLOY.md`](./CLOUDFLARE_DEPLOY.md) を参照。

ドキュメントサイト (`docs.tanaka-kun.dev`) を Mintlify でセットアップする手順は [`MINTLIFY_SETUP.md`](./MINTLIFY_SETUP.md)。

## 構成

```
src/
├── layouts/
│   └── BaseLayout.astro    # 全ページ共通 (header / footer / SEO)
├── pages/
│   ├── index.astro         # /
│   ├── projects.astro      # /projects (実装したもの・実装中のもの)
│   ├── blog.astro          # /blog (Zenn 記事インデックス)
│   ├── about.astro         # /about
│   └── contact.astro       # /contact
├── components/             # 共通コンポーネント (将来)
└── styles/                 # グローバルスタイル
```

## 設計方針

- **顔出しなし**: 文章とコードで人柄を伝える
- **意思決定ログ重視**: /projects の各案件に「なぜこの設計か」を明記
- **SEO**: JSON-LD / OGP / Twitter Card / sitemap
- **ダークモード固定**: 採用担当が見やすい
- **静的サイト**: Cloudflare Pages 無料枠で運用 (¥0)

## 公開タイミング

| Day | アクション |
|-----|----------|
| Day 1 | ドメイン取得 (tanaka-kun.dev) |
| Day 7 | / と /about 完成、Cloudflare Pages デプロイ |
| Day 14 | /projects に既存案件追加 |
| Day 21 | /blog に Zenn 記事への外部リンク追加 |
| Day 30 | 公開 + X で告知 |
