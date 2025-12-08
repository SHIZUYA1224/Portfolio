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

  return (
    <div
      className="group relative w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-zinc-100 dark:border-zinc-800"
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
          sizes="256px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

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
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white/90 animate-pulse" />
            <span className="leading-none">Now</span>
          </div>
        )}
      </div>

      <div className="p-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="text-lg font-bold text-gray-900 dark:text-white truncate"
            title={track.title}
          >
            {track.title}
          </h3>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1"
            title={track.artist ?? 'Unknown Artist'}
          >
            {track.artist ?? 'Unknown Artist'}
          </p>
        </div>

        <Link
          href={`/music/${track.id}`}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
          }}
          aria-label={`詳細: ${track.title}`}
          className="ml-2 p-2 bg-white/90 dark:bg-zinc-900/80 rounded-full shadow hover:bg-white dark:hover:bg-zinc-800 transition flex items-center justify-center h-8 w-8"
        >
          <Info size={14} />
        </Link>
      </div>
    </div>
  );
}
