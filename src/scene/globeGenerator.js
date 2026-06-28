// Friends Network Globe - Fibonacci sphere with geometric connections
// Muted warm palette to match the site (burnt orange / amber, not neon accents).

import * as THREE from "three";

const SITE_NODE = 0xc9a078; // muted gold dust
const SITE_LINE = 0xc25a1e; // burnt orange web
const SITE_GLOW = 0xff6b35;

export const friendUrl = (url) =>
  url && String(url).trim() !== "" && url !== "#" ? String(url).trim() : null;

export const createNetworkGlobe = (friendsData = []) => {
  const group = new THREE.Group();

  const radius = 2.0;
  const particleCount = 220;
  const connectionDistance = 0.6;

  const phi = Math.PI * (3 - Math.sqrt(5));
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const nodeVectors = [];

  for (let i = 0; i < particleCount; i++) {
    const y = 1 - (i / (particleCount - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const vec = new THREE.Vector3(x * radius, y * radius, z * radius);
    nodeVectors.push(vec);
    positions.push(vec.x, vec.y, vec.z);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    color: SITE_NODE,
    size: 0.035,
    transparent: true,
    opacity: 0.32,
    blending: THREE.NormalBlending,
  });
  group.add(new THREE.Points(geometry, pointsMaterial));

  const linePositions = [];
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dist = nodeVectors[i].distanceTo(nodeVectors[j]);
      if (dist < connectionDistance) {
        linePositions.push(
          nodeVectors[i].x, nodeVectors[i].y, nodeVectors[i].z,
          nodeVectors[j].x, nodeVectors[j].y, nodeVectors[j].z,
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const linesMesh = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color: SITE_LINE,
      transparent: true,
      opacity: 0.14,
      blending: THREE.NormalBlending,
    }),
  );
  group.add(linesMesh);

  const friendCount = friendsData.length || 7;
  const friendGeo = new THREE.SphereGeometry(0.055, 16, 16);
  const hitGeo = new THREE.SphereGeometry(0.16, 10, 10);
  const friendMeshes = [];

  for (let i = 0; i < friendCount; i++) {
    const idx = Math.floor((i / friendCount) * particleCount);
    const pos = nodeVectors[idx];

    const hex = friendsData[i]?.color
      ? new THREE.Color(friendsData[i].color).getHex()
      : SITE_GLOW;

    const friendMesh = new THREE.Mesh(
      friendGeo,
      new THREE.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity: 0.72,
      }),
    );
    friendMesh.position.copy(pos);

    // Invisible larger hit area for easier hover / click
    const hitMesh = new THREE.Mesh(
      hitGeo,
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    friendMesh.add(hitMesh);

    // Hover ring (shown when highlighted)
    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.11, 28),
      new THREE.MeshBasicMaterial({
        color: 0xffd08a,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    friendMesh.add(halo);

    friendMesh.userData = {
      name: friendsData[i]?.name || `Friend ${i + 1}`,
      url: friendUrl(friendsData[i]?.url),
      index: i,
      baseColor: hex,
      baseOpacity: 0.72,
      hitMesh,
      halo,
    };

    friendMeshes.push(friendMesh);
    group.add(friendMesh);
  }

  const innerSphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.95, 32, 32),
    new THREE.MeshBasicMaterial({
      color: SITE_GLOW,
      transparent: true,
      opacity: 0.02,
      side: THREE.BackSide,
      blending: THREE.NormalBlending,
    }),
  );
  group.add(innerSphere);

  group.userData.friendMeshes = friendMeshes;
  return group;
};

export const setGlobeOpacity = (globe, opacity) => {
  globe.traverse((child) => {
    if (child.material) {
      child.material.opacity = child.material.userData?.baseOpacity
        ? child.material.userData.baseOpacity * opacity
        : opacity;
    }
  });
};
