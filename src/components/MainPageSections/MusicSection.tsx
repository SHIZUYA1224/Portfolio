'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Pause,
  Volume2,
  Disc,
} from 'lucide-react'; // アイコン用

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(encodeURI('/music/目覚め.mp3'));
    audioRef.current = audio;
    audio.preload = 'metadata';

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('audio play error', error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const ratio = Number(event.target.value) / 100;
    const next = duration * ratio;
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    // 1. セクション構造: 動画を背景にした没入空間
    <section className="relative w-full py-28 max-md:py-10 overflow-hidden bg-neutral-900 border-t border-white/10">
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

      <div className="container relative z-20 mx-auto px-6 max-md:px-4 grid grid-cols-1 md:grid-cols-12 gap-12 max-md:gap-5 items-center">
        {/* 左側: テキスト情報 (Context) */}
        <div className="md:col-span-5 flex flex-col space-y-8 max-md:space-y-5">
          <div className="space-y-4">
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
              03 — Sound Production
            </span>
            <h2 className="text-4xl max-md:text-2xl md:text-5xl font-light tracking-tight text-white">
              Music Library
            </h2>
            <div className="h-px w-12 bg-indigo-500" />
          </div>

          <p className="text-neutral-300 leading-relaxed max-md:leading-[1.8] font-light max-md:text-[0.95rem]">
            オリジナル楽曲を、すぐに試聴できる形で整理。
            <br />
            ジャンルごとに雰囲気を切り替えながら、
            モバイルでも快適に再生できます。
            <br />
            <span className="text-white font-normal">
              「聴けるポートフォリオ」
            </span>
            として設計しています。
          </p>

          <Link
            href="/music"
            className="self-start px-6 max-md:px-4 py-3 max-md:py-2.5 border border-white/20 rounded-full text-sm max-md:text-xs text-white tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center gap-2"
          >
            <Disc size={16} className={isPlaying ? 'animate-spin' : ''} />
            <span>DISCOGRAPHY</span>
          </Link>
        </div>

        {/* 右側: プレイヤーUI (Interface) - グラスモーフィズム */}
        <div className="md:col-span-7 flex justify-center md:justify-end">
          {/* ガラスのカード */}
          <div className="w-full max-w-[360px] md:max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl max-md:rounded-2xl p-8 max-md:p-3.5 shadow-xl relative overflow-hidden group">
            {/* 背景の光沢エフェクト */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />

            {/* アルバムアート部分 */}
            <div className="relative aspect-[1/0.92] md:aspect-square w-full bg-neutral-800/50 rounded-2xl mb-8 max-md:mb-3 overflow-hidden shadow-inner flex items-center justify-center">
              <Image
                src="/covers/artwork.jpg"
                alt="Art Work cover"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className={`object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105' : 'scale-100'
                }`}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              <div className="absolute top-3 right-3 flex items-end gap-1 h-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-t-sm bg-cyan-300/85 transition-all duration-300 ${
                      isPlaying ? 'animate-music-bar' : 'h-1.5'
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              {/* 楽曲情報オーバーレイ */}
              <div className="absolute bottom-4 left-4 max-md:bottom-3 max-md:left-3">
                <p className="text-white text-lg max-md:text-base font-medium">
                  目覚め
                </p>
                <p className="text-neutral-400 text-xs max-md:text-[11px] uppercase tracking-wider">
                  Original Soundtrack
                </p>
              </div>
            </div>

            {/* コントロールパネル */}
            <div className="space-y-6 max-md:space-y-3">
              {/* プログレスバー */}
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progressPercent}
                onChange={handleSeek}
                className="w-full accent-indigo-500 cursor-pointer"
                aria-label="Seek"
              />

              {/* 操作ボタン */}
              <div className="flex items-center justify-between max-md:gap-4">
                <span className="text-xs text-neutral-500 font-mono">
                  {formatTime(currentTime)}
                </span>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 max-md:w-11 max-md:h-11 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
                >
                  {isPlaying ? (
                    <Pause fill="black" size={20} />
                  ) : (
                    <Play fill="black" className="pl-1" size={20} />
                  )}
                </button>

                <Volume2
                  size={18}
                  onClick={toggleMute}
                  className={`cursor-pointer transition-colors ${
                    isMuted ? 'text-indigo-300' : 'text-neutral-500 hover:text-white'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
