# Space Theme Migration Plan

## Overview

Migrate tonynicola.com from the current Tailwind light/dark blog theme to a **2001: Space Odyssey** inspired design. We looked at the https://github.com/leerob/next-mdx-blog template for an example. The aesthetic is minimal, cinematic, and clinical — cool blue-steel tones, Space Mono terminal typography for metadata, Orbitron for headings, and a live star field with mouse parallax and occasional shooting stars. The theme has two modes: **dark** (deep space, near-black) and **light** (blueprint/star-chart, pale blue-white). All existing blog infrastructure (MDX pipeline, tags, pagination, search) stays intact.

**Reference implementation:** `pages/preview-space.js` (the 2001: Odyssey sub-variant). Read this file first. The star CSS, parallax logic, color tokens, and atmospheric elements are all production-ready there. The migration task is extracting that design into the real site's component architecture.

---

## Confirmed Design Decisions

| Decision                 | Choice                                                         |
| ------------------------ | -------------------------------------------------------------- |
| Theme toggle             | Keep it — build both a dark AND light space variant            |
| Profile photo            | Move to About page only; homepage is minimal text-only         |
| Star field on post pages | Full stars everywhere (consistent immersion)                   |
| Nav link font            | Space Mono                                                     |
| Parallax on mobile       | Disable — `mousemove` unreliable on touch; CSS-only feel stays |
| HAL eye + telemetry      | Homepage only (decorative identity elements)                   |
| Shooting stars           | All pages                                                      |
| Preview pages            | Keep at `/preview-space` as ongoing sandbox                    |

---

## Design System

### Color Tokens — Dark Mode (2001: Odyssey)

```css
--sp-bg: #000008; /* near-black, blue undertone */
--sp-surface: #080c18; /* slightly lifted surface: nav, cards */
--sp-border: rgba(147, 197, 253, 0.13); /* dividers, input borders */
--sp-name: #dde8f5; /* h1, page titles */
--sp-body: #6a8090; /* body text (~5:1 contrast) */
--sp-accent: #93c5fd; /* links, interactive (~8:1) */
--sp-accent-dim: rgba(147, 197, 253, 0.65); /* section labels, metadata */
--sp-social: #5a7890; /* secondary text (~4.8:1) */
--sp-divider-clr: rgba(147, 197, 253, 0.28); /* inline divider text */
--sp-glow: rgba(147, 197, 253, 0.35); /* text-shadow glow on name */
```

### Color Tokens — Light Mode (Blueprint / Star Chart)

The light variant should feel like a NASA technical document or star chart — pale blue-white paper, dark navy ink, faint grid, space elements rendered in blueprint style. Stars are visible but dark (navy dots on pale bg).

```css
--sp-bg: #f0f4ff; /* pale blue-white, like blueprint paper */
--sp-surface: #e4ecff; /* slightly lifted: nav bg */
--sp-border: rgba(30, 58, 138, 0.15); /* thin navy lines */
--sp-name: #0a1628; /* near-black navy */
--sp-body: #1e3a5f; /* dark navy body text */
--sp-accent: #1d4ed8; /* blue-700 links */
--sp-accent-dim: rgba(29, 78, 216, 0.7); /* section labels */
--sp-social: #3b5998; /* medium blue secondary */
--sp-divider-clr: rgba(29, 78, 216, 0.4); /* divider text */
--sp-glow: rgba(29, 78, 216, 0.2); /* subtle glow on name */
```

Light mode stars: dark navy/indigo dots at 0.15–0.3 opacity on the pale background. The star shadow values from `preview-space.js` can reuse the same positions but with `rgba(10,22,80,0.2)` instead of `rgba(255,255,255,0.7)`.

Light mode atmosphere: very subtle pale blue radial gradient from top (`rgba(147,197,253,0.08)`) fading to white — like starlight through a thin atmosphere.

### Typography

