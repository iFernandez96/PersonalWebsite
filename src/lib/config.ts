/**
 * Centralized site constants. Single source of truth for the production URL,
 * contact links, and default SEO copy. Values mirror what is currently hard-coded
 * in +page.svelte and the section components (Contact.svelte, etc.).
 *
 * NOTE: Not yet wired into the routes/components — this module exists so later
 * phases can refactor those files to import from here. Update both places until
 * that migration happens.
 */
export const SITE = {
	url: 'https://israel-fernandez.com',
	name: 'Israel Fernandez',
	title: 'Israel Fernandez | Systems Software Engineer',
	description:
		'Israel Fernandez, systems software engineer specializing in embedded, Linux internals, and Android security. Currently at Apple (via Sasken).',
	jobTitle: 'Systems Software Engineer',
	author: 'Israel Fernandez',
	ogImage: 'https://israel-fernandez.com/og-image.png',
	email: 'israelfernandez96@gmail.com',
	github: 'https://github.com/iFernandez96',
	linkedin: 'https://www.linkedin.com/in/ifernandez96/'
} as const;

export type Site = typeof SITE;
