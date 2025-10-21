import * as THREE from "three";

export function setupLights(scene) {
  // Ambient light (very subtle)
  const ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  // Sun light (warm, bright)
  const sunLight = new THREE.PointLight(0xffd080, 6.0, 100, 2);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  return { sunLight };
}