| Element                    | Font                                | Weight | Size                       | Letter-spacing |
| -------------------------- | ----------------------------------- | ------ | -------------------------- | -------------- |
| Site name (header)         | Orbitron                            | 700    | 16px desktop / 14px mobile | 0.08em         |
| Page h1 (homepage name)    | Orbitron                            | 700    | 20px desktop / 18px mobile | 0.1em          |
| Page h1 (blog/post titles) | Orbitron                            | 700    | 28–48px responsive         | tight          |
| Nav links                  | Space Mono                          | 400    | 13px                       | 0.06em         |
| Section labels             | Space Mono                          | 700    | 9px                        | 0.22em         |
| Telemetry readout          | Space Mono                          | 400    | 9px                        | 0.12em         |
| Divider text               | Space Mono                          | 400    | 10px                       | 0.15em         |
| Body text                  | System stack\*                      | 400    | 15px                       | 0              |
| Post body prose            | System stack\*                      | 400    | 16–18px                    | 0              |
| Social links               | Space Mono                          | 400    | 12px                       | 0.1em          |
| Tags / metadata dates      | Space Mono                          | 400    | 11px                       | 0.05em         |
| Code blocks                | Space Mono (or existing Prism font) | 400    | 14px                       | 0              |

\*System stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

Body text intentionally stays in system font. Space Mono is for metadata, labels, and navigation only — not long-form prose. This keeps reading comfortable.

### Load Fonts In

Add to `pages/_document.js` inside `<Head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Space+Mono:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

---

## Star Field Architecture

Extracted from `preview-space.js`. This logic is already working and tested — copy it directly.

### How It Works

Two empty `<div>` elements use CSS `::before` / `::after` pseudo-elements with the `box-shadow` trick to render ~80 small stars and 10 large stars from a single pixel element. Positions are **module-level string constants** (not computed at render time), so server and client produce identical CSS and there is no React hydration mismatch.

### Module-Level Constants (copy from preview-space.js)

```js
const STARS_SM = `45px 78px 0 0 rgba(255,255,255,0.7), ...` // ~80 positions
const STARS_LG = `320px 145px 0 1px rgba(255,255,255,0.95), ...` // 10 positions
```

For **light mode**, define separate constants using dark navy dots:

```js
const STARS_SM_LIGHT = STARS_SM.replace(
  /rgba\(255,255,255,[\d.]+\)/g,
  (_, opacity) => `rgba(10,22,80,0.18)`
)
// Or just define new constants with the same positions but dark colors
```

### CSS Classes Needed (in global stylesheet)

```css
@keyframes sp-twinkle {
  0%,
  100% {
    opacity: 1;
  }
  40% {
    opacity: 0.2;
  }
}
@keyframes sp-shoot-a {
  /* from preview-space.js */
}
@keyframes sp-shoot-b {
  /* from preview-space.js */
}

.sp-stars-sm,
.sp-stars-lg {
  will-change: transform;
  transition: transform 0.18s ease-out;
}
.sp-stars-sm::before {
  /* small star field — box-shadow: STARS_SM (injected via <style> in _app or _document) */
}
.sp-stars-lg::after {
  /* large twinkling stars — box-shadow: STARS_LG */
}
.sp-shoot-a,
.sp-shoot-b {
  /* shooting star elements */
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .sp-stars-sm,
  .sp-stars-lg {
    transition: none;
  }
  .sp-shoot-a,
  .sp-shoot-b {
    animation: none;
    opacity: 0;
  }
}
```

Because `STARS_SM` and `STARS_LG` are dynamic JS strings, inject the star CSS via a `<style>` tag in `_app.js` `<Head>`, not in a static CSS file.

### Parallax (Mouse)

```js
// In LayoutWrapper or a SpaceBackground component
const smRef = useRef(null)
const lgRef = useRef(null)
const rafRef = useRef(null)

