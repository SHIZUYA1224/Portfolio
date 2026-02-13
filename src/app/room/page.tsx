'use client';

import { useState } from 'react';
import RoomOverlay from './RoomOverlay';
import RoomScene from './RoomScene';
import { type RoomModelItem } from './roomData';

export default function Room() {
  const [selectedModel, setSelectedModel] = useState<RoomModelItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (item: RoomModelItem) => setSelectedModel(item);

  const handleClose = () => setSelectedModel(null);

  return (
    <main className="fixed inset-x-0 bottom-0 top-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.15),transparent_30%)]" />

      <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 z-10 bg-black/50 backdrop-blur-md text-[11px] md:text-xs text-slate-200 px-3 py-2 rounded-lg border border-white/10">
        <p>左ドラッグ: 回転 / 右ドラッグ: 平行移動 / ホイール: ズーム</p>
      </div>

      <RoomScene
        onSelect={handleSelect}
        onModelReady={() => setIsLoading(false)}
      />

      {selectedModel && <RoomOverlay item={selectedModel} onClose={handleClose} />}

      {isLoading && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-slate-950/92 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-6 py-5">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-300/20 border-t-cyan-300" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-100">
                Room Loading
              </p>
              <p className="mt-1 text-xs text-slate-300">
                3Dモデルを読み込み中です...
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
