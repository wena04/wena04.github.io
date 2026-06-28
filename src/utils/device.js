// Viewport / input profile for responsive layout and 3D performance tiers.
// Used by CelestialScene (GPU budget) and choreography (planet X offsets).

export function getViewportProfile() {
  const w = window.innerWidth;
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const narrow = w < 768;
  const lowPower = narrow || touch;

  return {
    isMobile: narrow,
    isTouch: touch,
    lowPower,
    pixelRatioCap: lowPower ? 1.25 : 2,
    // Pull the planet toward center on narrow screens so it stays beside text.
    xScale: narrow ? Math.max(0.38, w / 1080) : 1,
    enableBloom: w >= 480,
    starCounts: lowPower
      ? { far: 2200, mid: 1100, near: 320 }
      : { far: 4000, mid: 2000, near: 600 },
    moonTextureSize: lowPower ? 512 : 1024,
    antialias: !lowPower,
  };
}
