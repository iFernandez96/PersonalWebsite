<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	const projects = [
		{
			title: 'LLM Semantic Search',
			description:
				'A semantic search engine powered by large language model embeddings. Indexes documents into a vector database and retrieves contextually relevant results — far beyond keyword matching.',
			tags: ['Python', 'LLMs', 'Vector DB', 'Embeddings', 'FastAPI'],
			color: '#c084fc',
			icon: '🔍',
			github: 'https://github.com/iFernandez96'
		},
		{
			title: 'CDN Implementation',
			description:
				'A from-scratch content delivery network demonstrating edge caching, origin pull, cache invalidation, and geographic routing logic. Built to understand CDN internals at the protocol level.',
			tags: ['Python', 'Networking', 'HTTP', 'Caching', 'DNS'],
			color: 'var(--color-accent-cyan)',
			icon: '🌐',
			github: 'https://github.com/iFernandez96'
		},
		{
			title: 'DNS Resolver',
			description:
				'A recursive DNS resolver implemented from scratch. Parses raw DNS wire format, follows the full resolution chain from root servers through TLDs, and handles common record types.',
			tags: ['Python', 'DNS', 'UDP', 'Networking', 'Protocols'],
			color: 'var(--color-accent-indigo)',
			icon: '📡',
			github: 'https://github.com/iFernandez96'
		},
		{
			title: 'Remote Access Tool (RAT)',
			description:
				'A cross-platform remote access tool built for educational security research. Demonstrates C2 architecture, persistence mechanisms, and encrypted communication channels.',
			tags: ['Python', 'C', 'Security', 'C2', 'Networking'],
			color: '#f59e0b',
			icon: '🔓',
			github: 'https://github.com/iFernandez96',
			note: 'Educational / CTF use'
		},
		{
			title: 'Road Trip Planner',
			description:
				'A cross-platform mobile app for planning road trips with interactive maps, waypoint management, estimated drive times, and offline capability. Built with React Native and Expo.',
			tags: ['React Native', 'Expo', 'TypeScript', 'Maps', 'Mobile'],
			color: '#34d399',
			icon: '🗺️',
			github: 'https://github.com/iFernandez96'
		},
		{
			title: 'Home Security System',
			description:
				'A local home security dashboard built with SvelteKit. Integrates with cameras and sensors, provides real-time alerts, and has a clean web interface for monitoring and configuration.',
			tags: ['SvelteKit', 'TypeScript', 'WebSockets', 'IoT', 'Svelte'],
			color: '#fb7185',
			icon: '🏠',
			github: 'https://github.com/iFernandez96'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.08 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section
	id="projects"
	bind:this={sectionEl}
	class="py-24 px-6 lg:px-10"
	style="background: var(--color-bg-secondary);"
>
	<div class="max-w-7xl mx-auto">
		<div
			class="transition-[opacity,transform] duration-700"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 40}px);"
		>
			<p class="font-mono text-[var(--color-accent-cyan)] text-sm tracking-[0.3em] mb-3">04. PROJECTS</p>
			<h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
				Things I've Built
				<span class="block w-12 h-0.5 mt-4" style="background: linear-gradient(90deg, var(--color-accent-cyan), transparent);"></span>
			</h2>
			<p class="text-[var(--color-text-muted)] mb-12 max-w-lg">
				A selection of personal projects spanning systems programming, security research, and full-stack development.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each projects as project, i (project.title)}
				<div
					class="project-card group relative rounded-lg p-6 border flex flex-col"
					style="
						background: var(--color-bg-primary);
						border-color: var(--color-border);
						opacity: {visible ? 1 : 0};
						transform: translateY({visible ? 0 : 40}px);
						transition-delay: {i * 80}ms;
						--project-color: {project.color};
					"
				>
					<!-- Top accent line -->
					<div
						class="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style="background: linear-gradient(90deg, {project.color}, transparent);"
					></div>

					<div class="flex items-start justify-between mb-4">
						<span class="text-3xl">{project.icon}</span>
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							class="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
							aria-label="View on GitHub"
						>
							<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
							</svg>
						</a>
					</div>

					<h3 class="project-title text-[var(--color-text-primary)] font-semibold mb-2 transition-colors">
						{project.title}
					</h3>

					{#if project.note}
						<span
							class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded mb-2 w-fit"
							style="background: {project.color}1a; color: {project.color}; border: 1px solid {project.color}33;"
						>
							⚠ {project.note}
						</span>
					{/if}

					<p class="text-[var(--color-text-muted)] text-sm leading-relaxed flex-1 mb-4">
						{project.description}
					</p>

					<div class="flex flex-wrap gap-1.5">
						{#each project.tags as tag (tag)}
							<span class="font-mono text-xs text-[var(--color-text-muted)] px-2 py-0.5 rounded"
								style="background: var(--color-bg-surface);"
							>
								{tag}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div
			class="mt-12 text-center transition-[opacity,transform] duration-700 delay-500"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 20}px);"
		>
			<a
				href="https://github.com/iFernandez96"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-cyan)] transition-colors text-sm"
			>
				View more on GitHub
				<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M7 17l9.2-9.2M17 17V7H7" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.project-card {
		transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
	}
	.project-card:hover {
		border-color: color-mix(in srgb, var(--project-color) 35%, transparent) !important;
		box-shadow: 0 8px 30px color-mix(in srgb, var(--project-color) 12%, transparent);
		transform: translateY(-4px);
	}
	.project-card:hover .project-title {
		color: var(--project-color);
	}
</style>
