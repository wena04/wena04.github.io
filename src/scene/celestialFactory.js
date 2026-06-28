// Builds the visual celestial bodies: the planet (mesh + atmosphere + rings) and
// the layered starfield. Pure scene-graph construction — no scroll/animation here.
// Visual params are locked per docs/celestial-scene.md.
import * as THREE from "three";
import { createSoftMoonTexture } from "./textures";

// ---- Starfield layer (THREE.Points) -----------------------------------------
export const createStarfield = (
  count,
  radius,
  size,
  opacity,
  baseColor,
  colorVariation = 0.1,
) => {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius + (Math.random() - 0.5) * 50;

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const c = new THREE.Color(baseColor);
    c.offsetHSL(
      (Math.random() - 0.5) * colorVariation,
      0,
      (Math.random() - 0.5) * 0.2,
    );
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  });

  return new THREE.Points(geo, mat);
};

// ---- Planet group: planet + atmosphere + particle rings ---------------------
// Returns the group plus handles the animation loop needs (planet, rings).
export const createPlanetGroup = () => {
  const celestialGroup = new THREE.Group();

  // Initial "slash" composition angle (see celestial-scene.md)
  celestialGroup.rotation.z = -Math.PI / 5;
  celestialGroup.rotation.x = -Math.PI / 2.5;
  celestialGroup.position.z = -20; // Start planet far away
  celestialGroup.position.x = 0; // Start planet centered (landing screen)

  // Planet (hero mesh)
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: createSoftMoonTexture(),
    roughness: 0.8,
    metalness: 0.1,
    emissive: 0xff4500,
    emissiveIntensity: 0.15,
    transparent: true,
  });
  planetMaterial.userData = { baseOpacity: 1 };
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 128, 128),
    planetMaterial,
  );
  celestialGroup.add(planet);

  // Subtle Fresnel atmosphere
  const atmoMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    uniforms: { glowColor: { value: new THREE.Color(0xff6b35) } },
    vertexShader: `
      varying vec3 vN;
      void main() {
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vN;
      void main() {
        float i = pow(0.65 - dot(vN, vec3(0,0,1)), 4.0);
        gl_FragColor = vec4(glowColor, i);
      }
    `,
  });
  celestialGroup.add(
    new THREE.Mesh(new THREE.SphereGeometry(1.05, 64, 64), atmoMat),
  );

  // Particle rings
  const pGeo = new THREE.BufferGeometry();
  const count = 8000;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * 6.28;
    const r = 2.5 + Math.random() * 1.5;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    pos[i * 3 + 2] = Math.sin(a) * r;
    const c = new THREE.Color().setHSL(0.08, 1.0, 0.5);
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));

  const ringsMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  ringsMaterial.userData = { baseOpacity: 0.6 };
  const rings = new THREE.Points(pGeo, ringsMaterial);
  rings.rotation.x = Math.PI / 2.2;
  celestialGroup.add(rings);

  return { celestialGroup, planet, rings };
};
