import Image from 'next/image';
import Title from '../common/Title';

export default function HeroSection() {
  return (
    // 1. 基盤構造: 画面一杯の高さ(h-screen)と、背景色によるベース設定
    <section className="relative h-screen max-md:h-[86svh] w-full overflow-hidden bg-neutral-900 text-white">
      {/* 2. 背景画像レイヤー: スケールアニメーションと明度調整 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
          alt="Abstract Architecture"
          fill
          priority
          className="object-cover opacity-80 animate-slow-zoom" // 独自のゆっくりしたズーム効果
          sizes="100vw"
        />
        {/* 3. フィルターレイヤー: グラーデーションとノイズで「質感」を作る */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      {/* 4. コンテンツレイヤー: グリッドレイアウトによる現代的な配置 */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 max-md:px-4 grid grid-cols-1 md:grid-cols-12 items-end max-md:items-end pb-32 max-md:pb-14">
        {/* 左側: メインタイトルエリア */}
        <div className="md:col-span-8 flex flex-col space-y-6 max-md:space-y-3">
          <div className="overflow-hidden">
            <div className="animate-slide-up">
              {/* 既存コンポーネントを大きく使う */}
              <div className="transform scale-150 max-md:scale-[1.08] origin-bottom-left md:scale-100">
                <Title text="Simple is Best" />
              </div>
            </div>
          </div>

          <p className="text-sm md:text-xl max-md:text-[13px] font-light tracking-widest max-md:tracking-[0.14em] text-neutral-300 max-w-lg max-md:max-w-[92%] border-l-2 border-white/30 pl-6 max-md:pl-3 animate-fade-in-delayed">
            最小限の要素で、
            <br className="hidden md:block" />
            最大限のインパクトを。
          </p>
        </div>

        {/* 右側: 装飾・メタデータ（アーティスティックな非対称性） */}
        <div className="hidden md:flex md:col-span-4 justify-end items-end flex-col space-y-4 opacity-70">
          <span className="text-xs tracking-[0.3em] uppercase rotate-90 origin-bottom-right translate-x-4">
            Portfolio 2025
          </span>
          <div className="w-px h-24 bg-white/50" />
        </div>
      </div>

      {/* 5. スクロールインジケーター */}
      <div className="absolute bottom-10 max-md:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 max-md:opacity-35 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white" />
      </div>
    </section>
  );
}
