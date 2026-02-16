'use client';

import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type BaseTransform = {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  scale: THREE.Vector3;
};

const gltfBaseTransformMap = new WeakMap<THREE.Object3D, BaseTransform>();

interface GltfModelProps {
  url: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function GltfModel({ url, onLoad, onError }: GltfModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(url, true, true, (loader) => {
    loader.manager.onError = (failedUrl) => {
      onError?.(new Error(`Failed to load: ${failedUrl}`));
    };
  });

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!scene) return;

    let baseTransform = gltfBaseTransformMap.get(scene);
    if (!baseTransform) {
      baseTransform = {
        position: scene.position.clone(),
        quaternion: scene.quaternion.clone(),
        scale: scene.scale.clone(),
      };
      gltfBaseTransformMap.set(scene, baseTransform);
    }
    scene.position.copy(baseTransform.position);
    scene.quaternion.copy(baseTransform.quaternion);
    scene.scale.copy(baseTransform.scale);

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;
    const floorY = -box.min.y * scale;

    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, floorY, -center.z * scale);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    if (animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      mixerRef.current = mixer;
    }

    onLoad?.();

    return () => {
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [scene, animations, onLoad]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload = () => {};
