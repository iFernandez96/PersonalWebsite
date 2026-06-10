<script lang="ts">
	import { reveal } from '$lib/actions/reveal.js';

	const links = [
		{
			label: 'GitHub',
			value: 'iFernandez96',
			href: 'https://github.com/iFernandez96',
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
			color: 'var(--color-text-primary)'
		},
		{
			label: 'LinkedIn',
			value: 'ifernandez96',
			href: 'https://www.linkedin.com/in/ifernandez96/',
			icon: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
			color: 'var(--color-accent-cyan)'
		}
	];
</script>

<section id="contact" aria-labelledby="contact-heading" class="py-20 md:py-32 px-6 lg:px-10">
	<!-- max-w-2xl: quiet and centered with more vertical air -->
	<div class="max-w-2xl mx-auto text-center">
		<div use:reveal={'heading'}>
			<p class="font-mono text-[var(--color-text-muted)] text-xs tracking-[0.3em] mb-3">05 / CONTACT</p>
			<h2 id="contact-heading" class="text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-6" style="letter-spacing: -0.02em;">
				Get in touch
			</h2>
			<p class="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-3 max-w-xl mx-auto">
				Open to <span class="text-[var(--color-accent-amber)] font-semibold">offensive security and red team roles</span>, full-time.
				Also up for systems, embedded, or anything low-level.
			</p>
			<p class="font-mono text-[13px] text-[var(--color-text-muted)] mb-12">
				<span class="text-[var(--color-text-secondary)]">//</span> usually reply within 48h
			</p>
		</div>

		<div use:reveal={{ role: 'body', i: 1 }} class="mb-10">
			<a
				href="mailto:israelfernandez96@gmail.com"
				class="contact-cta inline-flex items-center gap-3 px-8 py-4 rounded-md text-base font-semibold tracking-wide"
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="w-5 h-5">
					<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
				</svg>
				Email me
			</a>
		</div>

		<div use:reveal={{ role: 'body', i: 2 }} class="flex flex-col sm:flex-row gap-3 justify-center">
			{#each links as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="contact-link inline-flex items-center gap-2.5 px-6 py-3 rounded-md border font-mono text-[15px]"
					style="border-color: var(--color-border); background: var(--color-bg-secondary); --link-color: {link.color};"
				>
					<span class="contact-icon text-[var(--color-text-secondary)] transition-colors">
						{@html link.icon}
					</span>
					<span class="text-[var(--color-text-secondary)]">{link.value}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.contact-cta {
		background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-indigo));
		color: var(--color-bg-primary);
		box-shadow: 0 4px 20px color-mix(in srgb, var(--color-accent-cyan) 20%, transparent);
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.contact-cta:focus-visible {
		outline: 2px solid var(--color-accent-cyan);
		outline-offset: 3px;
		border-radius: 6px;
	}
	.contact-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 32px color-mix(in srgb, var(--color-accent-cyan) 40%, transparent);
	}

	.contact-link {
		transition: border-color 0.2s, transform 0.2s;
	}
	.contact-link:hover {
		border-color: color-mix(in srgb, var(--link-color) 40%, transparent) !important;
		transform: translateY(-2px);
	}
	.contact-link:hover .contact-icon {
		color: var(--link-color);
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-link:hover {
			transform: none;
		}
	}
</style>

<!-- Footer -->
<footer class="border-t py-8 px-6" style="border-color: var(--color-border);">
	<div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
		<p class="font-mono text-xs text-[var(--color-text-muted)]">
			Built with <span style="color: var(--color-text-secondary);">SvelteKit</span> + Tailwind · © {new Date().getFullYear()} Israel Fernandez
		</p>
		<a
			href="https://github.com/iFernandez96"
			target="_blank"
			rel="noopener noreferrer"
			class="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors inline-flex items-center gap-1.5"
		>
			View source
			<svg class="w-3 h-3" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
		</a>
	</div>
</footer>
