const ROOM_MODELS = [
  {
    objectName: 'Piano',
    modelName: 'MUSIC',
    category: 'Music',
    publicPath: '/models/sample-model-a.glb',
    intro:
      '自作楽曲をWebプレイヤーに統合し、ブラウザ上で再生できる形で公開しています。',
    process:
      '楽曲制作とUI設計を行き来しながら、聴きやすさと操作しやすさの両立を意識して改善しています。',
    imageUrl: '/covers/artwork.jpg',
    href: '/music',
    ctaLabel: 'MUSICページへ移動',
  },
  {
    objectName: 'Monitor',
    modelName: 'CHAT',
    category: 'Chat',
    publicPath: '/models/sample-model-c.glb',
    intro:
      'ポートフォリオ情報を会話形式で確認できるチャット機能を実装しています。',
    process:
      '回答のわかりやすさ、入力のしやすさ、スマートフォンでの安定動作を軸に段階的に調整しています。',
    imageUrl: '/HERO.png',
    href: '/chat',
    ctaLabel: 'CHATページへ移動',
  },
  {
    objectName: 'Lack',
    modelName: 'MODEL',
    category: 'Model',
    publicPath: '/models/sample-model-d.glb',
    intro:
      'VRM / GLBモデルをWeb上で表示し、表現と操作性を確認できるページです。',
    process:
      '見た目の質感だけでなく、読み込み速度や視認性、カメラ操作の快適さを重視して制作しています。',
    imageUrl: '/covers/rain.png',
    href: '/model',
    ctaLabel: 'MODELページへ移動',
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
