import { marked } from 'marked';

export interface Post {
	slug: string;
	title: string;
	date: string;
	readTime: number;
	tags: string[];
	summary: string;
	content: string;
}

interface Frontmatter {
	slug: string;
	title: string;
	date: string;
	readTime: number;
	tags: string[];
	summary: string;
}

// Eagerly load every markdown post as a raw string at build time. The glob is
// resolved by Vite during the build, so `posts` below is a fully synchronous,
// statically-known array — no async, same shape as the old inline-HTML version.
const rawPosts = import.meta.glob('/src/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Minimal frontmatter parser. Splits the leading `---` fenced block from the
// body and parses simple `key: value` lines. `tags` is split on commas. No new
// dependency (no gray-matter) — frontmatter here is first-party and simple.
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
	const normalized = raw.replace(/\r\n/g, '\n');
	const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(normalized);
	if (!match) {
		throw new Error('Post is missing a frontmatter block');
	}

	const [, frontmatterBlock, body] = match;
	const fields: Record<string, string> = {};
	for (const line of frontmatterBlock.split('\n')) {
		if (!line.trim()) continue;
		const idx = line.indexOf(':');
		if (idx === -1) continue;
		const key = line.slice(0, idx).trim();
		const value = line.slice(idx + 1).trim();
		fields[key] = value;
	}

	const data: Frontmatter = {
		slug: fields.slug,
		title: fields.title,
		date: fields.date,
		readTime: Number(fields.readTime),
		tags: fields.tags
			? fields.tags
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean)
			: [],
		summary: fields.summary
	};

	return { data, body };
}

function buildPosts(): Post[] {
	const built = Object.values(rawPosts).map((raw) => {
		const { data, body } = parseFrontmatter(raw);
		// marked.parse with async:false returns the rendered HTML string
		// synchronously. Its defaults emit <h2>/<h3>, <ul>/<li>, <pre><code>,
		// inline <code>, <strong>, <em>, <a> — exactly what .post-content styles.
		const content = marked.parse(body, { async: false }) as string;
		return { ...data, content };
	});

	// Newest first, matching the prior hand-ordered array.
	return built.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const posts: Post[] = buildPosts();

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
