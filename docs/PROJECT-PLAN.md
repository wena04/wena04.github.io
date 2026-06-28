# Portfolio Project Plan

**Owner:** Anthony Wen  
**Last Updated:** June 27, 2026  
**Status:** Phase 2–3 largely complete — 6-section scrollytelling live in working tree

---

## Quick Reference for AI Agents

When working on this project, read this document first to understand:

- The 3-layer architecture (Layer 0: 3D, Layer 1: Content, Layer 2: Nav)
- The 6 main sections + landing screen + footer structure
- Section-anchored planet choreography (not hard-coded scroll percentages)
- Current phase and what's been completed
- File organization and naming conventions

Key files:

- `docs/PROJECT-PLAN.md` - This file (architecture + phases)
- `PROGRESS.md` - Running progress log (sections, TODOs, repo health)
- `src/scene/choreography.js` - Section-anchored scroll → planet mapping
- `src/scene/CelestialScene.jsx` - 3D background orchestrator (Layer 0)
- `src/App.jsx` - Main app composition + single scroll clock
- `src/data/personal.js` - Bio, social links, canonical `navItems`
- `src/data/` - All content data (experiences, projects, skills, friends)

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
│  Layer 2: Navbar + ScrollRail (zIndex: 100)                     │
│  - Fixed top navbar; constellation rail on right edge             │
│  - Pill-style links: Intro, Experience, Research, Education,    │
│    Projects, Friends (from `personal.js` navItems)                │
│  - Navbar fades in at 5% scroll, fully visible by 10%             │
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
| 0   | **Landing**    | Empty — planet centered in starfield                   | Centered, zooming in from deep space    |
| 1   | **Intro**      | Name, tagline, social links                            | Docks far right                         |
| 2   | **Experience** | Scorpius constellation timeline (work roles + honors)  | Holds right                             |
| 3   | **Research**   | Decision-tree lab cards (IDL, Wordplaypen)             | Drifts toward center                    |
| 4   | **Education**  | Mission-patch badges (UW, AISG)                        | Recedes left/back                       |
| 5   | **Projects**   | Featured orbit + solar archive tabs                    | Center + small; planet ring fades       |
| 6   | **Friends**    | Crescent planet + 3D constellation globe               | Crossfade to globe; lit crescent rim    |
| —   | **Footer**     | Copyright: "© 2026 Anthony Wen"                        | Globe visible                           |

### 2.3 Scrollytelling (Section-Anchored) — IMPLEMENTED

Planet position is driven by `scrollPercent` but **keyframes are anchored to live
section positions** via `choreography.sectionStarts()` — not fixed percentages.
Adding or resizing sections keeps the planet tied to content.

```javascript
// Journey (choreography.js):
// landing → intro (dock right) → experience (hold)
// → research (center) → education (recede left/back)
// → projects (center + small) → friends (crescent + globe crossfade)

// Key exports: sectionStarts(ids), planetFromScroll(sp, starts)
```

See `docs/scrollytelling-design.md` and `PROGRESS.md` for per-section UI details.

---

## 3. Development Phases

### Phase 1: Foundation — COMPLETE

**Goal:** All sections exist and are navigable

| Task                                    | Status | Notes                                             |
| --------------------------------------- | ------ | ------------------------------------------------- |
| Clean up unused components              | DONE   | Removed Hero, About, Contact, ui/, hooks, skillOrbits |
| Reorganize repo structure               | DONE   | scene/, nav/, sections/, data/, styles/            |
| Delete unused assets folder             | DONE   | src/assets/ removed                                |
| Create data files                       | DONE   | All content from LinkedIn/resume                   |
| Populate experiences.js                 | DONE   | 10 work experiences + education + awards           |
| Populate projects.js                    | DONE   | 12 coding + 6 design projects                      |
| Populate friends.js                     | DONE   | 7 friends (Amelia Li + 6 others)                   |
| Populate personal.js                    | DONE   | Bio, contact, social links                         |
| Simplify Footer                         | DONE   | Just "© 2026 Anthony Wen"                          |
| Create Intro section                    | DONE   | Merged Hero + About into single section            |
| Create Experience section               | DONE   | Scorpius constellation + work roles + honors       |
| Create Research section                 | DONE   | Decision-tree layout, own `#research` section      |
| Create Education section                | DONE   | Mission patches, own `#education` section          |
| Create Friends section                  | DONE   | Crescent planet + 3D globe with labels/click     |
| Update Navbar links                     | DONE   | 6 sections via shared `navItems` in personal.js    |
| Add ScrollRail                          | DONE   | Constellation progress rail on right edge          |
| Add LoadingScreen                       | DONE   | Minimal orb+ring loader (Phase 4 upgrade optional) |
| Add favicons                            | DONE   | AW mark in `public/` + manifest                    |
| Clean up CSS for dark theme             | DONE   | All text light, transparent backgrounds            |

---

### Phase 2: Section Design — MOSTLY COMPLETE

**Goal:** Each section looks polished

