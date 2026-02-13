import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface Props {
  input: string;
  setInput: (value: string) => void;
  isSending: boolean;
  isStreaming: boolean;
  sendMessage: () => void;
}

export default function InputArea({
  input,
  setInput,
  isSending,
  isStreaming,
  sendMessage,
}: Props) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const isBusy = isSending || isStreaming;

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/30 bg-white/75 backdrop-blur-xl px-4 py-3">
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-3 items-end rounded-2xl border border-slate-200 bg-white shadow-sm p-2">
          <textarea
            ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力（Enterで送信 / Shift+Enterで改行）"
            disabled={isBusy}
            rows={1}
            className="flex-1 resize-none bg-transparent px-3 py-2 text-base md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={isBusy || !input.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendHorizontal size={16} />
            {isBusy ? '送信中' : '送信'}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-500">
          <p>ポートフォリオ情報に基づいて回答します</p>
          <p>{input.length}/2000</p>
        </div>
      </div>
    </div>
  );
}
