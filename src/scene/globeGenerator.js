// File: src/scene/globeGenerator.js
// Friends Network Globe - Fibonacci sphere with geometric connections
// Design: Gold nodes, orange connections, constellation style

import * as THREE from "three";

export const createNetworkGlobe = (friendsData = []) => {
  const group = new THREE.Group();

  // 1. CONFIGURATION
  const radius = 2.0; // Matches planet size
  const particleCount = 250; // Number of nodes in the mesh
  const connectionDistance = 0.55; // Max distance to draw a line
  const colorNode = new THREE.Color(0xffd08a); // Gold
  const colorLine = new THREE.Color(0xff6b35); // Orange (matches theme)

  // 2. GENERATE NODES (Fibonacci Sphere Algorithm)
  // Distributes points evenly around the sphere
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  // Array to store vector positions for line calculation
  const nodeVectors = [];

  for (let i = 0; i < particleCount; i++) {
    const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
    const theta = phi * i; // Golden angle increment

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Push scaled by radius
    const vec = new THREE.Vector3(x * radius, y * radius, z * radius);
    nodeVectors.push(vec);
    positions.push(vec.x, vec.y, vec.z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );

  // 3. CREATE POINTS (The Nodes)
  const pointsMaterial = new THREE.PointsMaterial({
    color: colorNode,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const pointsMesh = new THREE.Points(geometry, pointsMaterial);
  group.add(pointsMesh);

  // 4. GENERATE CONNECTIONS (The Lines)
  // Connect nodes that are close to each other
  const linePositions = [];
  const lineMaterial = new THREE.LineBasicMaterial({
    color: colorLine,
    transparent: true,
    opacity: 0.15, // Faint lines
    blending: THREE.AdditiveBlending,
  });

  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dist = nodeVectors[i].distanceTo(nodeVectors[j]);
      if (dist < connectionDistance) {
        linePositions.push(
          nodeVectors[i].x,
          nodeVectors[i].y,
          nodeVectors[i].z,
          nodeVectors[j].x,
          nodeVectors[j].y,
          nodeVectors[j].z,
        );
      }
    }
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3),
  );
  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(linesMesh);

  // 5. ADD "FRIEND" MARKERS (Major Nodes)
  // Use actual friends data or fallback to random positions
  const friendCount = friendsData.length || 7;
  const friendGeo = new THREE.SphereGeometry(0.08, 16, 16);

  // Store friend meshes for later interaction (raycasting)
  const friendMeshes = [];

  for (let i = 0; i < friendCount; i++) {
    // Pick node position - distribute friends evenly if possible
    const idx = Math.floor((i / friendCount) * particleCount);
    const pos = nodeVectors[idx];

    // Use friend's color if available, otherwise default to white
    const friendColor = friendsData[i]?.color || 0xffffff;
    const friendMat = new THREE.MeshBasicMaterial({
      color: friendColor,
      transparent: true,
      opacity: 0.9,
    });

    const friendMesh = new THREE.Mesh(friendGeo, friendMat);
    friendMesh.position.copy(pos);

    // Store friend data for interaction
    friendMesh.userData = {
      name: friendsData[i]?.name || `Friend ${i + 1}`,
      url: friendsData[i]?.url || null,
      index: i,
    };

    friendMeshes.push(friendMesh);
    group.add(friendMesh);
  }

  // 6. INNER GLOW (Atmosphere)
  // Keeps the globe from looking hollow
  const innerGeo = new THREE.SphereGeometry(radius * 0.95, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xff6b35,
    transparent: true,
    opacity: 0.03,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const innerSphere = new THREE.Mesh(innerGeo, innerMat);
  group.add(innerSphere);

  // Attach friend meshes reference for external access
  group.userData.friendMeshes = friendMeshes;

  return group;
};

// Export helper to set globe opacity (for transitions)
export const setGlobeOpacity = (globe, opacity) => {
  globe.traverse((child) => {
    if (child.material) {
      child.material.opacity = child.material.userData?.baseOpacity
        ? child.material.userData.baseOpacity * opacity
        : opacity;
    }
  });
};
