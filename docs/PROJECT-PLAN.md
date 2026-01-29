# Portfolio Project Plan

**Owner:** Anthony Wen  
**Last Updated:** January 28, 2026  
**Status:** Phase 1 COMPLETE - All sections exist with real data

---

## Quick Reference for AI Agents

When working on this project, read this document first to understand:

- The 3-layer architecture (Layer 0: 3D, Layer 1: Content, Layer 2: Nav)
- The 4 main sections + footer structure
- Current phase and what's been completed
- File organization and naming conventions

Key files:

- `docs/celestial-scene.md` - Layer 0 visual specs (LOCKED)
- `docs/PROJECT-PLAN.md` - This file (architecture + phases)
- `src/scene/CelestialScene.jsx` - 3D background component
- `src/App.jsx` - Main app composition
- `src/data/` - All content data (experiences, projects, skills, friends, personal)

---

## 1. Project Vision

A personal portfolio website with:

- **Immersive 3D background** - Cosmic theme with interactive planet
- **Scroll-driven storytelling** - Planet behavior changes per section
- **Unique Friends section** - 3D globe network linking to friends' portfolios
- **"Ready Player One" loading screen** - Themed after favorite book

---

## 2. Architecture

### 2.1 Layer System

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 2: Navbar (zIndex: 10)                                   │
│  - Fixed top, semi-transparent                                  │
│  - Links: Intro, Experience, Projects, Friends                  │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: Main Content (zIndex: 1)                              │
│  - Scrollable sections                                          │
│  - pointer-events: none on wrappers, auto on interactive        │
├─────────────────────────────────────────────────────────────────┤
│  Layer 0: CelestialScene (zIndex: -1)                           │
│  - Fixed position, full viewport                                │
│  - Planet, rings, starfield                                     │
│  - Responds to scroll position                                  │
│  - Transitions to Friends Globe at bottom                       │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Sections (Final)

| #   | Section        | Content                                                     | Planet State                   |
| --- | -------------- | ----------------------------------------------------------- | ------------------------------ |
| 1   | **Intro**      | Name, tagline, bio, education, skills, photo, contact links | Centered, zooming in           |
| 2   | **Experience** | Work history (10 roles from LinkedIn)                       | Slide left, smaller            |
| 3   | **Projects**   | Coding (12) + Design (6) projects                           | Corner position                |
| 4   | **Friends**    | 3D globe with 7+ friend nodes                               | Planet dissolves → globe forms |
| —   | **Footer**     | Just copyright: "© 2026 Anthony Wen"                        | Globe visible                  |

### 2.3 Section-Based Planet Control

Planet behavior is tied to visible section, NOT hardcoded scroll percentages.
This allows adding/removing/reordering sections easily.

```javascript
// Conceptual config - implement in CelestialScene.jsx
const sectionConfigs = {
  intro: { planetPosition: "center", scale: 1.0, opacity: 1.0 },
  experience: { planetPosition: "left", scale: 0.8, opacity: 1.0 },
  projects: { planetPosition: "corner", scale: 0.6, opacity: 0.8 },
  friends: { planetPosition: "dissolve", scale: 0, opacity: 0 },
};
```

Use Intersection Observer API to detect which section is visible.

---

## 3. Development Phases

### Phase 1: Foundation (Current Priority)

**Goal:** All sections exist and are navigable

| Task                                    | Status | Notes                                             |
| --------------------------------------- | ------ | ------------------------------------------------- |
| Clean up unused components              | DONE   | Removed duplicates, reorganized folders           |
| Reorganize repo structure               | DONE   | scene/, nav/, ui/, data/, hooks/                  |
| Delete unused assets folder             | DONE   | src/assets/ removed                               |
| Create data files                       | DONE   | All content from LinkedIn/resume                  |
| Populate experiences.js                 | DONE   | 10 work experiences + education + awards          |
| Populate projects.js                    | DONE   | 12 coding + 6 design projects                     |
| Populate friends.js                     | DONE   | 7 friends (Amelia Li + 6 others)                  |
| Populate personal.js                    | DONE   | Bio, contact, social links                        |
| Simplify Footer                         | DONE   | Just "© 2026 Anthony Wen"                         |
| Create useVisibleSection hook           | DONE   | For section-based planet control                  |
| Update Hero.jsx with real data          | DONE   | Uses personal.js, includes social links           |
| Update About.jsx with real data         | DONE   | Uses skills.js, shows education/major             |
| Update Projects.jsx with real data      | DONE   | Uses projects.js (18 projects)                    |
| Remove Contact section                  | DONE   | Merged into Hero (links) and Footer (copyright)   |
| Clean up CSS for dark theme             | DONE   | All text light, transparent backgrounds           |
| Fix CSS imports                         | DONE   | navbar.css, footer.css, sections.css imported     |
| Create Intro section (merge Hero+About) | DONE   | Intro.jsx with hero + about + skills              |
| Create Experience section               | DONE   | Experience.jsx with 10 roles + education + awards |
| Create Friends section placeholder      | DONE   | Friends.jsx with grid layout (3D in Phase 4)      |
| Update Navbar links                     | DONE   | Intro, Experience, Projects, Friends              |

