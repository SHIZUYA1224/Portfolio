'use client';

import MusicCard from '@/features/music/components/MusicCard';
import type { Track } from '@/features/music/types';

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

export default function TrackList({ tracks, onSelectTrack }: TrackListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
      {tracks.map((track) => (
        <div key={track.id} className="w-full">
          <MusicCard track={track} onSelect={onSelectTrack} />
        </div>
      ))}
    </div>
  );
}
