import { error } from '@sveltejs/kit';
import { getPost, posts } from '$lib/posts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
};

// Tell the SvelteKit prerender crawler which slugs exist so each post
// emits a fully static HTML file at build time.
export const entries: EntryGenerator = () => posts.map((p) => ({ slug: p.slug }));
