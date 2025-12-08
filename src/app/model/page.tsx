'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  PRESET_MODELS,
  type PresetModel,
} from '@/features/model-viewer/data/models';
import { ModelViewerPanel } from '@/features/model-viewer/ModelViewerPanel';

export default function ModelPage() {
  const [selected, setSelected] = useState<PresetModel | null>(
    PRESET_MODELS[0] ?? null
  );

  const characters = useMemo(
    () => PRESET_MODELS.filter((m) => m.category === 'character'),
    []
  );
  const objects = useMemo(
    () => PRESET_MODELS.filter((m) => m.category === 'object'),
    []
  );

  const renderCard = (model: PresetModel) => (
    <button
      key={model.id}
      onClick={() => setSelected(model)}
      className={`group relative flex w-full items-center gap-3 rounded-xl border bg-white/5 p-3 text-left shadow-sm transition hover:border-white/30 ${
        selected?.id === model.id
          ? 'border-blue-400/60 bg-blue-950/30'
          : 'border-white/10'
      }`}
    >
      <div className="relative h-16 w-24 overflow-hidden rounded-lg bg-slate-800">
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
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-300">
            {model.category}
          </span>
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-slate-200">
            {model.type}
          </span>
        </div>
        <p className="truncate text-sm font-semibold text-white">{model.name}</p>
        {model.description && (
          <p className="truncate text-xs text-slate-300">{model.description}</p>
        )}
      </div>
    </button>
  );

  return (
    <main className="fixed inset-0 overflow-hidden bg-slate-950 text-white">
      <div className="flex h-full">
        {/* 左: リスト */}
        <aside className="w-[340px] min-w-[300px] max-w-[360px] h-full overflow-y-auto border-r border-white/10 bg-black/40 backdrop-blur-lg p-4 space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">Model Library</h1>
            <p className="text-xs text-slate-300">
              サムネをクリックすると右で即プレビュー。
            </p>
          </div>

          {characters.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-wide text-slate-400">
                Characters
              </h2>
              <div className="space-y-2">{characters.map(renderCard)}</div>
            </div>
          )}

          {objects.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-wide text-slate-400">
                Objects
              </h2>
              <div className="space-y-2">{objects.map(renderCard)}</div>
            </div>
          )}
        </aside>

        {/* 右: ビューア */}
        <section className="flex-1 h-full relative">
          <ModelViewerPanel model={selected} />
        </section>
      </div>
    </main>
  );
}
