import { Song } from '@/types/music';

interface PlaybackBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  progress: number;
  duration: number;
}

export default function PlaybackBar({ currentSong, isPlaying, onPlayPause, onSeek, progress, duration }: PlaybackBarProps) {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center gap-4">
      <button onClick={onPlayPause} className="text-2xl">
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={onSeek}
          className="w-full"
        />
      </div>
      <span>{currentSong.title} - {currentSong.artist}</span>
    </div>
  );
}