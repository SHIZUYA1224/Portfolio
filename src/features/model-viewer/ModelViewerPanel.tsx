'use client';

import { useState } from 'react';
import { Scene } from './Scene';
import type { PresetModel, ViewerSettings } from './types';

type Props = {
  model: PresetModel | null;
};

export function ModelViewerPanel({ model }: Props) {
  const [settings, setSettings] = useState<ViewerSettings>({
    autoRotate: true,
    showGrid: true,
    backgroundColor: '#0b1120',
  });

  return (
    <div className="h-full w-full relative bg-slate-950">
      <div className="absolute top-4 left-4 z-10 bg-black/40 px-3 py-2 rounded-md border border-white/10 text-xs text-slate-200 space-y-1">
        <p className="font-semibold text-sm">
          {model ? model.name : 'モデルを選択してください'}
        </p>
        {model?.description && <p className="text-[11px]">{model.description}</p>}
        <p className="text-[11px] opacity-80">
          左ドラッグ: 回転 / 右ドラッグ: 平行移動 / ホイール: ズーム
        </p>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-3 bg-black/40 px-3 py-2 rounded-md border border-white/10 text-xs text-slate-200">
        <label className="flex items-center gap-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={settings.autoRotate}
            onChange={() =>
              setSettings((p) => ({ ...p, autoRotate: !p.autoRotate }))
            }
            className="w-4 h-4"
          />
          自動回転
        </label>
        <label className="flex items-center gap-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={settings.showGrid}
            onChange={() =>
              setSettings((p) => ({ ...p, showGrid: !p.showGrid }))
            }
            className="w-4 h-4"
          />
          グリッド
        </label>
        <div className="flex items-center gap-1">
          <span>背景</span>
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              setSettings((p) => ({
                ...p,
                backgroundColor: e.target.value,
              }))
            }
            className="w-8 h-6 rounded"
          />
        </div>
      </div>

      <Scene model={model} settings={settings} />
    </div>
  );
}
