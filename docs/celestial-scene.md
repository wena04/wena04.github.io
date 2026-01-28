# Layer 0: Celestial Scene Design Specs

**Component:** `src/components/CelestialScene.jsx`
**Status:** Locked (Visuals Approved)
**Theme:** Warm Celestial / Godly Orbit

This document defines the visual parameters for the background 3D scene. Future changes to animation or interactivity must preserve these aesthetic values.

---

## 1. Composition (The "Slash" Angle)

The scene uses a specific rotation to create a cinematic, diagonal composition where the rings cut from top-left to bottom-right.

- **Group Position:** `z = -20` (Starts deep in background)
- **Z-Axis Tilt (The Slant):** `-Math.PI / 5` (-36°)
- **X-Axis Tip (The Openness):** `-Math.PI / 2.5` (-72°)
  - _Note: This steep angle tips the planet forward to reveal the full face of the rings._

---

## 2. The Planet (Hero Mesh)

A procedural "Warm Moon" texture generated via Canvas API (`createSoftMoonTexture`).

- **Base Color:** `#c25a1e` (Rich Burnt Orange)
- **Surface Details:**
  - **Shadows:** Dark Sienna (`rgba(40, 10, 0, 0.5)`)
  - **Craters:** Sparse (~200) with distinct highlighted rims (`rgba(255, 200, 150, 0.15)`)
  - **Noise:** Fine white/black noise for rocky texture.
- **Material:**
  - `Roughness`: 0.8 (Matte, dusty)
  - `Metalness`: 0.1 (Low reflection)
  - `Emissive`: `#ff4500` (Deep Orange) at **0.15 Intensity**
- **Atmosphere:**
  - Shader-based Fresnel halo using `#ff6b35` (Persimmon Orange).

---

## 3. The Rings

A dense particle system orbiting the planet.

- **Particle Count:** 8,000
- **Geometry:**
  - Radius: `2.5` to `4.0` (Wide orbit)
  - Vertical Spread: `0.2` (Thick volume)
- **Color Scheme:** **Solid Warm Orange**
  - HSL Value: `0.08, 1.0, 0.5`
- **Particle Size:** `0.015` (Large/Luminous)
- **Orientation:** Rotated `Math.PI / 2.2` relative to the Planet mesh.

---

## 4. Starfield (Background)

Three distinct layers of depth using a custom **Round Star** texture (`createStarTexture`).

| Layer    | Count | Size | Color                   | Opacity |
| :------- | :---- | :--- | :---------------------- | :------ |
| **Far**  | 4000  | 0.05 | White (`#ffffff`)       | 0.6     |
| **Mid**  | 2000  | 0.08 | Gold (`#ffd08a`)        | 0.5     |
| **Near** | 600   | 0.12 | Deep Orange (`#ff8c42`) | 0.4     |

---

## 5. Lighting & Effects

- **Ambient Light:** White (`#ffffff`), Intensity `0.3`
- **Sun Light:** Directional, White (`#ffffff`), Intensity `1.5`, Position `(5, 3, 5)`
- **Bloom (Post-Processing):**
  - `Threshold`: 0.1
  - `Strength`: 1.4
  - `Radius`: 0.4
