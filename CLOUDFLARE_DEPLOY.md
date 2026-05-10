# Cloudflare Pages デプロイ手順

`tanaka-kun.dev` を Cloudflare Pages に GitHub 連携でデプロイする手順。
**本人のクレカ・アカウント情報が必要なステップは、本人が手動で実行する。**

---

## 0. 前提

- Cloudflare アカウントを取得済み
- ドメイン `tanaka-kun.dev` を Cloudflare で取得済み (または他レジストラから移管予定)
- GitHub アカウント `tanaka-kun-dev` を取得済み
- ローカルで `pnpm build` が通る状態

---

## STEP 1: GitHub リポジトリを準備する

1. GitHub に新規リポジトリ `tanaka-kun-dev/tanaka-kun-dev` を作成 (Public 推奨)
2. ローカルから push:

   ```bash
   cd ./tanaka-kun-dev
   git init
   git add .
   git commit -m "init: tanaka-kun.dev portfolio site"
   git branch -M main
   git remote add origin https://github.com/tanaka-kun-dev/tanaka-kun-dev.git
   git push -u origin main
   ```

3. push 後、GitHub 上でファイルが反映されていることを確認

---

## STEP 2: Cloudflare ダッシュボードで Pages プロジェクトを作成

1. <https://dash.cloudflare.com/> にログイン
2. 左メニュー → **Workers & Pages** → **Create application** → **Pages** タブ
3. **Connect to Git** を選択
4. GitHub アカウントを連携 (初回のみ Cloudflare の GitHub App を install)
5. リポジトリ `tanaka-kun-dev/tanaka-kun-dev` を選択 → **Begin setup**

### Build configuration

| 項目 | 値 |
|------|----|
| Project name | `tanaka-kun-dev` |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Root directory | (空欄でOK) |
| Node version (環境変数) | `NODE_VERSION = 20` |

→ **Save and Deploy** クリック → 初回ビルドが走る (3〜5分)

### つまずきポイント

- pnpm が認識されない場合 → 環境変数に `PACKAGE_MANAGER = pnpm` を追加
- ビルド失敗時は **View build log** で確認、ローカルの `pnpm build` と差分を比較

---

## STEP 3: カスタムドメインを設定する

1. Pages プロジェクト → **Custom domains** タブ → **Set up a custom domain**
2. `tanaka-kun.dev` を入力 → **Continue**
3. Cloudflare がドメインの DNS を自動で設定 (CNAME を Pages 側に向ける)
4. **Activate domain** をクリック → SSL 証明書発行を待つ (5〜15分)

### `www.tanaka-kun.dev` も使いたい場合

- もう一度 **Set up a custom domain** で `www.tanaka-kun.dev` を追加
- (推奨) DNS で `www` → `tanaka-kun.dev` に Page Rule で 301 リダイレクト

---

## STEP 4: 反映確認

ブラウザで以下を順番に確認:

- [ ] `https://tanaka-kun.dev` が表示される
- [ ] `https://tanaka-kun.dev/projects` が表示される
- [ ] `https://tanaka-kun.dev/blog` が表示される
- [ ] `https://tanaka-kun.dev/about` が表示される
- [ ] `https://tanaka-kun.dev/contact` が表示される
- [ ] `https://tanaka-kun.dev/sitemap-index.xml` が 200 を返す
- [ ] DevTools で OGP / Twitter Card / JSON-LD が出ている
- [ ] HTTPS の鍵マークが緑

---

## STEP 5: 以降の更新フロー

`main` に push するだけで自動デプロイ。

```bash
git add .
git commit -m "feat: ..."
git push
```

→ Cloudflare Pages が自動でビルド & デプロイ (1〜2 分)。

PR を作るとプレビュー URL (`<branch>.tanaka-kun-dev.pages.dev`) が自動発行される。

---

## トラブルシュート

| 症状 | 確認ポイント |
|------|------------|
| ビルドが失敗する | `pnpm build` をローカルで再現、ログを比較 |
| ドメインが繋がらない | Cloudflare DNS タブで CNAME が `tanaka-kun-dev.pages.dev` を向いているか |
| SSL エラー | 証明書発行待ち (15分以内) / Cloudflare の SSL/TLS モードを `Full` に |
| 404 が出る | `dist/` に該当 HTML があるか、`output: "static"` のままか確認 |

---

## コスト

- Cloudflare Pages Free プラン: **¥0/月** (500 ビルド/月、無制限帯域)
- ドメイン `tanaka-kun.dev`: 約 **¥1,500/年** (Cloudflare レジストラ価格)

合計: **¥1,500/年 (¥125/月)** 程度。
