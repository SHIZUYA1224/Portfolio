'use client';

import type { ReactNode } from 'react';
import { Player, PlayerProvider, TRACKS, usePlayer } from '@/features/music';

function MusicPlayerWrapper() {
  const { currentTrack, playTrack } = usePlayer();
  return (
    <Player track={currentTrack} playlist={TRACKS} onSelectTrack={playTrack} />
  );
}

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider initialTrack={TRACKS[0] ?? null}>
      <>
        {children}
        <MusicPlayerWrapper />
      </>
    </PlayerProvider>
  );
}
