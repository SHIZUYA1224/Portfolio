import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getAllBlogPostsMeta, getBlogPostBySlug } from '@/lib/blog';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getBlogPostBySlug(decodedSlug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-sm text-slate-500">{post.date}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {post.title}
        </h1>
        {post.summary ? (
          <p className="mt-3 text-slate-700">{post.summary}</p>
        ) : null}
        {post.coverImage ? (
          <div className="relative mt-6 h-56 overflow-hidden rounded-xl md:h-72">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </header>

      <div
        className="
          max-w-none text-slate-800 leading-7
          [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold
          [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-semibold
          [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold
          [&_p]:mt-4
          [&_a]:text-cyan-700 [&_a]:underline
          [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:mt-2
          [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5
          [&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-slate-100
          [&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600
        "
      >
        <ReactMarkdown
          components={{
            img: ({ alt, src }) => {
              if (!src || typeof src !== 'string') return null;
              return (
                <Image
                  src={src}
                  alt={alt ?? ''}
                  width={1200}
                  height={675}
                  className="my-6 h-auto w-full rounded-lg border border-slate-200"
                />
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
