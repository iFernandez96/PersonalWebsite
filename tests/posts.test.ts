import { describe, it, expect } from 'vitest';
import {
	parseFrontmatter,
	sortPostsByDate,
	formatDate,
	type Post
} from '$lib/posts';

// A minimal, valid frontmatter+body fixture. Helpers below tweak it per case.
function makeRaw(overrides: Record<string, string | undefined> = {}, body = '# Body\n'): string {
	const base: Record<string, string | undefined> = {
		slug: 'test-post',
		title: 'Test Post',
		date: '2026-01-15',
		readTime: '7',
		tags: 'Security, C, Linux',
		summary: 'A short summary.'
	};
	const merged = { ...base, ...overrides };
	const lines = Object.entries(merged)
		.filter(([, v]) => v !== undefined)
		.map(([k, v]) => `${k}: ${v}`)
		.join('\n');
	return `---\n${lines}\n---\n${body}`;
}

describe('parseFrontmatter', () => {
	it('parses a well-formed post', () => {
		const { data, body } = parseFrontmatter(makeRaw());
		expect(data.slug).toBe('test-post');
		expect(data.title).toBe('Test Post');
		expect(data.date).toBe('2026-01-15');
		expect(data.readTime).toBe(7);
		expect(data.summary).toBe('A short summary.');
		expect(body.trim()).toBe('# Body');
	});

	it('splits tags on commas and trims whitespace', () => {
		const { data } = parseFrontmatter(makeRaw({ tags: 'Security ,  C,Linux  ' }));
		expect(data.tags).toEqual(['Security', 'C', 'Linux']);
	});

	it('yields an empty tags array when tags are absent', () => {
		const { data } = parseFrontmatter(makeRaw({ tags: undefined }));
		expect(data.tags).toEqual([]);
	});

	it('throws when there is no frontmatter block', () => {
		expect(() => parseFrontmatter('# just a body, no fence\n')).toThrow(
			/missing a frontmatter block/i
		);
	});

	it.each(['slug', 'title', 'date', 'summary'])(
		'throws when required field "%s" is missing',
		(field) => {
			expect(() => parseFrontmatter(makeRaw({ [field]: undefined }))).toThrow(
				new RegExp(`missing required field "${field}"`, 'i')
			);
		}
	);

	it('throws on an unparseable date', () => {
		expect(() => parseFrontmatter(makeRaw({ date: 'not-a-date' }))).toThrow(
			/unparseable date/i
		);
	});

	it('throws on a non-numeric readTime instead of silently producing NaN', () => {
		expect(() => parseFrontmatter(makeRaw({ readTime: 'twelve' }))).toThrow(
			/non-numeric readTime/i
		);
	});

	it('defaults readTime to 0 when omitted', () => {
		const { data } = parseFrontmatter(makeRaw({ readTime: undefined }));
		expect(data.readTime).toBe(0);
	});
});

describe('sortPostsByDate', () => {
	const post = (slug: string, date: string): Post => ({
		slug,
		title: slug,
		date,
		readTime: 1,
		tags: [],
		summary: '',
		content: ''
	});

	it('orders posts newest-first', () => {
		const sorted = sortPostsByDate([
			post('old', '2024-01-01'),
			post('new', '2026-05-01'),
			post('mid', '2025-06-15')
		]);
		expect(sorted.map((p) => p.slug)).toEqual(['new', 'mid', 'old']);
	});

	it('does not mutate the input array', () => {
		const input = [post('a', '2024-01-01'), post('b', '2026-01-01')];
		const snapshot = input.map((p) => p.slug);
		sortPostsByDate(input);
		expect(input.map((p) => p.slug)).toEqual(snapshot);
	});
});

describe('formatDate', () => {
	it('formats an ISO date as a long US date', () => {
		// Use a midday UTC time so the local-timezone shift can't roll the day.
		expect(formatDate('2026-03-15T12:00:00Z')).toBe('March 15, 2026');
	});
});
