<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	const skillGroups = [
		{
			title: 'Systems & Embedded',
			color: '#22d3ee',
			icon: 'chip',
			skills: ['C / C++', 'ARM Assembly', 'Linux Kernel', 'RTOS / FreeRTOS', 'Embedded Systems', 'Device Drivers', 'Memory Management', 'JTAG / GDB']
		},
		{
			title: 'Security & Offensive',
			color: '#f59e0b',
			icon: 'shield',
			skills: ['Android Pentesting', 'Red Teaming', 'Metasploit', 'Frida / Objection', 'Reverse Engineering', 'IDA Free / Ghidra', 'Network Analysis', 'Exploit Development']
		},
		{
			title: 'Languages & Scripting',
			color: '#818cf8',
			icon: 'code',
			skills: ['Python', 'TypeScript', 'JavaScript', 'Bash / Shell', 'Go', 'Rust (learning)', 'SQL', 'YAML / Makefile']
		},
		{
			title: 'Web & Mobile',
			color: '#818cf8',
			icon: 'code',
			skills: ['Svelte / SvelteKit', 'React Native', 'Expo', 'Node.js', 'REST APIs', 'WebSockets', 'TailwindCSS', 'Vite']
		},
		{
			title: 'AI / ML',
			color: '#818cf8',
			icon: 'nodes',
			skills: ['Computer Vision', 'OpenCV', 'PyTorch', 'LLM Integration', 'Semantic Search', 'Vector Databases', 'CUDA', 'Ollama']
		},
		{
			title: 'Infrastructure & Tools',
			color: '#818cf8',
			icon: 'wrench',
			skills: ['Docker', 'Git / GitHub', 'Linux Admin', 'NVIDIA CUDA', 'Kali Linux', 'Wireshark', 'tmux / vim', 'CI/CD']
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
			{ threshold: 0.1 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section
	id="skills"
	bind:this={sectionEl}
	class="py-24 px-6 lg:px-10"
	style="background: var(--color-bg-secondary);"
>
	<div class="max-w-7xl mx-auto">
		<div
			class="transition-[opacity,transform] duration-[400ms]"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 14}px);"
		>
			<p class="font-mono text-[var(--color-accent-cyan)] text-sm tracking-[0.3em] mb-3">02. SKILLS</p>
			<h2 class="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-12">
				Skills
			</h2>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each skillGroups as group, i (group.title)}
				<div
					class="reveal-wrapper"
					style="
						opacity: {visible ? 1 : 0};
						transform: translateY({visible ? 0 : 14}px);
						transition: opacity 0.4s ease, transform 0.4s ease;
						transition-delay: {visible ? i * 80 : 0}ms;
					"
				>
				<div
					class="skill-card rounded-lg p-6 border"
					style="
						background: var(--color-bg-primary);
						border-color: var(--color-border);
						--card-color: {group.color};
					"
				>
					<div class="flex items-center gap-3 mb-4" style="color: {group.color};">
						{#if group.icon === 'chip'}
							<svg class="w-6 h-6 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<rect x="7" y="7" width="10" height="10" rx="1"/>
								<path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3"/>
							</svg>
						{:else if group.icon === 'shield'}
							<svg class="w-6 h-6 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 2l7 3v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z"/>
							</svg>
						{:else if group.icon === 'code'}
							<svg class="w-6 h-6 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="16 18 22 12 16 6"/>
								<polyline points="8 6 2 12 8 18"/>
							</svg>
						{:else if group.icon === 'nodes'}
							<svg class="w-6 h-6 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="5" r="2"/>
								<circle cx="5" cy="19" r="2"/>
								<circle cx="19" cy="19" r="2"/>
								<line x1="12" y1="7" x2="5" y2="17"/>
								<line x1="12" y1="7" x2="19" y2="17"/>
								<line x1="7" y1="19" x2="17" y2="19"/>
							</svg>
						{:else}
							<svg class="w-6 h-6 shrink-0" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
							</svg>
						{/if}
						<h3 class="font-semibold text-[var(--color-text-primary)] text-sm tracking-wide">
							{group.title}
						</h3>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each group.skills as skill (skill)}
							<span
								class="px-2.5 py-1 rounded text-xs font-mono border"
								style="
									color: #94a3b8;
									border-color: rgba(255,255,255,0.1);
									background: rgba(255,255,255,0.05);
								"
							>
								{skill}
							</span>
						{/each}
					</div>
				</div>
			</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skill-card {
		transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
	}
	.skill-card:hover {
		border-color: rgba(34, 211, 238, 0.4) !important;
		border-color: color-mix(in srgb, var(--card-color) 40%, transparent) !important;
		box-shadow: 0 0 20px rgba(34, 211, 238, 0.15);
		box-shadow: 0 0 20px color-mix(in srgb, var(--card-color) 15%, transparent);
		transform: translateY(-4px);
	}
</style>
