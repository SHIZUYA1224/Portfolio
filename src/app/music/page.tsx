'use client'; // ← この行を一番上に追加してください

import Title from '@/components/common/Title';
import Button from '@/components/common/Button';
import MusicCard from '@/components/Music/MusicCard';
import { dummySongs } from '@/types/music';

export default function Music() {
  // サンプルデータ
  const sampleSongs = dummySongs

  return (
    <main>
      <Title text="Music" />
      <div className="flex flex-col gap-4 items-start mt-8">
        <Button href="/" text="Back to Home" />
        <Button href="/ai-tuber" text="AI-Tuber" />
        <Button href="/room" text="3D Room" />

        {/* サンプルカードを表示 */}
        {sampleSongs.map((song, index) => (
          <MusicCard 
            key={index}
            songTitle={song.title}
            artistName={song.artist}
            artworkUrl={song.artwork}
            audioUrl={song.audio}
            onSelect={() => console.log(`${song.title} selected`)}
          />
        ))}
      </div>
    </main>
  );
}