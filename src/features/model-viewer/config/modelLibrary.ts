import type { ModelCategory, PresetModel } from '@/features/model-viewer/types';

export const MODEL_PAGE_CONFIG = {
  title: 'Model Library',
  subtitle: 'サムネをクリックすると右で即プレビュー。',
  categoryLabel: {
    character: 'Characters',
    object: 'Objects',
  } as Record<ModelCategory, string>,
};

export const MODEL_LIBRARY: PresetModel[] = [
  {
    id: 'VRM Model',
    name: 'Female VRM',
    url: '/models/VRM.vrm',
    type: 'vrm',
    category: 'character',
    description: 'public 配下に配置したモデルに合わせて更新してください。',
    thumbnail:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'MODEL_A',
    name: 'Model A',
    url: '/models/Model_Male.glb',
    type: 'gltf',
    category: 'character',
    description: 'モデル名・説明はここで管理してください。',
    thumbnail:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'MODEL_B',
    name: 'Model B',
    url: '/models/GLB.glb',
    type: 'gltf',
    category: 'character',
    description: 'モデル名・説明はここで管理してください。',
    thumbnail:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  },
];

export const getModelsByCategory = (category: ModelCategory): PresetModel[] =>
  MODEL_LIBRARY.filter((model) => model.category === category);
