'use client';

import Link from 'next/link';
import { RoomModelItem } from './roomData';

type RoomOverlayProps = {
  item: RoomModelItem;
  onClose: () => void;
};

export default function RoomOverlay({ item, onClose }: RoomOverlayProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-[94vw] md:max-w-3xl max-h-[82vh] overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white text-gray-900 shadow-2xl">
        <div className="relative p-6 md:p-10 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-700">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                {item.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-sm px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow-sm"
            >
              閉じる
            </button>
          </div>

          <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {item.modelName}
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-7 whitespace-pre-line">
              {item.summary}
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between gap-3">
            <Link
              href={item.href}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium tracking-wide text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              {item.ctaLabel}
            </Link>
            <span className="text-xs text-gray-600">各ページへ遷移できます</span>
          </div>
        </div>
      </div>
    </div>
  );
}
