// Viewport / input profile for responsive layout and 3D performance tiers.
// Used by CelestialScene (GPU budget) and choreography (planet X offsets).

export function getViewportProfile() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const narrow = w <= 768;
  const veryNarrow = w <= 480;
  const shortViewport = h <= 560;
  const lowPower = narrow || shortViewport || touch;
  const narrowScale = Math.max(0.64, Math.min(0.78, w / 520));

  return {
    isMobile: narrow,
    isShortViewport: shortViewport,
    isTouch: touch,
    lowPower,
    pixelRatioCap: lowPower ? 1.25 : 2,
    // Pull the planet toward center on narrow screens so it stays beside text.
    xScale: narrow ? Math.max(0.38, w / 1080) : 1,
    // Friends needs the opposite treatment: keep the crescent near the left edge.
    friendsXScale: narrow ? 0.78 : shortViewport ? 0.86 : 1,
    // Preserve the established hero, then use these values after Intro.
    contentScale: shortViewport ? 0.62 : narrow ? narrowScale : 1,
    contentZOffset: shortViewport ? -1 : narrow ? -0.7 : 0,
    friendsScale: shortViewport ? 0.58 : narrow ? narrowScale : 1,
    ringsOpacityScale: shortViewport ? 0.08 : veryNarrow ? 0.08 : narrow ? 0.18 : 1,
    globeScale: shortViewport
      ? 0.5
      : veryNarrow
        ? Math.max(0.5, Math.min(0.58, w / 650))
        : narrow
          ? 0.64
          : 0.74,
    globeY: shortViewport ? -0.65 : narrow ? -0.95 : -0.55,
    enableBloom: w >= 480,
    starCounts: lowPower
      ? { far: 2200, mid: 1100, near: 320 }
      : { far: 4000, mid: 2000, near: 600 },
    moonTextureSize: lowPower ? 512 : 1024,
    antialias: !lowPower,
  };
}
