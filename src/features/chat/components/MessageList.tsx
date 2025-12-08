import React from 'react';
import Message from './Message';

interface Props {
  messages: { role: string; content: string }[];
}

export default function MessageList({ messages }: Props) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-gray-500 text-lg">なんでも聞いてください</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-20 pt-20">
      {messages.map((m, i) => (
        <Message key={i} message={m} index={i} />
      ))}
    </div>
  );
}
