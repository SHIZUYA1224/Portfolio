'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm';
import * as THREE from 'three';

type BaseTransform = {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  scale: THREE.Vector3;
};

const vrmBaseTransformMap = new WeakMap<THREE.Object3D, BaseTransform>();

interface VrmModelProps {
  url: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export function VrmModel({ url, onLoad, onError }: VrmModelProps) {
  const [vrm, setVrm] = useState<VRM | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser));
  });

  useEffect(() => {
    const loadVrm = async () => {
      try {
        const vrmData = gltf.userData.vrm as VRM | undefined;

        if (!vrmData) {
          throw new Error('VRMデータが見つかりません');
        }

        VRMUtils.removeUnnecessaryVertices(vrmData.scene);
        VRMUtils.removeUnnecessaryJoints(vrmData.scene);

        vrmData.humanoid?.resetNormalizedPose();

        let baseTransform = vrmBaseTransformMap.get(vrmData.scene);
        if (!baseTransform) {
          baseTransform = {
            position: vrmData.scene.position.clone(),
            quaternion: vrmData.scene.quaternion.clone(),
            scale: vrmData.scene.scale.clone(),
          };
          vrmBaseTransformMap.set(vrmData.scene, baseTransform);
        }
        vrmData.scene.position.copy(baseTransform.position);
        vrmData.scene.quaternion.copy(baseTransform.quaternion);
        vrmData.scene.scale.copy(baseTransform.scale);

        const box = new THREE.Box3().setFromObject(vrmData.scene);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2 / maxDim;

        vrmData.scene.scale.setScalar(scale);

        const center = box.getCenter(new THREE.Vector3());
        vrmData.scene.position.x = -center.x * scale;
        vrmData.scene.position.y = -box.min.y * scale;
        vrmData.scene.position.z = -center.z * scale;

        setVrm(vrmData);
        onLoad?.();
      } catch (error) {
        onError?.(
          error instanceof Error ? error : new Error('VRM読み込みエラー')
        );
      }
    };

    loadVrm();

    return undefined;
  }, [gltf, onLoad, onError]);

  useFrame((_, delta) => {
    vrm?.update(delta);
  });

  if (!vrm) return null;

  return (
    <group ref={groupRef}>
      <primitive object={vrm.scene} />
    </group>
  );
}
