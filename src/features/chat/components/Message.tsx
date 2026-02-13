import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '@/features/chat/types';

interface Props {
  message: ChatMessage;
  index: number;
}

function formatAssistantContent(raw: string): string {
  return raw
    .replace(/。(?=\S)/g, '。\n')
    .replace(/！(?=\S)/g, '！\n')
    .replace(/？(?=\S)/g, '？\n')
    .replace(/、(?=\S)/g, '、 ')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export default function Message({ message, index }: Props) {
  const isUser = message.role === 'user';
  const formattedAssistantContent = isUser
    ? message.content
    : formatAssistantContent(message.content);
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
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-lg font-semibold mt-1 mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-semibold mt-1 mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-semibold mt-1 mb-2">{children}</h3>,
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="mb-2 list-disc pl-5 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="mb-2 list-decimal pl-5 space-y-1">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              code: ({ children }) => (
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em]">{children}</code>
              ),
              pre: ({ children }) => (
                <pre className="mb-2 overflow-x-auto rounded-lg bg-slate-100 p-2 text-xs">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mb-2 border-l-2 border-slate-300 pl-3 text-slate-700">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-cyan-700 hover:text-cyan-800"
                >
                  {children}
                </a>
              ),
            }}
          >
            {formattedAssistantContent}
          </ReactMarkdown>
        )}
      </div>

      {isUser && (
        <div className="grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-white/10 text-white shrink-0">
          <User size={15} />
        </div>
      )}
    </div>
  );
}
