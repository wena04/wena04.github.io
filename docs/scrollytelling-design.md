# Scrollytelling & Section Design

**Owner:** Anthony Wen
**Last Updated:** June 22, 2026
**Status:** DRAFT — design direction for sections after Hero/Landing
**Companion file:** `docs/scrollytelling-mockup.html` (open in a browser to see it move)

> Scope: Landing + Intro + the loading screen are **locked** (per `PROJECT-PLAN.md`).
> This doc covers **Experience, Projects, Friends**, the narrative that connects
> them, and the structural change that makes the planet and the content move as
> one instead of ignoring each other.

---

## 1. The core problem we're fixing

The 3D background (Layer 0) is beautiful and already scroll-driven. But the
**content sections are just normal flowing divs** — standard glass cards in a
grid. So today the experience is:

> cinematic space → generic resume → empty globe

The scrollytelling is **only background-deep**. The planet animates on
`scrollPercent`; the content has no idea where the planet is. They never talk.

Three things in the code confirm it:

| Symptom | Where |
| --- | --- |
| Two independent scroll clocks | `App.jsx:18` and `CelestialScene.jsx:190` both compute `scrollPercent` |
| Hard-coded phase breakpoints (`0.1 / 0.18 / 0.70`) | `CelestialScene.jsx:252-267` — the plan itself notes these "will shift as sections grow" |
| Planet parks off-screen (`x=10` → `x=-3.5`) while content ignores it | `CelestialScene.jsx:278-281` |

**Fixing the coupling matters more than restyling any single section.**

---

## 2. The narrative spine

Stop thinking "sections," start thinking **one journey**. The content already
supports this arc:

> **alone in space → who I am → where I've been → what I made → who I'm with**

| Beat | Section | Planet does | Feeling |
| --- | --- | --- | --- |
| Spawn | Landing | emerges from deep space | arrival |
| The pilot | Intro | parks right; you introduce yourself | identity |
| The path | Experience | **explodes into particles** that scatter into the starfield — the planet *becomes* the stars your Scorpius path is written in | stargazing |
| The cargo | Projects | particles **reassemble** into the planet, which **zooms in**; rings become the project orbit | proof |
| The network | Friends | dissolves into a constellation of people | connection |
| Sign-off | Footer | quiet starfield | calm |

> **Planet in Experience = explosion → reassembly (decided).** The planet should
> NOT sit big behind the constellation (it collides with the cards and competes
> with the stars). Instead it **bursts into ~80 particles** that scatter across
> the whole viewport to *become the starfield* as you enter Experience (`burst`
> driven by section progress), leaving the Scorpius constellation to own the
> section. Entering Projects, the particles **converge back** to the planet's
> center, it re-forms, then **zooms into the ring orbit**. Continuous chain:
> Intro (right) → Experience (explode → stars) → Projects (reassemble → zoom) →
> Friends (globe). On the real site this is a Three.js particle system from the
> planet's own geometry; the mockup fakes it with DOM dots.

### The unifying motif: **nodes & connections**

The friends globe is already a node-graph (Fibonacci sphere + lines). If
**Experience becomes a constellation path** and **Projects are orbiting
satellites**, the whole site reads as one continuous star-map — and the friends
globe stops being a disconnected gimmick and becomes the payoff the journey was
building toward.

---

## 3. Section designs

### 3.1 Experience — "Flight Path" (replaces the card list)

Data is dense: 9 roles + education + 7 awards + certs + languages. A flat list
buries it. Reframe as a **glowing trajectory** with **role nodes**:

> **Honors pinned on top.** Awards (Kildall Scholarship, Dean's List, DubHacks
> winner, USACO Gold…) sit as a row of **star-badge pills above the timeline**,
> not below it — an instant highlights hit before the visitor reads the detail.

**Trajectory shape: the SCORPIUS constellation** (Anthony is a Scorpio). This
is the signature move — the career path is literally traced as Anthony's zodiac
constellation, which works because Scorpius *is* a curving line of stars with a
hooked tail, so it reads naturally as a top→bottom timeline. Deeply personal and
perfectly on-theme for a cosmic site.

