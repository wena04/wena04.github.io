import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const VisualTest = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mountEl = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mountEl.appendChild(renderer.domElement);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5,
      0.4,
      0.1
    );
    composer.addPass(bloomPass);

    // Planet Creation
    const celestialGroup = new THREE.Group();

    const createNoiseTexture = () => {
      const size = 1024;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      const imgData = ctx.createImageData(size, size);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const val = Math.random() * 255;
        imgData.data[i] = val;
        imgData.data[i + 1] = val;
        imgData.data[i + 2] = val;
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };
    const noiseMap = createNoiseTexture();

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 128),
      new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        bumpMap: noiseMap,
        bumpScale: 0.15,
        roughness: 0.4,
        metalness: 0.2,
        emissive: 0xff2200,
        emissiveIntensity: 0.2,
      })
    );
    celestialGroup.add(planet);

    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: { glowColor: { value: new THREE.Color(0xff8c42) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
    });
    celestialGroup.add(
      new THREE.Mesh(new THREE.SphereGeometry(1.1, 64, 64), atmoMat)
    );

    // Fiery Rings
    const particles = 20000;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(particles * 3);
    const col = new Float32Array(particles * 3);
    for (let i = 0; i < particles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      const c = new THREE.Color().setHSL(0.08, 1.0, 0.4 + Math.random() * 0.5);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const ring = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.012,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
    );
    ring.rotation.x = Math.PI / 2.1;
    celestialGroup.add(ring);
    scene.add(celestialGroup);

    // --- STARFIELD (Layered for depth) ---
    const createStarfield = (count, radius, size, opacity) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius + (Math.random() - 0.5) * 20;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          size,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
    };

    const starsFar = createStarfield(4000, 100, 0.05, 0.4);
    const starsMid = createStarfield(2000, 60, 0.08, 0.6);
    const starsNear = createStarfield(500, 30, 0.12, 0.8);
    scene.add(starsFar, starsMid, starsNear);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0b1020, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffd08a, 5.2, 140, 2);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x7aa2ff, 0.55);
    rimLight.position.set(-6, 4, -8);
    scene.add(rimLight);

    // Drag & Coasting Logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };
    let scrollPercent = 0;

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
        rotationVelocity = { x: deltaY * 0.005, y: deltaX * 0.005 };
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleScroll = () => {
      scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        celestialGroup.rotation.y += rotationVelocity.y;
        celestialGroup.rotation.x += rotationVelocity.x;
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
        celestialGroup.rotation.y += 0.001;
      }

      // Starfield parallax
      starsFar.rotation.y += 0.0001;
      starsMid.rotation.y += 0.0002;
      starsNear.rotation.y += 0.0003;

      // Scroll transitions
      celestialGroup.position.x = THREE.MathUtils.lerp(
        celestialGroup.position.x,
        -scrollPercent * 2.5,
        0.05
      );
      celestialGroup.scale.setScalar(
        THREE.MathUtils.lerp(celestialGroup.scale.x, 1 - scrollPercent * 0.4, 0.05)
      );

      composer.render();
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (mountEl && renderer.domElement) {
        mountEl.removeChild(renderer.domElement);
      }
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

export default VisualTest;
