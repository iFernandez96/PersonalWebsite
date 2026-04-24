# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

Personal portfolio website for Israel Fernandez. Built with SvelteKit + Tailwind CSS v4.

## Stack

- **Framework**: SvelteKit (Svelte 5, runes mode)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Language**: TypeScript
- **Package Manager**: npm
- **Node**: requires **Node 20.19+ or 22.12+** (Vite 8). Node 18 cannot run `vite build` / `svelte-check` — errors with `CustomEvent is not defined` / `styleText` missing from `node:util`.

## Commands

- `npm run dev` — start dev server (port 5173 or 5174 if busy)
- `npm run build` — production build (needs Node 20+)
- `npm run preview` — preview production build
- `npm run check` — type-check with svelte-check (needs Node 20+)

## Structure

```
src/
  routes/
    +layout.svelte    — root layout, imports app.css, preloads Google Fonts
    +page.svelte      — main page, composes all sections, defines meta/OG tags
  lib/
    components/
      Navbar.svelte     — fixed nav, active-section detection, mobile menu, skip link
      Hero.svelte       — landing section, typewriter role cycle, background orbs
      About.svelte
      Skills.svelte
      Experience.svelte
      Projects.svelte
      Contact.svelte
      BackToTop.svelte  — appears after 600px scroll, smooth-scrolls to top
  app.css             — Tailwind import + @theme vars + global keyframes + prefers-reduced-motion
static/
  IsraelFernandezResume.pdf
```

## About Israel

Systems-level software engineer transitioning toward **Android pentesting / red teaming**. Currently Hardware Systems Software Engineer at Apple (contract via Sasken Technologies). Prior: ~8 years at Gantz-Mountain Intelligence Automation Systems (defense AI startup, Monterey CA) doing embedded systems, Linux kernel development, computer vision, and proprietary hardware.

**Core strengths**: C/C++, Python, Linux internals, ARM assembly, embedded/RTOS, low-level networking
**Web experience**: Svelte/SvelteKit (preferred), TypeScript, React Native/Expo, JavaScript
**Security interest**: Android security, offensive tooling, red teaming

**Links**:
- GitHub: `https://github.com/iFernandez96`
- LinkedIn: `https://www.linkedin.com/in/ifernandez96/`
- Email: `israelfernandez96@gmail.com`

## Design

- Dark theme: deep navy (`#080d1a`) background
- Accent colors: cyan (`#22d3ee`), indigo (`#818cf8`)
- CSS custom properties defined in `app.css` under `@theme`
- JetBrains Mono for monospace/terminal elements
- Scroll-triggered reveal animations via IntersectionObserver (one-shot, `observer.disconnect()` after first intersection)
- Typewriter effect in Hero — recursive `setTimeout` chain (not `setInterval`), pauses when tab is hidden
- Active nav section tracked via rAF-throttled scroll listener (see below)
- `scroll-padding-top: 72px` on `<html>` so anchor-scrolled sections aren't hidden under fixed nav
- Global `prefers-reduced-motion` rule in `app.css` collapses all animations/transitions to 0.001ms

## Critical: Active Nav Section Detection

**DO NOT** use `IntersectionObserver` with a narrow `rootMargin` band (e.g. `-40% 0px -55% 0px`) to track active section. On tall viewports, a short final section (Contact) cannot cover the band when scrolled to the page bottom — it never fires `isIntersecting`, so the last nav link fails to highlight.

**Current implementation in `Navbar.svelte`**: rAF-throttled `scroll` + `resize` listener that:
1. If user is at absolute document bottom (`scrollY + innerHeight >= scrollHeight - 2`), force-activates the last section.
2. Otherwise picks the latest section whose `getBoundingClientRect().top <= innerHeight * 0.3` (trigger line at 30% viewport from top).

This handles all viewport heights and the last-section edge case deterministically.

## Perf: Avoid `bind:scrollY`

`<svelte:window bind:scrollY />` triggers a reactive re-render of the component on **every scroll event**. For components that only care about a threshold (e.g. navbar "scrolled" class at >50px, back-to-top visibility at >600px), use a rAF-throttled `window.addEventListener('scroll', ..., { passive: true })` that only assigns to `$state` when the boolean crosses the threshold. Svelte then only re-renders when the derived state actually changes.

Applied in: `Navbar.svelte` (scrolled class + active section), `BackToTop.svelte` (visibility).

## Critical: Svelte + Tailwind Animation Gotcha

**DO NOT** define `@keyframes` inside Svelte component `<style>` blocks and reference them from Tailwind arbitrary animation classes (e.g. `animate-[myAnim_1s_forwards]`).

Svelte scopes keyframe names with a component hash (e.g. `svelte-HASH-myAnim`), but Tailwind generates `animation: myAnim ...` with the unscoped name — they never match, so the animation silently does nothing.

**Fix**: define all `@keyframes` in `app.css` (global). Currently defined there: `fadeInDown`, `fadeInUp`, `fadeIn`, `scrollLine`, `pulse-glow`.

## Critical: Dynamic Tailwind Classes Don't Work

Tailwind scans source at build time. Classes with interpolated values like `group-hover:text-[{someVar}]` are never generated. Use CSS custom properties + scoped `<style>` rules instead:

```svelte
<!-- BAD -->
<div class="group-hover:text-[{color}]">

<!-- GOOD -->
<div class="my-card" style="--card-color: {color};">
<style>
  .my-card:hover { color: var(--card-color); }
</style>
```

## Per-Component Hover Effects

Skill cards, project cards, experience cards, and contact links all use `color-mix()` for accent-colored border + glow on hover via scoped `<style>` blocks with CSS variables set inline. The pattern is consistent across components.

## Accessibility

- Skip-to-content link at the top of `Navbar.svelte` (visually hidden until focused).
- Mobile hamburger: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label` toggles between "Open menu" / "Close menu".
- Active nav links carry `aria-current="true"`.
- `Escape` key closes the mobile menu (listener registered in Navbar `onMount`).
- Mobile menu closed state uses `visibility: hidden` (transitioned) so links are removed from the tab order, not just visually hidden.
- `:focus-visible` rings on all interactive elements — global default in `app.css` + explicit overrides where needed.
- `aria-live="polite"` on the typewriter output span so screen readers aren't spammed.
- Hero decorative background layers are wrapped in `aria-hidden="true"`.

## Typewriter Effect (Hero)

Uses a self-scheduling recursive `setTimeout` chain — never `setInterval`. The old `setInterval` implementation fired every 65ms regardless of state, so during the 2.2s "hold" after typing completed it would schedule ~33 redundant `setTimeout(() => deleting = true, 2200)` calls per second. The recursive-timeout version only schedules the next tick after work is done.

Also:
- Skips work when `document.hidden` is true (long-idles with a 400ms poll).
- Honors `prefers-reduced-motion`: displays the first role statically, no cycling.
- Cursor blink is pure CSS (`@keyframes cursor-blink`, no JS interval).

## SEO / Meta

`+page.svelte` defines title, description, keywords, canonical, OG tags, and Twitter card. Update `canonical` + og:url when a production domain is finalized (currently `https://israel-fernandez.com/`).
