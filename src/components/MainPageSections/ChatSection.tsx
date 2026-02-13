'use client';

import React from 'react';
import { MessageSquare, Mic, Cpu, Circle } from 'lucide-react';

export default function ChatSection() {
  return (
    // 1. セクション基盤: ダークテーマの統一と、技術的な冷たさ（Cyan）の導入
    <section className="relative w-full py-32 bg-neutral-900 border-t border-white/10 overflow-hidden">
      {/* 背景装飾: デジタル空間を意識したグリッドと光 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        {/* 左側：AIターミナル (Visual Interface) */}
        {/* MusicSectionとは逆に「左」に配置することで、Webサイト全体でジグザグの視線誘導を作る */}
        <div className="md:col-span-7 flex justify-center md:justify-start">
          {/* デバイスフレーム */}
          <div className="w-full max-w-lg bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20">
            {/* ヘッダー: ステータスバー */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-3 h-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  SYSTEM ONLINE
                </span>
              </div>
              <Cpu size={16} className="text-neutral-500" />
            </div>

            {/* メインエリア: ビデオとチャットのハイブリッド表示 */}
            <div className="relative aspect-video w-full bg-neutral-800 group cursor-pointer overflow-hidden">
              {/* 待機中のプレースホルダー（動画サムネの代わり） */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                <div className="w-20 h-20 rounded-full border-2 border-cyan-500/30 flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/50 animate-[spin_4s_linear_infinite]" />
                  <div className="w-16 h-16 rounded-full bg-neutral-700 overflow-hidden">
                    {/* 本来はここにアバター画像 */}
                    <div className="w-full h-full bg-cyan-900/20 flex items-center justify-center text-2xl">
                      👩‍💻
                    </div>
                  </div>
                </div>
                <p className="text-neutral-400 text-sm font-light">
                  Waiting for input...
                </p>
              </div>

              {/* 疑似チャットオーバーレイ（動画の上に浮いているUI） */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                {/* AIのメッセージ */}
                <div className="self-start bg-neutral-900/80 backdrop-blur-sm border border-cyan-500/30 text-cyan-50 px-3 py-2 rounded-lg rounded-bl-none text-sm max-w-[80%] animate-fade-in-up">
                  こんにちは、SHIZUYAです。
                  <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 align-middle animate-pulse" />
                </div>
              </div>

              {/* 再生ボタンオーバーレイ */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <span className="px-6 py-2 border border-white/30 rounded-full text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all">
                  WATCH DEMO
                </span>
              </div>
            </div>

            {/* フッター: 入力エリア風UI */}
            <div className="p-4 bg-neutral-900 border-t border-white/10 flex items-center gap-3">
              <div className="flex-1 h-9 bg-neutral-800 rounded-full flex items-center px-4 text-xs text-neutral-500 font-mono">
                Type a message to AI...
              </div>
              <button className="p-2 rounded-full bg-cyan-900/20 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors">
                <Mic size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 右側：テキスト情報 (Context) */}
        <div className="md:col-span-5 flex flex-col space-y-8 order-first md:order-last">
          <div className="space-y-4">
            <span className="text-xs font-mono text-cyan-500 tracking-widest uppercase">
              04 — AI Integration
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Digital Persona
            </h2>
            <div className="h-px w-12 bg-cyan-500" />
          </div>

          <p className="text-neutral-300 leading-relaxed font-light">
            テキストを読むだけのWebサイトは過去のものです。
            <br />
            LLM (Large Language Model) と音声合成、そして
            <br />
            Live2D / 3Dアバターを統合した
            <strong className="text-white font-normal">「AI-Tuber」</strong>
            システム。
            <br />
            リアルタイムな対話が、ユーザーに強烈な「実在感」を与えます。
          </p>

          <div className="flex flex-col gap-4 pt-4 border-l border-white/10 pl-6">
            <div className="flex items-start gap-3">
              <MessageSquare size={20} className="text-neutral-500 mt-1" />
              <div>
                <h4 className="text-white text-sm font-medium">
                  Real-time Interaction
                </h4>
                <p className="text-neutral-500 text-xs mt-1">
                  ユーザーのコメントに即座に反応・回答
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Circle size={20} className="text-neutral-500 mt-1" />
              <div>
                <h4 className="text-white text-sm font-medium">
                  Cross-Platform
                </h4>
                <p className="text-neutral-500 text-xs mt-1">
                  YouTube, Web, VRChat への展開が可能
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