| Task                              | Status      | Notes                                                        |
| --------------------------------- | ----------- | ------------------------------------------------------------ |
| Add Landing screen                | DONE        | Empty 100vh div before Intro in App.jsx                      |
| Landing hints (scroll + drag)     | DONE        | Centered "Scroll to begin" + chevron, fades out on scroll    |
| Design Intro section              | DONE        | Floating text: name, tagline, social pills                   |
| Navbar redesign                   | DONE        | Warm glass background, pill hover/active                     |
| Design Experience (Scorpius)      | DONE        | Constellation timeline, scroll-drawn path                    |
| Design Research section           | DONE        | Decision-tree with dashed slanted branches                   |
| Design Education section          | DONE        | Mission-patch badges                                         |
| Design Projects orbit + archive   | DONE        | Featured orbit ring + tabbed solar archive                   |
| Design Friends globe              | DONE        | Labels, hover, click → portfolio                             |
| ScrollRail + loading screen       | DONE        | Right-edge constellation rail; minimal loader                |
| Favicons                          | DONE        | `public/favicon.*`, `site.webmanifest`                       |
| Responsive design (mobile)        | PARTIAL     | Mobile passes in Experience, Research, Projects              |
| SEO / Open Graph                  | TODO        | `og-image.png` still missing                                 |

**Deliverable:** Polished static portfolio.

---

### Phase 3: Planet Transitions — IMPLEMENTED

**Goal:** 3D background responds to scroll

| Task                                | Status | Notes                                              |
| ----------------------------------- | ------ | -------------------------------------------------- |
| Section-anchored choreography       | DONE   | `choreography.js` reads live section positions     |
| Planet position per section         | DONE   | 6-section keyframe journey                         |
| Smooth interpolation (lerp/clamp)   | DONE   | THREE.MathUtils.clamp + lerp                       |
| Planet → Globe crossfade            | DONE   | Friends section crescent + globe                   |
| Globe hidden until needed           | DONE   | visible=false + depthWrite=false                   |
| Performance optimization            | DONE   | See performance section below                      |
| Mobile: reduce effects or disable   | TODO   | Position fine-tuning across aspect ratios          |

**Deliverable:** Immersive scrollytelling portfolio.

---

### Phase 4: Special Features

**Goal:** Unique differentiators

| Task                                      | Status | Notes                                        |
| ----------------------------------------- | ------ | -------------------------------------------- |
| Globe drag interaction                | DONE   | Mouse drag + coast                               |
| Globe hover/click (Raycaster)         | DONE   | Click friend node → open portfolio               |
| Friend name labels (CSS2DRenderer)    | DONE   | Front-facing labels + hover highlight            |
| Loading screen ("Ready Player One")   | TODO   | Current loader is minimal orb+ring               |
| Project thumbnails                    | TODO   | Add images to `public/images/`                   |
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
├── App.jsx                      # Composition + single scroll clock
├── App.css                      # Global app styles
├── index.css                    # Base styles + Google Fonts
│
├── scene/                       # Layer 0 - 3D Background
│   ├── CelestialScene.jsx       # Planet, stars, rings, globe, scrollytelling
│   ├── choreography.js          # Section-anchored scroll → planet mapping
│   ├── celestialFactory.js      # Planet mesh, atmosphere, starfield
│   ├── textures.js              # Canvas texture generators
│   └── globeGenerator.js        # Friends network globe (Fibonacci sphere)
│
├── nav/                         # Layer 2 - Navigation
│   ├── Navbar.jsx               # Top nav (imports navItems from personal.js)
│   ├── ScrollRail.jsx           # Right-edge constellation progress rail
│   ├── LoadingScreen.jsx        # Initial load shade
│   └── Footer.jsx               # Minimal footer
│
├── sections/                    # Layer 1 - Content Sections
│   ├── Intro.jsx
│   ├── Experience.jsx           # Scorpius constellation + work roles
│   ├── Research.jsx             # Decision-tree lab cards
│   ├── Education.jsx            # Mission-patch badges
│   ├── Projects.jsx             # Featured orbit + solar archive
│   └── Friends.jsx              # Globe overlay + legend
│
├── data/                        # Content Data
│   ├── experiences.js           # Work, research, education, awards
│   ├── projects.js              # Coding + design projects
│   ├── skills.js                # Skills + devicon URLs (not yet in UI)
│   ├── friends.js               # Globe nodes
│   └── personal.js              # Bio, social links, navItems
│
└── styles/                      # Component Styles (one file per major section)
    ├── navbar.css
    ├── scrollrail.css
    ├── loading.css
    ├── footer.css
    ├── sections.css
    ├── experience.css
    ├── research.css
    ├── education.css
    ├── projects-orbit.css
    └── friends.css

public/
├── favicon.ico / favicon.svg / PNG sizes
├── site.webmanifest
└── 404.html
```

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

| Screen     | Approx. X | Approx. Z | Notes                    |
| ---------- | --------- | --------- | ------------------------ |
| Landing    | 0         | -15 → -5  | Zoom in from deep space  |
| Intro      | +6        | -5        | Docked right             |
| Experience | +6        | -5        | Hold through Scorpius    |
| Research   | 0         | -7        | Drift toward center      |
| Education  | -7        | -9        | Recede left/back         |
| Projects   | 0         | -7        | Center; planet ring fades|
| Friends    | -4.6      | -2.5      | Crescent rim + globe     |

Exact values interpolate via `choreography.planetFromScroll()` keyed to section tops.

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
| Section Detection | Scroll position + getBoundingClientRect | Navbar + ScrollRail; choreography uses section tops |
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
4. Note: `navItems` in `src/data/personal.js` is the single source of truth for section nav
5. Scrollytelling is section-anchored — adding sections updates choreography automatically

### Immediate Next Steps

1. **Content assets** — project thumbnails, company/school logos in `public/images/`
2. **Fill friend portfolio URLs** in `friends.js`
3. **Commit & deploy** scrollytelling working tree to GitHub Pages
4. **Phase 4 polish** — "Ready Player One" loading screen, OG image, mobile tuning

### Commands to Get Started

```bash
cd ~/Documents/GitHub/wena04.github.io
npm install
npm run dev
```

---

_This document should be updated as the project progresses._