**Deliverable:** Ugly but functional portfolio with all sections.

---

### Phase 2: Section Design

**Goal:** Each section looks polished

| Task                             | Status | Notes                            |
| -------------------------------- | ------ | -------------------------------- |
| Design Intro section layout      | TODO   | Photo, bio, skills grid          |
| Design Experience timeline/cards | TODO   |                                  |
| Design Projects carousel         | TODO   | Decide: tabs, two rows, or mixed |
| Design Footer                    | TODO   | Clean, minimal                   |
| Responsive design (mobile)       | TODO   |                                  |
| Typography and spacing           | TODO   |                                  |

**Deliverable:** Polished static portfolio.

---

### Phase 3: Planet Transitions

**Goal:** 3D background responds to scroll

| Task                                | Status | Notes                  |
| ----------------------------------- | ------ | ---------------------- |
| Implement Intersection Observer     | TODO   | Detect visible section |
| Create section config system        | TODO   | See 2.3 above          |
| Animate planet position per section | TODO   |                        |
| Smooth interpolation (lerp)         | TODO   |                        |
| Performance optimization            | TODO   |                        |
| Mobile: reduce effects or disable   | TODO   |                        |

**Deliverable:** Immersive scrollytelling portfolio.

---

### Phase 4: Special Features

**Goal:** Unique differentiators

| Task                                      | Status | Notes                                       |
| ----------------------------------------- | ------ | ------------------------------------------- |
| **Create `globeGenerator.js`**            | DONE   | Fibonacci sphere + geometric connections    |
| **Add Globe to CelestialScene**           | DONE   | Imported, starts hidden (opacity 0)         |
| **Planet → Globe transition**             | DONE   | Opacity crossfade at scroll > 75%           |
| **Globe drag interaction**                | DONE   | Mouse drag + coast, follows mouse direction |
| Globe hover/click (Raycaster)             | TODO   | Click friend node → open portfolio          |
| Friend name labels (CSS2DRenderer)        | TODO   | Show name on hover                          |
| Loading screen ("Ready Player One")       | TODO   |                                             |
| Projects: finalize layout (tabs/carousel) | TODO   |                                             |

#### Friends Globe Design (Jan 28, 2026)

**Visual Style:** "Constellation Network Sphere"

```
Design Elements:
- Fibonacci sphere distribution (250 nodes)
- Geometric line connections between nearby nodes
- Gold nodes (#ffd08a) + Orange lines (#ff6b35)
- Inner glow atmosphere
- 7+ highlighted friend nodes (larger, colored)
- Rotates slowly, draggable
```

**Transition Logic (IMPLEMENTED):**

- Hero/Experience/Projects: Planet visible, Globe hidden (opacity 0)
- Friends Section (scroll > 75%): Planet fades OUT, Globe fades IN
- Smooth opacity crossfade with lerp (0.05 speed)
- Both objects have independent drag + coast interaction

**Reference Images:**

- `assets/business-network-concept-*.png` - Geometric line connections
- `assets/emmo2-*.png` - Colorful node distribution on sphere
- `assets/Gemini_Generated_Image_*.png` - Final concept mockup

**Implementation File:** `src/scene/globeGenerator.js`

**Deliverable:** Complete, impressive portfolio.

---

### Phase 5: Polish & Launch

**Goal:** Production ready

| Task                           | Status | Notes              |
| ------------------------------ | ------ | ------------------ |
| SEO meta tags                  | TODO   |                    |
| Open Graph images              | TODO   |                    |
| Performance audit (Lighthouse) | TODO   |                    |
| Cross-browser testing          | TODO   |                    |
| Final content review           | TODO   |                    |
| Update README                  | TODO   |                    |
| Deploy to GitHub Pages         | TODO   | Already configured |

---

## 4. Repo Structure (IMPLEMENTED)

The repo has been reorganized. Duplicate files removed, layer-based folders created.

### Current Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Main composition
├── App.css                     # Global app styles
├── index.css                   # Base styles
│
├── scene/                      # Layer 0 - 3D Background
│   ├── CelestialScene.jsx      # Main 3D scene (planet, stars, rings)
│   └── globeGenerator.js       # Friends Network Globe generator ✓
│
├── nav/                        # Layer 2 - Navigation
│   ├── Navbar.jsx              # Top navigation bar
│   └── Footer.jsx              # Minimal footer (just copyright)
│
├── sections/                   # Layer 1 - Content Sections
│   ├── Hero.jsx                # Uses personal.js (will merge into Intro.jsx)
│   ├── About.jsx               # Uses skills.js (will merge into Intro.jsx)
│   ├── Projects.jsx            # Uses projects.js ✓
│   └── Contact.jsx             # REMOVED from App.jsx (still exists as file)
│
├── ui/                         # Shared UI Components
│   ├── Button.jsx              # Reusable button
│   └── IconLink.jsx            # Icon link component
│
├── data/                       # Content Data (ALL POPULATED)
│   ├── experiences.js          # 10 work experiences + education + awards ✓
│   ├── projects.js             # 12 coding + 6 design projects ✓
│   ├── skills.js               # Skills list ✓
│   ├── friends.js              # 7 friends (expandable) ✓
│   └── personal.js             # Personal info + social links ✓
│
├── styles/                     # Component Styles
│   ├── navbar.css
│   ├── footer.css
│   ├── projects.css
│   └── sections.css
│
└── hooks/                      # Custom React Hooks
    └── useVisibleSection.js    # Section visibility detection ✓
