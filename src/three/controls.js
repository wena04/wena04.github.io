import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function setupControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  // Configure controls
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 20;
  controls.minDistance = 2;

  // Set initial target
  controls.target.set(0, 0, 0);

  return controls;
}

