// src/components/model-viewer/Lighting.tsx

'use client';

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.00008}
        shadow-normalBias={0.03}
        shadow-radius={2}
      />
      <directionalLight position={[-8, 6, -6]} intensity={0.35} />
      <pointLight position={[0, 9, -10]} intensity={0.45} />
    </>
  );
}
