import fs from 'node:fs/promises';
import path from 'node:path';

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  coverImage?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_POSTS_DIR = path.join(process.cwd(), 'content/blog/posts');

function normalizeSlug(value: string) {
  return value.normalize('NFC');
}

async function resolvePostFilePath(slug: string): Promise<string | null> {
  const entries = await fs.readdir(BLOG_POSTS_DIR, { withFileTypes: true });
  const normalizedSlug = normalizeSlug(slug);

  const matched = entries.find((entry) => {
    if (!entry.isFile() || !entry.name.endsWith('.md')) return false;
    const nameWithoutExt = entry.name.replace(/\.md$/, '');
    return normalizeSlug(nameWithoutExt) === normalizedSlug;
  });

  if (!matched) return null;
  return path.join(BLOG_POSTS_DIR, matched.name);
}

function parseFrontMatter(markdown: string) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: markdown };
  }

  const [, rawMeta, content] = match;
  const data: Record<string, string> = {};

  for (const line of rawMeta.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
    data[key] = value;
  }

  return { data, content };
}

function sortByDateDesc<T extends { date: string }>(posts: T[]) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllBlogPostsMeta(): Promise<BlogPostMeta[]> {
  const entries = await fs.readdir(BLOG_POSTS_DIR, { withFileTypes: true });
  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));

  const metas = await Promise.all(
    markdownFiles.map(async (file) => {
      const slug = normalizeSlug(file.name.replace(/\.md$/, ''));
      const fullPath = path.join(BLOG_POSTS_DIR, file.name);
      const raw = await fs.readFile(fullPath, 'utf8');
      const { data } = parseFrontMatter(raw);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '1970-01-01',
        summary: data.summary ?? '',
        coverImage: data.coverImage,
      };
    })
  );

  return sortByDateDesc(metas);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = await resolvePostFilePath(slug);
  if (!fullPath) return null;

  try {
    const raw = await fs.readFile(fullPath, 'utf8');
    const { data, content } = parseFrontMatter(raw);

    return {
      slug: normalizeSlug(slug),
      title: data.title ?? slug,
      date: data.date ?? '1970-01-01',
      summary: data.summary ?? '',
      coverImage: data.coverImage,
      content,
    };
  } catch {
    return null;
  }
}
