# WEBSITE‑AGENT.md — Process Integrity AM

## Instructions

This is the marketing site for **Process Integrity AM**, an additive manufacturing consultancy. The site is a React + Vite + Framer Motion SPA deployed to GitHub Pages.

**Before making any changes:**
- Read `src/data/site.js` for global brand config
- Read the relevant `src/data/*.js` file for the section you are editing
- Content lives in data files. Components are rendering‑only. Never hardcode text in JSX.
- Use `npm run dev` for local development. Vite HMR on `localhost:5173`.
- Use `npm run build` to verify production output before committing.
- Never commit `node_modules`, `dist`, or `.env`.

**Writing style:**
- Follow `Writing_Persona.md` at the repo root: Scientific Pragmatist voice. No fluff. No superlatives. No "thrilled," "passionate," "groundbreaking." Declarative sentences. Cause before effect. Radical honesty.
- All company/client references in blog posts are anonymized. No former employer names.
- Verify every quantitative claim against source documents in `knowledge/` before publishing.

## Rules

### Content rules
- No company names in blog posts or case studies. Use anonymized descriptions ("a 15‑printer facility").
- No AI‑assisted automation claims on the site (removed per owner direction).
- No pricing on the services page (removed per owner direction).
- ISRO/NAL not listed as partners or clients (volunteered samples, not commissioned work).
- Stats must be verifiable from source documents. Do not invent numbers.

### Component rules
- Every visible section on the homepage is a `src/sections/*.jsx` file. Do not inline sections in pages.
- Reusable UI elements live in `src/components/*.jsx`. Check before creating duplicates.
- Form submissions go to Formspree via `fetch()`. Never use `<form action="">` with page redirects.
- External links (Cal.com) open in new tabs via `<a target="_blank">`.
- CtaButton auto‑detects external URLs (`href.startsWith('http')`) and renders `<a>` instead of `<Link>`.

### Styling rules
- Use Tailwind utility classes. Custom CSS lives in `src/index.css` under `@layer components`.
- Never introduce colors outside the design system palette (see below).
- Do not use `transition: all`. Target specific properties.
- Respect `prefers‑reduced‑motion` — all Framer Motion variants should check the media query or use `useReducedMotion()`.

### Animation rules
- Use Framer Motion `variants` + `staggerChildren: 0.1` for card grids.
- Use `whileHover` with spring physics for interactive elements (stiffness: 300, damping: 20).
- Use `useScroll` + `useTransform` for parallax. Do not animate `width`/`height`/`top`/`left`.
- `AnimatePresence` for enter/exit transitions (mobile menu, blog post expand, page transitions).
- Animate 1‑2 key elements per view maximum. Do not over‑animate.

### Marketing & SEO skills

The project includes marketing skills in `.opencode/skills/`. Load the relevant skill via the `Skill` tool before working on that domain.

| Skill | When to use |
|-------|-------------|
| `content-strategy` | Planning blog topics, content pillars, or editorial calendar — before writing new posts |
| `copy-editing` | Reviewing or improving existing blog copy — apply the Seven Sweeps framework before publishing |
| `schema` | Adding or fixing Article/BlogPosting structured data on blog post pages |
| `seo-audit` | Auditing blog for technical SEO, meta tags, heading structure, or indexability issues |
| `site-architecture` | Planning blog URL structure, navigation, or search UX design |

## Colour Scheme

### Palette

| Token | Hex | Tailwind Class | CSS Variable | Role |
|-------|-----|---------------|--------------|------|
| Base | `#333333` | `bg-base` | `--color-base` | Page body background (80% visual weight) |
| Surface | `#3D3D3D` | `bg-surface` | — | Cards, section containers (mid‑tone) |
| Grounding | `#1A1F2E` | `bg-grounding` | `--color-grounding` | Nav, footer, form inputs, deep structural elements (15%) |
| Safety (Accent) | `#FFCC00` | `text-safety`, `bg-safety` | `--color-accent` | CTAs, active states, gauges, dividers, focus rings (5%) |
| Steel (Text) | `#E0E0E0` | `text-steel` | `--color-text-primary` | Body text, nav links, headings |
| Divider | `#4A4A4A` | `border-divider` | — | Borders, rules, section dividers |

