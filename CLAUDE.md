# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Anthony Wen's personal portfolio site (React 19 + Vite + Three.js, vanilla — no `@react-three/fiber`). Deployed as a static site to GitHub Pages at anthonywen.dev. **Not open source** — see `LICENSE`; view-only, no reuse/redistribution.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/ (no sourcemaps)
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test suite configured in this repo.

## Where to look

This file is intentionally just a map. For architecture, design decisions, current status, and TODOs, read the docs below — start with `PROGRESS.md`.

- **`PROGRESS.md`** — start here. Running log of current work: per-section status, what's done vs. outstanding, repo-health notes.
- **`docs/PROJECT-PLAN.md`** — architecture reference: layer model, page flow, phase tracking. May drift out of date, cross-check against code.
- **`docs/scrollytelling-design.md`** — narrative/design spec for the scroll journey.
- **`docs/scrollytelling-mockup.html`** — standalone low-fi HTML mockup used before porting into React; not production code.
- **`docs/celestial-scene.md`** — notes on the Three.js scene implementation.

## Code map

- `src/App.jsx` — top-level composition, owns the single scroll-position state
- `src/scene/` — Three.js background (planet, starfield, globe)
- `src/sections/` — one component per scroll section (Intro, Experience, Research, Education, Projects, Friends)
- `src/nav/` — Navbar, ScrollRail, LoadingScreen, Footer
- `src/data/` — all content (bio, experience, projects, friends, skills) — edit here, not in components
- `src/styles/` — one CSS file per major section/component

## Repo hygiene notes

- `dist/` and `node_modules/` currently appear in `git status` output despite being conceptually build/dependency artifacts — check with the user before committing changes under those paths, since it's unclear whether they're intentionally tracked.
- `full_codebase.txt` and `dump_repo.py` at the repo root are dev-time snapshot/dump utilities, not part of the shipped app.
