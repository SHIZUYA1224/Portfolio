const ROOM_MODELS = [
  {
    objectName: 'Piano',
    modelName: 'Sample Model A',
    category: 'Music',
    publicPath: '/models/sample-model-a.glb',
  },
  {
    objectName: 'Monitor',
    modelName: 'Sample Model C',
    category: 'Chat',
    publicPath: '/models/sample-model-c.glb',
  },
  {
    objectName: 'Lack',
    modelName: 'Sample Model D',
    category: 'Model',
    publicPath: '/models/sample-model-d.glb',
  },
] as const;

type RoomModelCategory = (typeof ROOM_MODELS)[number]['category'];
type RoomObjectKey = (typeof ROOM_MODELS)[number]['objectName'];
type RoomModelItem = (typeof ROOM_MODELS)[number];

const CATEGORY_ACCENT: Record<RoomModelCategory, string> = {
  Music: 'from-amber-400/40 via-orange-400/30 to-pink-400/30',
  Chat: 'from-sky-400/40 via-cyan-400/30 to-emerald-400/30',
  Model: 'from-indigo-500/40 via-violet-500/30 to-fuchsia-500/30',
};

const isRoomObjectKey = (name: string): name is RoomObjectKey =>
  ROOM_MODELS.some((item) => item.objectName === name);

const getRoomModelByObjectName = (name: RoomObjectKey): RoomModelItem | null =>
  ROOM_MODELS.find((item) => item.objectName === name) ?? null;

export { CATEGORY_ACCENT, ROOM_MODELS, getRoomModelByObjectName, isRoomObjectKey };
export type { RoomModelCategory, RoomModelItem, RoomObjectKey };
