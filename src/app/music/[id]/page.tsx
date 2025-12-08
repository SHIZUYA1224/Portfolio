'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Title from '@/components/common/Title';
import { TRACKS, usePlayer } from '@/features/music';

export default function MusicDetail() {
  const params = useParams<{ id: string }>();
  const track = TRACKS.find((t) => t.id === params?.id);
  const { playFrom } = usePlayer();

  const [scrolledTime, setScrolledTime] = useState<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    if (!track) return;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio =
          maxScroll > 0 ? Math.min(1, Math.max(0, scrolled / maxScroll)) : 0;
        const targetTime = (track.duration || 0) * ratio;

        playFrom(targetTime);

        setScrolledTime(targetTime);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [track, playFrom]);

  if (!track)
    return (
      <main>
        <Title text="Not Found" />
      </main>
    );

  const formatTime = (t: number) => {
    if (!isFinite(t) || t < 0) return '0:00';
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main>
      <Title text={track.title} />
      <p className="p-4">Artist: {track.artist}</p>
      <p className="p-4">…ここに制作ノートや作り方を記載…</p>

      <div className="p-4 text-sm text-gray-500">
        Scroll Time: {scrolledTime != null ? formatTime(scrolledTime) : '—'} /{' '}
        {formatTime(track.duration || 0)}
      </div>

      <Link href="/music" className="text-blue-500">
        ← 曲一覧に戻る
      </Link>
    </main>
  );
}
