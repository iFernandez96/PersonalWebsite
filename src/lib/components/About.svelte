<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="about" bind:this={sectionEl} class="py-24 px-6 lg:px-10">
	<div class="max-w-7xl mx-auto">
		<div
			class="transition-[opacity,transform] duration-[400ms]"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 14}px);"
		>
			<p class="font-mono text-[var(--color-accent-cyan)] text-sm tracking-[0.3em] mb-3">01. ABOUT</p>
			<h2 class="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-12">
				About Me
			</h2>
		</div>

		<div class="grid md:grid-cols-2 gap-12 items-start">
			<div
				class="transition-[opacity,transform] duration-[400ms] delay-150"
				style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 14}px);"
			>
				<p class="text-[var(--color-text-secondary)] leading-relaxed mb-5">
					I'm a systems software engineer with deep roots in embedded systems, and Linux kernel development. 
					Over the past 8+ years I've worked on everything from
					real-time control systems and proprietary ARM hardware to computer vision pipelines.
				</p>
				<p class="text-[var(--color-text-secondary)] leading-relaxed mb-5">
					Currently, I'm a Hardware Systems Software Engineer at <a class="text-[var(--color-text-primary)] font-semibold" href="https://www.apple.com/" target="_blank" rel="noopener noreferrer">Apple</a>
					(via Sasken Technologies), where I work on the software that runs test coverages on PoC and corner unit devices.
					Prior to that, I spent close to a decade at <a class="text-[var(--color-text-primary)] font-semibold" href="https://www.gantz-mountain.com/" target="_blank" rel="noopener noreferrer">Gantz-Mountain Intelligence Automation Systems</a>.
					Gantz-Mountain is a defense AI startup in Monterey, CA doing low-level systems work on custom embedded platforms.
				</p>
				<p class="text-[var(--color-text-secondary)] leading-relaxed">
					My current focus is expanding into <span class="text-[var(--color-text-primary)] font-semibold">Android security and red teaming</span>.
					I'm fascinated by the offensive side: understanding systems deeply enough to find where they break.
					Whether it's ARM assembly, kernel internals, or protocol reversing, if it's low-level and
					technically interesting, I want to understand it.
				</p>

				<div class="mt-8 flex gap-4">
					<a
						href="https://github.com/iFernandez96"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
						</svg>
						GitHub
					</a>
					<a
						href="https://www.linkedin.com/in/ifernandez96/"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						LinkedIn
					</a>
				</div>
			</div>

			<div
				class="transition-[opacity,transform] duration-[400ms] delay-300"
				style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 14}px);"
			>
				<!-- Quick-facts terminal card -->
				<div
					class="rounded-lg overflow-hidden border"
					style="background: var(--color-bg-secondary); border-color: var(--color-border);"
				>
					<!-- Terminal bar -->
					<div
						class="flex items-center gap-2 px-4 py-3 border-b"
						style="background: var(--color-bg-surface); border-color: var(--color-border);"
					>
						<div class="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
						<div class="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
						<div class="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
						<span class="ml-2 font-mono text-xs text-[var(--color-text-muted)]">israel@portfolio ~ whoami</span>
					</div>
					<div class="p-6 font-mono text-sm space-y-3">
						{#each [
							{ key: 'name', value: 'Israel Fernandez', color: 'var(--color-accent-cyan)' },
							{ key: 'location', value: 'California, USA', color: 'var(--color-text-primary)' },
							{ key: 'role', value: 'HW Systems Software Engineer', color: 'var(--color-text-primary)' },
							{ key: 'client', value: 'Apple (via Sasken)', color: 'var(--color-accent-indigo)' },
							{ key: 'education', value: 'CS @ CSUMB', color: 'var(--color-text-primary)' },
							{ key: 'focus', value: 'Android Security / Red Team', color: '#f59e0b' },
							{ key: 'languages', value: 'C, C++, Python, ARM ASM', color: 'var(--color-text-primary)' },
							{ key: 'email', value: 'israelfernandez96@gmail.com', color: 'var(--color-accent-cyan)' }
						] as item (item.key)}
							<div class="flex gap-2">
								<span class="text-[var(--color-accent-indigo)] shrink-0">{item.key}:</span>
								<span style="color: {item.color};">{item.value}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
