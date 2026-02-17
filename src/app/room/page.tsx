'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoomOverlay from './RoomOverlay';
import RoomScene from './RoomScene';
import { type RoomModelItem } from './roomData';
import ThreeDLoadGate from '@/components/common/ThreeDLoadGate';
import PageIntroOverlay from '@/components/common/PageIntroOverlay';

export default function Room() {
  const router = useRouter();
  const [canLoad3D, setCanLoad3D] = useState(false);
  const [introClosed, setIntroClosed] = useState(false);
  const [selectedModel, setSelectedModel] = useState<RoomModelItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (item: RoomModelItem) => setSelectedModel(item);

  const handleClose = () => setSelectedModel(null);

  return (
    <main className="fixed inset-x-0 bottom-0 top-14 md:top-[4.25rem] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.15),transparent_30%)]" />

      <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 z-10 bg-black/50 backdrop-blur-md text-[11px] md:text-xs text-slate-200 px-3 py-2 rounded-lg border border-white/10">
        <p>左ドラッグ: 回転 / 右ドラッグ: 平行移動 / ホイール: ズーム</p>
      </div>

      {canLoad3D && (
        <RoomScene
          onSelect={handleSelect}
          onModelReady={() => setIsLoading(false)}
        />
      )}

      {selectedModel && (
        <RoomOverlay item={selectedModel} onClose={handleClose} />
      )}

      {canLoad3D && isLoading && (
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

      {!canLoad3D && (
        <ThreeDLoadGate
          title="ROOMの3Dデータを読み込みますか？"
          description="通信量が発生する場合があります。"
          onConfirm={() => setCanLoad3D(true)}
          onBack={() => router.push('/')}
        />
      )}

      {canLoad3D && !isLoading && !introClosed && (
        <PageIntroOverlay
          storageKey="intro:room:v1"
          title="ROOMページのご紹介"
          body="このページでは3Dルームを自由に操作し、オブジェクト情報を確認できます。最初に通信確認を行ってから読み込みます。"
          tech="React Three Fiber + GLBモデル + ノード選択UI"
          onDone={() => setIntroClosed(true)}
        />
      )}
    </main>
  );
}
