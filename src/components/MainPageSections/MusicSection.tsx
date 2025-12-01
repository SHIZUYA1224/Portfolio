'use client';

import React from 'react';

export default function MusicSection() {
  return (
    <section className="w-full py-24 bg-black relative overflow-hidden">
      {/* 背景動画 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50" // 修正: blur-sm と opacity-50 を追加
      >
        <source src="/musicBG.mp4" type="video/mp4" />{' '}
        {/* 修正: public/ を削除 */}
      </video>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10 relative z-10">
        {/* 左側：テキストエリア */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-white">
            Music & Audio Production
          </h2>
          <p className="leading-relaxed text-white">
            音楽制作やオーディオデザインも対応可能です。
            Web上でインタラクティブな音楽体験を提供し、
            ユーザーのエンゲージメントを高めます。
          </p>
          <div className="pt-2">
            <span className="text-sm font-semibold text-indigo-600 cursor-pointer hover:underline">
              音楽作品を見る →
            </span>
          </div>
        </div>

        {/* 右側：音楽プレイヤーエリア */}
        <div className="flex-1 w-full h-[400px] md:h-[500px] relative bg-white rounded-lg shadow-md flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-gray-600">音楽プレイヤーがここに表示されます</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              再生
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
