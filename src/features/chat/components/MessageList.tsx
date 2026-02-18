import React, { useEffect, useRef } from 'react';
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
    return <div className="flex-1" />;
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4"
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
