'use client';

import { useEffect, useRef, useState } from 'react';
import { Scene } from './Scene';
import type { PresetModel, ViewerSettings } from './types';

type Props = {
  model: PresetModel | null;
  onModelReady?: () => void;
};

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[11px] tracking-wide transition ${
        active
          ? 'border-cyan-300/70 bg-cyan-400/25 text-cyan-100'
          : 'border-white/20 bg-black/25 text-slate-200 hover:border-white/40'
      }`}
    >
      {label}
    </button>
  );
}

export function ModelViewerPanel({ model, onModelReady }: Props) {
  const [settings, setSettings] = useState<ViewerSettings>({
    autoRotate: true,
    showGrid: true,
    backgroundColor: '#0b1120',
  });
  const [popupModelId, setPopupModelId] = useState<string | null>(null);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    };
  }, []);

  return (
    <div className="h-full w-full relative bg-slate-950">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_90%_85%,rgba(16,185,129,0.14),transparent_30%)]" />

      <div className="hidden md:block absolute left-4 top-4 z-10 max-w-[360px] rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-slate-100 backdrop-blur-md">
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">
          Selected Model
        </p>
        <h2 className="mt-1 text-lg font-semibold leading-tight">
          {model ? model.name : 'モデルを選択してください'}
        </h2>
        {model?.description && (
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {model.description}
          </p>
        )}
        {model && (
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 uppercase tracking-wide text-slate-200">
              {model.category}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 uppercase tracking-wide text-slate-200">
              {model.type}
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-slate-200">
              {model.url}
            </span>
          </div>
        )}
      </div>

      <div className="hidden md:flex absolute right-4 top-4 z-10 items-center gap-2 rounded-2xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-md">
        <ToggleChip
          label="Auto Rotate"
          active={settings.autoRotate}
          onClick={() => setSettings((p) => ({ ...p, autoRotate: !p.autoRotate }))}
        />
        <ToggleChip
          label="Grid"
          active={settings.showGrid}
          onClick={() => setSettings((p) => ({ ...p, showGrid: !p.showGrid }))}
        />
        <label className="flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[11px] tracking-wide text-slate-200">
          <span>Background</span>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                backgroundColor: e.target.value,
              }))
            }
            className="h-5 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </label>
      </div>

      <div className="hidden md:block absolute bottom-4 left-4 z-10 rounded-xl border border-white/15 bg-black/45 px-3 py-2 text-[11px] text-slate-200 backdrop-blur-md">
        <p>Left drag: Rotate</p>
        <p>Right drag: Pan</p>
        <p>Wheel: Zoom</p>
      </div>

      <div className="md:hidden absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] text-slate-100 backdrop-blur-md max-w-[86vw] truncate">
        {model ? model.name : 'Select Model'}
      </div>

      <div className="md:hidden absolute right-3 bottom-3 z-20 flex items-center gap-2 rounded-xl border border-white/20 bg-black/55 px-2 py-2 backdrop-blur-md">
        <ToggleChip
          label="Auto"
          active={settings.autoRotate}
          onClick={() => setSettings((p) => ({ ...p, autoRotate: !p.autoRotate }))}
        />
        <ToggleChip
          label="Grid"
          active={settings.showGrid}
          onClick={() => setSettings((p) => ({ ...p, showGrid: !p.showGrid }))}
        />
      </div>

      {popupModelId === model?.id && model && (
        <div
          className="absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-400/20 px-4 py-2 text-xs text-cyan-100 shadow-lg backdrop-blur-md"
          style={{ animation: 'message-enter 260ms ease-out both' }}
        >
          {model.name} にフォーカスしました
        </div>
      )}

      <Scene
        model={model}
        settings={settings}
        onModelLoad={onModelReady}
        onCameraTransitionEnd={() => {
          if (!model) return;
          setPopupModelId(model.id);
          if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
          popupTimerRef.current = setTimeout(() => {
            setPopupModelId((current) => (current === model.id ? null : current));
            popupTimerRef.current = null;
          }, 1700);
        }}
      />
    </div>
  );
}