```
   ★ Honors row pinned on top                 ♏ Scorpius — my sign
   ────────────────────────────────────────────────────────────
            ● ● ●  (head / claws)        [card]   ← first role
              ╲
       ★ Antares ●  ← brightest "heart" star   [card]
                 ╲
                  ● ──────── [card]
                 ╱
                ●
               ╱
              ●  (tail curls left…)
               ╲
                ● ── ●  ← Shaula (the stinger)  [card]  ← last role
                       ☄ comet rides the drawn tip
```

- **Connect-the-dots constellation**: all ~15 Scorpius stars render as dots
  (sized by magnitude); the line is drawn as straight segments between them
  (authentic constellation look), head → stinger = newest → oldest role.
- **Antares = the heart**: the brightest star, rendered larger and white-hot
  with a labeled tag — a natural focal point mid-timeline.
- **No "Scorpius" label** (decided): the constellation is left *unlabeled* — those
  who recognize it get the easter egg; no caption/subtitle explaining it. (The
  earlier "♏ Scorpius — my sign" pill + explanatory subtitle were removed as
  clutter; easy to re-add if wanted.)
- **Orientation = vertical** (decided): constellations have no fixed sky
  orientation, so vertical is legit *and* it's the right fit for a vertically
  scrolling page — you travel down it, and each role gets a row. A horizontal
  Scorpius would fight the scroll and cram the cards.
- **It scrolls (not pinned), and is tall** so cards have real room — fixes the
  earlier overlap. Reveal is driven by a `throughProgress()` (element passing
  through the viewport), not a fixed pin.
- **Cards in two fixed edge columns, alternating by role order** (not by star
  x — most Scorpius stars sit right-of-center, which piled cards on one side).
  A **leader line** connects each star to its card.
- **Antares** and other named stars are the focal points; **role cards attach to
  the bright stars**, the rest are pure constellation.
- **Role count**: **7 roles ride the constellation's bright stars** (head→stinger,
  newest→oldest, Antares = the Full-stack role); the remaining roles drop into an
  expandable **"＋ Earlier roles (N)"** list below (mirrors the Projects archive).
  Currently 7 on the sign + 2 earlier = 9. This is how it **scales** without
  cluttering the stars — add more stars or push more into "earlier."
- **Star positions** are a normalized `{x, y, mag}` map scaled to the container;
  `getPointAtLength` drives the comet; recomputed on resize. Real site should set
  the container height from role count so spacing stays generous.
- **Awards as star-badges pinned on top** (see note above).
- **Cross-link** TFind / SmartFuel awards to their Projects entries.
- **Mobile**: cards narrow to ~42% columns; keep the recognizable hook shape.

> Reusable idea: the same normalized-star-map technique could render *any*
> constellation — if a friend has a known sign, the Friends globe could echo it.

### 3.2 Projects — "Featured Orbit + Solar Archive" (chosen direction)

18 projects (12 coding + 6 design). Two parts that play to each other:

**A. Featured orbit (pinned showcase).** Zoom into the planet; your **featured**
projects (~10 — "the more the better") ride a **single tilted ring** around it.
The ring has **three control modes**:

1. **Auto-tour (default)** — gently rotates on its own so it feels alive; status
   label reads `⟳ touring`.
2. **Arrows (‹ ›)** — clicking either arrow **stops the auto-tour** and **snaps**
   the next/previous project to the front (eased snap to the exact front slot).
   From then on it's manual; label reads `❚❚ manual`. This is the primary way to
   step through deliberately.
3. **Drag** — grab and spin with momentum/coast; also drops into manual mode.
   Because the projects live in the planet's ring, this is the same gesture as
   dragging the planet (mirrors the drag+coast in `CelestialScene.jsx`).

Below the ring: a **position indicator** — a live `NN / 10` counter plus a row of
**clickable dots** (active dot glows; clicking one snaps straight to that
project). The indicator is derived from whichever card is frontmost, so it stays
in sync across auto-tour, arrows, drag, and dots.

One rAF loop arbitrates: **snap > drag-coast > auto-tour**. The card at the
**front blooms** — only it shows its one-line detail; the rest stay as clean
title cards so 10 don't turn into clutter (depth `(sin θ+1)/2` → scale + opacity
+ z-index; front draws over back). Scroll is decoupled from the spin — it only
zooms the planet and pins the section.

**B. Full archive (below, in normal flow).** Header **"Project Archive"** on the
left, **filter tabs** on the right: **All · Coding · Design** (with live counts).
Below, a **2-column grid of compact rows** — chosen over big cards because with
many projects (the real archive may be 20+ code, 10+ design) big cards become a
wall. Compact rows stay scannable.

