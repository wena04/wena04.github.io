import * as THREE from "three";

/**
 * Load an SVG URL and return a Three.js CanvasTexture.
 * SVGs don't load reliably with TextureLoader, so we
 * draw them onto a canvas first.
 */
const loadSvgTexture = (url, size = 128) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    // Draw white circle background for visibility on dark sphere
    ctx.fillStyle = "rgba(20, 20, 20, 0.9)";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw the icon centered with some padding
    const pad = size * 0.2;
    ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
    texture.needsUpdate = true;
  };
  img.src = url;

  return texture;
};

export const createSkillOrbits = (textures) => {
  const group = new THREE.Group();
  const orbitRadius = 3.5; // How wide the ring is

  const sphereGeo = new THREE.SphereGeometry(0.25, 32, 32);

  textures.forEach((texUrl, i) => {
    const angle = (i / textures.length) * Math.PI * 2;

    const map = loadSvgTexture(texUrl);

    const mat = new THREE.MeshStandardMaterial({
      map: map,
      roughness: 0.4,
      metalness: 0.1,
      emissive: 0x222222, // Slight glow so logos are visible
    });

    const mesh = new THREE.Mesh(sphereGeo, mat);

    // Position in a ring
    mesh.position.x = Math.cos(angle) * orbitRadius;
    mesh.position.z = Math.sin(angle) * orbitRadius;

    group.add(mesh);
  });

  return group;
};
