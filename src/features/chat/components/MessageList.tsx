import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import Message from './Message';
import type { ChatMessage } from '@/features/chat/types';

interface Props {
  messages: ChatMessage[];
  isThinking?: boolean;
}

export default function MessageList({ messages, isThinking = false }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bottomRef.current ?? containerRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-xl w-full rounded-3xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-xl px-6 py-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/20 text-cyan-700">
            <Sparkles size={22} />
          </div>
          <p className="mt-4 text-xl font-semibold text-slate-900">
            AI Tuber Chat
          </p>
          <p className="mt-2 text-sm text-slate-600">
            作品、技術スタック、制作背景など何でも質問してください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4 mb-28"
    >
      {messages.map((m, i) => (
        <Message key={i} message={m} index={i} />
      ))}
      {isThinking && (
        <div className="max-w-md px-4 py-3 rounded-2xl bg-white/85 border border-slate-200 text-slate-600 mr-auto shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.25s]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.12s]" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-bounce" />
            <span className="ml-1 text-sm">考え中...</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