useEffect(() => {
  // Disable on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return

  const onMove = (e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      if (smRef.current) smRef.current.style.transform = `translate(${x * 10}px, ${y * 7}px)`
      if (lgRef.current) lgRef.current.style.transform = `translate(${x * 22}px, ${y * 15}px)`
      rafRef.current = null
    })
  }
  window.addEventListener('mousemove', onMove)
  return () => {
    window.removeEventListener('mousemove', onMove)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }
}, [])
```

### Overflow Clipping (prevents scrollbar flicker)

Wrap all star and shooting star divs in a single container:

```jsx
<div
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 1,
  }}
>
  <div className="sp-stars-sm" ref={smRef} />
  <div className="sp-stars-lg" ref={lgRef} />
  <div className="sp-shoot-a" />
  <div className="sp-shoot-b" />
</div>
```

---

## File-by-File Changes

### 1. `pages/_document.js`

- Add Orbitron + Space Mono `<link>` tags in `<Head>` (see Typography section above)
- Add `<body className="dark">` if defaulting to dark mode on first load (to prevent flash of light theme)

### 2. `css/tailwind.css`

- Add CSS custom property blocks for both dark and light mode tokens:
  ```css
  :root {
    /* light space tokens */
  }
  .dark {
    /* dark space tokens */
  }
  ```
- Add the `@keyframes sp-twinkle` animation
- Add focus ring utility: `.sp-focus { outline: 2px solid var(--sp-accent); outline-offset: 2px; }`

### 3. `tailwind.config.js`

- Register font families:
  ```js
  fontFamily: {
    sans:    ['Inter', ...defaultTheme.fontFamily.sans],   // existing
    space:   ['"Space Mono"', 'monospace'],                // new
    orbital: ['"Orbitron"', 'sans-serif'],                 // new
  }
  ```
- Register space color tokens as Tailwind colors so Tailwind classes (e.g. `text-sp-accent`) work in layout files:
  ```js
  colors: {
    sp: {
      bg:         'var(--sp-bg)',
      surface:    'var(--sp-surface)',
      border:     'var(--sp-border)',
      name:       'var(--sp-name)',
      body:       'var(--sp-body)',
      accent:     'var(--sp-accent)',
      'accent-dim': 'var(--sp-accent-dim)',
      social:     'var(--sp-social)',
    },
    // ... existing colors
  }
  ```

### 4. `components/SpaceBackground.js` — NEW FILE

Extract the entire background system into a dedicated component so it can be used in `LayoutWrapper` without cluttering it. This component renders:

- The fixed background div (z-index: -1)
- The star container (z-index: 1, overflow hidden)
- Star layers with parallax refs
- Shooting stars
- The atmospheric layer (Odyssey cold starlight from above — `psp-odyssey-light` class)

```jsx
// components/SpaceBackground.js
import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function SpaceBackground() {
  const { resolvedTheme } = useTheme()
  const smRef = useRef(null)
  const lgRef = useRef(null)
  // ... parallax useEffect (see Parallax section above)

  return (
    <>
      {/* Fixed bg — behind everything */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'var(--sp-bg)',
          backgroundImage:
            resolvedTheme === 'dark'
              ? 'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.05) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(147,197,253,0.08) 0%, transparent 55%)',
        }}
      />

      {/* Star field + shooting stars — clipped container */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div className="sp-stars-sm" ref={smRef} />
        <div className="sp-stars-lg" ref={lgRef} />
        <div className="sp-shoot-a" />
        <div className="sp-shoot-b" />
      </div>

      {/* Atmosphere — cold starlight from above */}
      <div
        style={{
          position: 'fixed',
          top: -180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center bottom, rgba(147,197,253,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </>
  )
}
```

The `STARS_SM` and `STARS_LG` constants (and their light-mode equivalents) should live in a new `lib/stars.js` file and be imported by both `SpaceBackground.js` and `_app.js` (for the injected `<style>` tag).

### 5. `lib/stars.js` — NEW FILE

```js
// Module-level constants — identical on server and client, no hydration mismatch
export const STARS_SM = `45px 78px 0 0 rgba(255,255,255,0.7), ...` // copy from preview-space.js
export const STARS_LG = `320px 145px 0 1px rgba(255,255,255,0.95), ...` // copy from preview-space.js

export const STARS_SM_LIGHT = STARS_SM.replace(
  /rgba\(255,255,255,([\d.]+)\)/g,
  (_, a) => `rgba(10,22,80,${(parseFloat(a) * 0.25).toFixed(2)})`
)
export const STARS_LG_LIGHT = STARS_LG.replace(
  /rgba\(255,255,255,([\d.]+)\)/g,
  (_, a) => `rgba(10,22,80,${(parseFloat(a) * 0.2).toFixed(2)})`
)

export const STAR_CSS = (sm, lg) => `
  .sp-stars-sm { will-change: transform; transition: transform 0.18s ease-out; }
  .sp-stars-sm::before {
    content: ''; position: fixed; top: 0; left: 0;
    width: 1px; height: 1px; border-radius: 50%;
    box-shadow: ${sm}; pointer-events: none;
  }
  .sp-stars-lg { will-change: transform; transition: transform 0.12s ease-out; }
  .sp-stars-lg::after {
    content: ''; position: fixed; top: 0; left: 0;
    width: 2px; height: 2px; border-radius: 50%;
    box-shadow: ${lg};
    animation: sp-twinkle 5s ease-in-out infinite; pointer-events: none;
  }
`
```

In `_app.js`, inside `<Head>`, inject:

```jsx
import { useTheme } from 'next-themes'
import { STARS_SM, STARS_LG, STARS_SM_LIGHT, STARS_LG_LIGHT, STAR_CSS } from '@/lib/stars'

// Inside App component:
const { resolvedTheme } = useTheme()
const sm = resolvedTheme === 'dark' ? STARS_SM : STARS_SM_LIGHT
const lg = resolvedTheme === 'dark' ? STARS_LG : STARS_LG_LIGHT

// In JSX:
<Head>
  <style>{STAR_CSS(sm, lg)}</style>
</Head>
```

### 6. `components/LayoutWrapper.js`

Full redesign. Structure:

```
<SectionContainer>
  <SpaceBackground />                        ← new
  <div style={{ position: 'relative', zIndex: 3, minHeight: '100vh',
                display: 'flex', flexDirection: 'column' }}>
    <header>                                 ← redesigned
    <main className="mb-auto">
      {children}
    </main>
    <Footer />                               ← redesigned
  </div>
</SectionContainer>
```

**Header design:**

```jsx
<header
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid var(--sp-border)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(0,0,8,0.7)', // dark mode; light mode: rgba(240,244,255,0.85)
  }}
>
  {/* Site title */}
  <Link href="/">
    <span
      style={{
        fontFamily: '"Orbitron", sans-serif',
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: '0.08em',
        color: 'var(--sp-name)',
      }}
    >
      TONY NICOLA
    </span>
  </Link>

  {/* Desktop nav — hidden on mobile */}
  <nav className="hidden sm:flex" style={{ gap: 32, alignItems: 'center' }}>
    {headerNavLinks.map((link) => (
      <Link
        key={link.title}
        href={link.href}
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 12,
          letterSpacing: '0.06em',
          color: 'var(--sp-social)',
          textDecoration: 'none',
          // active page: color: var(--sp-accent)
        }}
      >
        {link.title.toUpperCase()}
      </Link>
    ))}
    <ThemeSwitch />
  </nav>

  {/* Mobile: theme toggle + hamburger */}
  <div className="sm:hidden" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <ThemeSwitch />
    <MobileNav />
  </div>
