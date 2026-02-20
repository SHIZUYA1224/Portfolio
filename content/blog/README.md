# Blog Content

## ディレクトリ構成

- `content/blog/posts/*.md`: 記事ファイル
- `public/blog/images/...`: 記事用画像

## 記事ファイル例

```md
---
title: "記事タイトル"
date: "2026-02-20"
summary: "記事の要約"
coverImage: "/blog/images/my-post/cover.jpg"
---

# 見出し

本文...
```

## 画像の使い方

1. `public/blog/images/my-post/` に画像を置く
2. Markdown本文で `![alt](/blog/images/my-post/file.jpg)` と書く

