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
    id: 'Female',
    name: 'Female',
    url: '/models/models_data/VRM.vrm',
    type: 'vrm',
    category: 'character',
    description: 'VRMモデル',
    thumbnail: '/models/cover/Model_Female.png',
  },
  {
    id: 'Male',
    name: 'Male ',
    url: '/models/models_data/Model_Male.glb',
    type: 'gltf',
    category: 'character',
    description: '男性モデル(作成途中)',
    thumbnail: '/models/cover/Model_Male.png',
  },
  {
    id: 'OBJECT_FIG',
    name: 'Figure',
    url: '/models/models_data/FIG.glb',
    type: 'gltf',
    category: 'object',
    description: '',
    thumbnail: '/models/cover/Object_Figure.png',
  },
  {
    id: 'OBJECT_PIANO',
    name: 'Piano',
    url: '/models/models_data/PIANO.glb',
    type: 'gltf',
    category: 'object',
    description: '',
    thumbnail: '/models/cover/Object_Piano.png',
  },
  {
    id: 'OBJECT_GUITAR',
    name: 'Guitar',
    url: '/models/models_data/GUITAR.glb',
    type: 'gltf',
    category: 'object',
    description: '',
    thumbnail: '/models/cover/Object_Guitar.png',
  },
  {
    id: 'OBJECT_HEADPHONE',
    name: 'Headphone',
    url: '/models/models_data/HEADPHONE.glb',
    type: 'gltf',
    category: 'object',
    description: '',
    thumbnail: '/models/cover/Object_Headphone.png',
  },
  {
    id: 'OBJECT_MECHA',
    name: 'Mechas',
    url: '/models/models_data/MECHA.glb',
    type: 'gltf',
    category: 'object',
    description: '',
    thumbnail: '/models/cover/Object_Mecha.png',
  },
];

export const getModelsByCategory = (category: ModelCategory): PresetModel[] =>
  MODEL_LIBRARY.filter((model) => model.category === category);
