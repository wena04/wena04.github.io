# Portfolio Project Plan

**Owner:** Anthony Wen  
**Last Updated:** February 11, 2026  
**Status:** Phase 2 IN PROGRESS - Intro section designed, scrollytelling implemented

---

## Quick Reference for AI Agents

When working on this project, read this document first to understand:

- The 3-layer architecture (Layer 0: 3D, Layer 1: Content, Layer 2: Nav)
- The 4 main sections + landing screen + footer structure
- Current phase and what's been completed
- File organization and naming conventions

Key files:

- `docs/PROJECT-PLAN.md` - This file (architecture + phases)
- `src/scene/CelestialScene.jsx` - 3D background component (Layer 0)
- `src/App.jsx` - Main app composition
- `src/data/` - All content data (experiences, projects, skills, friends, personal)

---

## 1. Project Vision

A personal portfolio website with:

- **Immersive 3D background** - Cosmic theme with interactive planet
- **Scroll-driven storytelling** - Planet slides across screen per section with 4-phase animation
- **Unique Friends section** - 3D globe network linking to friends' portfolios
- **"Ready Player One" loading screen** - Themed after favorite book (Phase 4)

---

## 2. Architecture

### 2.1 Layer System

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 2: Navbar (zIndex: 100)                                  │
│  - Fixed top, warm glass background                             │
│  - Pill-style links: Intro, Experience, Projects, Friends       │
│  - Fades in at 5% scroll, fully visible by 10%                 │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Main Content (zIndex: 1)                              │
│  - Scrollable sections                                          │
│  - pointer-events: none on wrappers, auto on interactive        │
│  - Landing screen (empty 100vh) before Intro                    │
├─────────────────────────────────────────────────────────────────┤
│  Layer 0: CelestialScene (zIndex: -1)                           │
│  - Fixed position, full viewport                                │
│  - Planet, rings, starfield, atmosphere                         │
│  - 4-phase scroll-driven animation                              │
│  - Crossfade transition to Friends Globe at bottom              │
│  - Landing hints: "Scroll to begin" + "or drag the planet"     │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Page Flow

| #   | Screen         | Content                                                | Planet State                            |
| --- | -------------- | ------------------------------------------------------ | --------------------------------------- |
| 0   | **Landing**    | Empty — just the planet centered in starfield          | Centered, zooming in from deep space    |
| 1   | **Intro**      | Floating text: Name, typewriter tagline, social links  | Slides to far right (x=10)              |
| 2   | **Experience** | Work history (10 roles from LinkedIn)                  | Sliding from right toward center        |
| 3   | **Projects**   | Coding (12) + Design (6) projects                      | Continuing left, getting smaller        |
| 4   | **Friends**    | 3D globe with 7+ friend nodes                          | Planet fades out at left edge, globe in |
| —   | **Footer**     | Just copyright: "© 2026 Anthony Wen"                  | Globe visible                           |

### 2.3 Scrollytelling (4-Phase System) — IMPLEMENTED

The planet position is driven by `scrollPercent` with 4 distinct phases:

```javascript
// Phase 1 (0-10%):   Zoom in, planet centered            (Landing)
// Phase 2 (10-18%):  Planet slides center -> far right    (Intro)
// Phase 3 (18-70%):  Planet slides right -> left          (Experience, Projects)
// Phase 4 (70-100%): Planet comes closer for globe swap   (Friends)

// Z position: -15 -> -5 (small planet), then -5 -> 0 (closer for Friends)
// X position: 0 -> 10.0 (right), then 10.0 -> -3.5 (left edge)
```

This is fully percentage-based. Adding/removing sections will shift percentages but the phases auto-adjust.

---

## 3. Development Phases

### Phase 1: Foundation — COMPLETE

**Goal:** All sections exist and are navigable

| Task                                    | Status | Notes                                             |
| --------------------------------------- | ------ | ------------------------------------------------- |
| Clean up unused components              | DONE   | Removed duplicates, reorganized folders            |
| Reorganize repo structure               | DONE   | scene/, nav/, ui/, data/, hooks/                   |
| Delete unused assets folder             | DONE   | src/assets/ removed                                |
| Create data files                       | DONE   | All content from LinkedIn/resume                   |
| Populate experiences.js                 | DONE   | 10 work experiences + education + awards           |
| Populate projects.js                    | DONE   | 12 coding + 6 design projects                      |
| Populate friends.js                     | DONE   | 7 friends (Amelia Li + 6 others)                   |
| Populate personal.js                    | DONE   | Bio, contact, social links                         |
| Simplify Footer                         | DONE   | Just "© 2026 Anthony Wen"                          |
| Create useVisibleSection hook           | DONE   | For section-based planet control                   |
| Create Intro section                    | DONE   | Merged Hero + About into single section            |
| Create Experience section               | DONE   | Experience.jsx with 10 roles + education + awards  |
| Create Friends section placeholder      | DONE   | Friends.jsx with grid layout (3D in Phase 4)       |
| Update Navbar links                     | DONE   | Intro, Experience, Projects, Friends               |
| Clean up CSS for dark theme             | DONE   | All text light, transparent backgrounds            |

