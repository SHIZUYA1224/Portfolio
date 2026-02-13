'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Pause, Info } from 'lucide-react';
import { usePlayer } from '@/features/music/context/PlayerContext';
import type { Track } from '@/features/music/types';

interface MusicCardProps {
  track: Track;
  onSelect?: (track: Track) => void;
}

export default function MusicCard({ track, onSelect }: MusicCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const isCurrent = currentTrack?.id === track.id;
  const isCardPlaying = isCurrent && isPlaying;

  const triggerPlay = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track);
      onSelect?.(track);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerPlay();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      triggerPlay();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`group relative w-full rounded-2xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border bg-white/90 shadow-sm hover:shadow-xl ${
        isCardPlaying
          ? 'border-cyan-400/70 ring-2 ring-cyan-300/40'
          : 'border-zinc-200/80'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={track.coverUrl}
          alt={track.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isCardPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <button
            aria-pressed={isCardPlaying}
            aria-label={
              isCardPlaying ? `Pause ${track.title}` : `Play ${track.title}`
            }
            onClick={(e) => {
              e.stopPropagation();
              triggerPlay();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                triggerPlay();
              }
            }}
            className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30 shadow-lg transform transition-transform group-hover:scale-110 active:scale-95"
          >
            {isCardPlaying ? (
              <Pause fill="white" size={24} />
            ) : (
              <Play className="text-white" size={24} />
            )}
          </button>
        </div>

        {isCardPlaying && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse" />
            <span className="leading-none">Now</span>
          </div>
        )}

        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <span className="rounded-full bg-black/50 backdrop-blur px-2 py-1 text-[11px] text-white border border-white/20">
            {track.genre}
          </span>
          <span className="rounded-full bg-black/50 backdrop-blur px-2 py-1 text-[11px] text-white border border-white/20">
            {formatTime(track.duration)}
          </span>
        </div>
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="text-lg font-semibold text-gray-900 truncate"
            title={track.title}
          >
            {track.title}
          </h3>
          <p
            className="text-sm text-gray-500 truncate mt-1"
            title={track.artist ?? 'Unknown Artist'}
          >
            {track.artist ?? 'Unknown Artist'}
          </p>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide">
            {track.category}
          </p>
        </div>

        <Link
          href={`/music/${track.id}`}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
          }}
          aria-label={`詳細: ${track.title}`}
          className="ml-2 p-2 bg-white rounded-full shadow hover:bg-cyan-50 transition flex items-center justify-center h-8 w-8 border border-zinc-200"
        >
          <Info size={14} className="text-slate-700" />
        </Link>
      </div>
    </div>
  );
}
