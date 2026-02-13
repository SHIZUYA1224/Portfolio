import React from 'react';
import { Bot, User } from 'lucide-react';
import type { ChatMessage } from '@/features/chat/types';

interface Props {
  message: ChatMessage;
  index: number;
}

export default function Message({ message, index }: Props) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-cyan-400/20 text-cyan-100 shrink-0">
          <Bot size={16} />
        </div>
      )}

      <div
        className={`max-w-[84%] md:max-w-2xl px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm whitespace-pre-wrap break-words leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-md'
            : 'bg-white/90 text-slate-900 border border-slate-200 rounded-bl-md'
        }`}
        style={{
          animation: `message-enter 280ms ease-out both`,
          animationDelay: `${Math.min(index * 35, 180)}ms`,
        }}
      >
        {message.content}
      </div>

      {isUser && (
        <div className="grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-white/10 text-white shrink-0">
          <User size={15} />
        </div>
      )}
    </div>
  );
}