</header>
```

Remove the old Tailwind classes from header links (`text-gray-900 dark:text-gray-100 p-1 sm:p-4 font-medium`). Replace with inline space styles or new Tailwind utility classes.

Active nav link detection: compare `router.pathname` to `link.href` and apply `color: var(--sp-accent)` to the current page's link.

### 7. `components/ThemeSwitch.js`

Update the icon/button to fit the space aesthetic:

- Icon color: `var(--sp-social)` at rest, `var(--sp-accent)` on hover
- No background / no border on the button
- Tooltip or aria-label: "Toggle starfield theme"
- Consider replacing the sun/moon SVG with a ◑ symbol or a simple star icon

### 8. `components/MobileNav.js`

Update the slide-in overlay:

- Background: `rgba(0,0,8,0.97)` dark / `rgba(240,244,255,0.97)` light (instead of `gray-200/gray-800`)
- Nav link font: Space Mono, 20px, `letter-spacing: 0.1em`
- Nav link color: `var(--sp-name)` → hover `var(--sp-accent)`
- Hamburger icon color: `var(--sp-social)` → `var(--sp-accent)` on open
- Close/open transition: existing `translate-x-full` animation is fine, just update colors

Minimum tap target sizes:

- Hamburger button: `min-width: 44px; min-height: 44px`
- Each nav link item: `padding: 14px 48px` (currently `py-4 px-12` which is close — verify 44px height)

### 9. `components/Footer.js`

```jsx
<footer style={{ borderTop: '1px solid var(--sp-border)', padding: '32px 24px', marginTop: 48 }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Keep existing SocialIcon components, tint to var(--sp-social) */}
    </div>
    <div
      style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.1em',
        color: 'var(--sp-social)',
      }}
    >
      {siteMetadata.author} · © {new Date().getFullYear()}
    </div>
  </div>