---

### Phase 2: Section Design — IN PROGRESS

**Goal:** Each section looks polished

| Task                              | Status      | Notes                                                        |
| --------------------------------- | ----------- | ------------------------------------------------------------ |
| Add Landing screen                | DONE        | Empty 100vh div before Intro in App.jsx                      |
| Landing hints (scroll + drag)     | DONE        | Centered "Scroll to begin" + chevron, fades out on scroll    |
| Design Intro section              | DONE        | Minimal floating text: name (gradient), typewriter, socials  |
| Navbar redesign                   | DONE        | Warm glass background, pill hover/active, bouncy transitions |
| Fonts (Orbitron + Roboto Mono)    | DONE        | Google Fonts import in index.css                             |
| Design Experience timeline/cards  | TODO        |                                                              |
| Design Projects carousel          | TODO        | Decide: tabs, two rows, or mixed                             |
| Design Footer                     | TODO        | Clean, minimal                                               |
| Responsive design (mobile)        | TODO        |                                                              |
| Typography and spacing            | TODO        |                                                              |

**Deliverable:** Polished static portfolio.

---

### Phase 3: Planet Transitions — DRAFT WORKING

**Goal:** 3D background responds to scroll

| Task                                | Status | Notes                                              |
| ----------------------------------- | ------ | -------------------------------------------------- |
| 4-phase scrollytelling system       | DRAFT  | Working but percentages will shift as sections grow |
| Planet position per section         | DRAFT  | z: -15→-5→0, x: 0→10→-3.5 (needs tuning later)   |
| Smooth interpolation (lerp/clamp)   | DONE   | THREE.MathUtils.clamp + lerp                       |
| Planet → Globe crossfade            | DONE   | Opacity crossfade at scroll > 75%                  |
| Globe hidden until needed           | DONE   | visible=false + depthWrite=false (no silhouette)   |
| Performance optimization            | DONE   | See performance section below                      |
| Re-tune after all sections designed | TODO   | Scroll breakpoints will need adjusting             |
| Mobile: reduce effects or disable   | TODO   |                                                    |

**What's locked:** Landing (Phase 1: 0-10%), Intro/Hero (Phase 2: 10-18%), and Friends (Phase 4: 70-100%) all look good — don't change these. Only Phase 3 (18-70%, Experience/Projects) needs tuning once those sections are designed.

**Deliverable:** Immersive scrollytelling portfolio.

---

### Phase 4: Special Features

**Goal:** Unique differentiators

| Task                                      | Status | Notes                                        |
| ----------------------------------------- | ------ | -------------------------------------------- |
| **Create `globeGenerator.js`**            | DONE   | Fibonacci sphere + geometric connections     |
| **Add Globe to CelestialScene**           | DONE   | Imported, starts hidden (visible=false)      |
| **Planet → Globe transition**             | DONE   | Opacity crossfade at scroll > 75%            |
| **Globe drag interaction**                | DONE   | Mouse drag + coast, follows mouse direction  |
| Globe hover/click (Raycaster)             | TODO   | Click friend node → open portfolio           |
| Friend name labels (CSS2DRenderer)        | TODO   | Show name on hover                           |
| Loading screen ("Ready Player One")       | TODO   |                                              |
| Projects: finalize layout (tabs/carousel) | TODO   |                                              |
| Custom mouse cursor                       | TODO   | See implementation guide in Section 7        |

---

### Phase 5: Polish & Launch

**Goal:** Production ready

| Task                           | Status | Notes                                  |
| ------------------------------ | ------ | -------------------------------------- |
| SEO meta tags                  | TODO   |                                        |
| Open Graph images              | TODO   |                                        |
| Performance audit (Lighthouse) | TODO   |                                        |
| Cross-browser testing          | TODO   |                                        |
| Final content review           | TODO   |                                        |
| Update README                  | TODO   |                                        |
| Confirm licensing text         | DONE   | Repo is not open source; see `LICENSE` |
| Deploy to GitHub Pages         | TODO   | Already configured                     |

