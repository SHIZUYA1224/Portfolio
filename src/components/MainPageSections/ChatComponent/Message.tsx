import React from 'react';

interface Props {
  message: {
    role: string;
    content: string;
  };
  index: number; // key用に親から
}

export default function Message({ message }: Props) {
  return (
    <div
      // 親のmapで使用
      className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
        message.role === 'user'
          ? 'bg-blue-500 text-white ml-auto'
          : 'bg-gray-200 text-gray-900 mr-auto'
      }`}
    >
      {message.content}
    </div>
  );
}