### Usage constraints
- **Never** use safety yellow for structural backgrounds or large panels. Accent‑only.
- Text on safety‑yellow backgrounds must use Grounding (`text-grounding`, `#1A1F2E`).
- Do not introduce stray colours, gradients, or pure white/black.

## Typography

| Token | Font | Weights | Tailwind Class | Usage |
|-------|------|---------|---------------|-------|
| Sans | Inter (Google Fonts) | 300–900 | `font-sans` | Body text, headings, nav, CTAs |
| Mono | Roboto Mono (Google Fonts) | 400–700 | `font-mono` | Stats, labels, badges, code-like elements, section labels |

## Sitemap

### Routes

| Route | Page | Source |
|-------|------|--------|
| `/` | HomePage | `src/pages/HomePage.jsx` |
| `/services` | ServicesPage | `src/pages/ServicesPage.jsx` |
| `/blog` | BlogPage | `src/pages/BlogPage.jsx` |
| `/blog/:slug` | BlogPostPage | `src/pages/BlogPostPage.jsx` |
| `*` | NotFoundPage | `src/pages/NotFoundPage.jsx` |

### Homepage Sections (scroll order, all on `/`)

| # | Section ID | Component | Content |
|---|-----------|-----------|---------|
| 1 | `#hero` | `Hero.jsx` | Headline, subtitle, 3‑pill stat bar (gauge + specimen tray + arc gauge), CTAs |
| 2 | `#about` | `AboutMe.jsx` | Photo, personal narrative (3 paragraphs), stat badges, links |
| 3 | `#proof` | `Proof.jsx` | Case study FPY‑001, 4 supporting stat counters with mini SVG indicators |
| 4 | `#problem` | `Problem.jsx` | 4 problem cards (grounding) + 3 persona cards (surface) |
| 5 | `#services` | `ServicesOverview.jsx` | Top 6 service cards (from 9 total) + "View Full Catalog" CTA |
| 6 | `#process` | `Process.jsx` | 4‑step workflow with flow arrows, G‑code background, calibration ruler marks |
| 7 | `#credentials` | `Credentials.jsx` | 4 credential items (icon‑circle checkmarks) |
| 8 | `#contact` | `Contact.jsx` | Contact info + CalendlyCard + ContactForm (Formspree AJAX) |

### Services Page (`/services`)

Lists all 9 services with full detail cards (What it is, Value, Deliverables bullets). Order:

| # | ID | Badge |
|---|-----|-------|
| 1 | `#training` | Workshop · 2–5 Days |
| 2 | `#audit` | Onsite · 2–3 Weeks |
| 3 | `#optimization` | Remote‑Friendly |
| 4 | `#equipment` | Retainer or Commission |
| 5 | `#research` | Remote · Advisory |
| 6 | `#qualification` | Structured · Multi‑Month |
| 7 | `#dfm` | Remote · Per Product |
| 8 | `#quality` | Custom · Per Engagement |
| 9 | `#fractional` | Part‑Time · Strategic |

### Blog Index (`/blog`)

Lead magnet card (email‑for‑download) at top. Below: search bar, sort controls, post cards (linking to individual `/blog/:slug` pages). Each card shows author, date, excerpt, tags, and like count.

### Blog Post (`/blog/:slug`)

Individual post page with full content, structured data (Article/BlogPosting schema), author attribution, tags, and like button. Back navigation to `/blog`.

## Architecture

### Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 |
| Build | Vite 6 |
| Routing | React Router v7 (`BrowserRouter`, basename: `/Process-Integrity-AM`) |
| Animation | Framer Motion 12 |
| Styling | Tailwind CSS 3 (custom theme in `tailwind.config.js`) |
| SEO | react‑helmet‑async |
| Fonts | Inter + Roboto Mono (Google Fonts, preconnected in `index.html`) |

