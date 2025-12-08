'use client'; // Next.js で Three.js を使う場合、クライアントサイドレンダリングが必要

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Title from '@/components/common/Title';

export default function Room() {
  const router = useRouter();

  const handleObjectClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.15),transparent_30%)]" />

      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-lg">
        <Title text="3D Room" />
        <p className="text-sm text-slate-200">
          クリックで各エリアへ移動できます。スクロールは無効化し、ドラッグとズームに集中できます。
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/" text="Home" />
          <Button href="/chat" text="AI-Tuber" />
          <Button href="/music" text="Music" />
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-10 bg-black/50 backdrop-blur-md text-xs text-slate-200 px-3 py-2 rounded-lg border border-white/10">
        <p>左ドラッグ: 回転 / 右ドラッグ: 平行移動 / ホイール: ズーム</p>
      </div>

      <Canvas className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} />

        <Box
          args={[1, 1, 1]}
          position={[-2, 0, 0]}
          onClick={() => handleObjectClick('/chat')}
        >
          <meshStandardMaterial color="#ef4444" />
        </Box>
        <Box
          args={[1, 1, 1]}
          position={[0, 0, 0]}
          onClick={() => handleObjectClick('/music')}
        >
          <meshStandardMaterial color="#22c55e" />
        </Box>
        <Box
          args={[1, 1, 1]}
          position={[2, 0, 0]}
          onClick={() => handleObjectClick('/model')}
        >
          <meshStandardMaterial color="#3b82f6" />
        </Box>

        <OrbitControls />
      </Canvas>
    </main>
  );
}
