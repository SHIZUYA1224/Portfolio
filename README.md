# SHIZUYA Portfolio

3D / Music / AI を組み合わせたポートフォリオサイト（Next.js 16, TypeScript, Tailwind）。

## 開発の流れ
1. 依存関係をインストール
   ```bash
   npm install
   ```
2. 環境変数を設定（`.env.example` をコピー）
   ```bash
   cp .env.example .env.local
   # GROK_API_KEY=... をセット
   ```
3. 開発サーバーを起動
   ```bash
   npm run dev
   ```

## ディレクトリ構成（要点）
- `src/features/music` … トラックデータ、プレイヤー、コンテキスト、カード/リストなど音楽機能一式
- `src/features/model-viewer` … 3Dモデルビューア（GLTF/VRM）の UI / ロジック
- `src/features/chat` … チャット用 UI コンポーネント
- `src/app/api/aichat` … xAI Grok へのプロキシ API（`knowledge.txt` を system prompt に付与）
- `src/components` … 共通 UI（ヘッダー、Title/Button など）と LP セクション

## 環境変数
- `GROK_API_KEY` … xAI Grok API キー（必須）
- `OPENAI_API_KEY` … OpenAI を使う場合に任意で利用（現状は未使用）

## スクリプト
- `npm run dev` … 開発サーバー
- `npm run build` … 本番ビルド
- `npm run start` … 本番サーバー
- `npm run lint` … ESLint

## メモ
- 音楽ページは `/music`、チャットは `/chat`、3D モデルビューアは `/model`。
- トラックデータは `src/features/music/data/tracks.ts` にまとめています。
- Grok で参照するナレッジは `src/app/api/aichat/knowledge.txt` を編集してください。
# shizuya-portfolio-0