---

## 4. Repo Structure (Current)

```
src/
├── main.jsx                     # Entry point
├── App.jsx                      # Main composition (Landing + 4 sections + Footer)
├── App.css                      # Global app styles
├── index.css                    # Base styles + Google Fonts (Orbitron, Roboto Mono)
│
├── scene/                       # Layer 0 - 3D Background
│   ├── CelestialScene.jsx       # Planet, stars, rings, globe, scrollytelling, hints
│   ├── globeGenerator.js        # Friends Network Globe (Fibonacci sphere)
│   └── skillOrbits.js           # [UNUSED] 3D skill orbits (kept for potential reuse)
│
├── nav/                         # Layer 2 - Navigation
│   ├── Navbar.jsx               # Warm pill-style nav, fades in at 5% scroll
│   └── Footer.jsx               # Minimal footer (just copyright)
│
├── sections/                    # Layer 1 - Content Sections
│   ├── Intro.jsx                # Floating text: name + typewriter + social links
│   ├── Experience.jsx           # Work history + education + awards
│   ├── Projects.jsx             # Coding + design projects grid
│   ├── Friends.jsx              # Friends section (3D globe in Layer 0)
│   ├── Hero.jsx                 # [UNUSED] Old hero section (replaced by Intro)
│   ├── About.jsx                # [UNUSED] Old about section (merged into Intro)
│   └── Contact.jsx              # [UNUSED] Removed from app
│
├── ui/                          # Shared UI Components
│   ├── Button.jsx               # Reusable button
│   ├── IconLink.jsx             # Icon link component
│   └── SkillMarquee.jsx         # [UNUSED] CSS marquee (kept for potential reuse)
│
├── data/                        # Content Data (ALL POPULATED)
│   ├── experiences.js           # 10 work experiences + education + awards
│   ├── projects.js              # 12 coding + 6 design projects
│   ├── skills.js                # Skills list + devicon CDN URLs
│   ├── friends.js               # 7 friends (expandable)
│   └── personal.js              # Personal info + social links
│
├── styles/                      # Component Styles
│   ├── navbar.css               # Warm glass navbar + pill hover/active
│   ├── footer.css               # Minimal footer styles
│   ├── projects.css             # Projects section styles
│   └── sections.css             # HUD panel + hero-container + minimal variant
│
└── hooks/                       # Custom React Hooks
    └── useVisibleSection.js     # Section visibility detection (placeholder)
```

### Unused Files (safe to delete later)

- `sections/Hero.jsx`, `sections/About.jsx`, `sections/Contact.jsx` — replaced by `Intro.jsx`
- `scene/skillOrbits.js` — 3D skill orbits, removed from scene but kept on disk
- `ui/SkillMarquee.jsx` — CSS marquee, removed from Intro but kept on disk

---

## 5. Key Design Decisions (Feb 2026)

### Intro Section — "Floating Text" Design

The Intro is NOT a card/panel. It's borderless floating text against the starfield:
- **Name**: 4.5rem, bold 800 weight, orange gradient (`#ff6b35 → #ff8c42 → #ffd93d`)
- **Typewriter**: Orbitron font, uppercase, 3px letter-spacing, cycles through phrases
- **Social links**: Roboto Mono, very dim (`rgba(255,255,255,0.4)`), dot-separated
- **No background, no border, no blur** — text floats in space

The planet sits to the far right, leaving the left side entirely for text.

### Navbar — "Warm Pill" Design

- Background: warm dark glass (`rgba(15, 10, 8, 0.8)`)
- Links: 0.95rem, bold 700, warm peach when inactive
- Hover: bouncy scale + lift with warm orange tint
- Active: subtle orange-tinted pill background, orange text
- Logo: 1.5rem, 800 weight, warm orange `#ff8c42`
- Appears at 5% scroll, fully visible by 10%

### Landing Screen

- Empty 100vh viewport before Intro
- Planet centered, zooming in from deep space
- "Scroll to begin" hint + chevron at bottom center (bouncing)
- "or drag the planet" hint below (disappears after first click)
- All hints fade out by 150px of scroll

### Planet Position Summary

| Screen     | X Position | Z Position | Size     |
| ---------- | ---------- | ---------- | -------- |
| Landing    | 0 (center) | -15 → -5  | Zooming  |
| Intro      | 10 (right) | -5         | Small    |
| Experience | 10 → -3.5  | -5         | Small    |
| Projects   | sliding     | -5         | Small    |
| Friends    | -3.5 (left)| -5 → 0    | Growing  |

