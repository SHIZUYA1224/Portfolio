import React, { useEffect, useRef } from 'react';
import Message from './Message';

interface Props {
  messages: { role: string; content: string }[];
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
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500 text-lg">なんでも聞いてください</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 mb-20 pt-20"
    >
      {messages.map((m, i) => (
        <Message key={i} message={m} index={i} />
      ))}
      {isThinking && (
        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-gray-200 text-gray-500 mr-auto animate-pulse">
          入力中…
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
