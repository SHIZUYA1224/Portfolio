'use client';

import { Canvas, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
import { useMemo, useState } from 'react';
import Button from '@/components/common/Button';
import Title from '@/components/common/Title';
import * as THREE from 'three';

type FocusKey = 'A' | 'B' | 'C';

const INFO: Record<FocusKey, { title: string; body: string }> = {
  A: {
    title: 'A について',
    body: 'ここに自己紹介やセクションAの説明を記載してください。',
  },
  B: {
    title: 'B について',
    body: 'ここに自己紹介やセクションBの説明を記載してください。',
  },
  C: {
    title: 'C について',
    body: 'ここに自己紹介やセクションCの説明を記載してください。',
  },
};

const ACCENT: Record<FocusKey, string> = {
  A: 'from-blue-500/40 via-indigo-500/30 to-purple-500/30',
  B: 'from-emerald-400/40 via-teal-400/30 to-cyan-400/30',
  C: 'from-amber-400/40 via-orange-400/30 to-pink-400/30',
};

function RoomModel({ onSelect }: { onSelect: (key: FocusKey) => void }) {
  const { scene } = useGLTF('/room/ROOM.glb');

  const root = useMemo(() => {
    const cloneWithShadows = (obj: THREE.Object3D | null) => {
      if (!obj) return null;
      const cloned = obj.clone(true);
      cloned.traverse((n) => {
        if ((n as THREE.Mesh).isMesh) {
          n.castShadow = true;
          n.receiveShadow = true;
        }
      });
      return cloned;
    };
    return cloneWithShadows(scene);
  }, [scene]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    let target: THREE.Object3D | null = e.object;
    while (target) {
      if (target.name === 'A' || target.name === 'B' || target.name === 'C') {
        onSelect(target.name as FocusKey);
        break;
      }
      target = target.parent;
    }
  };

  return (
    <Center>{root && <primitive object={root} onClick={handleClick} />}</Center>
  );
}

useGLTF.preload('/room/ROOM.glb');

export default function Room() {
  const [focus, setFocus] = useState<FocusKey | null>(null);

  return (
    <main className="fixed inset-0 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.15),transparent_30%)]" />

      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-lg">
        <Title text="3D Room" />
        <p className="text-sm text-slate-200">
          GLBモデルを直接表示しています。ドラッグ/ズームで操作してください。
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/" text="Home" />
          <Button href="/chat" text="AI-Tuber" />
          <Button href="/music" text="Music" />
          <Button href="/model" text="Model" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-10 bg-black/50 backdrop-blur-md text-xs text-slate-200 px-3 py-2 rounded-lg border border-white/10">
        <p>左ドラッグ: 回転 / 右ドラッグ: 平行移動 / ホイール: ズーム</p>
      </div>

      <Canvas className="absolute inset-0" style={{ width: '100%', height: '100%' }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <RoomModel onSelect={(key) => setFocus(key)} />
        <OrbitControls />
      </Canvas>

      {focus && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative max-w-md w-full overflow-hidden rounded-2xl border border-white/20 bg-white/90 text-gray-900 shadow-2xl">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${ACCENT[focus]} opacity-80 pointer-events-none`}
            />
            <div className="relative p-6 space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-700">
                  <span className="px-2 py-1 rounded-full bg-black/5 border border-black/10">
                    {focus}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-black/5 border border-black/10">
                    Profile
                  </span>
                </div>
                <button
                  onClick={() => setFocus(null)}
                  className="text-sm px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-black/10 shadow-sm"
                >
                  閉じる
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{INFO[focus].title}</h3>
              <p className="text-gray-700 leading-relaxed">{INFO[focus].body}</p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>クリックされたノード: {focus}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
