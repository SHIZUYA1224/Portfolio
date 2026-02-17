'use client';

type ThreeDLoadGateProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onBack: () => void;
};

export default function ThreeDLoadGate({
  title = '3Dデータを読み込みますか？',
  description = '通信量が発生する場合があります。',
  onConfirm,
  onBack,
}: ThreeDLoadGateProps) {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/88 backdrop-blur-sm">
      <div className="w-[min(92vw,460px)] rounded-2xl border border-white/15 bg-white/8 px-6 py-6 text-white shadow-2xl">
        <p className="text-lg font-semibold">{title}</p>
        <p className="mt-2 text-sm text-slate-200">{description}</p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg border border-cyan-300/50 bg-cyan-400/25 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/35"
          >
            読み込む
          </button>
        </div>
      </div>
    </div>
  );
}
