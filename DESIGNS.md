# Design Variants

Six visually distinct design variants live on parallel branches. Each ships with a working dark/light theme toggle in the navbar.

## Variants

| Branch | Aesthetic | Fonts | Distinctive feature |
|---|---|---|---|
| `design/operator` | Operator/terminal | Inter + JetBrains Mono | `$ whoami`, typewriter, facts pane |
| `design/editorial` | Magazine literary | Newsreader serif + JetBrains Mono | Italic emphasis, drop cap, pull quote, gold/sienna |
| `design/brutalist` | Swiss brutalist | JetBrains Mono only | ALL-CAPS, terminal green, heavy borders, ASCII corner brackets |
| `design/aurora` | Holographic visual flex | Inter + JetBrains Mono | Iridescent gradient name, animated aurora bg, glassmorphism, mouse spotlight |
| `design/premium-minimal` | Linear/Vercel polish | **Geist** Sans + Mono | Gradient-fade name, hairline borders, refined |
| `design/performance` | Technical flex | **System fonts only** (no web fonts) | Live FCP/LCP/CLS/FPS/MEM widget in nav |

## Switching variants

Each variant has different `@fontsource/*` dependencies. After checkout, run `npm install` to sync `node_modules` to that branch's `package.json`:

```bash
git checkout design/aurora
npm install        # sync deps for this variant
npm run dev        # preview
```

## Per-variant key files

All variants share:
- `src/lib/components/ThemeToggle.svelte` — sun/moon toggle
- `src/app.html` — no-flash theme boot script
- `src/routes/+layout.ts` — static prerender
- `_headers` — security + cache headers
- `src/routes/rss.xml/+server.ts` — RSS feed
- `src/lib/components/ReadingProgress.svelte` — blog post progress bar

What differs per variant:
- `src/app.css` — fontsource imports + theme tokens
- `src/lib/components/{Hero,About,Skills,Experience,Projects,Contact,Navbar}.svelte` — visual treatment

## Theme toggle

Every variant defaults to `prefers-color-scheme` on first visit. User choice persists in `localStorage`.
The `<html data-theme="light|dark">` attribute is set by an inline script in `app.html` BEFORE first paint, preventing FOUC.

## Verify a variant

```bash
npm run check      # 0 errors expected
npm run build      # ✓ built clean
npm run dev        # http://localhost:5173
```

Mobile + light/dark coverage tested via Playwright. All variants have 0 mobile horizontal overflow (excluding intentional overflow-hidden decorations).

## Pick a winner & merge

```bash
git checkout main
git merge design/<variant>
```
