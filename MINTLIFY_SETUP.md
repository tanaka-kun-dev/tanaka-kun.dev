# Mintlify セットアップ手順 (`docs.tanaka-kun.dev`)

Mintlify Hobby プラン (無料) を使って、技術ドキュメント・OSS のドキュメントサイトを
`docs.tanaka-kun.dev` で公開する手順。

**本人のクレカ・アカウント情報が必要なステップは、本人が手動で実行する。**

---

## 0. 前提

- メインサイト `tanaka-kun.dev` が Cloudflare Pages にデプロイ済み
- GitHub アカウント `tanaka-kun-dev` でログインできる状態
- DNS 管理が Cloudflare 側にある

---

## STEP 1: Mintlify アカウントを作成する

1. <https://mintlify.com/> にアクセス
2. **Get Started** → **Sign up with GitHub** で GitHub `tanaka-kun-dev` アカウントで認証
3. プラン選択画面が出たら **Hobby (Free)** を選択
   - Custom domain 1 個まで使える
   - 月間 PV 制限あり (本人サイトには十分)

### Hobby プランの制約

| 項目 | 制約 |
|------|------|
| カスタムドメイン | 1 個まで |
| メンバー | 1 名 |
| Pageviews | 無制限 (Hobby は無料、上位プランで AI 機能解禁) |
| ロゴ表示 | "Powered by Mintlify" 表示あり |

---

## STEP 2: GitHub リポジトリを作成して連携する

1. GitHub に新規リポジトリ `tanaka-kun-dev/tanaka-kun-dev-docs` を作成 (Public)
2. Mintlify ダッシュボード → **Connect repository** → リポジトリを選択
3. Mintlify の GitHub App を install

### 初期ファイル

ローカルに `tanaka-kun-dev-docs` リポジトリを clone し、以下を配置:

```
tanaka-kun-dev-docs/
├── mint.json                     # 設定ファイル (本リポの mint.json.template を流用)
├── introduction.mdx              # トップページ
├── projects/
│   ├── youtube-bgm-pipeline.mdx
│   └── store-mcp.mdx
└── images/
    └── logo.svg
```

`mint.json.template` をコピーして `mint.json` にリネームし、必要箇所を編集して push。

---

## STEP 3: `mint.json` を配置する

本リポジトリの `mint.json.template` を参照。

主な編集ポイント:

- `name`: サイト名 (`tanaka-kun-dev docs`)
- `colors.primary`: ブランドカラー (`#D4AF37`)
- `topbarLinks` / `footerSocials`: 外部リンク
- `navigation`: サイドバーの構成

詳細リファレンス: <https://mintlify.com/docs/settings/global>

---

## STEP 4: カスタムドメインを設定する

### Mintlify 側

1. Mintlify ダッシュボード → **Settings** → **Custom Domain**
2. `docs.tanaka-kun.dev` を入力
3. Mintlify が要求する DNS レコードをコピー (通常 `CNAME docs cname.mintlify.app` のような形式)

### Cloudflare 側

1. <https://dash.cloudflare.com/> → `tanaka-kun.dev` ドメインを選択
2. **DNS** タブ → **Add record**
3. レコードを追加:

   | Type | Name | Target | Proxy status |
   |------|------|--------|------------|
   | CNAME | `docs` | (Mintlify から指示された値) | **DNS only** (重要、オレンジ雲は OFF) |

4. 保存

### 反映確認

- DNS 反映に 5〜30 分
- Mintlify ダッシュボードに **Verified** が出れば完了
- ブラウザで `https://docs.tanaka-kun.dev` を開いて表示確認

---

## STEP 5: デプロイと運用

`main` に push するだけで Mintlify が自動デプロイ (1 分以内)。

PR を作るとプレビュー URL が発行される (Vercel ライクな挙動)。

### 記事追加のフロー

1. `tanaka-kun-dev-docs` リポジトリで新規 `.mdx` を作成
2. `mint.json` の `navigation` に追記
3. `git push` → 自動デプロイ

---

## トラブルシュート

| 症状 | 確認ポイント |
|------|------------|
| カスタムドメインが Verified にならない | Cloudflare の Proxy が **DNS only** になっているか (オレンジ雲を OFF) |
| ビルドエラー | Mintlify ダッシュボードの **Deployments** タブでログ確認 |
| 反映が遅い | DNS 伝搬で最大 30 分、Mintlify 側のキャッシュは 1〜2 分 |
| 画像が出ない | `images/` 直下に置き、`![alt](/images/foo.png)` で参照 |

---

## コスト

- Mintlify Hobby: **¥0/月** (Free)
- DNS は Cloudflare の既存契約に乗るので追加コストなし

合計: **¥0/月**

---

## メインサイトとの役割分担

| サイト | 役割 |
|--------|------|
| `tanaka-kun.dev` | ポートフォリオ・ブランディング (Astro / Cloudflare Pages) |
| `docs.tanaka-kun.dev` | OSS ドキュメント・技術記事の長文 (Mintlify) |
| `zenn.dev/tanakakun` | 単発の技術記事 (外部プラットフォーム、SEO・回遊用) |
