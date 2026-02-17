const ROOM_MODELS = [
  {
    objectName: 'Piano',
    modelName: 'MUSIC',
    category: 'Music',
    publicPath: '/models/sample-model-a.glb',
    summary:
      '作曲では、ピアノやシンセを軸にしたモチーフ制作から始め、空間系エフェクトや質感の調整まで一貫して行っています。\n\nこのポートフォリオでは、自作楽曲をWebプレイヤーへ統合し、ブラウザ上で自然に再生できるよう実装しています。単に音を置くだけでなく、再生体験の導線や視認性、カードUIとの整合まで含めて改善を続けています。\n\n音楽制作とフロントエンド実装を往復しながら、聴覚と視覚が一体化する見せ方を探っている段階です。',
    href: '/music',
    ctaLabel: 'MUSICに移動',
  },
  {
    objectName: 'Monitor',
    modelName: 'CHAT',
    category: 'Chat',
    publicPath: '/models/sample-model-c.glb',
    summary:
      'ポートフォリオの構成や制作内容を会話形式で確認できるチャット機能です。質問テンプレートからすぐに試せます。',
    href: '/chat',
    ctaLabel: 'CHATに移動',
  },
  {
    objectName: 'Lack',
    modelName: 'MODEL',
    category: 'Model',
    publicPath: '/models/sample-model-d.glb',
    summary:
      '3Dモデル制作では、VRM / GLBの表示検証だけでなく、ライティングやカメラ距離、輪郭の見え方まで含めてチューニングしています。\n\nWeb上で破綻しにくい表示を目指し、データサイズ・読み込み速度・操作感のバランスを意識して調整しています。モデル単体の完成度だけでなく、UIと同じ文脈で見せたときに違和感が出ないことを重視しています。\n\n現在は、ポートフォリオ内で扱うモデルの表現力を高めながら、軽量で安定した運用フローを整えているところです。',
    href: '/model',
    ctaLabel: 'MODELに移動',
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
