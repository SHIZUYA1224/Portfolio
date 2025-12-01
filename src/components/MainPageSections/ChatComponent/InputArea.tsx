import React from 'react';

interface Props {
  input: string;
  setInput: (value: string) => void;
  isSending: boolean;
  sendMessage: () => void;
}

export default function InputArea({
  input,
  setInput,
  isSending,
  sendMessage,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // 制御コンポーネント（因果: 単方向データフロー）
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // フォーム送信防止
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
          {isSending ? '送信中...' : '送信'} // 条件テキスト（UX: 状態視覚化）
        </button>
      </div>
    </div>
  );
}
