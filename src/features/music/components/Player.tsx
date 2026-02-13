'use client';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import useAudioPlayer from '@/features/music/hooks/useAudioPlayer';
import type { Track } from '@/features/music/types';
import { usePlayer } from '@/features/music/context/PlayerContext';

const PREV_RESTART_THRESHOLD_SECONDS = 3;

type PlayerProps = {
  track: Track | null;
  playlist: Track[];
  onSelectTrack: (t: Track) => void;
};

export default function Player({ track, playlist, onSelectTrack }: PlayerProps) {
  const {
    audioRef,
    progress,
    volume,
    duration,
    seek,
    setVol,
    play,
    pause,
    isPlaying,
  } = useAudioPlayer(track);

  const {
    isPlaying: ctxIsPlaying,
    setIsPlaying: setCtxIsPlaying,
    registerControls,
  } = usePlayer();

  const currentIndex = track ? playlist.findIndex((t) => t.id === track.id) : -1;
  const effectiveIndex = currentIndex >= 0 ? currentIndex : 0;

  const nextTrack = useCallback(() => {
    if (!playlist.length) return;
    const next = playlist[(effectiveIndex + 1) % playlist.length];
    onSelectTrack(next);
  }, [effectiveIndex, onSelectTrack, playlist]);

  const prevTrack = useCallback(() => {
    if (!playlist.length) return;

    // Common player behavior:
    // - If we are already into the song, jump to its start.
    // - If near the start, move to the previous track.
    if (progress > PREV_RESTART_THRESHOLD_SECONDS) {
      seek(0);
      return;
    }

    const prev =
      playlist[(effectiveIndex - 1 + playlist.length) % playlist.length];
    onSelectTrack(prev);
  }, [effectiveIndex, onSelectTrack, playlist, progress, seek]);

  useEffect(() => {
    if (ctxIsPlaying === isPlaying) return;
    if (ctxIsPlaying) void play();
    else pause();
  }, [ctxIsPlaying, isPlaying, play, pause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setCtxIsPlaying(true);
    const handlePause = () => setCtxIsPlaying(false);
    const handleEnded = () => {
      setCtxIsPlaying(false);
      if (playlist.length > 1) nextTrack();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, nextTrack, playlist.length, setCtxIsPlaying]);

  useEffect(() => {
    const dereg = registerControls({ seek, play, pause, setVol });
    return () => dereg();
  }, [registerControls, seek, play, pause, setVol]);

  // トラックが変わったとき、現在の再生状態に合わせて同期
  useEffect(() => {
    if (!track) return;
    if (ctxIsPlaying) void play();
    else pause();
  }, [track, ctxIsPlaying, play, pause]);

  if (!track || playlist.length === 0) return null;

  const coverSrc =
    track.coverUrl ||
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="%234B5563"><rect width="40" height="40" rx="4" ry="4"/><text x="9" y="24" font-size="14" fill="%23CBD5E1">♫</text></svg>';

  const formatTime = (time: number) => {
    if (!isFinite(time) || time < 0) return '0:00';
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-gray-300 p-3 z-50 border-t border-gray-600">
      <audio ref={audioRef} />

      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center w-1/4 min-w-[150px] pr-2">
          <Image
            src={coverSrc}
            alt={`${track.title} cover`}
            width={40}
            height={40}
            className="rounded-md object-cover mr-2 flex-shrink-0"
          />
          <div className="truncate">
            <h3 className="text-sm font-medium truncate text-gray-200">
              {track.title}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {track.artist || 'Unknown Artist'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3 w-1/2">
          <button onClick={prevTrack} aria-label="Previous Track">
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCtxIsPlaying(!ctxIsPlaying)}
            aria-label={ctxIsPlaying ? 'Pause' : 'Play'}
          >
            {ctxIsPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>

          <button onClick={nextTrack} aria-label="Next Track">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden md:flex items-center justify-end w-1/4 space-x-4">
          <div className="flex items-center w-full max-w-sm">
            <span className="text-xs mr-1 min-w-[30px] text-right font-mono">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={Math.max(duration || track.duration || 0, 0)}
              value={Math.min(
                progress,
                Math.max(duration || track.duration || 0)
              )}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-xs ml-1 min-w-[30px] text-left font-mono">
              {formatTime(duration || track.duration || 0)}
            </span>
          </div>

          <div className="flex items-center min-w-[100px]">
            <Volume2 className="w-4 h-4 mr-1 text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVol(Number(e.target.value))}
              className="w-full h-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
