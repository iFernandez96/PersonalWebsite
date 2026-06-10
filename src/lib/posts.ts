import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

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
// statically-known array, no async, same shape as the old inline-HTML version.
const rawPosts = import.meta.glob('/src/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Minimal frontmatter parser. Splits the leading `---` fenced block from the
// body and parses simple `key: value` lines. `tags` is split on commas. No new
// dependency (no gray-matter), frontmatter here is first-party and simple.
//
// Validation runs at build time: a missing required field, an unparseable
// `date`, or a non-numeric `readTime` throws a clear Error so a malformed post
// fails the build instead of silently shipping NaN / undefined.
export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
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

	// Required string fields must be present and non-empty.
	for (const key of ['slug', 'title', 'date', 'summary'] as const) {
		if (!fields[key]) {
			throw new Error(
				`Post frontmatter is missing required field "${key}"` +
					(fields.slug ? ` (slug: ${fields.slug})` : '')
			);
		}
	}

	// `date` must be parseable so sorting and formatDate don't produce
	// "Invalid Date".
	if (Number.isNaN(Date.parse(fields.date))) {
		throw new Error(
			`Post "${fields.slug}" has an unparseable date: "${fields.date}"`
		);
	}

	// `readTime` is optional but, when present, must be numeric. Number('') and
	// Number('abc') yield NaN, which previously slipped through silently.
	const readTime = fields.readTime === undefined ? 0 : Number(fields.readTime);
	if (Number.isNaN(readTime)) {
		throw new Error(
			`Post "${fields.slug}" has a non-numeric readTime: "${fields.readTime}"`
		);
	}

	const data: Frontmatter = {
		slug: fields.slug,
		title: fields.title,
		date: fields.date,
		readTime,
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

// Render a single raw markdown post to a Post object. Markdown is rendered with
// `marked` and then sanitized with DOMPurify before it is handed to {@html}.
// Post bodies are first-party/trusted, but sanitization is now applied as
// defense-in-depth so a stray inline <script> or event-handler attribute can
// never reach the DOM.
export function renderPost(raw: string): Post {
	const { data, body } = parseFrontmatter(raw);
	// marked.parse with async:false returns the rendered HTML string
	// synchronously. Its defaults emit <h2>/<h3>, <ul>/<li>, <pre><code>,
	// inline <code>, <strong>, <em>, <a>, exactly what .post-content styles.
	const html = marked.parse(body, { async: false }) as string;
	const content = DOMPurify.sanitize(html);
	return { ...data, content };
}

// Sort posts newest-first by date string.
export function sortPostsByDate(posts: Post[]): Post[] {
	return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function buildPosts(): Post[] {
	const built = Object.values(rawPosts).map(renderPost);
	// Newest first, matching the prior hand-ordered array.
	return sortPostsByDate(built);
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
