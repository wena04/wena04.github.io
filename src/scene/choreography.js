// Scroll -> planet choreography, SEPARATED from the render loop.
//
// The old version used hard-coded scroll-percent breakpoints (0.10 / 0.18 / 0.70)
// tuned to a specific page height — so any change to section heights (e.g. a taller
// Experience) desynced the planet. This version anchors each phase to where the
// real sections actually are, so the planet stays tied to the content regardless
// of how tall sections grow. See docs/scrollytelling-design.md (§4).
import * as THREE from "three";

const { lerp, clamp } = THREE.MathUtils;

// Scroll fraction (0..1) at which each section's top reaches the top of the page.
// Pass section ids; returns { id: fraction|null }.
export const sectionStarts = (ids) => {
  const docH = document.documentElement.scrollHeight - window.innerHeight || 1;
  const out = {};
  for (const id of ids) {
    const el = document.getElementById(id);
    out[id] = el ? (el.getBoundingClientRect().top + window.scrollY) / docH : null;
  }
  return out;
};

// Map global scroll percent (0..1) -> planet transform, anchored to section starts.
// Implemented as keyframes keyed to where the real sections are, so the planet stays
// in sync regardless of section heights. Returns { x, z, friendsActive }.
//
// Journey: landing (zoom in, center) -> intro (dock right) -> experience (hold)
// -> research + education (recede left/back) -> projects (center + small orbit)
// -> friends (come closer, crossfade to globe).
export const planetFromScroll = (sp, starts, opts = {}) => {
  const xScale = opts.xScale ?? 1;
  const introS = starts.intro ?? 0.1;
  const expS = starts.experience ?? 0.22;
  const resS = starts.research ?? 0.38;
  const eduS = starts.education ?? 0.46;
  const projS = starts.projects ?? 0.58;
  const friS = starts.friends ?? 0.82;

  const keys = [
    { at: 0, x: 0, z: -15, s: 1 }, // deep space, centered
    { at: introS * 0.85, x: 6, z: -5, s: 1 }, // dock right (during landing)
    { at: expS, x: 6, z: -5, s: 1 }, // hold through experience
    { at: resS, x: 0, z: -7, s: 1 }, // drift toward center entering research
    { at: eduS, x: -7, z: -9, s: 1 }, // recede during education
    { at: projS, x: 0, z: -7, s: 1 }, // center + small for the projects orbit
    { at: friS, x: -4.6, z: -2.5, s: 1.3 }, // small rim crescent, off to the left
    { at: 1, x: -5.1, z: -2.4, s: 1.4 },
  ];

  let x = keys[0].x, z = keys[0].z, s = keys[0].s;
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (sp >= a.at && sp <= b.at) {
      const t = (sp - a.at) / Math.max(b.at - a.at, 1e-4);
      x = lerp(a.x, b.x, t);
      z = lerp(a.z, b.z, t);
      s = lerp(a.s, b.s, t);
      break;
    }
  }
  if (sp >= keys[keys.length - 1].at) {
    const last = keys[keys.length - 1];
    x = last.x; z = last.z; s = last.s;
  }

  // Fade the planet's OWN particle ring down from the projects orbit onward (project
  // cards become the ring; in Friends the planet is a clean crescent with no rings).
  const projMid = (eduS + projS) / 2;
  let ringsOpacity = 1;
  if (sp >= projMid) {
    ringsOpacity = lerp(1, 0.05, clamp((sp - projMid) / Math.max(projS - projMid, 1e-4), 0, 1));
  }

  // Planet stays fully OPAQUE; the crescent comes from LIGHTING. `crescent` ramps up
  // in Friends so the scene can darken the planet's body (low emissive/ambient) and
  // leave only the lit rim — a true crescent, not a dim full disc.
  const crescent =
    sp >= friS ? clamp((sp - friS) / Math.max((1 - friS) * 0.25, 1e-4), 0, 1) : 0;

  // Fade the planet BODY dark in Friends so only the lit rim + atmosphere glow show
  // (a thin crescent, not a lit disc). Atmosphere glow stays full (rim).
  const planetOpacity = lerp(1, 0.14, crescent);

  // Globe fades in only AFTER the section settles (so it doesn't pop over the
  // content during the scroll-in), and fades back out near the very end.
  const friendsP = sp >= friS ? clamp((sp - friS) / Math.max(1 - friS, 1e-4), 0, 1) : 0;
  const globeVis = clamp((friendsP - 0.14) / 0.18, 0, 1);

  return {
    x: x * xScale,
    z,
    scale: s,
    friendsActive: sp >= friS,
    ringsOpacity,
    crescent,
    planetOpacity,
    globeVis,
  };
};
