import { posts } from '$lib/posts';

export const prerender = true;

const SITE_URL = 'https://israel-fernandez.com';
const SITE_TITLE = 'Israel Fernandez | Writing';
const SITE_DESCRIPTION =
	'Long-form notes on systems programming, embedded firmware, and Android security research.';

function escape(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET = () => {
	const buildDate = new Date().toUTCString();
	const items = posts
		.map((post) => {
			const link = `${SITE_URL}/blog/${post.slug}`;
			const pubDate = new Date(post.date).toUTCString();
			const categories = post.tags.map((t) => `<category>${escape(t)}</category>`).join('');
			return `
		<item>
			<title>${escape(post.title)}</title>
			<link>${link}</link>
			<guid isPermaLink="true">${link}</guid>
			<pubDate>${pubDate}</pubDate>
			<description>${escape(post.summary)}</description>
			${categories}
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${SITE_TITLE}</title>
		<link>${SITE_URL}/blog</link>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
		<description>${SITE_DESCRIPTION}</description>
		<language>en-us</language>
		<lastBuildDate>${buildDate}</lastBuildDate>${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
