# Expert Flow — Design Taste Skill

## Active Baseline Configuration
* DESIGN_VARIANCE: 7 (editorial luxury — aszimmetrikus de kontrollált)
* MOTION_INTENSITY: 6 (spring physics, staggered reveal, scroll-triggered)
* VISUAL_DENSITY: 4 (légies, bőséges negatív tér, galériás érzet)

## Brand Identity
* **Display font**: Merriweather (serif, 300 weight, tight line-height)
* **Body font**: DM Sans (sans-serif, clean, olvasható)
* **Font betöltés**: next/font/google — SOHA CDN link
* **Fő háttér**: #f6f3f0 (meleg off-white, papír érzet)
* **Sötét szekciók**: #0a0a0b (meleg off-black, NEM pure #000)
* **Szöveg**: #100f12 (sötét warm gray)
* **Accent**: #363637 (visszafogott, elegáns)
* **Grain overlay**: SVG feTurbulence, opacity 0.025

## Architecture & Conventions
* **Framework**: Next.js 16 (App Router, Server Components default)
* **React**: 19
* **Stílus**: Tailwind CSS 4 + CSS custom properties
* **Animáció**: motion (Framer Motion) — spring physics, staggered reveals
* **Ikonok**: Lucide React
* **TypeScript**: strict mode, nincs `any`
* **RSC Safety**: interactive komponensek `"use client"` leaf component-ként

## Design Engineering Directives

### Tipográfia
* Heading-ek: Merriweather serif, 300 weight, tight letter-spacing (-0.03em → -0.01em)
* Body: DM Sans 400, 1.65 line-height, max-width: 65ch
* Label-ek: 11px, uppercase, 600 weight, 0.14em letter-spacing
* Méretskála: 52/38/30/22/18/16/14/11px (desktop), scale down mobilon

### Színek
* CSS custom properties (@theme inline Tailwind CSS 4-ben)
* Alfa variánsok: text-64, text-48, text-32, text-16, text-8 (hex alpha)
* Sötét szekció: saját light- variánsok (light-88, light-64, light-48, light-32)
* NINCS neon glow, nincs purple-blue AI gradient, nincs pure black

### Layout
* Container: max-width 940px, padding 32px (24px tablet, 16px mobil)
* Aszimmetrikus grid: 5fr/7fr, 4fr/8fr — NEM mindig 1:1
* Bőséges section padding: 160/120/80px (scale down mobilon)
* Negatív tér TUDATOS használata

### Animációk (motion csomag)
* Spring physics: `type: "spring", stiffness: 100-200, damping: 15-25`
* Staggered reveal: `staggerChildren: 0.08-0.15`
* Scroll-triggered: `whileInView` + `viewport: { once: true, margin: "-80px" }`
* Hover: `scale: 1.02-1.05`, `y: -2`, spring transition
* `prefers-reduced-motion`: media query tiszteletben tartás
* Page transition: AnimatePresence wrapper

### Komponensek
* Noise overlay: fixed SVG feTurbulence háttér
* Marquee: CSS animation, hover pause, shadow edges
* Tab-ok: uppercase label, border-bottom active indicator
* Kártyák: subtle border (#ffffff06-10), hover border-color change + shadow
* Gombok: pill shape (border-radius: 100px), translateY(-1px) hover
* Divider: 1px, text-8 szín (szinte láthatatlan)

## Tiltólista (AI Tells)
* ❌ Inter, Roboto, Arial font
* ❌ CDN font import (@import url(...))
* ❌ Pure #000000 háttér
* ❌ Neon/outer glow box-shadow
* ❌ Purple-blue AI gradient
* ❌ 3 egyforma kártya centered grid
* ❌ Centered hero stock fotóval + "Welcome to our website"
* ❌ Lorem ipsum szöveg
* ❌ `!important` CSS-ben
* ❌ Inline style objektumok (style={{...}})
* ❌ console.log a kódban
* ❌ Linear easing animációkhoz
* ❌ Minden elem egyszerre animálódik (stagger kell)
* ❌ Generikus "Learn More" / "Click Here" CTA

## Minőségi Checklist
- [ ] Responsive: 320px → 2560px
- [ ] Accessibility: semantic HTML, ARIA, keyboard nav, WCAG AA kontrászt
- [ ] Performance: next/image, next/font, lazy loading, CLS < 0.1
- [ ] SEO: egyedi title + description + OG meta minden oldalon
- [ ] Animáció: spring physics, staggered, scroll-triggered, prefers-reduced-motion
- [ ] TypeScript: strict, nincs any, nincs error
- [ ] Design konzisztencia: CSS custom properties, nem hardcoded értékek
