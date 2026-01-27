// File: src/components/Background3D.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const Background3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountEl = mountRef.current;

    // 1. SETUP
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5; // Camera fixed position

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountEl.appendChild(renderer.domElement);

    // 2. POST-PROCESSING (Glow)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.4,
      0.4,
      0.1
    );
    composer.addPass(bloomPass);

    // --- Galaxy / Starfield ---
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
    const starTex = createStarTexture();

    const createStarfield = (count, radius, size, opacity, baseColor, colorVariation = 0.1) => {
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
        c.offsetHSL((Math.random() - 0.5) * colorVariation, 0, (Math.random() - 0.5) * 0.2);
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
        map: starTex,
        vertexColors: true,
      });

      return new THREE.Points(geo, mat);
    };

    const sFar = createStarfield(5000, 150, 0.08, 0.4, 0xffffff, 0.05);
    const sMid = createStarfield(3000, 80, 0.15, 0.6, 0xffd08a, 0.15);
    const sNear = createStarfield(1000, 40, 0.25, 0.8, 0xff8c42, 0.2);
    scene.add(sFar, sMid, sNear);
    const starLayers = [sFar, sMid, sNear];

    // 3. PLANET GROUP
    const celestialGroup = new THREE.Group();
    // Start planet far away
    celestialGroup.position.z = -20;
    scene.add(celestialGroup);

    // --- SOFT MOON TEXTURE GENERATION ---
    const createSoftMoonTexture = () => {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      // Warm Golden-Orange Base
      ctx.fillStyle = "#e69138"; 
      ctx.fillRect(0, 0, size, size);

      // Layer 1: Soft Cloud-like noise for color variation
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const radius = Math.random() * 400 + 100;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        // Using a "lighter black" (deep sienna) for softer shadows
        grad.addColorStop(0, "rgba(70, 30, 10, 0.4)"); 
        grad.addColorStop(1, "rgba(70, 30, 10, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer 2: Sparse, Shallow Craters
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const radius = Math.random() * 40 + 5;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, "rgba(255, 200, 100, 0.3)"); // Brighter highlights
        grad.addColorStop(1, "rgba(255, 200, 100, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 128),
      new THREE.MeshStandardMaterial({
        map: createSoftMoonTexture(),
        roughness: 0.8,
        metalness: 0.1,
        emissive: 0xff4500, // Warm internal glow
        emissiveIntensity: 0.15,
      })
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
      new THREE.Mesh(new THREE.SphereGeometry(1.05, 64, 64), atmoMat)
    );

    // Ring Particles
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
    const rings = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        map: starTex,
        depthWrite: false,
      })
    );
    rings.rotation.x = Math.PI / 3;
    celestialGroup.add(rings);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // 4. ANIMATION & INTERACTION STATE
    let scrollPercent = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
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

        celestialGroup.rotation.y += deltaX * 0.005;
        celestialGroup.rotation.x += deltaY * 0.005;

        rotationVelocity = {
          x: deltaY * 0.005,
          y: deltaX * 0.005,
        };

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

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

      // --- DRAG & COASTING LOGIC ---
      if (!isDragging) {
        celestialGroup.rotation.y += rotationVelocity.y;
        celestialGroup.rotation.x += rotationVelocity.x;

        // Friction
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;

        // Slow, majestic rotation
        celestialGroup.rotation.y += 0.001;
      }

      rings.rotation.y += 0.0005;

      // Star Parallax / Twinkle
      starLayers.forEach((layer, i) => {
        layer.rotation.y += 0.0001 * (i + 1);
        layer.material.opacity =
          layer.material.opacity * 0.99 + (Math.random() * 0.1 + (0.4 + i * 0.2)) * 0.01;
        layer.material.opacity = THREE.MathUtils.clamp(layer.material.opacity, 0.1, 0.85);
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

export default Background3D;
