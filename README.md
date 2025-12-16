# Sansan Reserve

Vue 3 + TypeScript + Vue Router + Vuetify + Tailwind CSS で構築されたプロジェクトです。

## 技術スタック

- **Vue 3** - プログレッシブJavaScriptフレームワーク
- **TypeScript** - 型安全な開発環境
- **Vite** - 高速ビルドツール
- **Vue Router** - 公式ルーティングライブラリ
- **Vuetify 3** - Material Designコンポーネントライブラリ
- **Tailwind CSS v4** - ユーティリティファーストCSSフレームワーク

## 開発環境のセットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## GitHub Pagesへのデプロイ

このプロジェクトは、GitHub Actionsを使用してGitHub Pagesへ自動デプロイされます。

### GitHub側で必要な設定

1. GitHubリポジトリの **Settings** → **Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. mainブランチにプッシュすると自動的にデプロイが実行されます

デプロイ後、以下のURLでアクセスできます：
`https://<your-username>.github.io/sansan-reserve/`

### 手動デプロイ

GitHub Actionsの画面から **Deploy to GitHub Pages** ワークフローを手動実行することもできます。