Each row is two lines: **icon · title · tech**, matching the reference
screenshot:

```
┌───────────────────────────────┐   ┌───────────────────────────────┐
│ [▦]  Data Viz Dashboard        │   │ [⚡]  TFind                     │
│      React · D3 · FastAPI       │   │      React Native · Firebase   │
└───────────────────────────────┘   └───────────────────────────────┘
        ↑ click a row → expands: ◷ date — description, + GitHub/demo icons
```

- **Compact by default**, but **click-to-expand** reveals the **date +
  description** and the GitHub/demo link icons surface on hover — so the detail
  you wanted earlier isn't lost, just tucked away until asked for.
- **Tabs replace the stacked Code/Design groups** — filtering handles the
  more-code-than-design imbalance cleanly (you see one set at a time, or All).
- **No numbering**; date shown on expand with a clock glyph.
- **Icon** per project — **monochrome line icons** in a warm-orange tile (set of
  ~16 inline SVGs keyed by name: chart, bolt, fuel, brain, code, db, game,
  palette, etc.). On the live site these can stay line icons or become real
  thumbnails. Kept warm-orange (the reference screenshot was purple).

> Recommendation recorded: compact rows + expand beat big cards for an archive of
> this size. Reserve richer presentation for the **featured orbit**, which already
> showcases the highlights.

- **Pagination**: the archive is **paged** (≈6 rows/page) with ‹ N/M › controls,
  rather than dumping the whole list — keeps it compact. Filter tabs reset to
  page 1. (Could become numbered pages or infinite-scroll later.)

> **Mockup-only scaffolding (not production):** the orange annotation boxes, the
> storyboard banner at the top, and `[ thumbnail ]` / `IMG` placeholders exist
> only to explain the design. In the real build they're gone, and placeholders
> become real images/content.

Why this beats the earlier all-projects orbit: orbit carries only a handful of
high-contrast featured cards (readable), and the long tail gets a home that's
scannable *and* pretty.

- **Planet sizing**: keep the planet **small** in this section (~half size) — it's
  a central focal point, not the star of the show. The planet already has its own
  moving ring, so the cleanest read is **projects riding a flat, tilted ring**
  around a small planet (think "the projects *are* the ring"). On the real site
  the project sprites can sit on the planet's actual ring particle system; in the
  mockup it's a flatter ellipse (low b/a) around the shrunken planet.
- **Spin speed**: the auto-tour should be **slow and gentle** (a card reaching
  the front every several seconds), not a fast carousel — easy to read, calm.
- **Controls**: **page scroll drives the ring rotation** (scrolling through the
  pinned section tours the projects — natural, never traps scroll), plus **drag**
  (free spin + coast) and **arrows / dots** (snap to a project). No wheel-capture.
- **Planet timing (critical)**: the planet's reassembly must NOT depend on a
  scroll signal that can be frozen. Earlier the wheel captured the scroll, so the
  planet (reassembly tied to scroll) never appeared until you scrolled past all
  10. Fixed by (a) removing wheel-capture and (b) reassembling the planet almost
  immediately on entering the orbit, so it's present for projects 1–N.
- **Indicator placement**: counter + dots go **above** the ring, never below —
  the front (bottom) card was overlapping a bottom-placed indicator.
- **Layout**: a taller orbit area + a slightly rounder ellipse spreads ~10 cards
  more evenly (a very flat ring bunches them at the left/right turn points).
- **Featured cards cross-link** to their hackathon awards in Experience.
- **Thumbnails are the #1 content upgrade** — needs `public/images/`
  (flagged in PROJECT-PLAN §8). Each archive card + orbit card has a thumbnail slot.

**Implementation note (real site):** featured orbit can be real Three.js ring
sprites with raycast→bloom, or DOM cards positioned on an ellipse over the canvas
(the mockup does the latter) — if DOM, couple the drag handler so the ring
rotation matches the planet's. The archive is plain DOM/CSS driven by
`projects.js` (add `date`, `description`, `github`, `demo`, `thumbnail`,
`featured` fields).

### 3.3 Friends — interactive constellation globe

The payoff section: a **rotating 3D constellation** where each lit node is a person.

