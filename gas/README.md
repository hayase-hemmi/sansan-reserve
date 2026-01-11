# Sansan Reserve - Google Apps Script Backend

このディレクトリには、Sansan Reserve の Google Apps Script バックエンドコードが含まれています。

## 概要

Google Calendar を予約システムの Source of Truth として使用し、以下の機能を提供します：

- **GET /availability**: 空き枠の取得
- **POST /reserve**: 予約の作成

## 前提条件

- Node.js 18 以上
- Google アカウント
- Google Calendar（予約用カレンダーを作成済み）

## 初期セットアップ

### 1. 依存関係のインストール

```bash
cd gas
npm install
```

### 2. Google Apps Script API の有効化

clasp を使用する前に、Google Apps Script API を有効にする必要があります。

1. 以下のURLにアクセス:
   ```
   https://script.google.com/home/usersettings
   ```

2. 「Google Apps Script API」を **ON** にする

3. 設定が反映されるまで1-2分待つ

### 3. clasp のログイン

claspはプロジェクトローカルにインストール済みです。npxで実行できます。

```bash
# Google アカウントでログイン
npx clasp login
```

**権限エラーが出る場合:**
ブラウザが開いてGoogleアカウントの認証画面が表示されます。認証を許可してください。

**トラブルシューティング:**
- もしグローバルインストールしたい場合は `sudo npm install -g @google/clasp` を使用
- ただし、npxを使う方が推奨（権限問題を回避）

### 4. GAS プロジェクトの作成

```bash
# 新しいプロジェクトを作成
npx clasp create --type webapp --title "Sansan Reserve API"

# .clasp.json が作成されます（このファイルは .gitignore に含まれています）
```

### 5. Script Properties の設定

Google Apps Script エディタで以下の Script Properties を設定します：

1. GAS プロジェクトを開く:
   ```bash
   npx clasp open
   ```

2. 左メニューの「プロジェクトの設定」（歯車アイコン）をクリック

3. 「スクリプト プロパティ」セクションで以下を追加:

   | プロパティ名 | 値 | 説明 |
   |-------------|-----|------|
   | `CALENDAR_ID` | `your-calendar-id@group.calendar.google.com` | 予約用カレンダーのID |
   | `API_TOKEN` | `your-secret-token` | API認証用トークン（ランダムな文字列） |

#### カレンダーIDの取得方法

1. Google Calendar を開く
2. 使用するカレンダーの設定を開く
3. 「カレンダーの統合」セクションで「カレンダーID」をコピー

#### API_TOKEN の生成

任意の安全なランダム文字列を使用してください。例：

```bash
# macOS/Linux
openssl rand -hex 32

# または単純な文字列でもOK（本番環境では長く複雑なものを推奨）
```

### 6. ビルドとデプロイ

```bash
# TypeScript をビルドして GAS にプッシュ
npm run push

# Web App としてデプロイ
npm run deploy
```

### 7. Web App の設定とURL取得

デプロイ後、**必ず以下の設定を行ってください**（CORS対応のために必須）：

1. GAS エディタを開く:
   ```bash
   npx clasp open
   ```

2. 右上の「デプロイ」→「デプロイを管理」をクリック

3. アクティブなデプロイの右側の編集アイコン（鉛筆マーク）をクリック

4. **重要**: 「次のユーザーとして実行」と「アクセスできるユーザー」を以下のように設定:
   - **次のユーザーとして実行**: 自分（あなたのGoogleアカウント）
   - **アクセスできるユーザー**: **全員**

5. 「デプロイ」ボタンをクリック

6. 権限の承認を求められたら、承認する

7. 表示される Web App URL をコピー（例: `https://script.google.com/macros/s/AKfycby.../exec`）

8. この URL をフロントエンドの環境変数 `VITE_GAS_ENDPOINT` に設定

**注意**: 「アクセスできるユーザー」を「全員」に設定しないと、GitHub Pagesからのアクセス時にCORSエラーが発生します。

## 開発ワークフロー

### コードの変更とデプロイ

