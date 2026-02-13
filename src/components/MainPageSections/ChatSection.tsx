'use client';

import Link from 'next/link';
import { Bot, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

const PREVIEW_MESSAGES = [
  { role: 'user', text: 'このポートフォリオの構成を教えてください。' },
  {
    role: 'assistant',
    text: 'Room / Music / Model / Chat の4軸で体験を設計しています。',
  },
  { role: 'user', text: '今後の追加予定は？' },
  {
    role: 'assistant',
    text: '機能は段階的に更新中です。現在はChat bot中心に改善しています。',
  },
];

export default function ChatSection() {
  return (
    <section className="relative w-full py-28 max-md:py-12 bg-neutral-900 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,182,212,0.24),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.20),transparent_30%)]" />
      </div>

      <div className="container mx-auto px-6 max-md:px-4 grid grid-cols-1 md:grid-cols-12 gap-10 max-md:gap-6 items-center relative z-10">
        <div className="md:col-span-5 flex flex-col space-y-7 max-md:space-y-4">
          <div className="space-y-3">
            <span className="text-xs max-md:text-[11px] font-mono text-cyan-400 tracking-widest uppercase">
              04 — Chat bot
            </span>
            <h2 className="text-4xl max-md:text-2xl md:text-5xl font-light tracking-tight text-white">
              Interactive Q&A
            </h2>
            <div className="h-px w-12 bg-cyan-400" />
          </div>

          <p className="text-neutral-300 leading-relaxed max-md:leading-[1.75] font-light max-md:text-[0.95rem]">
            AI-Tuber機能は今回搭載せず、
            <strong className="text-white font-normal"> Chat bot </strong>
            として実装しています。
            <br />
            作品概要・技術スタック・更新状況を、会話形式で確認できます。
          </p>

          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-start gap-3">
              <MessageSquare size={18} className="text-cyan-300 mt-1" />
              <p className="text-sm max-md:text-[0.88rem] text-neutral-300">
                テキスト中心の軽量チャットUI
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-cyan-300 mt-1" />
              <p className="text-sm max-md:text-[0.88rem] text-neutral-300">
                スマホでも入力しやすいレイアウト
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Bot size={18} className="text-cyan-300 mt-1" />
              <p className="text-sm max-md:text-[0.88rem] text-neutral-300">
                今後の機能拡張に対応しやすい構成
              </p>
            </div>
          </div>

          <Link
            href="/chat"
            className="self-start mt-1 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-5 py-2.5 text-xs tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-300"
          >
            OPEN CHAT
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="md:col-span-7">
          <div className="w-full rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl shadow-cyan-950/20 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] tracking-[0.16em] text-cyan-200 uppercase">
                  Chat bot preview
                </span>
              </div>
              <span className="text-[11px] text-neutral-400">text-only mode</span>
            </div>

            <div className="p-4 max-md:p-3 space-y-2.5 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.25))]">
              {PREVIEW_MESSAGES.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[86%] rounded-xl px-3 py-2 text-sm max-md:text-[13px] leading-relaxed ${
                    message.role === 'assistant'
                      ? 'bg-cyan-500/15 border border-cyan-300/30 text-cyan-50 mr-auto'
                      : 'bg-white/10 border border-white/10 text-slate-100 ml-auto'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-4 py-3 max-md:px-3 max-md:py-2.5">
              <div className="h-10 max-md:h-9 rounded-full bg-white/10 border border-white/10 px-4 flex items-center text-sm max-md:text-[13px] text-neutral-400">
                メッセージを入力...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
