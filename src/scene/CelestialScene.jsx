// Layer 0 - 3D Background Scene
// File: src/scene/CelestialScene.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { createNetworkGlobe } from "./globeGenerator";
import { friends } from "../data/friends";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const CelestialScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountEl = mountRef.current;

    // ------------------------------------------------------------------------
    // 1. SCENE SETUP (Camera, Renderer, Post-Processing)
    // ------------------------------------------------------------------------
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5; // Camera fixed position

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountEl.appendChild(renderer.domElement);

    // Post-Processing Setup (Bloom Effect)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.4,
      0.4,
      0.1,
    );
    composer.addPass(bloomPass);

    // ------------------------------------------------------------------------
    // 2. GALAXY / STARFIELD SETUP
    // ------------------------------------------------------------------------
    const starTex = createStarTexture();
    const sFar = createStarfield(4000, 200, 0.05, 0.6, 0xffffff, 0.05, starTex);
    const sMid = createStarfield(2000, 100, 0.08, 0.5, 0xffd08a, 0.15, starTex);
    const sNear = createStarfield(600, 60, 0.12, 0.4, 0xff8c42, 0.2, starTex);
    scene.add(sFar, sMid, sNear);
    const starLayers = [sFar, sMid, sNear];

    // ------------------------------------------------------------------------
    // 3. PLANET GROUP SETUP
    // ------------------------------------------------------------------------
    const celestialGroup = new THREE.Group();

    // Initial Startup Angle
    celestialGroup.rotation.z = -Math.PI / 5;
    celestialGroup.rotation.x = -Math.PI / 2.5;
    celestialGroup.position.z = -20; // Start planet far away
    scene.add(celestialGroup);

    // Planet Creation
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: createSoftMoonTexture(),
      roughness: 0.8,
      metalness: 0.1,
      emissive: 0xff4500, // Warm internal glow
      emissiveIntensity: 0.15,
      transparent: true,
    });
    planetMaterial.userData = { baseOpacity: 1 };
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 128),
      planetMaterial,
    );
    celestialGroup.add(planet);

    // Subtle Atmosphere
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

    // The ring creation
    const pGeo = new THREE.BufferGeometry();
    const count = 8000; // More particles for density
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
      size: 0.015, // Larger particles (kept from image)
      vertexColors: true,
      transparent: true,
      opacity: 0.6, // More luminous (kept from image)
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    ringsMaterial.userData = { baseOpacity: 0.6 };
    const rings = new THREE.Points(pGeo, ringsMaterial);
    rings.rotation.x = Math.PI / 2.2;
    celestialGroup.add(rings);

    // ------------------------------------------------------------------------
    // 4. FRIENDS NETWORK GLOBE (Initially Hidden)
    // ------------------------------------------------------------------------
    const friendsGlobe = createNetworkGlobe(friends);
    friendsGlobe.position.set(0, 0, 0); // Center position

    // Store base opacities for each material
    friendsGlobe.traverse((child) => {
      if (child.material) {
        child.material.userData = { baseOpacity: child.material.opacity };
        child.material.opacity = 0; // Start hidden
        child.material.transparent = true;
      }
    });
    scene.add(friendsGlobe);

    // Track current opacity for smooth transitions
    let globeOpacity = 0;
    let planetOpacity = 1;

    // ------------------------------------------------------------------------
    // 5. LIGHTING
    // ------------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // ------------------------------------------------------------------------
    // 6. ANIMATION & INTERACTION STATE
    // ------------------------------------------------------------------------
    let scrollPercent = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Separate velocity for planet and globe
    let planetVelocity = { x: 0, y: 0 };
    let globeVelocity = { x: 0, y: 0 };

    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = scrollable > 0 ? window.scrollY / scrollable : 0;
    };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        // Check which object is visible based on scroll position
        const isFriendsSection = scrollPercent > 0.75;

        if (isFriendsSection) {
          // Drag the globe (inverted to follow mouse direction)
          friendsGlobe.rotation.y -= deltaX * 0.005;
          friendsGlobe.rotation.x -= deltaY * 0.005;
          globeVelocity = {
            x: -deltaY * 0.005,
            y: -deltaX * 0.005,
          };
        } else {
          // Drag the planet (inverted to follow mouse direction)
          celestialGroup.rotation.y -= deltaX * 0.005;
          celestialGroup.rotation.x -= deltaY * 0.005;
          planetVelocity = {
            x: -deltaY * 0.005,
            y: -deltaX * 0.005,
          };
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    // Event Listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Scrollytelling: Zoom In (0-20%) -> Slide Left (20-100%)
      const zoomProgress = Math.min(scrollPercent * 5, 1);
      const moveProgress = Math.max((scrollPercent - 0.2) * 1.25, 0);

      celestialGroup.position.z = THREE.MathUtils.lerp(-15, 0, zoomProgress);
      celestialGroup.position.x = THREE.MathUtils.lerp(0, -2.5, moveProgress);

      // Drag & Coasting Logic - Planet
      if (!isDragging) {
        celestialGroup.rotation.y += planetVelocity.y;
        celestialGroup.rotation.x += planetVelocity.x;
        planetVelocity.x *= 0.95; // Friction
        planetVelocity.y *= 0.95;
        celestialGroup.rotation.y += 0.001; // Slow auto-rotate
      }
      rings.rotation.y += 0.0005;

      // Drag & Coasting Logic - Globe
      if (!isDragging) {
        friendsGlobe.rotation.y += globeVelocity.y;
        friendsGlobe.rotation.x += globeVelocity.x;
        globeVelocity.x *= 0.95; // Friction
        globeVelocity.y *= 0.95;
        friendsGlobe.rotation.y += 0.001; // Slow auto-rotate
      }

      // Starfield Parallax & Twinkle
      starLayers.forEach((layer, i) => {
        layer.rotation.y += 0.0001 * (i + 1);
        layer.material.opacity =
          layer.material.opacity * 0.99 +
          (Math.random() * 0.1 + (0.4 + i * 0.2)) * 0.01;
        layer.material.opacity = THREE.MathUtils.clamp(
          layer.material.opacity,
          0.1,
          0.85,
        );
      });

      // ------------------------------------------------------------------------
      // PLANET <-> GLOBE CROSSFADE (Friends Section Transition)
      // ------------------------------------------------------------------------
      const isFriendsSection = scrollPercent > 0.75; // Adjust threshold as needed
      const targetGlobeOpacity = isFriendsSection ? 1 : 0;
      const targetPlanetOpacity = isFriendsSection ? 0 : 1;

      // Smooth lerp transition
      globeOpacity = THREE.MathUtils.lerp(
        globeOpacity,
        targetGlobeOpacity,
        0.05,
      );
      planetOpacity = THREE.MathUtils.lerp(
        planetOpacity,
        targetPlanetOpacity,
        0.05,
      );

      // Apply opacity to globe materials
      friendsGlobe.traverse((child) => {
        if (
          child.material &&
          child.material.userData.baseOpacity !== undefined
        ) {
          child.material.opacity =
            child.material.userData.baseOpacity * globeOpacity;
        }
      });

      // Apply opacity to planet materials
      celestialGroup.traverse((child) => {
        if (child.material) {
          if (child.material.uniforms) {
            // Shader materials (atmosphere)
            // Skip for now, or handle separately
          } else if (child.material.opacity !== undefined) {
            child.material.opacity =
              planetOpacity * (child.material.userData?.baseOpacity || 1);
            child.material.transparent = true;
          }
        }
      });

      composer.render();
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      mountEl.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "black",
        cursor: "grab",
      }}
    />
  );
};

export default CelestialScene;

// ==========================================
// HELPER FUNCTIONS
// ==========================================

const createStarTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
};

const createStarfield = (
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

const createSoftMoonTexture = () => {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Rich Burnt Orange Base
  ctx.fillStyle = "#c25a1e";
  ctx.fillRect(0, 0, size, size);

  // Layer 1: Darker, broader sienna patches for depth
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 600 + 200;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, "rgba(40, 10, 0, 0.5)");
    grad.addColorStop(1, "rgba(40, 10, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 2: Craters (Rings and Depressions)
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 30 + 5;

    // Rim highlight
    ctx.strokeStyle = "rgba(255, 200, 150, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner shadow
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, "rgba(20, 5, 0, 0.3)");
    grad.addColorStop(0.8, "rgba(20, 5, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Layer 3: Finer "noise" for rocky texture
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 3 + 1;
    ctx.fillStyle =
      Math.random() > 0.5 ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
};
