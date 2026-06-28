# Progress Log

**Owner:** Anthony Wen  
**Branch:** `main` (scrollytelling redesign lives in **working tree**, not yet committed)  
**Last updated:** June 27, 2026

A running log of the scrollytelling redesign — from mockup → design spec → ported
into the real React + Three.js site. See also `docs/scrollytelling-design.md`
(design spec) and `docs/scrollytelling-mockup.html` (interactive low-fi mockup).

---

## 1. Design artifacts (in `docs/`)

- **`docs/scrollytelling-design.md`** — design spec: narrative spine, per-section
  designs, unified-scroll-clock fix, decisions log.
- **`docs/scrollytelling-mockup.html`** — self-contained scrollable mockup used
  before porting. Mockup-only scaffolding is NOT production.
- **`docs/PROJECT-PLAN.md`** — architecture reference (partially stale — see §8).

---

## 2. Narrative spine (current)

`alone in space → who I am → where I've worked → what I researched → where I studied → what I made → who I'm with`

| Beat | Section | `#id` | Planet / scene |
| --- | --- | --- | --- |
| Spawn | Landing | — | emerges from deep space, centered |
| Pilot | Intro | `intro` | docks right; hero text fades in after |
| Path | Experience | `experience` | holds right through Scorpius constellation |
| Labs | Research | `research` | drifts toward center; dashed decision-tree UI |
| School | Education | `education` | recedes left/back; mission-patch badges |
| Cargo | Projects | `projects` | center + small; featured orbit ring |
| Network | Friends | `friends` | crescent planet (left) + constellation globe |

Unifying motif: **nodes & connections** — Scorpius timeline, research tree branches,
project orbit, friends globe.

**Choreography** (`choreography.js`) anchors planet keyframes to live section positions:
`intro`, `experience`, `research`, `education`, `projects`, `friends`.

---

## 3. Scene architecture (`src/scene/`)

Split out of the monolithic `CelestialScene.jsx`:

| File | Role |
| --- | --- |
| `textures.js` | Canvas texture generators (star, soft-moon) |
| `celestialFactory.js` | Planet mesh + atmosphere + rings + starfield |
| `choreography.js` | Scroll → planet mapping (section-anchored keyframes) |
| `globeGenerator.js` | Friends network globe (Fibonacci + geodesic web) |
| `CelestialScene.jsx` | Orchestrator: renderer/bloom, loop, drag, raycaster, labels |

**Single scroll clock:** `App.jsx` computes `scrollPercent` once and passes it down.
**Time-based rotation** (rad/sec, clamped delta) for consistent spin across refresh rates.

---

## 4. Section status

### Intro — done
- Planet docks right during landing; hero words fade in once settled.
- Social links as icon + label pills (GitHub / LinkedIn / Email).

### Experience — done (Scorpius constellation)
- Career as **Scorpius** constellation; scroll-drawn path, igniting stars, Antares
  heart, comet on the tip.
- Work roles on bright stars (newest → oldest). `Earlier roles` overflow hidden until needed.
- Honors row pinned above the constellation.
- Cards: logo/initial + company (bold) + title + date + tags.

### Research — done (own section)
- **Standalone section** `#research` — not nested under Experience.
- **Decision-tree layout:** root dot → dashed slanted branches (Experience leader-line
  style: `stroke-dasharray: 3 4`) → round glowing nodes → stems → lab cards.
- Data: `research` export in `experiences.js` (IDL / Kyle Thayer, Wordplaypen / Amy J. Ko).
- Styles: `sections/Research.jsx` + `styles/research.css`.

### Education — done (own section)
- **Standalone section** `#education`.
- **Mission patches** for UW + AISG (circular badges, stitched ring, school/degree/dates).
- `logo:` field supported for real school marks in `public/images/`.
- Styles: `sections/Education.jsx` + `styles/education.css`.

### Projects — done
- **Featured orbit:** tilted ring, scroll/drag/arrows/dots, front card blooms.
- **Solar archive:** All · Coding · Design tabs, compact rows, click-to-expand, 6/page.

