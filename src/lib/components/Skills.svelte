<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	const skillGroups = [
		{
			title: 'Systems & Embedded',
			icon: '⚙️',
			color: 'var(--color-accent-cyan)',
			skills: ['C / C++', 'ARM Assembly', 'Linux Kernel', 'RTOS / FreeRTOS', 'Embedded Systems', 'Device Drivers', 'Memory Management', 'JTAG / GDB']
		},
		{
			title: 'Security & Offensive',
			icon: '🔐',
			color: '#f59e0b',
			skills: ['Android Pentesting', 'Red Teaming', 'Metasploit', 'Frida / Objection', 'Reverse Engineering', 'IDA Free / Ghidra', 'Network Analysis', 'Exploit Development']
		},
		{
			title: 'Languages & Scripting',
			icon: '💻',
			color: 'var(--color-accent-indigo)',
			skills: ['Python', 'TypeScript', 'JavaScript', 'Bash / Shell', 'Go', 'Rust (learning)', 'SQL', 'YAML / Makefile']
		},
		{
			title: 'Web & Mobile',
			icon: '🌐',
			color: '#34d399',
			skills: ['Svelte / SvelteKit', 'React Native', 'Expo', 'Node.js', 'REST APIs', 'WebSockets', 'TailwindCSS', 'Vite']
		},
		{
			title: 'AI / ML',
			icon: '🤖',
			color: '#c084fc',
			skills: ['Computer Vision', 'OpenCV', 'PyTorch', 'LLM Integration', 'Semantic Search', 'Vector Databases', 'CUDA', 'Ollama']
		},
		{
			title: 'Infrastructure & Tools',
			icon: '🛠️',
			color: '#fb7185',
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
			class="transition-all duration-700"
			style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 40}px);"
		>
			<p class="font-mono text-[var(--color-accent-cyan)] text-sm tracking-[0.3em] mb-3">02. SKILLS</p>
			<h2 class="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-12">
				What I Work With
				<span class="block w-12 h-0.5 mt-4" style="background: linear-gradient(90deg, var(--color-accent-cyan), transparent);"></span>
			</h2>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each skillGroups as group, i (group.title)}
				<div
					class="skill-card rounded-lg p-6 border transition-all duration-300 hover:-translate-y-1"
					style="
						background: var(--color-bg-primary);
						border-color: var(--color-border);
						opacity: {visible ? 1 : 0};
						transform: translateY({visible ? 0 : 40}px);
						transition-delay: {visible ? i * 80 : 0}ms;
						--card-color: {group.color};
					"
				>
					<div class="flex items-center gap-3 mb-4">
						<span class="text-2xl">{group.icon}</span>
						<h3 class="font-semibold text-[var(--color-text-primary)] text-sm tracking-wide">
							{group.title}
						</h3>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each group.skills as skill (skill)}
							<span
								class="px-2.5 py-1 rounded text-xs font-mono border"
								style="
									color: {group.color};
									border-color: {group.color}33;
									background: {group.color}0d;
								"
							>
								{skill}
							</span>
						{/each}
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
		border-color: color-mix(in srgb, var(--card-color) 40%, transparent) !important;
		box-shadow: 0 0 20px color-mix(in srgb, var(--card-color) 15%, transparent);
	}
</style>