### Project Structure

```
website/
├── index.html              Vite entry (fonts, favicon, root div)
├── package.json            Dependencies + scripts
├── vite.config.js          React plugin, base: '/Process-Integrity-AM/'
├── tailwind.config.js      Custom colour palette, font families
├── postcss.config.js       Tailwind + autoprefixer
├── .gitignore              node_modules, dist, .env
├── public/
│   ├── favicon.svg         Diamond‑nozzle favicon
│   ├── assets/
│   │   └── 1000060728.jpg  About Me profile photo
│   └── downloads/
│       └── additive_manufacturing_primer.pdf  Lead magnet
├── src/
│   ├── main.jsx            ReactDOM.createRoot entry
│   ├── App.jsx             BrowserRouter, ScrollProgress, background layers, routes
│   ├── index.css           Tailwind directives + custom component classes
│   ├── pages/
│   │   ├── HomePage.jsx    Composes 7 sections
│   │   ├── ServicesPage.jsx    Full catalog (9 services)
│   │   ├── BlogPage.jsx        Lead magnet + post index (search, sort, likes)
│   │   ├── BlogPostPage.jsx     Individual post page (full content, schema, likes)
│   │   └── NotFoundPage.jsx    404
│   ├── sections/           7 self‑contained page sections
│   ├── components/         28 reusable components (BlogSearch, BlogSort, LikeButton added)
│   ├── data/               12 content files (single source of truth)
│   └── hooks/              3 custom hooks (useScrollReveal, useCountUp, useMediaQuery)
└── .github/workflows/
    └── deploy.yml           GitHub Actions → GitHub Pages
```

### Data Flow

```
src/data/*.js (content arrays/objects)
    ↓ import
src/sections/*.jsx (orchestrate layout, pass data as props)
    ↓ render
src/components/*.jsx (presentational, receive props, no data imports)
```

Components never import data files directly. Sections bridge data → components.

### External Integrations

| Service | Endpoint / ID | Component |
|---------|--------------|-----------|
| Formspree (contact) | `https://formspree.io/f/xgoqzzqo` | `ContactForm.jsx` |
| Formspree (lead magnet) | `https://formspree.io/f/xwvzqonp` | `BlogPage.jsx` (LeadMagnetCard) |
| Cal.com (scheduling) | `https://cal.com/fmirza.processintegrity-am` | `CtaButton.jsx`, `CalendlyCard.jsx` |
| Google Fonts | `fonts.googleapis.com` (Inter, Roboto Mono) | `index.html` |

### Key Custom CSS Classes

| Class | File | Purpose |
|-------|------|---------|
| `bracket-card` | `index.css` | Corner L‑brackets (thin safety‑yellow pseudo‑elements) |
| `ghost-btn` | `index.css` | Outline button (divider border → safety on hover) |
| `icon-circle` | `index.css` | 40px yellow‑tinted circle behind icons |
| `section-divider-line` | `index.css` | Gradient horizontal rule + diamond marker |
| `accent-top-rule` | `index.css` | 2px yellow bar slides in from left on hover |
| `headline-accent` | `index.css` | Yellow underline on hero headline highlight |
| `gcode-bg` | `index.css` | Horizontal raster lines (process section) |
| `blueprint-minor` | `index.css` | 40px grid texture |
| `blueprint-major` | `index.css` | 120px yellow‑tinted grid texture |
| `surface-grain` | `index.css` | Fractal noise overlay |
| `callout-frame` | `index.css` | Engineering dimension lines (About photo) |

### Deploy

Push to `main` branch → GitHub Actions triggers:
1. `checkout@v4`
2. `setup-node@v4` (Node 22)
3. `npm ci --legacy-peer-deps`
4. `npm run build` (Vite → `dist/`)
5. `configure-pages@v4` → `upload-pages-artifact@v3` → `deploy-pages@v4`

Live at: `https://mrzfaizaan.github.io/Process-Integrity-AM/`
