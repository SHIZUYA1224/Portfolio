# Portfolio 運用マニュアル

このドキュメントは、ポートフォリオの更新担当者向けです。  
「どこに何を追加すれば反映されるか」を機能ごとにまとめています。

## 1. 起動と基本

1. 依存関係をインストール
```bash
npm install
```
2. 環境変数を用意
```bash
cp .env.example .env.local
```
3. 開発サーバー起動
```bash
npm run dev
```
4. 品質確認
```bash
npm run lint
npm run build
```

## 2. 音楽（/music）を追加・更新する

### 追加する場所
- データ定義: `src/features/music/data/tracks.ts`
- 音源ファイル: `public/music/...`
- カバー画像: `public/covers/...`
- 制作ノート（任意）: `public/notes/...`（Markdown）

### tracks.ts の1曲分フォーマット
```ts
{
  id: '003',
  title: 'New Track',
  artist: 'SHIZUYA',
  coverUrl: '/covers/new-track.jpg',
  audioUrl: '/music/new-track.mp3',
  duration: 180, // 秒
  category: 'BGM',
  genre: 'LoFi',
  notesPath: '/notes/003.md', // 任意
}
```

### 注意点
- `id` は重複させない。
- `audioUrl` / `coverUrl` / `notesPath` は `public` 基準で `/` から書く。
- `duration` は秒数。

## 3. モデル（/model）を追加・更新する

### 追加する場所（ここ1か所）
- `src/features/model-viewer/config/modelLibrary.ts`

このファイルで以下を一括管理します。
- ページタイトル・サブタイトル: `MODEL_PAGE_CONFIG`
- モデル一覧: `MODEL_LIBRARY`

### 1モデルのフォーマット
```ts
{
  id: 'MODEL_C',
  name: 'Model C',
  url: '/models/model-c.glb', // public/models 配下
  type: 'gltf', // 'gltf' or 'vrm'
  category: 'character', // 'character' or 'object'
  description: '説明文',
  thumbnail: '/thumbnails/model-c.jpg', // 任意（外部URLでも可）
  cameraPreset: {
    position: [0, 1.9, 4.3],
    target: [0, 1.05, 0],
  }, // 任意
}
```

### モデル実ファイル
- `public/models/*.glb`
- `public/models/*.vrm`

### 注意点
- `type` と拡張子を合わせる（`gltf` -> `.glb`, `vrm` -> `.vrm`）。
- `cameraPreset` を設定すると、選択時カメラ遷移先をモデルごとに調整できる。

## 4. ROOM（/room）で選択対象を管理する

### 追加する場所
- `src/app/room/roomData.ts`

`ROOM_MODELS` 配列が「選択可能オブジェクト一覧」です。  
ここにないオブジェクトは、クリック対象にも矢印表示対象にもなりません。

### 1項目のフォーマット
```ts
{
  objectName: 'Piano', // ROOM.glb 内オブジェクト名と一致させる
  modelName: 'Sample Model A',
  category: 'Music', // 表示カテゴリ
  publicPath: '/models/sample-model-a.glb',
}
```

### 注意点
- `objectName` は `ROOM.glb` 内ノード名に一致させる。
- 一致しない場合はクリックやハイライトが動かない。

## 5. チャット（/chat）を更新する

### UI変更
- `src/app/chat/page.tsx`
- `src/features/chat/components/*`

### AI応答のナレッジ更新
- `src/app/api/aichat/knowledge.txt`

### API・セキュリティ設定
- ルート: `src/app/api/aichat/route.ts`
- サーバー通信: `src/lib/chatClient.ts`
- 環境変数: `.env.local`
  - `GROK_API_KEY`（必須）
  - `ALLOWED_ORIGINS`（任意・推奨）

## 6. デプロイ（Vercel）

1. Vercel Project の Environment Variables に設定
   - `GROK_API_KEY`
   - `ALLOWED_ORIGINS`（必要なら）
2. `npm run build` がローカルで通ることを確認
3. Git push してデプロイ

## 7. よくある更新フロー

### 新曲を追加
1. `public/music` に音源配置
2. `public/covers` に画像配置
3. `tracks.ts` に1件追加
4. 必要なら `public/notes` に md 追加

### 新モデルを追加
1. `public/models` に `.glb`/`.vrm` 配置
2. `modelLibrary.ts` の `MODEL_LIBRARY` に追加
3. 必要なら `cameraPreset` を調整

### ROOM の選択対象を変更
1. `roomData.ts` の `ROOM_MODELS` を編集
2. `objectName` が ROOM.glb と一致しているか確認

## 8. 変更後チェックリスト

- `npm run lint` が通る
- `npm run build` が通る
- `/music` で再生・前へ・次へが想定通り
- `/model` でモデル切替・カメラ遷移・ポップアップ表示が動く
- `/room` でクリック対象と矢印表示が一致している
- `/chat` で送受信ができる
