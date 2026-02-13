'use client';

import Title from '@/components/common/Title';
import { TrackList, TRACKS, usePlayer } from '@/features/music';

export default function Music() {
  const { playTrack } = usePlayer();

  return (
    <main>
      <Title text="Music" />
      <div className="flex flex-col gap-4 items-start mt-8">
        <div className="p-5">
          <TrackList tracks={TRACKS} onSelectTrack={playTrack} />
        </div>
      </div>
    </main>
  );
}
