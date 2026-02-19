'use client';

import Image from 'next/image';
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
        <div className="relative p-6 md:p-10 space-y-5 overflow-y-auto max-h-[82vh]">
          <div className="flex items-center justify-between gap-3">
            <div />
            <button
              onClick={onClose}
              className="text-sm px-3 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow-sm"
            >
              閉じる
            </button>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            {item.modelName}
          </h3>

          {item.imageUrl && (
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-2">
              <Image
                src={item.imageUrl}
                alt={`${item.modelName} preview`}
                width={1280}
                height={720}
                sizes="(max-width: 768px) 92vw, 900px"
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          <div className="space-y-3 text-gray-700">
            <p className="text-sm md:text-base leading-relaxed">{item.intro}</p>
            <p className="text-sm md:text-base leading-relaxed">{item.process}</p>
          </div>

          <div className="pt-1">
            <Link
              href={item.href}
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium tracking-wide text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              {item.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
