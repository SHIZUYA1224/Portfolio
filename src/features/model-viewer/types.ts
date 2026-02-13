// src/types/model.ts

export type ModelType = 'gltf' | 'vrm' | null;
export type ModelCategory = 'character' | 'object';

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
}

export interface ModelData {
  url: string;
  type: ModelType;
  name: string;
  thumbnail?: string;
}

export interface PresetModel extends ModelData {
  id: string;
  category: ModelCategory;
  description?: string;
  cameraPreset?: CameraPreset;
}

export interface ViewerSettings {
  autoRotate: boolean;
  showGrid: boolean;
  backgroundColor: string;
}
