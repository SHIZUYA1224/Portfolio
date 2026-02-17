'use client';

import { useMemo, useState } from 'react';
import { TrackList, TRACKS, usePlayer } from '@/features/music';
import PageIntroOverlay from '@/components/common/PageIntroOverlay';

export default function Music() {
  const { playTrack } = usePlayer();
  const [genreFilter, setGenreFilter] = useState<string>('All');

  const genres = useMemo(() => {
    const set = new Set(TRACKS.map((track) => track.genre).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredTracks = useMemo(() => {
    if (genreFilter === 'All') return TRACKS;
    return TRACKS.filter((track) => track.genre === genreFilter);
  }, [genreFilter]);

  return (
    <main className="min-h-screen pb-36">
      <PageIntroOverlay
        storageKey="intro:music:v1"
        title="MUSICページのご紹介"
        body="このページでは、私が作曲した楽曲を視聴できます。ジャンルで絞り込みながら、カードから再生や詳細確認ができます。"
        tech="React Context + HTMLAudioElement + Next.js App Router"
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(251,191,36,0.18),transparent_30%),linear-gradient(160deg,#f8fafc_0%,#f1f5f9_100%)] p-6 md:p-8 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {genres.map((genre) => {
              const active = genreFilter === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setGenreFilter(genre)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white/80 text-slate-700 border-slate-300 hover:border-slate-500'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="rounded-2xl border border-slate-200/90 bg-white/60 p-4 md:p-6">
          <TrackList tracks={filteredTracks} onSelectTrack={playTrack} />
        </div>
      </section>
    </main>
  );
}
