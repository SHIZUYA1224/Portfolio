import type { PresetModel } from '@/features/model-viewer/types';

export const PRESET_MODELS: PresetModel[] = [
  {
    id: 'GLB',
    name: '主人公',
    url: '/models/GLB.glb',
    type: 'gltf',
    category: 'character',
    description: 'バランス型のオールラウンダー。',
  },
  {
    id: 'VRM',
    name: '魔法使い',
    url: '/models/VRM.vrm',
    type: 'vrm',
    category: 'character',
    description: '高火力の遠距離アタッカー。',
  },
];
