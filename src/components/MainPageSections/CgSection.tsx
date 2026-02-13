'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  TorusKnot,
  MeshTransmissionMaterial,
  ContactShadows,
  Float,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * AbstractGlassObject
 * - 単純な回転ではなく「浮遊」させる
 * - 質感は不透明ではなく「光を透かすガラス」にする
 */
function AbstractGlassObject({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 複合的な回転を与えて、見る角度によって表情を変える
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    // 1. Float: 無重力のような浮遊感を与えるコンテナ
    <Float
      speed={isMobile ? 1.4 : 2} // 浮遊速度
      rotationIntensity={isMobile ? 0.9 : 1.5} // 回転のゆらぎ強度
      floatIntensity={isMobile ? 1.1 : 2} // 上下動の強度
    >
      {/* 2. TorusKnot: より複雑で有機的な形状に変更 */}
      <TorusKnot
        ref={meshRef}
        args={[1, 0.3, 128, 16]}
        scale={isMobile ? 1.08 : 1}
      >
        {/* 3. MeshTransmissionMaterial: 高度なガラス質感 */}
        <MeshTransmissionMaterial
          backside // 裏側の描画を有効化（奥行きが出る）
          samples={4} // サンプリング数（画質）
          thickness={0.5} // ガラスの厚み（屈折率に影響）
          chromaticAberration={0.05} // 色収差（光の虹色のズレ）
          anisotropy={0.1} // 異方性反射
          distortion={0.5} // 像の歪み
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1} // 玉虫色の光沢
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0.1} // ツルツルにする
          color="#a5b4fc" // 薄いインディゴ（ベース色）
        />
      </TorusKnot>
    </Float>
  );
}

export default function ThreeDFeature() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    // 4. 背景色の統一: Hero/Aboutと同じ世界観へ
    <section className="w-full h-[600px] max-md:h-auto max-md:py-10 bg-neutral-900 text-white relative overflow-hidden border-t border-white/10">
      <div className="container mx-auto h-full max-md:h-auto px-6 max-md:px-4 flex flex-col md:flex-row items-center gap-12 max-md:gap-5">
        {/* 左側：テキストエリア（AboutSectionと階層を合わせる） */}
        <div className="flex-1 space-y-8 max-md:space-y-4 z-10 order-1">
          <div className="space-y-4">
            <span className="text-xs max-md:text-[11px] font-mono text-neutral-500 tracking-widest uppercase">
              02 — Capabilities
            </span>
            <h2 className="text-4xl max-md:text-2xl md:text-5xl font-light tracking-tight text-white">
              3D Interactive
            </h2>
            <div className="h-px w-12 bg-white/30" />
          </div>

          <p className="text-neutral-400 leading-relaxed max-md:leading-[1.75] font-light max-md:text-[0.98rem]">
            Webブラウザは、もはや「平面」のメディアではありません。
            <br />
            <strong className="text-white font-normal">
              React Three Fiber
            </strong>{' '}
            を駆使し、光の屈折、重力、質感を感じさせる
            「触れられるデジタル体験」を実装します。
            <br />
            ブランドの物語を、奥行きのある空間で語り直しましょう。
          </p>

          <button className="group flex items-center gap-3 text-sm max-md:text-[11px] tracking-widest text-white hover:text-blue-400 transition-colors duration-300">
            <span className="uppercase">View Projects</span>
            <span className="block w-8 h-px bg-white group-hover:bg-blue-400 transition-colors duration-300" />
          </button>
        </div>

        {/* 右側：3D表示エリア */}
        <div className="flex-1 w-full h-full relative order-2 md:order-2 min-h-[400px] max-md:min-h-[220px] max-md:h-[230px]">
          {/* 背景装飾（スポットライト的な効果） */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] max-md:w-[220px] h-[300px] max-md:h-[220px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

          <Canvas
            camera={{
              position: isMobile ? [0, 0.02, 6.9] : [0, 0, 6],
              fov: isMobile ? 52 : 45,
            }}
            className="z-10"
          >
            {/* 環境光マップ: ガラスが反射する「景色」を作る */}
            <Environment preset="city" />

            <AbstractGlassObject isMobile={isMobile} />

            {/* 影の表現 */}
            <ContactShadows
              position={isMobile ? [0, -1.85, 0] : [0, -2.5, 0]}
              opacity={0.5}
              scale={isMobile ? 7.5 : 10}
              blur={2.5}
              far={4}
              color="#000000"
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
