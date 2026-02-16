'use client';

import { Suspense, useEffect, useRef, type RefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Grid } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Lighting } from './Lighting';
import { CameraControls } from './CameraControls';
import { GltfModel } from './GltfModel';
import { VrmModel } from './VrmModel';
import type { PresetModel, ViewerSettings } from '@/features/model-viewer/types';

interface SceneProps {
  model: PresetModel | null;
  settings: ViewerSettings;
  onModelLoad?: () => void;
  onModelError?: (error: Error) => void;
  onCameraTransitionEnd?: () => void;
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}

const DEFAULT_CAMERA_PRESET = {
  position: [0, 1.9, 4.3] as [number, number, number],
  target: [0, 1.05, 0] as [number, number, number],
};

type CameraTransition = {
  startTime: number;
  durationMs: number;
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
};

function CameraAnimator({
  model,
  controlsRef,
  onComplete,
}: {
  model: PresetModel | null;
  controlsRef: RefObject<OrbitControlsImpl | null>;
  onComplete?: () => void;
}) {
  const { camera } = useThree();
  const transitionRef = useRef<CameraTransition | null>(null);
  const workTargetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!model) return;
    const controls = controlsRef.current;
    if (!controls) return;

    const preset = model.cameraPreset ?? DEFAULT_CAMERA_PRESET;
    transitionRef.current = {
      startTime: performance.now(),
      durationMs: 700,
      fromPosition: camera.position.clone(),
      toPosition: new THREE.Vector3(...preset.position),
      fromTarget: controls.target.clone(),
      toTarget: new THREE.Vector3(...preset.target),
    };
  }, [camera, controlsRef, model]);

  useFrame(() => {
    const current = transitionRef.current;
    const controls = controlsRef.current;
    if (!current || !controls) return;

    const elapsed = performance.now() - current.startTime;
    const progress = Math.min(1, elapsed / current.durationMs);
    const eased = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(current.fromPosition, current.toPosition, eased);
    workTargetRef.current.lerpVectors(
      current.fromTarget,
      current.toTarget,
      eased
    );
    controls.target.copy(workTargetRef.current);
    controls.update();

    if (progress >= 1) {
      transitionRef.current = null;
      onComplete?.();
    }
  });

  return null;
}

export function Scene({
  model,
  settings,
  onModelLoad,
  onModelError,
  onCameraTransitionEnd,
}: SceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const initialPreset = model?.cameraPreset ?? DEFAULT_CAMERA_PRESET;
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, powerPreference: isMobile ? 'default' : 'high-performance' }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = !isMobile;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      camera={{ position: initialPreset.position, fov: isMobile ? 50 : 46 }}
      style={{ background: settings.backgroundColor }}
    >
      <Lighting />
      <Environment preset="studio" />

      {settings.showGrid && (
        <Grid
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#6e6e6e"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#9d4b4b"
          fadeDistance={25}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />
      )}

      <Suspense fallback={<Loader />}>
        <group key={model?.id ?? 'no-model'}>
          {model?.type === 'gltf' && (
            <GltfModel url={model.url} onLoad={onModelLoad} onError={onModelError} />
          )}
          {model?.type === 'vrm' && (
            <VrmModel url={model.url} onLoad={onModelLoad} onError={onModelError} />
          )}
        </group>
      </Suspense>

      <CameraControls
        autoRotate={settings.autoRotate}
        target={initialPreset.target}
        controlsRef={controlsRef}
      />
      <CameraAnimator
        model={model}
        controlsRef={controlsRef}
        onComplete={onCameraTransitionEnd}
      />
    </Canvas>
  );
}
