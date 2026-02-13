'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  MODEL_LIBRARY,
  MODEL_PAGE_CONFIG,
  getModelsByCategory,
} from '@/features/model-viewer/config/modelLibrary';
import type { PresetModel } from '@/features/model-viewer/types';
import { ModelViewerPanel } from '@/features/model-viewer/ModelViewerPanel';

export default function ModelPage() {
  const [selected, setSelected] = useState<PresetModel | null>(
    MODEL_LIBRARY[0] ?? null
  );

  const characters = useMemo(() => getModelsByCategory('character'), []);
  const objects = useMemo(() => getModelsByCategory('object'), []);

  const renderCard = (model: PresetModel) => (
    <button
      key={model.id}
      onClick={() => setSelected(model)}
      className={`group relative flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
        selected?.id === model.id
          ? 'border-cyan-300/70 bg-cyan-400/15'
          : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
      }`}
    >
      <div className="relative h-16 w-24 overflow-hidden rounded-xl bg-slate-800">
        <Image
          src={
            model.thumbnail ||
            'https://placehold.co/240x160/0f172a/94a3b8?text=3D+Model'
          }
          alt={model.name}
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
          <span className="text-slate-300">
            {model.category}
          </span>
          <span className="rounded-full border border-white/15 bg-black/20 px-2 py-1 text-slate-200">
            {model.type}
          </span>
        </div>
        <p className="truncate text-sm font-semibold text-white mt-1">
          {model.name}
        </p>
        {model.description && (
          <p className="truncate text-xs text-slate-300 mt-1">
            {model.description}
          </p>
        )}
      </div>
      <div
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${
          selected?.id === model.id ? 'bg-cyan-300' : 'bg-slate-500/60'
        }`}
      />
    </button>
  );

  return (
    <main className="fixed inset-x-0 bottom-0 top-20 overflow-hidden bg-[linear-gradient(145deg,#020617_0%,#0b1120_55%,#0f172a_100%)] text-white">
      <div className="grid h-full grid-cols-1 xl:grid-cols-[360px_1fr]">
        <aside className="relative h-full overflow-y-auto border-r border-white/10 bg-black/35 backdrop-blur-xl p-4 md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.10),transparent_34%)]" />
          <div className="relative space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-200/80">
                3D Collection
              </p>
              <h1 className="text-2xl font-semibold leading-tight">
                {MODEL_PAGE_CONFIG.title}
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                {MODEL_PAGE_CONFIG.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Characters
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {characters.length}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Objects
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {objects.length}
                </p>
              </div>
            </div>
          </div>

          {characters.length > 0 && (
            <div className="relative mt-6 space-y-3">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                {MODEL_PAGE_CONFIG.categoryLabel.character}
              </h2>
              <div className="space-y-2">{characters.map(renderCard)}</div>
            </div>
          )}

          {objects.length > 0 && (
            <div className="relative mt-6 space-y-3">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                {MODEL_PAGE_CONFIG.categoryLabel.object}
              </h2>
              <div className="space-y-2">{objects.map(renderCard)}</div>
            </div>
          )}
        </aside>

        <section className="relative h-full">
          <ModelViewerPanel model={selected} />
        </section>
      </div>
    </main>
  );
}
