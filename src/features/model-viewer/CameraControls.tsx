// src/components/model-viewer/CameraControls.tsx

'use client';

import type { RefObject } from 'react';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraControlsProps {
  autoRotate?: boolean;
  target?: [number, number, number];
  controlsRef?: RefObject<OrbitControlsImpl | null>;
}

export function CameraControls({
  autoRotate = false,
  target = [0, 1.05, 0],
  controlsRef,
}: CameraControlsProps) {
  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={autoRotate}
      autoRotateSpeed={1.6}
      enablePan={false}
      enableZoom
      enableRotate
      target={target}
      minDistance={2.1}
      maxDistance={100}
      zoomSpeed={0.8}
      rotateSpeed={0.5}
    />
  );
}
