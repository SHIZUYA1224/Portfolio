import type { PresetModel } from '@/features/model-viewer/types';

export const PRESET_MODELS: PresetModel[] = [
  {
    id: 'GLB',
    name: '主人公',
    url: '/models/GLB.glb',
    type: 'gltf',
    category: 'character',
    description: 'バランス型のオールラウンダー。',
    thumbnail:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'VRM',
    name: '魔法使い',
    url: '/models/VRM.vrm',
    type: 'vrm',
    category: 'character',
    description: '高火力の遠距離アタッカー。',
    thumbnail:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80',
  },
];
