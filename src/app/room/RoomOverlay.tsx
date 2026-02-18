'use client';

import { CATEGORY_ACCENT, RoomModelItem } from './roomData';

type RoomOverlayProps = {
  item: RoomModelItem;
  onClose: () => void;
};

export default function RoomOverlay({ item, onClose }: RoomOverlayProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative max-w-md w-full overflow-hidden rounded-2xl border border-white/20 bg-white/90 text-gray-900 shadow-2xl">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_ACCENT[item.category]} opacity-80 pointer-events-none`}
        />
        <div className="relative p-6 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-700">
              <span className="px-2 py-1 rounded-full bg-black/5 border border-black/10">
                {item.category}
              </span>
              <span className="px-2 py-1 rounded-full bg-black/5 border border-black/10">
                {item.objectName}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-sm px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-black/10 shadow-sm"
            >
              閉じる
            </button>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{item.modelName}</h3>
          <p className="text-gray-700 leading-relaxed">
            public内パス: <code>{item.publicPath}</code>
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>モデル情報を表示中</span>
          </div>
        </div>
      </div>
    </div>
  );
}
