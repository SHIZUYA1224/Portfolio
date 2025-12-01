'use client';

import InputArea from '@/components/MainPageSections/ChatComponent/InputArea';
import MessageList from '@/components/MainPageSections/ChatComponent/MessageList';
import { NextRequest, NextResponse } from 'next/server'; // 未使用だが、Next.jsの型安全性のため残す（後で削除可）
import React from 'react';

export default function Chat() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return; // 空入力/送信中をガード（因果: 無駄リクエスト防止）

    setIsSending(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput(''); // 即時クリア（UX向上: 視覚的フィードバック）

    try {
      const res = await fetch('api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }), // 履歴全体送信（因果: AIのコンテキスト維持）
      });

      const { reply } = await res.json(); // 'replay' を 'reply' のタイポ修正推奨
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('送信エラー:', error); // ログ出力（デバッグ用）
    } finally {
      setIsSending(false); // 常にリセット（因果: 状態同期）
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <MessageList messages={messages} /> {/* propsで状態注入 */}
      <InputArea
        input={input}
        setInput={setInput}
        isSending={isSending}
        sendMessage={sendMessage}
      />{' '}
      {/* コールバックpropsで動作制御 */}
    </div>
  );
}
