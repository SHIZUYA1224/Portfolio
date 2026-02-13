'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { InputArea, MessageList, type ChatMessage } from '@/features/chat';

const SUGGESTIONS = [
  '自己紹介を短くお願いします',
  'このポートフォリオの技術スタックは？',
  '一番こだわった実装ポイントは？',
  '今後追加予定の機能はありますか？',
];

export default function Chat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const applySuggestion = (text: string) => setInput(text);

  const sendMessage = async () => {
    const normalizedInput = input.trim();
    if (!normalizedInput || isSending || isStreaming) return;

    setIsSending(true);
    const newMessages = [...messages, { role: 'user', content: normalizedInput }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const payload = (await res.json()) as {
        reply?: string;
        error?: string;
      };
      if (!res.ok || typeof payload.reply !== 'string') {
        const errorMessage = payload.error || '送信に失敗しました';
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `エラー: ${errorMessage}` },
        ]);
        return;
      }

      const { reply } = payload;
      setIsStreaming(true);
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      // タイピング風に1文字ずつ表示
      let idx = 0;
      const interval = setInterval(() => {
        idx += 1;
        const next = reply.slice(0, idx);
        setMessages((prev) =>
          prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: next } : m
          )
        );
        if (idx >= reply.length) {
          clearInterval(interval);
          setIsStreaming(false);
        }
      }, 12); // タイピング速度
    } catch (error) {
      console.error('送信エラー:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative h-[calc(100vh-5rem)] overflow-hidden bg-[linear-gradient(155deg,#ecfeff_0%,#e2e8f0_40%,#f8fafc_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(6,182,212,0.18),transparent_34%),radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col px-3 md:px-5">
        {messages.length === 0 && (
          <section className="pt-4 md:pt-5 pb-3">
            <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl px-4 py-4 md:px-5 md:py-4 shadow-sm">
              <div className="flex items-center gap-2 text-cyan-700">
                <Sparkles size={16} />
                <p className="text-[11px] uppercase tracking-[0.2em]">
                  Conversational AI
                </p>
              </div>
              <h1 className="mt-2 text-xl md:text-2xl font-semibold text-slate-900">
                Chat (WIP)
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                このページは制作途中のため、内容は順次更新します。
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => applySuggestion(item)}
                    disabled={isSending || isStreaming}
                    className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs text-cyan-800 transition hover:bg-cyan-100 disabled:opacity-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <MessageList messages={messages} isThinking={isSending || isStreaming} />
      </div>

      <InputArea
        input={input}
        setInput={setInput}
        isSending={isSending || isStreaming}
        isStreaming={isStreaming}
        sendMessage={sendMessage}
      />
    </div>
  );
}
