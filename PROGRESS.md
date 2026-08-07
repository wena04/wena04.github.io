# Progress Log

**Owner:** Anthony Wen  
**Branch:** `feat/scrollytelling-port` (`HEAD` matches `origin/main` at `f193d0b`; responsive polish remains local)
**Last updated:** July 22, 2026

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
- Narrow layouts measure every card and space constellation nodes from the rendered
  card heights, avoiding fixed-position overlaps from 320px upward.

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
- Orbit radii respond to both available width and height; portrait and short-landscape
  controls stay outside the active card.
- Thumbnail component supports real images and falls back to compact project initials
  while the image assets are still missing.

### Friends — done
- Crescent planet (left) via lighting; constellation globe (center).
- Names on front-facing nodes + hover; click → portfolio.
- Title + legend fixed overlay synced to `#friends` scroll position.
- Mobile uses a two-row horizontal friend strip and hides duplicate projected labels;
  short landscape uses one row. Globe scale/position and the planet crescent respond
  to the viewport and share the same reveal clock.

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
| Responsive | validated | 320×568, 390×844, 430×932, 768×1024, 844×390, 1024×768, 1440×900 |

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

## 8. Repo health

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
- Add `public/og-image.png` for Open Graph
- Code-split or further trim the Three.js chunk if the current ~520 kB build warning
  affects real-device performance.

---

## 9. Outstanding / TODO

### Content
- [x] Real **project thumbnails** in `public/images/` for Recall, AWS Pilot, TFind,
  SmartFuel (sourced from Devpost/repo screenshots, downscaled to ~1200px wide)
- [x] Real **company logos** via `logo:` in `experiences.js`
- [x] **School logos** on mission patches (`education[].logo`)
- [x] Portfolio URLs for every friend currently shown
- [x] GitHub/demo links wired in for Recall (own repo + live Vercel demo), TFind and
  AWS Pilot (Devpost as demo since no live deploy exists), SmartFuel (Devpost demo
  added; GitHub already pointed at teammate's repo)
- [x] Custom logo graphics (hand-authored SVG, not screenshots) for projects with no
  public/real UI to show: `breakpoint.svg` (chart + tennis-ball motif), `mini-google.svg`
  (mock search-result UI), `kack-foodbank.svg` (pink theme + Seattle skyline, per Anthony's
  direction) — confirmed Breakpoint is private (no repo to link) and AWS Pilot's
  teammate-owned repo (`Marc0Guo/Dubhacks2025`) is fine to keep linked
- [ ] **Still missing — need from Anthony:**
  - **TFind**: GitHub link in the data (`RandolphTang/StreeGLTMobileCollab`) 404s —
    repo was likely deleted/renamed/made private by the teammate; either get a
    working link from the team or leave `github: null` (currently set to null,
    Devpost used as the demo link instead)
  - Logos still wanted for the remaining non-featured course/side projects (Mini
    Google and KACK FoodBank now have custom logos; Global Economy & Climate Change,
    Social Justice Art Archive, HuskyMap, SWECC Website, Wordplay, 华大课友社团官网,
    Portfolio 2026, and the design projects still fall back to text initials)
  - General: `mini-google.png`, `kack-foodbank.png`, `climate-viz.png`,
    `art-archive.png`, `huskymap.png`, `swecc.png`, `wordplay.png`,
    `ohcc-website.png`, `portfolio.png`, `tempad.png` and other non-featured
    project images still don't exist in `public/images/`
  - Replace remaining placeholder project copy (e.g. `designProjects` entries
    with literal `// TODO` comments in `projects.js`)

### Polish
- [x] **Mobile** 3D position and collision pass across portrait/tablet/landscape
- [x] Responsive planet/globe scale, crescent timing, and friend-label behavior
- [ ] Recheck visual tuning after final project thumbnails and content are present
- [ ] SEO / Open Graph (`siteMetadata.image` points to missing `/og-image.png`)
- [ ] Add automated browser smoke checks for the responsive collision matrix
- [x] Stop tracking generated `node_modules/` and `dist/` artifacts — confirmed
  deploy is CI-built (`.github/workflows/deploy.yml` runs `npm ci && npm run build`),
  so the committed copies were unused; `git rm -r --cached`, `dist` added to `.gitignore`

### Ship
- [ ] **Commit** current responsive, dependency, and drag-direction changes
- [ ] Deploy to GitHub Pages / anthonywen.dev
