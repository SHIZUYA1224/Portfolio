'use client';

import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Disc,
} from 'lucide-react'; // アイコン用

export default function MusicSection() {
  // 再生状態管理（デモ用）
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 再生ボタンのトグル処理
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // 実際の音楽再生ロジックはここに記述（今回はUIアニメーション連動のみ）
  };

  return (
    // 1. セクション構造: 動画を背景にした没入空間
    <section className="relative w-full py-32 max-md:py-16 overflow-hidden bg-neutral-900 border-t border-white/10">
      {/* 2. 背景動画レイヤー: 視覚的なノイズとしての映像 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />{' '}
        {/* 暗くするオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 z-10" />{' '}
        {/* 左右をフェード */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105" // 少し拡大して端を見せない
        >
          {/* ※ 実際のファイルがない場合はプレースホルダーが表示されます */}
          <source src="/musicBG.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container relative z-20 mx-auto px-6 max-md:px-4 grid grid-cols-1 md:grid-cols-12 gap-12 max-md:gap-6 items-center">
        {/* 左側: テキスト情報 (Context) */}
        <div className="md:col-span-5 flex flex-col space-y-8 max-md:space-y-5">
          <div className="space-y-4">
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
              03 — Sound Production
            </span>
            <h2 className="text-4xl max-md:text-2xl md:text-5xl font-light tracking-tight text-white">
              Sonic Experience
            </h2>
            <div className="h-px w-12 bg-indigo-500" />
          </div>

          <p className="text-neutral-300 leading-relaxed max-md:leading-[1.85] font-light max-md:text-sm">
            音は、視覚以上に感情を揺さぶります。
            <br />
            Web Audio API を活用したリアルタイム生成、
            環境音のデザイン、そして没入感のある楽曲制作。
            <br />
            <span className="text-white font-normal">
              「聴こえるWebサイト」
            </span>
            が、ユーザーの滞在時間を劇的に伸ばします。
          </p>

          <button className="self-start px-6 max-md:px-4 py-3 max-md:py-2.5 border border-white/20 rounded-full text-sm max-md:text-xs text-white tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center gap-2">
            <Disc size={16} className={isPlaying ? 'animate-spin' : ''} />
            <span>DISCOGRAPHY</span>
          </button>
        </div>

        {/* 右側: プレイヤーUI (Interface) - グラスモーフィズム */}
        <div className="md:col-span-7 flex justify-center md:justify-end">
          {/* ガラスのカード */}
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl max-md:rounded-2xl p-8 max-md:p-5 shadow-2xl relative overflow-hidden group">
            {/* 背景の光沢エフェクト */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />

            {/* アルバムアート部分 */}
            <div className="relative aspect-square w-full bg-neutral-800/50 rounded-2xl mb-8 max-md:mb-5 overflow-hidden shadow-inner flex items-center justify-center">
              {/* ビジュアライザー風アニメーション */}
              <div className="flex items-end gap-1 h-1/2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 bg-indigo-500/80 rounded-t-sm transition-all duration-300 ease-in-out ${
                      isPlaying ? 'animate-music-bar' : 'h-2'
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              {/* 楽曲情報オーバーレイ */}
              <div className="absolute bottom-4 left-4 max-md:bottom-3 max-md:left-3">
                <p className="text-white text-lg max-md:text-base font-medium">
                  Cyber Punk City
                </p>
                <p className="text-neutral-400 text-xs max-md:text-[11px] uppercase tracking-wider">
                  Original Soundtrack
                </p>
              </div>
            </div>

            {/* コントロールパネル */}
            <div className="space-y-6 max-md:space-y-4">
              {/* プログレスバー */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group-hover:h-2 transition-all duration-300">
                <div className="w-1/3 h-full bg-indigo-500 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* 操作ボタン */}
              <div className="flex items-center justify-between max-md:gap-4">
                <span className="text-xs text-neutral-500 font-mono">
                  01:24
                </span>

                <div className="flex items-center gap-6 max-md:gap-4">
                  <SkipBack
                    size={18}
                    className="text-neutral-400 hover:text-white cursor-pointer transition-colors"
                  />

                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 max-md:w-12 max-md:h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    {isPlaying ? (
                      <Pause fill="black" size={22} />
                    ) : (
                      <Play fill="black pl-1" size={22} />
                    )}
                  </button>

                  <SkipForward
                    size={18}
                    className="text-neutral-400 hover:text-white cursor-pointer transition-colors"
                  />
                </div>

                <Volume2
                  size={18}
                  className="text-neutral-500 hover:text-white cursor-pointer transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