</footer>
```

### 10. `components/Tag.js`

Current: `text-blue-500 hover:text-blue-600 font-medium uppercase`

New:

```jsx
<Link
  href={`/tags/${tag}`}
  style={{
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    letterSpacing: '0.1em',
    color: 'var(--sp-accent)',
    border: '1px solid var(--sp-border)',
    borderRadius: 3,
    padding: '2px 8px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'inline-block',
    // hover: border-color: var(--sp-accent)
  }}
>
  {tag}
</Link>
```

### 11. `pages/index.js` — New Minimal Homepage

Replace the entire current About page content. The new homepage is the minimal card from the preview.

Structure:

```jsx
// No profile photo. Photo lives on /about.
<main style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px 80px' }}>

  {/* Name */}
  <h1 style={{ fontFamily: '"Orbitron"', fontSize: 20, fontWeight: 700,
               letterSpacing: '0.1em', color: 'var(--sp-name)',
               textShadow: '0 0 24px var(--sp-glow)', marginBottom: 28 }}>
    Tony Nicola
  </h1>

  {/* Bio — two short paragraphs (not the full about.js bio) */}
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--sp-body)', marginBottom: 16 }}>
    Data engineer at <a href="...">Palomar</a>, where I build pipelines...
  </p>
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--sp-body)', marginBottom: 44 }}>
    Outside the terminal, I'm usually doing <a href="/blog/JiuJitsuBlackbelt">Brazilian Jiu-Jitsu</a>...
  </p>

  {/* Section divider + label */}
  <p style={{ fontFamily: '"Space Mono"', fontSize: 10, color: 'var(--sp-divider-clr)',
              letterSpacing: '0.15em', marginBottom: 32 }}>
    ──── TRANSMISSION LOG ◉ ────
  </p>

  {/* Recent posts — pull top 6 from getStaticProps */}
  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 52px 0' }}>
    {posts.map(({ title, href }) => (
      <li key={href} style={{ marginBottom: 11 }}>
        <a href={href} style={{ fontSize: 15, color: 'var(--sp-accent)', textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: 9 }}>
          <span style={{ opacity: 0.5, fontSize: 12 }}>○</span>
          {title}
        </a>
      </li>
    ))}
  </ul>

  {/* Social links */}
  <div style={{ display: 'flex', gap: 20 }}>
    {[email, github, linkedin].map(...)}
  </div>
