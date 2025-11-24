'use client';

import { NextRequest, NextResponse } from 'next/server';

import Title from '@/components/common/Title';
import Button from '../../components/common/Button';
import React from 'react';

export default function AiTuber() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    setIsSending(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const { replay, audio } = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: replay }]);

      // 音声再生（VOICEVOX）
      if (audio) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
      }
    } catch (error) {
      console.error('送信エラー:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* メッセージ表示エリア（スクロール可能） */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-20">
        {messages.map((m, i) => (
          <div
            key={i} // 本当はユニークIDが欲しいけどサンプルなのでindexで許してね
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
              m.role === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 text-gray-900 mr-auto'
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      {/* 入力エリア（画面下部に固定） */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="メッセージを入力..."
            disabled={isSending}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={isSending}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSending ? '送信中...' : '送信'}
          </button>
        </div>
      </div>
    </div>
  );
}