```

---

## 5. Component Inventory

### Completed Cleanup

| Action                  | Files                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- |
| **Moved to `scene/`**   | `CelestialScene.jsx`                                                                    |
| **Moved to `nav/`**     | `Navbar.jsx`, `Footer.jsx`                                                              |
| **Moved to `ui/`**      | `Button.jsx`, `IconLink.jsx`                                                            |
| **Deleted (unused)**    | `VerticalNav.jsx`, `VerticalNav.css`, `Education.jsx`, `Education.css`                  |
| **Deleted (duplicate)** | `styles/App.css`, `styles/index.css`, `components/projects/`, `components/experiences/` |
| **Deleted (replaced)**  | `constants.js` (data moved to `data/` folder)                                           |
| **Deleted (unused)**    | `src/assets/` folder (was just default Vite react.svg)                                  |
| **Simplified**          | `Footer.jsx` - now just copyright, no contact links                                     |

### Recently Updated

| File                    | Change                                    | Status    |
| ----------------------- | ----------------------------------------- | --------- |
| `sections/Hero.jsx`     | Now uses `personal.js` data               | ✓ Working |
| `sections/About.jsx`    | Now uses `skills.js` data                 | ✓ Working |
| `sections/Projects.jsx` | Now uses `projects.js` data (18 projects) | ✓ Working |
| `sections/Contact.jsx`  | Removed from App.jsx                      | ✓ Done    |
| All CSS files           | Cleaned up for dark theme, light text     | ✓ Done    |

### Still To Do

| File                              | Action                 | Notes                        |
| --------------------------------- | ---------------------- | ---------------------------- |
| `sections/Hero.jsx` + `About.jsx` | Merge into `Intro.jsx` | Phase 1                      |
| `sections/Experience.jsx`         | Create                 | Phase 1 - use experiences.js |
| `sections/Friends.jsx`            | Create placeholder     | Phase 1                      |
| `scene/FriendsGlobe.jsx`          | Create                 | Phase 4                      |
| `ui/ProjectCard.jsx`              | Create                 | Phase 2                      |
| `ui/ExperienceCard.jsx`           | Create                 | Phase 2                      |
| `ui/SkillBadge.jsx`               | Create                 | Phase 2                      |

---

## 6. Content Status

### Data Files (ALL POPULATED)

- [x] `personal.js` - Name, tagline, bio, contact, social links
- [x] `experiences.js` - 10 work roles + education + awards + certifications
- [x] `projects.js` - 12 coding projects + 6 design projects
- [x] `skills.js` - Languages, technologies, tools
- [x] `friends.js` - 7 friends (Amelia Li + 6 others, expandable)

### Still Needed

- [ ] Profile photo for Intro section
- [ ] Project screenshots/thumbnails in `public/images/`
- [ ] Friend portfolio URLs (most are null, need to fill in)
- [ ] Kyle Thayer / IDL Research role (waiting for title confirmation)
- [ ] More design project descriptions (some are placeholders)

### Footer

- [x] Simplified to just "© 2026 Anthony Wen" (like Amelia Li's)

---

## 7. Technical Decisions

| Decision          | Choice                       | Rationale                       |
| ----------------- | ---------------------------- | ------------------------------- |
| 3D Library        | Three.js (vanilla)           | Already in use, full control    |
| Animation         | Native Three.js + CSS        | Keep dependencies minimal       |
| Carousel          | TBD (CSS, Swiper, or Framer) | Decide in Phase 2               |
| Section Detection | Intersection Observer API    | Native, performant              |
| Friends Globe     | Same WebGL canvas preferred  | Seamless transition from planet |
| Mobile 3D         | Reduce/disable effects       | Performance                     |
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

## 8. Reference Links

- **Live Site:** https://wena04.github.io
- **GitHub Repo:** https://github.com/wena04/wena04.github.io
- **Resume:** (local) ~/Desktop/Job Prep/Resume/Anthony's Resume.pdf
- **Design Inspiration:** [Founder Search (Awwwards)](https://www.awwwards.com/sites/founder-search)
- **Amelia Li Portfolio:** https://ameliali.com/

---

## 9. Notes for Future Sessions

When resuming work:

1. Check this document for current phase and pending tasks
2. Check `docs/celestial-scene.md` for Layer 0 visual specs (DO NOT MODIFY without approval)
3. Follow the repo structure in Section 4
4. Update task status in this document as you complete them
5. If adding new sections, use the section-based config system (Section 2.3)

### Commands to Get Started

```bash
cd ~/Documents/GitHub/wena04.github.io
npm install
npm run dev
```

---

_This document should be updated as the project progresses._
