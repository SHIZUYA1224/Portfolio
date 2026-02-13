'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import type { Track } from '@/features/music/types';

type PlayerControls = {
  seek?: (t: number) => void;
  play?: () => void;
  pause?: () => void;
  setVol?: (v: number) => void;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (t: Track) => void;
  selectTrack: (t: Track) => void;
  togglePlay: () => void;
  setIsPlaying: (v: boolean) => void;
  registerControls: (c: PlayerControls) => () => void;
  seekTo: (time: number) => void;
  playFrom: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({
  children,
  initialTrack = null,
}: {
  children: ReactNode;
  initialTrack?: Track | null;
}) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);

  const controlsRef = useRef<PlayerControls>({});

  const playTrack = (t: Track) => {
    setCurrentTrack(t);
    setIsPlaying(true);
  };

  const selectTrack = (t: Track) => {
    setCurrentTrack(t);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    let next = false;
    setIsPlaying((prev) => {
      next = !prev;
      return next;
    });
    Promise.resolve().then(() => {
      if (next) controlsRef.current.play?.();
      else controlsRef.current.pause?.();
    });
  };

  const registerControls = (c: PlayerControls) => {
    controlsRef.current = { ...controlsRef.current, ...(c ?? {}) };
    const keys = Object.keys(c ?? {});
    return () => {
      controlsRef.current = Object.fromEntries(
        Object.entries(controlsRef.current).filter(([k]) => !keys.includes(k))
      ) as PlayerControls;
    };
  };

  const seekTo = (time: number) => {
    controlsRef.current.seek?.(time);
    setIsPlaying(true);
    setTimeout(() => controlsRef.current.play?.(), 0);
  };

  const playFrom = (time: number) => {
    controlsRef.current.seek?.(time);
    setIsPlaying(true);
    setTimeout(() => controlsRef.current.play?.(), 0);
  };

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    playTrack,
    selectTrack,
    togglePlay,
    setIsPlaying,
    registerControls,
    seekTo,
    playFrom,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
