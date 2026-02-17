'use client';

import React from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import { SITE_TITLE } from '@/config';

export default function ContactSection() {
  // 現在の年を取得（フッターのCopyright用）
  const currentYear = new Date().getFullYear();

  return (
    // 1. セクション基盤: サイトの「最下層」としての深淵な黒
    <footer className="section-animate relative w-full pt-32 max-md:pt-16 pb-12 max-md:pb-8 bg-neutral-950 text-white overflow-hidden">
      {/* 背景装飾: 巨大なタイポグラフィで空間を埋める */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
        <span className="absolute -top-[10%] -left-[10%] text-[20vw] max-md:text-[28vw] font-bold text-neutral-900/50 leading-none tracking-tighter">
          CONTACT
        </span>
      </div>

      <div className="container mx-auto px-6 max-md:px-4 relative z-10">
        {/* 2. メイングッド: 「メッセージ送信」と「SNS接続」の分離 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-md:gap-8 mb-32 max-md:mb-14">
          {/* 左側: Call to Action (直接的な勧誘) */}
          <div className="space-y-8 max-md:space-y-5">
            <h2 className="text-5xl max-md:text-3xl md:text-7xl font-light tracking-tighter">
              Let&apos;s work <br />
              <span className="text-neutral-500">together.</span>
            </h2>
            <p className="text-neutral-400 max-w-md leading-relaxed max-md:leading-[1.85] max-md:text-sm">
              プロジェクトのご相談、技術的な質問、あるいは単なる挨拶でも構いません。
              あなたのアイデアを、私のコードで形にします。
            </p>

            {/* メールボタン: 主要な導線なので目立たせる */}
            <a
              href="mailto:your-email@example.com"
              className="group inline-flex items-center gap-4 max-md:gap-2 px-8 max-md:px-5 py-4 max-md:py-3 bg-white text-black rounded-full text-lg max-md:text-sm font-medium transition-transform duration-300 hover:scale-105"
            >
              <Mail size={20} />
              <span>Send me an email</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* 右側: Social Links (回路の分岐) */}
          <div className="flex flex-col justify-end space-y-4 max-md:space-y-3">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-4">
              Social Connections
            </p>

            {/* リンクカード群 */}
            {[
              {
                name: 'GitHub',
                icon: Github,
                url: 'https://github.com/your-github',
                id: '@shizuya_dev',
              },
              {
                name: 'LinkedIn',
                icon: Linkedin,
                url: 'https://linkedin.com/in/your-profile',
                id: 'SHIZUYA',
              },
              {
                name: 'Twitter / X',
                icon: Twitter,
                url: 'https://twitter.com',
                id: '@shizuya_x',
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 max-md:p-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-neutral-900 rounded-full text-neutral-400 group-hover:text-white transition-colors">
                    <social.icon size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-neutral-400 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                    <span className="block text-lg max-md:text-base font-medium">
                      {social.id}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-neutral-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* 3. フッター情報: サイトの接地（Grounding） */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 max-md:gap-2 text-xs max-md:text-[11px] text-neutral-500">
          <p>© {currentYear} {SITE_TITLE}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Terms of Service
            </span>
          </div>
          <p className="font-mono">Designed & Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
