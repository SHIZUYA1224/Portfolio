import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPostsMeta } from '@/lib/blog';

export default async function BlogPage() {
  const posts = await getAllBlogPostsMeta();

  return (
    <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col px-4 py-10 md:min-h-[calc(100vh-4.25rem)] md:px-6 md:py-12">
      <header className="mb-8 rounded-2xl border border-slate-200 bg-[linear-gradient(140deg,#ffffff_0%,#f8fbff_45%,#eef7ff_100%)] p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-700">WRITING</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">BLOG</h1>
        <p className="mt-3 max-w-2xl text-slate-600">制作過程・技術メモ・アップデートを時系列でまとめています。</p>
      </header>

      <div className="space-y-3">
        {posts.map((post, index) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_14px_28px_rgba(14,116,144,0.16)] md:gap-5 md:p-5"
            >
              <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200 md:w-28">
                <Image
                  src={post.coverImage ?? '/HERO.png'}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-600">
                    {post.date}
                  </span>
                  <span className="text-[11px] text-slate-400">#{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="mt-2 text-xl font-semibold leading-tight text-slate-900 transition-colors group-hover:text-cyan-700">
                  {post.title}
                </h2>
                {post.summary ? (
                  <p className="mt-2 overflow-hidden text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {post.summary}
                  </p>
                ) : null}
              </div>
              <span className="hidden text-sm font-semibold text-cyan-700/0 transition-colors group-hover:text-cyan-700 md:inline">Read</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
