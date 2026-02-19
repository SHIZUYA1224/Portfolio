'use client';

import { TrackList, TRACKS, usePlayer } from '@/features/music';
import PageIntroOverlay from '@/components/common/PageIntroOverlay';

export default function Music() {
  const { playTrack } = usePlayer();

  return (
    <main className="min-h-screen pb-56 md:pb-36">
      <PageIntroOverlay
        storageKey="intro:music:v1"
        title="MUSICページのご紹介"
        body="このページでは、私が作曲した楽曲を視聴できます。カードからそのまま再生できます。"
        tech="React Context + HTMLAudioElement + Next.js App Router"
      />

      <section>
        <div className="rounded-2xl border border-slate-200/90 bg-white/60 p-4 md:p-6">
          <TrackList tracks={TRACKS} onSelectTrack={playTrack} />
        </div>
      </section>
    </main>
  );
}