---

## 6. Performance Optimizations (IMPLEMENTED)

| Optimization                          | Impact                                         |
| ------------------------------------- | ---------------------------------------------- |
| `setScrollY` only fires for scrollY<200 | Prevents React re-renders after hints gone   |
| Globe `traverse` skipped when hidden  | No tree walk until Friends section             |
| Planet `traverse` skipped when opaque | Only runs during crossfade (planetOpacity<0.99)|
| Bloom pass at half resolution         | 4x less GPU cost, looks identical (bloom blurs)|
| Globe `depthWrite: false`             | Prevents dark silhouette when invisible        |
| Globe `visible = false` at start      | GPU skips rendering entirely until needed      |

---

## 7. Technical Decisions

| Decision          | Choice                       | Rationale                       |
| ----------------- | ---------------------------- | ------------------------------- |
| 3D Library        | Three.js (vanilla)           | Already in use, full control    |
| Animation         | Native Three.js + CSS        | Keep dependencies minimal       |
| Fonts             | Orbitron + Roboto Mono       | Sci-fi headers + tech labels    |
| Section Detection | Intersection Observer API    | Native, performant              |
| Friends Globe     | Same WebGL canvas            | Seamless transition from planet |
| Mobile 3D         | Reduce/disable effects       | Performance (TODO)              |
| Custom Cursor     | CSS variables + PNG images   | See implementation below        |

### Custom Cursor Implementation (from Amelia Li's portfolio)

**1. Add cursor images to `src/assets/cursor/`:**

- `cursor-default-48.png` (48x48 for retina)
- `cursor-hover-48.png` (48x48 for retina)

**2. In `main.jsx`, set CSS variables:**

```javascript
import cursorDefault from "./assets/cursor/cursor-default-48.png";
import cursorHover from "./assets/cursor/cursor-hover-48.png";

document.documentElement.style.setProperty(
  "--cursor-image",
  `url(${cursorDefault}) 24 24`,
);
document.documentElement.style.setProperty(
  "--cursor-image-hover",
  `url(${cursorHover}) 24 24`,
);
```

**3. In `index.css`, apply the cursor:**

```css
body {
  cursor: var(--cursor-image, auto), auto;
}

img:hover,
a:hover,
button:hover {
  cursor: var(--cursor-image-hover, auto), auto;
}
```

**Reference:** [Amelia Li's cursor implementation](https://github.com/amelial9/portfolio/tree/main/src/assets/cursor)

---

## 8. Content Status

### Data Files (ALL POPULATED)

- [x] `personal.js` - Name, tagline, bio, contact, social links
- [x] `experiences.js` - 10 work roles + education + awards + certifications
- [x] `projects.js` - 12 coding projects + 6 design projects
- [x] `skills.js` - Languages, technologies, tools + devicon CDN URLs
- [x] `friends.js` - 7 friends (expandable)

### Still Needed

- [ ] Project screenshots/thumbnails in `public/images/`
- [ ] Friend portfolio URLs (most are null, need to fill in)
- [ ] Kyle Thayer / IDL Research role (waiting for title confirmation)
- [ ] More design project descriptions (some are placeholders)

---

## 9. Reference Links

- **Live Site:** https://wena04.github.io
- **GitHub Repo:** https://github.com/wena04/wena04.github.io
- **Resume:** (local) ~/Desktop/Job Prep/Resume/Anthony's Resume.pdf
- **Design Inspiration:** [Founder Search (Awwwards)](https://www.awwwards.com/sites/founder-search)
- **Amelia Li Portfolio:** https://ameliali.com/

---

## 10. Notes for Future Sessions

When resuming work:

1. Check this document for current phase and pending tasks
2. Follow the repo structure in Section 4
3. Update task status in this document as you complete them
4. Note: some files in `sections/` and `ui/` are unused (see Section 4)
5. The scrollytelling is percentage-based — adding sections will shift breakpoints

### Immediate Next Steps

1. **Design Experience section** — timeline/cards layout with `experiences.js` data
2. **Design Projects section** — decide on carousel vs tabs vs grid
3. **Clean up unused files** — delete Hero.jsx, About.jsx, Contact.jsx, skillOrbits.js, SkillMarquee.jsx

### Commands to Get Started

```bash
cd ~/Documents/GitHub/wena04.github.io
npm install
npm run dev
```

---

_This document should be updated as the project progresses._