</main>
```

**Data fetching:** Add `getStaticProps` to pull the 6 most recent non-draft posts. Use the existing `getAllFilesFrontMatter` utility from `lib/mdx.js`.

**HAL 9000 elements (homepage only):** The telemetry readout (`DISCOVERY I · HAL 9000 UNIT · SYS: NOMINAL`) and HAL eye circle from `preview-space.js` should render only on the homepage. The cleanest way: render them directly in `pages/index.js`, not in `LayoutWrapper`.

**Mobile homepage adjustments:**

- `padding: 40px 20px 60px` on small screens
- `fontSize: 18px` for the h1 name
- Post list items: ensure `min-height: 44px` for tap targets (add padding)
- Social links: `gap: 24px`, `fontSize: 13px`, `min-height: 44px`

### 12. `pages/about.js` — NEW FILE

Create `/about` with the full bio and profile photo currently in `pages/index.js`. Structure mirrors the current `index.js` About content:

- Profile photo with space glow: `box-shadow: 0 0 40px rgba(147,197,253,0.2), 0 0 80px rgba(147,197,253,0.06)`
- Full bio paragraphs (data engineer, BJJ, 3D printer, etc.)
- Social icon row (the existing `<SocialIcon>` components)
- Apply space color tokens to all text

Add `About` to `data/headerNavLinks.js`:

```js
{ href: '/about', title: 'About' },
```

The current `pages/index.js` has the hover-animated dual-image effect (`imageBorder`, `image-hover`). Keep this interaction — it's a nice touch. Just re-skin the surrounding card in the space palette.

### 13. `layouts/ListLayout.js` — Blog Listing

Apply space color tokens to all elements. Specific changes:

**Search input:**

```jsx
style={{
  background: 'var(--sp-surface)',
  border: '1px solid var(--sp-border)',
  color: 'var(--sp-body)',
  borderRadius: 6,
  fontFamily: '"Space Mono", monospace',
  fontSize: 13,
  // focus: border-color: var(--sp-accent)
}}
placeholder="search transmissions"
```

**Post list items:**

- Date: Space Mono, 11px, `var(--sp-social)`
- Post title: 20px, `var(--sp-name)`, hover `var(--sp-accent)`
- Summary: 14px, `var(--sp-body)`
- Tags: use updated `Tag` component (see §10)
- Divider between posts: `border-color: var(--sp-border)`

**H1 page title ("All Posts"):**

- Orbitron, 28–36px, `var(--sp-name)`

**Pagination:** Style next/prev links to use `var(--sp-accent)` and Space Mono font.

### 14. `layouts/PostLayout.js` — Post Reading View

**Header:**

- Post title: Orbitron 700, responsive size (`clamp(22px, 4vw, 36px)`)
- Published date: Space Mono, 11px, `var(--sp-social)`

**Sidebar (author block):**

- Profile photo: same glow treatment as `/about` page
- Author name: Space Mono, 13px, `var(--sp-name)`

**Prose body:**

- Dark mode: override `@tailwindcss/typography` dark prose to use `--sp-body` for text
- Light mode: override to use `--sp-body` for text
- Links in prose: `var(--sp-accent)`, underline
- Inline code: Space Mono, `background: rgba(147,197,253,0.08)`, `color: var(--sp-accent)`
- Code blocks: dark bg (`#080c18`), Prism highlighting stays as-is
- HR dividers: `border-color: var(--sp-border)`
- Blockquotes: `border-left-color: var(--sp-accent-dim)`

**Prev / Next navigation:**

- Space Mono font, `var(--sp-accent)` links

### 15. `components/SectionContainer.js`

Ensure `max-width` and padding work with the space background (background is fixed, so SectionContainer only constrains the content column). Verify it doesn't set a background color that would cover the stars.

---

## Responsive Design Specs

### Breakpoints

Using existing Tailwind defaults:

- `sm`: 640px (mobile nav collapses here)
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Header

| Viewport | Behavior                                              |
| -------- | ----------------------------------------------------- |
| < 640px  | Site title hidden; show hamburger + theme toggle only |
| ≥ 640px  | Site title + horizontal nav links + theme toggle      |

