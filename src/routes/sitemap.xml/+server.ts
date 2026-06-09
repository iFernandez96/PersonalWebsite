import { posts } from '$lib/posts';

export const prerender = true;

const SITE_URL = 'https://israel-fernandez.com';

function escape(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET = () => {
	const postUrls = posts
		.map((post) => {
			const loc = `${SITE_URL}/blog/${post.slug}`;
			return `
	<url>
		<loc>${escape(loc)}</loc>
		<lastmod>${escape(post.date)}</lastmod>
		<priority>0.8</priority>
	</url>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${SITE_URL}/</loc>
		<priority>1.0</priority>
	</url>
	<url>
		<loc>${SITE_URL}/blog</loc>
		<priority>0.8</priority>
	</url>${postUrls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
