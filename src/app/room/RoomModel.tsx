'use client';

import { Billboard, Center, useGLTF } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import {
  ROOM_MODELS,
  getRoomModelByObjectName,
  isRoomObjectKey,
  RoomModelItem,
  RoomObjectKey,
} from './roomData';

type RoomModelProps = {
  onSelect: (item: RoomModelItem) => void;
  onHoverChange?: (objectName: RoomObjectKey | null) => void;
  onHoverNodeChange?: (nodes: THREE.Object3D[]) => void;
  onInteractiveNodesReady?: (nodes: THREE.Object3D[]) => void;
  onModelReady?: () => void;
};

type Marker = {
  key: RoomObjectKey;
  position: THREE.Vector3;
};

export default function RoomModel({
  onSelect,
  onHoverChange,
  onHoverNodeChange,
  onInteractiveNodesReady,
  onModelReady,
}: RoomModelProps) {
  const { scene } = useGLTF('/room/ROOM.glb');
  const markerRefs = useRef<(THREE.Group | null)[]>([]);

  const { sceneRoot, nodes, originalScales, interactiveMeshes } = useMemo(() => {
    const root = scene.clone(true);

    root.traverse((n) => {
      if ((n as THREE.Mesh).isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
      }
    });

    const getNode = (name: RoomObjectKey) => {
      const exact = (root.getObjectByName(name) as THREE.Object3D | null) ?? null;
      if (exact) return exact;

      const normalized = name.toLowerCase();
      let fallback: THREE.Object3D | null = null;
      root.traverse((obj) => {
        if (fallback) return;
        if ((obj.name || '').toLowerCase().includes(normalized)) {
          fallback = obj;
        }
      });
      return fallback;
    };
    const nodes = {} as Record<RoomObjectKey, THREE.Object3D | null>;
    const originalScales = {} as Record<
      RoomObjectKey,
      THREE.Vector3 | undefined
    >;
    const interactiveMeshes = {} as Record<RoomObjectKey, THREE.Object3D[]>;

    ROOM_MODELS.forEach(({ objectName: name }) => {
      const node = getNode(name);
      nodes[name] = node;
      originalScales[name] = node?.scale.clone();
      const meshes: THREE.Object3D[] = [];
      node?.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) meshes.push(child);
      });
      interactiveMeshes[name] = meshes;
    });

    return { sceneRoot: root, nodes, originalScales, interactiveMeshes };
  }, [scene]);

  const markers = useMemo(() => {
    sceneRoot.updateWorldMatrix(true, true);
    const result: Marker[] = [];

    ROOM_MODELS.forEach(({ objectName }) => {
      const node = nodes[objectName];
      const fallbackMesh = interactiveMeshes[objectName]?.[0] ?? null;
      const markerSource = node ?? fallbackMesh;
      if (!markerSource) return;

      let box = new THREE.Box3().setFromObject(markerSource);
      if (box.isEmpty() && fallbackMesh) {
        box = new THREE.Box3().setFromObject(fallbackMesh);
      }
      if (box.isEmpty()) return;

      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const localPos = sceneRoot.worldToLocal(center);
      localPos.y += Math.max(0.2, size.y * 0.6);

      result.push({ key: objectName, position: localPos });
    });

    return result;
  }, [interactiveMeshes, nodes, sceneRoot]);

  useEffect(() => {
    const interactiveNodes = ROOM_MODELS.flatMap(
      ({ objectName }) => interactiveMeshes[objectName] ?? []
    );
    onInteractiveNodesReady?.(interactiveNodes);
  }, [interactiveMeshes, onInteractiveNodesReady]);

  useEffect(() => {
    if (!sceneRoot) return;
    onModelReady?.();
  }, [sceneRoot, onModelReady]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    markerRefs.current.forEach((group, index) => {
      if (!group) return;
      const baseY = markers[index]?.position.y ?? 0;
      group.position.y = baseY + Math.sin(t * 2 + index * 0.6) * 0.035;
    });
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    let target: THREE.Object3D | null = e.object;
    while (target) {
      if (isRoomObjectKey(target.name)) {
        const item = getRoomModelByObjectName(target.name);
        if (item) onSelect(item);
        break;
      }
      target = target.parent;
    }
  };

  const handlePointer = (
    e: ThreeEvent<MouseEvent>,
    action: 'enter' | 'leave'
  ) => {
    e.stopPropagation();
    let target: THREE.Object3D | null = e.object;
    let key: RoomObjectKey | null = null;
    while (target) {
      if (isRoomObjectKey(target.name)) {
        key = target.name;
        break;
      }
      target = target.parent;
    }
    if (!key) return;

    const node = nodes[key];
    const baseScale = originalScales[key];
    if (!node || !baseScale) return;

    if (action === 'enter') {
      node.scale.copy(baseScale.clone().multiplyScalar(1.08));
      onHoverChange?.(key);
      onHoverNodeChange?.(interactiveMeshes[key] ?? []);
    } else {
      node.scale.copy(baseScale);
    }
  };

  const disableRaycast: THREE.Object3D['raycast'] = () => undefined;

  return (
    <Center>
      {scene && (
        <>
          <primitive
            object={sceneRoot}
            dispose={null}
            onClick={handleClick}
            onPointerOver={(e: ThreeEvent<MouseEvent>) =>
              handlePointer(e, 'enter')
            }
            onPointerOut={(e: ThreeEvent<MouseEvent>) =>
              handlePointer(e, 'leave')
            }
          />
          {markers.map((marker, index) => (
            <group
              key={marker.key}
              ref={(el) => {
                markerRefs.current[index] = el;
              }}
              position={marker.position}
            >
              <Billboard follow>
                <mesh
                  raycast={disableRaycast}
                  position={[0, 0.86, 0]}
                >
                  <cylinderGeometry args={[0.10125, 0.10125, 0.945, 28]} />
                  <meshBasicMaterial
                    color="#a5f3fc"
                    depthTest={false}
                  />
                </mesh>
                <mesh
                  raycast={disableRaycast}
                  position={[0, 0.28, 0]}
                  rotation={[Math.PI, 0, 0]}
                >
                  <coneGeometry args={[0.405, 0.63, 32]} />
                  <meshBasicMaterial
                    color="#22d3ee"
                    depthTest={false}
                  />
                </mesh>
              </Billboard>
            </group>
          ))}
        </>
      )}
    </Center>
  );
}

useGLTF.preload('/room/ROOM.glb');
