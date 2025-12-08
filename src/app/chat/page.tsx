'use client';

import React from 'react';
import { InputArea, MessageList } from '@/features/chat';

export default function Chat() {
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
      const res = await fetch('/api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const { reply } = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('送信エラー:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <MessageList messages={messages} />
      <InputArea
        input={input}
        setInput={setInput}
        isSending={isSending}
        sendMessage={sendMessage}
      />
    </div>
  );
}
