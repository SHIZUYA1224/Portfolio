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
    id: 'OBJECT_FIG',
    name: 'FIG',
    url: '/models/FIG.glb',
    type: 'gltf',
    category: 'object',
    description: '3Dオブジェクト（FIG）',
    thumbnail:
      'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'OBJECT_PIANO',
    name: 'PIANO',
    url: '/models/PIANO.glb',
    type: 'gltf',
    category: 'object',
    description: '3Dオブジェクト（PIANO）',
    thumbnail:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'OBJECT_GUITAR',
    name: 'GUITAR',
    url: '/models/GUITAR.glb',
    type: 'gltf',
    category: 'object',
    description: '3Dオブジェクト（GUITAR）',
    thumbnail:
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'OBJECT_HEADPHONE',
    name: 'HEADPHONE',
    url: '/models/HEADPHONE.glb',
    type: 'gltf',
    category: 'object',
    description: '3Dオブジェクト（HEADPHONE）',
    thumbnail:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'OBJECT_MECHA',
    name: 'MECHA',
    url: '/models/MECHA.glb',
    type: 'gltf',
    category: 'object',
    description: '3Dオブジェクト（MECHA）',
    thumbnail:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
  },
];

export const getModelsByCategory = (category: ModelCategory): PresetModel[] =>
  MODEL_LIBRARY.filter((model) => model.category === category);
