'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import * as THREE from 'three';
import RoomModel from './RoomModel';
import type { RoomModelItem, RoomObjectKey } from './roomData';

type RoomSceneProps = {
  onSelect: (item: RoomModelItem) => void;
  onHoverChange?: (objectName: RoomObjectKey | null) => void;
  onModelReady?: () => void;
};

export default function RoomScene({
  onSelect,
  onHoverChange,
  onModelReady,
}: RoomSceneProps) {
  const [hoveredNodes, setHoveredNodes] = useState<THREE.Object3D[]>([]);

  return (
    <Canvas
      className="absolute inset-0"
      style={{ width: '100%', height: '100%' }}
      shadows
      camera={{ position: [0, 3, 5], fov: 80 }} // カメラの初期位置を設定
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={3}
        castShadow
        shadow-mapSize={[8192, 8192]} // 影の解像度を高く設定（ギザギザを軽減）
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-30} // 範囲を広げて影の品質を向上
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadowBias={-0.0001} // 影のバイアスを追加してギザギザを軽減
        shadow-radius={2} // 影をソフトにする（ギザギザを軽減）
        shadow-normalBias={0.02} // 法線バイアスを追加して品質向上
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <group position={[-2, 24, 0]}>
        {' '}
        {/* ここでY軸を2単位高く調整（必要に応じて値を変更） */}
        <RoomModel
          onSelect={onSelect}
          onHoverChange={onHoverChange}
          onHoverNodeChange={setHoveredNodes}
          onModelReady={onModelReady}
        />
      </group>
      <OrbitControls
        minDistance={0} // カメラの最小距離を設定
        maxDistance={10} // カメラの最大距離を設定
      />
      <EffectComposer autoClear={false}>
        <Outline
          selection={hoveredNodes}
          edgeStrength={12}
          pulseSpeed={0.45}
          visibleEdgeColor={0xffffff}
          hiddenEdgeColor={0x22d3ee}
          blur
          xRay
        />
      </EffectComposer>
    </Canvas>
  );
}