### Friends — done
- Crescent planet (left) via lighting; constellation globe (center).
- Names on front-facing nodes + hover; click → portfolio.
- Title + legend fixed overlay synced to `#friends` scroll position.

---

## 5. Global UI & assets

| Feature | Status | Location |
| --- | --- | --- |
| Scroll-progress bar | done | `App.jsx` |
| Constellation rail (6 sections) | done | `nav/ScrollRail.jsx` — label hover fix (one at a time) |
| Navbar (6 pills) | done | `nav/Navbar.jsx` |
| Loading shade | done | `nav/LoadingScreen.jsx` |
| 404 page | done | `public/404.html` |
| **Favicons (AW mark)** | done | `public/favicon.*`, `site.webmanifest`, `index.html` |
| Reduced-motion passes | partial | CSS in section stylesheets |
| Responsive | partial | Mobile passes in Experience, Research, Projects |

---

## 6. Data (`src/data/`)

| File | Contents |
| --- | --- |
| `experiences.js` | Work roles, `research[]`, `education[]`, awards, certs |
| `projects.js` | Coding + design projects, `featured` flags |
| `friends.js` | Globe nodes (name, url, color) |
| `personal.js` | Bio, social links, **`navItems`** (canonical section list) |
| `skills.js` | Skill lists + devicon CDN URLs (not yet surfaced in UI) |

---

## 7. Repo layout (current — coherent)

```
src/
├── App.jsx                 # composition + single scroll clock
├── scene/                  # Layer 0 — Three.js (5 active + 1 unused)
├── sections/               # Layer 1 — one component per scroll section
│   ├── Intro.jsx
│   ├── Experience.jsx
│   ├── Research.jsx        ← new
│   ├── Education.jsx       ← new
│   ├── Projects.jsx
│   └── Friends.jsx
├── nav/                    # Layer 2 — Navbar, ScrollRail, Footer, LoadingScreen
├── data/                   # content only
├── styles/                 # one CSS file per major section (+ shared)
public/
├── favicon.ico / .svg / PNG sizes / site.webmanifest
└── 404.html
docs/                       # design spec + mockup + PROJECT-PLAN
```

**Pattern:** each live section = `{sections/X.jsx}` + `{styles/x.css}` + data in
`src/data/`. Scene reads section IDs from the DOM via `choreography.sectionStarts`.

---

## 8. Repo health (June 27 cleanup — done)

### What's working well
- Clear **3-layer model** (scene / content / nav) matches `PROJECT-PLAN.md`.
- **Section-anchored choreography** scales when section heights change.
- **Data separated from UI** — content edits don't touch Three.js code.
- **Single nav source of truth** — `navItems` in `personal.js` imported by Navbar + ScrollRail.
- **Build passes** (`npm run build`); favicons and 404 copy to `dist/` via Vite `public/`.

### Cleaned up (June 27)
- Removed dead files: `Hero.jsx`, `About.jsx`, `Contact.jsx`, `ui/*`, `useVisibleSection.js`, `skillOrbits.js`, `projects.css`
- Removed unused `@react-three/rapier` dependency
- Synced `docs/PROJECT-PLAN.md` with 6-section architecture

### Optional later
- Split `research` / `education` into separate data files (nice-to-have)
- Code-split Three.js bundle (~736 kB) if Lighthouse flags it
- Add `public/og-image.png` for Open Graph

---

## 9. Outstanding / TODO

### Content
- [ ] Real **project thumbnails** in `public/images/`
- [ ] Real **company logos** via `logo:` in `experiences.js`
- [ ] **School logos** on mission patches (`education[].logo`)
- [ ] Fill missing **friend portfolio URLs**

### Polish
- [ ] **Mobile** 3D position fine-tuning across aspect ratios
- [ ] Visual tuning of planet/globe sizes once content is final
- [ ] **Ready Player One** loading screen (Phase 4 — current loader is minimal orb+ring)
- [ ] SEO / Open Graph (`siteMetadata.image` points to missing `/og-image.png`)

### Ship
- [ ] **Commit** scrollytelling working tree to `main`
- [ ] Deploy to GitHub Pages / anthonywen.dev