The current `hidden sm:block` pattern on the site title and nav links already handles this — preserve it.

### Homepage (index.js)

| Viewport | Padding          | Name size | Body size |
| -------- | ---------------- | --------- | --------- |
| < 640px  | `40px 20px 60px` | 18px      | 14px      |
| ≥ 640px  | `60px 24px 80px` | 20px      | 15px      |

### Blog Listing (ListLayout)

| Viewport | Layout                                                                        |
| -------- | ----------------------------------------------------------------------------- |
| < 640px  | Date stacks above title (single column)                                       |
| ≥ 640px  | Date left (1 col) + title/summary right (3 col) via existing `xl:grid-cols-4` |

### Post Layout (PostLayout)

| Viewport | Layout                                                         |
| -------- | -------------------------------------------------------------- |
| < 640px  | Author info stacks above post content                          |
| ≥ 1280px | Sidebar left (1 col) + content right (3 col) via existing grid |

### Touch / Mobile Star Field

- **Parallax**: disabled on touch devices (`pointer: coarse` media query check before adding `mousemove` listener)
- **Shooting stars**: CSS-only, no change needed
- **Star density**: keep full density — the box-shadow technique has negligible perf impact even on mobile

### Tap Target Sizes (WCAG 2.5.5, Apple HIG)

All interactive elements must have a minimum 44×44px hit area:

- Nav links in header: `padding: 12px 16px` ensures vertical size
- Mobile nav items: `padding: 14px 48px` — verify ≥ 44px height
- Social links on homepage: add `padding: 8px 0` so they're tappable
- Theme toggle button: `width: 40px; height: 40px` minimum (add padding if needed)
- Hamburger button: already `w-8 h-8` (32px) — increase to `w-11 h-11` (44px)
- Tag pills: `padding: 4px 10px; min-height: 28px` — for tags in lists, ensure surrounding `<li>` has enough vertical padding

---

## Accessibility Requirements

### Contrast — All WCAG AA (4.5:1 normal text, 3:1 large text)

Dark mode (bg `#000008`):

| Element                     | Color     | Approx ratio | Pass  |
| --------------------------- | --------- | ------------ | ----- |
| H1 name                     | `#dde8f5` | ~18:1        | ✓ AAA |
| Body text                   | `#6a8090` | ~5:1         | ✓ AA  |
| Accent links                | `#93c5fd` | ~8:1         | ✓ AAA |
| Social links                | `#5a7890` | ~4.8:1       | ✓ AA  |
| Nav links (Space Mono 12px) | `#5a7890` | ~4.8:1       | ✓ AA  |

Light mode (bg `#f0f4ff`):

- Verify all `--sp-body` and `--sp-social` values against the pale bg
- Dark navy body text `#1e3a5f` on `#f0f4ff` should easily exceed 7:1

### Focus States

Every interactive element (links, buttons, inputs) must have a visible focus outline:

```css
:focus-visible {
  outline: 2px solid var(--sp-accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

Remove any `outline: none` or `focus:outline-none` Tailwind classes that suppress focus rings (currently present in `MobileNav.js` — `focus:outline-none`). Replace with the space focus ring.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .sp-stars-lg::after {
    animation: none;
  }
  .sp-shoot-a,
  .sp-shoot-b {
    animation: none;
    opacity: 0;
  }
  .sp-stars-sm,
  .sp-stars-lg {
    transition: none;
  }
}
```

### Screen Reader Considerations

- Star field divs: `aria-hidden="true"` on the star container and shooting star divs
- HAL eye element: `aria-hidden="true"`
- Telemetry readout: `aria-hidden="true"` (decorative)
- Section label ("TRANSMISSION LOG"): treat as decorative, `aria-hidden="true"` if it duplicates visible heading
- Theme toggle: `aria-label="Switch to light/dark theme"`

---

## Performance

### Fonts

