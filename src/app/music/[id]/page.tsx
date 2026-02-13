'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Title from '@/components/common/Title';
import { TRACKS, usePlayer } from '@/features/music';

export default function MusicDetail() {
  const params = useParams<{ id: string }>();
  const track = TRACKS.find((t) => t.id === params?.id);
  const {
    playFrom,
    playTrack,
    currentTrack,
    selectTrack,
    togglePlay,
    isPlaying,
  } = usePlayer();

  const [scrolledTime, setScrolledTime] = useState<number | null>(null);
  const ticking = useRef(false);
  const [notes, setNotes] = useState<string | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const isCurrent = currentTrack?.id === track?.id;

  useEffect(() => {
    if (track && !isCurrent) {
      selectTrack(track);
    }
  }, [isCurrent, selectTrack, track]);

  useEffect(() => {
    let canceled = false;
    (async () => {
      setLoadingNotes(true);
      setNotes(null);
      setNotesError(null);
      if (!track?.notesPath) {
        setLoadingNotes(false);
        return;
      }
      try {
        const res = await fetch(track.notesPath);
        if (!res.ok) throw new Error(res.statusText);
        const text = await res.text();
        if (!canceled) setNotes(text);
      } catch (err) {
        if (!canceled)
          setNotesError(
            err instanceof Error ? err.message : '読み込みに失敗しました'
          );
      } finally {
        if (!canceled) setLoadingNotes(false);
      }
    })();
    return () => {
      canceled = true;
    };
  }, [track?.notesPath]);

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
    <main className="space-y-8">
      <section className="relative w-full h-80 md:h-96 overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
        <Image
          src={track.coverUrl}
          alt={`${track.title} background`}
          fill
          sizes="100vw"
          className="object-cover blur-2xl scale-110 opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center gap-6">
          <Link
            href="/music"
            className="absolute top-4 left-4 px-3 py-2 rounded-full bg-black/50 text-white text-sm border border-white/30 hover:bg-black/70 transition"
          >
            ← 曲一覧
          </Link>
          <div className="relative w-44 h-44 bg-white/10 rounded-2xl shadow-lg overflow-hidden border border-white/20">
            <Image
              src={track.coverUrl}
              alt={track.title}
              fill
              sizes="176px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex-1 space-y-3 text-white">
            <Title text={track.title} />
            <p className="text-lg text-white/90">アーティスト: {track.artist}</p>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white">
                {track.genre}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/30 text-white border border-white/20">
                {track.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white">
                {formatTime(track.duration)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (isCurrent) {
                    togglePlay();
                  } else {
                    playTrack(track);
                  }
                }}
                className="px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-100 transition shadow"
              >
                {isPlaying ? '一時停止' : '再生'}
              </button>
              <button
                onClick={() => playFrom(0)}
                className="px-4 py-2 rounded-xl bg-black/40 text-white border border-white/30 hover:bg-black/60 transition"
              >
                先頭から再生
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-2 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">制作ノート</h2>
          {loadingNotes && (
            <p className="text-sm text-gray-500">読み込み中…</p>
          )}
          {!loadingNotes && notes && (
            <div className="prose max-w-none text-gray-800">
              <ReactMarkdown>{notes}</ReactMarkdown>
            </div>
          )}
          {!loadingNotes && !notes && !notesError && (
            <p className="text-gray-700 leading-relaxed">
              制作ノートがまだ登録されていません。Markdownを
              <code className="mx-1 rounded bg-gray-100 px-1">
                public/notes/
              </code>
              配下に置き、tracksデータにパスを追加してください。
            </p>
          )}
          {notesError && (
            <p className="text-sm text-red-600">
              制作ノートの読み込みに失敗しました: {notesError}
            </p>
          )}
          <p className="text-sm text-gray-500">
            スクロール位置シンク: {scrolledTime != null ? formatTime(scrolledTime) : '—'} /{' '}
            {formatTime(track.duration)}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow p-5 space-y-3 text-sm text-gray-800">
          <h3 className="text-base font-semibold">曲情報</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>ジャンル</span>
              <span className="font-medium">{track.genre}</span>
            </div>
            <div className="flex justify-between">
              <span>カテゴリ</span>
              <span className="font-medium">{track.category}</span>
            </div>
            <div className="flex justify-between">
              <span>長さ</span>
              <span className="font-medium">{formatTime(track.duration)}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <Link href="/music" className="text-blue-600 hover:underline text-sm">
              ← 曲一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
