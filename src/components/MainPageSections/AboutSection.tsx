import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    // 1. セクション基盤: ダークテーマを継承し、余白を大きく取る
    <section className="section-animate relative w-full overflow-x-hidden bg-neutral-900 text-neutral-200 py-32 max-md:py-12 px-6 max-md:px-4 md:px-12 border-t border-white/10">
      {/* 2. グリッドレイアウト: 左側に「見出し」、右側に「本文」の非対称構成 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 max-md:gap-5 md:gap-24">
        {/* 3. スティッキーヘッダー: スクロールしても左側に残り続ける見出し */}
        <div className="lg:col-span-4 relative">
          <div className="lg:sticky lg:top-32 flex flex-col space-y-4 max-md:space-y-2">
            <span className="text-xs max-md:text-[11px] font-mono text-neutral-500 tracking-widest max-md:tracking-[0.16em] uppercase">
              01 — Introduction
            </span>
            <h2 className="text-4xl max-md:text-[2rem] md:text-5xl font-light tracking-tight text-white">
              About Me
            </h2>
            {/* 装飾線: 視線を下に誘導する */}
            <div className="h-px w-12 bg-white/30 mt-6" />
          </div>
        </div>

        {/* 4. 本文エリア: 読みやすさとリズムを重視 */}
        <div className="lg:col-span-8 flex flex-col space-y-16 max-md:space-y-7">
          {/* リード文: 最も重要なメッセージ */}
          <div className="space-y-8 max-md:space-y-3">
            <p className="text-xl max-md:text-[1.05rem] md:text-2xl max-md:leading-[1.8] leading-relaxed font-light text-white/90 break-words">
              はじめまして、SHIZUYAです。
              <br />
              3D・音楽・AI・ネットワーク。
              <br />
              異なる分野を横断しながら、
              <br />
              コードでつなぐ実験的な制作を続けています。
              <br />
              「Multi-Modal Creator」を目指しています。
            </p>
          </div>

          {/* 詳細文: 2カラムに分割して情報の密度を上げる */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-md:gap-5 text-neutral-400 leading-loose max-md:leading-[1.85] text-sm md:text-base">
            <div className="flex flex-col h-full gap-4">
              <h3 className="text-white font-medium tracking-wide text-[1.9rem] max-md:text-[1.55rem] md:text-base">
                The Concept
              </h3>
              <p className="max-md:text-[0.98rem]">
                Three.js / React / Next.js を軸に、
                <strong className="text-neutral-200 font-normal">
                  「見るだけでなく触れるプロフィール」
                </strong>
                を少しずつ形にしています。VRM
                モデルの表示、AIチャット、音声再生などを組み合わせながら、
                静的なWebサイトを「体験できる空間」に近づけることを目標にしています。
              </p>
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 mt-auto">
                <Image
                  src="/HERO.png"
                  alt="Concept visual"
                  fill
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col h-full gap-4">
              <h3 className="text-white font-medium tracking-wide text-[1.9rem] max-md:text-[1.55rem] md:text-base">
                The Stack
              </h3>
              <p className="max-md:text-[0.98rem]">
                現在はフロントエンド（Next.js /
                React）を中心に、3D表現（Three.js /
                R3F）、必要に応じてUnity・FastAPI・音楽制作も取り入れています。
                まだ試行錯誤の段階ですが、分野をまたぎながら、3D空間を起点にした
                <strong className="text-neutral-200 font-normal">
                  “次世代の自己紹介”
                </strong>
                の可能性を探っています。
              </p>
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 mt-auto">
                <Image
                  src="/3DViewer.png"
                  alt="Stack visual"
                  fill
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* 5. タグクラウド: 視覚的なアクセントとしてのスキル一覧 */}
          <div className="pt-8 max-md:pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2.5">
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
                  className="px-4 max-md:px-3 py-2 max-md:py-1.5 rounded-full border border-white/10 text-xs max-md:text-[11px] text-neutral-400 hover:bg-white hover:text-black transition-all duration-300 cursor-default"
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