```bash
# TypeScript をビルド
npm run build

# GAS にプッシュ（ビルド + プッシュ）
npm run push

# デプロイ（ビルド + プッシュ + デプロイ）
npm run deploy
```

### ウォッチモード（開発時）

```bash
# TypeScript の変更を監視
npm run watch

# 別のターミナルで手動プッシュ
npm run push
```

## API エンドポイント

### GET /availability

空き枠を取得します。

**パラメータ:**
- `from`: 開始日時（ISO 8601形式、例: `2026-01-15T00:00:00+09:00`）
- `to`: 終了日時（ISO 8601形式）
- `durationMin`: 必要な時間（分）

**レスポンス:**
```json
{
  "slots": [
    {
      "start": "2026-01-15T09:00:00+09:00",
      "end": "2026-01-15T09:30:00+09:00",
      "available": true
    },
    {
      "start": "2026-01-15T09:30:00+09:00",
      "end": "2026-01-15T10:00:00+09:00",
      "available": false
    }
  ]
}
```

### POST /reserve

予約を作成します。

**リクエストボディ:**
```json
{
  "token": "your-api-token",
  "lastName": "山田",
  "firstName": "太郎",
  "email": "example@example.com",
  "menu": "standard",
  "start": "2026-01-15T09:00:00+09:00"
}
```

**レスポンス（成功時）:**
```json
{
  "ok": true,
  "eventId": "calendar-event-id"
}
```

**レスポンス（エラー時）:**
```json
{
  "ok": false,
  "errorCode": "SLOT_TAKEN",
  "message": "This time slot is no longer available"
}
```

## エラーコード

| コード | 説明 |
|--------|------|
| `INVALID_TOKEN` | API トークンが無効 |
| `SLOT_TAKEN` | 指定された時間枠がすでに予約済み |
| `INVALID_SLOT` | 無効な時間枠 |
| `CALENDAR_ERROR` | カレンダー操作エラー |
| `INVALID_REQUEST` | リクエストパラメータが不正 |

## 設定

### 営業時間の変更

[src/types.ts](src/types.ts) の `DEFAULT_BUSINESS_HOURS` を編集:

```typescript
export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  start: 9,    // 開始時刻（9時）
  end: 18,     // 終了時刻（18時）
  slotInterval: 30,  // スロット間隔（30分）
}
```

### メニュー設定の変更

[src/types.ts](src/types.ts) の `MENU_CONFIG` を編集:

```typescript
export const MENU_CONFIG: Record<Menu, MenuConfig> = {
  standard: { duration: 30, displayName: 'スタンダードプラン' },
  premium: { duration: 60, displayName: 'プレミアムプラン' },
  family: { duration: 90, displayName: 'ファミリープラン' },
  wedding: { duration: 120, displayName: 'ウェディングプラン' },
}
```

## トラブルシューティング

### デプロイエラー

```bash
# プロジェクトの clasp を最新に更新
npm install --save-dev @google/clasp@latest

# 再ログイン
npx clasp login

# または、グローバルインストールしている場合
sudo npm install -g @google/clasp@latest
```

**権限エラーの場合:**
- `npx clasp` を使用することで、グローバルインストール不要
- プロジェクトローカルの clasp が package.json に含まれています

### カレンダーアクセスエラー

1. Script Properties で `CALENDAR_ID` が正しいか確認
2. GAS プロジェクトの実行ユーザーがカレンダーへのアクセス権を持っているか確認
3. appsscript.json で Calendar API v3 が有効になっているか確認

### CORS エラー

GAS Web App は CORS ヘッダーの制御が限定的です。`webapp.access` を `ANYONE_ANONYMOUS` に設定していることを確認してください（appsscript.json）。

## セキュリティ

- Script Properties に保存された情報（`CALENDAR_ID`、`API_TOKEN`）は、GAS プロジェクトの所有者のみがアクセス可能
- `API_TOKEN` は定期的に更新することを推奨
- フロントエンドには `API_TOKEN` を環境変数として設定し、GitHub には含めない

## 参考リンク

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [clasp Documentation](https://github.com/google/clasp)
- [Google Calendar API](https://developers.google.com/calendar)
