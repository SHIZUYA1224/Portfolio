---
title: 'ブログ'
date: '2026-02-20'
summary: 'このポートフォリオにMarkdownベースのブログ機能を追加しました。'
coverImage: '/HERO.png'
---

# はじめに

このブログは `content/blog/posts` にMarkdownファイルを追加するだけで記事を増やせます。

## 画像の入れ方

画像は `public/blog/images` 配下に置いて、Markdownでパスを指定します。

![デモ画像](/HERO.png)

## 記事追加の流れ

1. `content/blog/posts/your-slug.md` を作る
2. frontmatter に `title`, `date`, `summary` を書く
3. 本文をMarkdownで書く
