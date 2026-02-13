import React from 'react';

export default function AboutSection() {
  return (
    // 1. セクション基盤: ダークテーマを継承し、余白を大きく取る
    <section className="relative w-full bg-neutral-900 text-neutral-200 py-32 max-md:py-16 px-6 max-md:px-4 md:px-12 border-t border-white/10">
      {/* 2. グリッドレイアウト: 左側に「見出し」、右側に「本文」の非対称構成 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 max-md:gap-6 md:gap-24">
        {/* 3. スティッキーヘッダー: スクロールしても左側に残り続ける見出し */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-32 flex flex-col space-y-4 max-md:space-y-2.5">
            <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
              01 — Introduction
            </span>
            <h2 className="text-4xl max-md:text-2xl md:text-5xl font-light tracking-tight text-white">
              About Me
            </h2>
            {/* 装飾線: 視線を下に誘導する */}
            <div className="h-px w-12 bg-white/30 mt-6" />
          </div>
        </div>

        {/* 4. 本文エリア: 読みやすさとリズムを重視 */}
        <div className="lg:col-span-8 flex flex-col space-y-16 max-md:space-y-8">
          {/* リード文: 最も重要なメッセージ */}
          <div className="space-y-8 max-md:space-y-4">
            <p className="text-xl max-md:text-[1.55rem] md:text-2xl max-md:leading-[1.55] leading-relaxed font-light text-white/90">
              はじめまして、SHIZUYA です。
              <br />
              3D・音楽・AI・ネットワーク、
              <br className="hidden lg:block" />
              異なる領域をコードで編み上げる
              <br />
              <span className="inline-block border-b border-white/40 pb-1 mt-2 hover:border-blue-400 hover:text-blue-400 transition-colors duration-300 cursor-default">
                「Multi-Modal Creator」
              </span>
              です。
            </p>
          </div>

          {/* 詳細文: 2カラムに分割して情報の密度を上げる */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-md:gap-6 text-neutral-400 leading-loose max-md:leading-[1.95] text-sm md:text-base">
            <div className="space-y-4">
              <h3 className="text-white font-medium tracking-wide">
                The Concept
              </h3>
              <p>
                Three.js / React / Next.js を駆使し、
                <strong className="text-neutral-200 font-normal">
                  「見るだけでなく触れるプロフィール」
                </strong>
                をテーマに開発しています。VRM モデルの表示、AI
                チャット、音声再生など、
                静的なWebサイトを「体験する空間」へと拡張します。
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-medium tracking-wide">
                The Stack
              </h3>
              <p>
                フロントエンド・Unity・FastAPI・音楽制作。
                これら多分野を横断（Cross-Modal）することで、
                技術の境界線に新しい表現を見出します。 現在は3D空間を起点とした
                <strong className="text-neutral-200 font-normal">
                  “次世代の自己紹介”
                </strong>
                を模索中です。
              </p>
            </div>
          </div>

          {/* 5. タグクラウド: 視覚的なアクセントとしてのスキル一覧 */}
          <div className="pt-8 max-md:pt-5 border-t border-white/10">
            <div className="flex flex-wrap gap-3">
              {[
                'Three.js',
                'R3F',
                'Next.js',
                'Unity',
                'FastAPI',
                'Music Composition',
                'Network',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 max-md:px-3 py-2 max-md:py-1.5 rounded-full border border-white/10 text-xs text-neutral-400 hover:bg-white hover:text-black transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
