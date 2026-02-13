'use client';

import MusicCard from '@/features/music/components/MusicCard';
import type { Track } from '@/features/music/types';

interface TrackListProps {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

export default function TrackList({ tracks, onSelectTrack }: TrackListProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {tracks.map((track) => (
        <div key={track.id} className="w-64">
          <MusicCard track={track} onSelect={onSelectTrack} />
        </div>
      ))}
    </div>
  );
}