- **Real rotation**: nodes are 3D points on a Fibonacci sphere, rotated (Y + X)
  and re-projected each frame — front nodes are larger/brighter, back nodes
  shrink/fade (depth → size, opacity, z-index). **Drag to spin** (with coast),
  gentle **auto-rotate** when idle.
- **Friend nodes are distinct** — sized up, in the friend's `color`, with a glow;
  the rest are dim background stars + faint connection lines.
- **Labels** — each friend node has a name label that fades in when it rotates to
  the front (and pins when hovered). (Real site: drei `<Html>` / `CSS2DRenderer`.)
- **Hover + click** — hover a node *or* a legend name highlights both (synced);
  click opens that friend's portfolio. (Real site: raycaster for node picking.)
- **Legend** below the globe — generated from the friends data; accessible and
  works for visitors who won't drag.
- **Data**: friends list lives in `friends.js` (name, url, color). Keep node count
  and colors in sync there.
- **Layering gotcha (decided)**: the globe is Layer 0 (behind content). Drag is
  handled on **window**, gated to when the globe is visible (same as
  `CelestialScene`), and the globe **fades out near the section's end** so the
  bottom legend never scrolls over a visible globe. Title pinned top, legend
  bottom, globe centered between. On the real site, raycasting makes the nodes
  themselves hover/clickable (the mockup drives that from the legend).

---

## 4. The structural change that makes it all work

Replace two scroll listeners + magic numbers with **one clock + sticky stages**.

### 4.1 Single scroll clock (source of truth)

```js
// hooks/useScrollProgress.js  (sketch)
// Each section registers its DOM range; we derive which section is active
// and a 0→1 progress WITHIN it. Planet + content read from the same value.
const { activeSection, sectionProgress, globalPercent } = useScrollProgress();
```

- Planet keyframes become **semantic**, tied to real section positions:
  `introDock`, `experiencePath`, `projectsOrbit`, `friendsCenter`.
- **Never drifts** as content grows → deletes the "re-tune breakpoints" TODO
  forever.
- `App.jsx` and `CelestialScene.jsx` both consume this one hook (pass the value
  down as a prop, or a tiny context/store).

### 4.2 Sticky "stage" per section (the missing primitive)

```
<section> = tall scroll "track" (e.g. 250vh)
   └── <div sticky, height:100vh> = the "stage"
          content animates IN PLACE while you scroll the track,
          driven by sectionProgress (0→1), same clock as the planet
```

This is the scrollytelling primitive currently missing. **No new dependency
required** — use the scroll value you already compute. (GSAP ScrollTrigger /
Framer Motion remain options if you later want spring physics; we're staying
dependency-light to match the project's stated decision.)

---

## 5. Cross-cutting (do these while refactoring)

| Concern | Action |
| --- | --- |
| **Mobile** | World-units (`x=10`) don't map across aspect ratios — planet ends up off-screen / behind text. Plan a phone layout: planet smaller/top, content full-width, motion reduced. |
| **`prefers-reduced-motion`** | Add a path that disables scroll-linked motion and just shows content. A11y + perf win. |
| **Text contrast** | Card bg is `rgba(...,0.03)` over a busy starfield — body text gets hard to read. Add a subtle radial vignette behind text columns. |
| **One source of scroll** | Remove the duplicate listener; share the hook. |

---

## 6. Build order

1. **Unified scroll clock + sticky stages** — unlocks real choreography. *Do first.*
2. **Experience flight-path timeline** — highest ROI on dense content.
3. **Friends globe interactivity** — labels + click; finishes the payoff.
4. **Projects gallery + thumbnails.**
5. **Mobile + reduced-motion pass.**

---

## 7. Planet docking note

The planet was parking **too far right** (big empty gap between the text/cards
and the planet) in Intro and Experience. Dock it **closer to the content** —
in the mockup the right dock moved from ~34% to ~21% of viewport width. When
porting to the real Three.js scene, reduce the world-space `x` dock accordingly
(currently `x=10`), and remember it must be re-derived per aspect ratio for
mobile.

## 8. Open questions

- Do we want the planet→globe transition to be a literal "shatter into
  constellation" effect, or keep the current crossfade? (Crossfade is fine for v1.)
- Friend node placement: evenly distributed (current) vs. clustered by how you
  know them (school / hackathons / work)?
- Orbital projects on mobile: spin-on-scroll may be cramped — fall back to a
  simple Coding/Design tabbed list on small screens?
