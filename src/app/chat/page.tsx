'use client';

import React from 'react';
import { InputArea, MessageList } from '@/features/chat';

export default function Chat() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [isStreaming, setIsStreaming] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isSending || isStreaming) return;

    setIsSending(true);
    const newMessages = [...messages, { role: 'user', content: input }];
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

      const { reply } = await res.json();
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
    <div className="flex flex-col h-screen bg-gray-50">
      <MessageList messages={messages} isThinking={isSending || isStreaming} />
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
