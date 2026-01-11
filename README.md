# Sansan Reserve

写真スタジオの予約システム。Google Calendar を予約管理の基盤とし、フロントエンドは Vue 3、バックエンドは Google Apps Script で構築されています。

## システム構成

### フロントエンド
- **Vue 3** - プログレッシブJavaScriptフレームワーク
- **TypeScript** - 型安全な開発環境
- **Vite** - 高速ビルドツール
- **Vue Router** - 公式ルーティングライブラリ
- **Vuetify 3** - Material Designコンポーネントライブラリ
- **Tailwind CSS v4** - ユーティリティファーストCSSフレームワーク
- **ホスティング** - GitHub Pages（静的サイト）

### バックエンド
- **Google Apps Script** - サーバーレスバックエンド
- **Google Calendar API** - 予約データの永続化（Source of Truth）
- **clasp** - GASプロジェクトのローカル開発・デプロイツール

### アーキテクチャ

```
┌─────────────────┐
│  Frontend       │
│  (Vue 3)        │
│  GitHub Pages   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  Google Apps    │
│  Script         │
│  (Web App)      │
└────────┬────────┘
         │ API
         ▼
┌─────────────────┐
│  Google         │
│  Calendar       │
└─────────────────┘
```

## プロジェクト構成

```
sansan-reserve/
├── src/                    # Vue フロントエンド
│   ├── components/
│   │   ├── BasicInfoForm.vue
│   │   └── SlotPicker.vue
│   ├── services/
│   │   └── api.ts         # GAS API クライアント
│   └── ...
├── gas/                    # Google Apps Script バックエンド
│   ├── src/
│   │   ├── main.ts        # エントリーポイント
│   │   ├── calendar.ts    # カレンダー操作
│   │   ├── auth.ts        # 認証
│   │   ├── util.ts        # ユーティリティ
│   │   └── types.ts       # 型定義
│   └── README.md          # GAS セットアップガイド
└── ...
```

## セットアップ

### 1. フロントエンドのセットアップ

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# .env ファイルを編集して GAS Web App URL と API Token を設定
```

### 2. バックエンド（GAS）のセットアップ

詳細は [gas/README.md](gas/README.md) を参照してください。

```bash
cd gas
npm install

# clasp でログイン
clasp login

# GAS プロジェクトを作成
clasp create --type webapp --title "Sansan Reserve API"

# ビルドしてデプロイ
npm run deploy
```

### 3. 環境変数の設定

**フロントエンド (.env):**
```env
VITE_GAS_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_API_TOKEN=your-secret-token
```

**バックエンド (GAS Script Properties):**
- `CALENDAR_ID`: Google Calendar ID
- `API_TOKEN`: API認証トークン（フロントエンドと同じ値）

## 開発

### フロントエンド開発

```bash
# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### バックエンド開発

```bash
cd gas

# TypeScript をビルド
npm run build

# GAS にプッシュ
npm run push

# デプロイ
npm run deploy
```

## 機能

### 予約フォーム
- 姓名、メールアドレスの入力
- 4種類の撮影メニュー選択（30分/60分/90分/120分）
- 空き枠の自動取得と表示
- 予約済み枠は選択不可
- リアルタイムバリデーション

### API エンドポイント

詳細は [gas/README.md](gas/README.md) を参照してください。

- `GET /availability` - 空き枠取得
- `POST /reserve` - 予約作成

## GitHub Pages へのデプロイ

このプロジェクトは、GitHub Actionsを使用してGitHub Pagesへ自動デプロイされます。

### GitHub側で必要な設定

1. GitHubリポジトリの **Settings** → **Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. mainブランチにプッシュすると自動的にデプロイが実行されます

デプロイ後、以下のURLでアクセスできます：
`https://<your-username>.github.io/sansan-reserve/`

### 手動デプロイ

GitHub Actionsの画面から **Deploy to GitHub Pages** ワークフローを手動実行することもできます。

## セキュリティ

- API Token による簡易認証
- Script Properties での秘密情報管理
- クライアントサイド・サーバーサイド両方でバリデーション
- 予約直前の空き枠再確認（競合対策）

## ドキュメント

- [gas/README.md](gas/README.md) - Google Apps Script セットアップガイド
- [FEATURES.md](FEATURES.md) - 機能仕様書

## ライセンス

プライベートプロジェクト