- Load only needed weights: Orbitron 700, Space Mono 400 + 700 (`3` weights total)
- `display=swap` prevents FOIT
- Both are Google Fonts — cached after first visit

### Star Field

- Box-shadow renders ~90 stars from 2 DOM elements (1px pseudo-elements). Composited on GPU.
- `will-change: transform` on star layers enables hardware compositing before first mouse move
- No JavaScript loops or DOM manipulation for individual stars

### Animations

- `sp-twinkle` animates only `opacity` — GPU composited, no paint
- Shooting stars animate only `transform` and `opacity` — GPU composited
- Parallax uses `requestAnimationFrame` with early exit if frame already queued

### Images

- Profile photo on `/about`: ensure it's appropriately sized (currently `w-48 h-48` = 192×192px). Serve a 2× version (384×384px) for retina
- The space background uses zero images — pure CSS

---

## Implementation Order

Execute in this order to avoid broken intermediate states:

1. **`pages/_document.js`** — Add Google Fonts. Everything else can load without them but fonts should be first.
2. **`lib/stars.js`** — Create the star constants and CSS generator.
3. **`css/tailwind.css`** — Add CSS custom property blocks for both modes, keyframes, focus ring.
4. **`tailwind.config.js`** — Register `font-space`, `font-orbital`, and `sp-*` color tokens.
5. **`_app.js`** — Inject the star CSS `<style>` tag (theme-aware, uses `lib/stars.js`).
6. **`components/SpaceBackground.js`** — Create the new background component.
7. **`components/LayoutWrapper.js`** — Integrate `SpaceBackground`, redesign header. Test all pages render without errors before continuing.
8. **`components/MobileNav.js`** — Space restyle. Test on actual mobile viewport.
9. **`components/Footer.js`** — Space restyle.
10. **`components/Tag.js`** — Space pill style.
11. **`components/ThemeSwitch.js`** — Style to match space palette.
12. **`data/headerNavLinks.js`** — Add `{ href: '/about', title: 'About' }`.
13. **`pages/about.js`** — Create with content from current `index.js`. Add profile photo glow.
14. **`pages/index.js`** — Replace with minimal card homepage. Add `getStaticProps` for recent posts.
15. **`layouts/ListLayout.js`** — Space restyle.
16. **`layouts/PostLayout.js`** — Space restyle. Override `prose` typography.
17. **Smoke test all routes**: `/`, `/about`, `/blog`, `/blog/[slug]`, `/projects`, `/tags`, `/tags/[tag]`, `/404`
18. **Light mode QA**: Toggle theme on every page. Verify contrast, star color inversion, atmospheric elements.
19. **Mobile QA**: Test at 375px, 414px, 768px viewports. Tap targets, font legibility, nav overlay.
20. **Reduced motion QA**: Enable `prefers-reduced-motion` in OS settings, verify no animations run.

---

## Open Questions (resolved during build)

These were discussed and decided before writing this plan. Listed for agent reference:

- **Dark/light toggle:** Keep ThemeSwitch. Light mode = blueprint/star-chart variant (pale `#f0f4ff` bg, dark navy text, faint dark stars).
- **Profile photo:** Homepage is photo-free. Photo lives on `/about` with a blue glow treatment.
- **Star field on posts:** Full stars everywhere, all pages.
- **Nav font:** Space Mono.
- **Preview pages:** Keep `pages/preview-space.js` and `pages/preview.js` as-is. They do not need to be migrated or deleted.

---

## Reference Files

- `pages/preview-space.js` — Complete working implementation of the Odyssey theme. All CSS, star constants, component structure, and atmospheric elements are here. It is the ground truth for this migration.
- `pages/preview.js` — The original leerob minimal layout that inspired the homepage structure.
- `data/siteMetadata.json` — Author name, email, GitHub, LinkedIn, image paths.
- `lib/mdx.js` — `getAllFilesFrontMatter(folder)` is the function to use in `getStaticProps` on the new homepage.
