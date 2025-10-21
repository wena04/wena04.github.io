import * as THREE from "three";
import { createPlanet } from "./planet.js";
import { setupLights } from "./lights.js";
import { setupControls } from "./controls.js";

export function createScene() {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );
  camera.position.set(0, 1.2, 7);

  // Create renderer with bloom-friendly settings
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.8; // a bit hotter

  // Add lights
  const { sunLight } = setupLights(scene);

  // Create planet
  const planet = createPlanet();
  scene.add(planet);

  // Setup controls
  const controls = setupControls(camera, renderer);

  // Create starfield
  const starGeometry = new THREE.BufferGeometry();
  const COUNT = 2000;
  const pos = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    // Random points in a spherical shell
    const r = THREE.MathUtils.lerp(40, 80, Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
    pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  starGeometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const starMaterial = new THREE.PointsMaterial({
    size: 0.06,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer, controls, planet, sunLight };
}
