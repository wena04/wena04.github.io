// Layer 0 - 3D Background Scene
// File: src/scene/CelestialScene.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { createNetworkGlobe } from "./globeGenerator";
import { friends } from "../data/friends";
import { createStarTexture } from "./textures";
import { createStarfield, createPlanetGroup } from "./celestialFactory";
import { sectionStarts, planetFromScroll } from "./choreography";
import { getViewportProfile } from "../utils/device";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const CelestialScene = ({ scrollPercent = 0, onReady }) => {
  const mountRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  // Single source of truth for scroll: App computes scrollPercent and passes it in.
  const scrollRef = useRef(0);
  const sceneStateRef = useRef({ friendsActive: false });
  const labelsRef = useRef(null); // DOM overlay for friend-node labels
  const profileRef = useRef(getViewportProfile());
  useEffect(() => {
    scrollRef.current = scrollPercent;
  }, [scrollPercent]);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountEl = mountRef.current;

    // ------------------------------------------------------------------------
    // 1. SCENE SETUP (Camera, Renderer, Post-Processing)
    // ------------------------------------------------------------------------
    const scene = new THREE.Scene();
    const profile = profileRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5; // Camera fixed position

    // Renderer Setup — lower pixel ratio + no AA on mobile/touch devices
    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: profile.lowPower ? "low-power" : "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.pixelRatioCap));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountEl.appendChild(renderer.domElement);

    // Post-Processing Setup (Bloom Effect) — skipped on very small screens
    const composer = profile.enableBloom
      ? new EffectComposer(renderer)
      : null;
    if (composer) {
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width / 2, height / 2), // Half-res for performance
        1.4,
        0.4,
        0.1,
      );
      composer.addPass(bloomPass);
    }

    // ------------------------------------------------------------------------
    // 2. GALAXY / STARFIELD SETUP
    // ------------------------------------------------------------------------
    const starTex = createStarTexture();
    const { far, mid, near } = profile.starCounts;
    const sFar = createStarfield(far, 200, 0.05, 0.6, 0xffffff, 0.05, starTex);
    const sMid = createStarfield(mid, 100, 0.08, 0.5, 0xffd08a, 0.15, starTex);
    const sNear = createStarfield(near, 60, 0.12, 0.4, 0xff8c42, 0.2, starTex);
    scene.add(sFar, sMid, sNear);
    const starLayers = [sFar, sMid, sNear];

    // ------------------------------------------------------------------------
    // 3. PLANET GROUP SETUP (built in celestialFactory.js)
    // ------------------------------------------------------------------------
    const { celestialGroup, planet, rings } = createPlanetGroup();
    scene.add(celestialGroup);

    // ------------------------------------------------------------------------
    // 4. FRIENDS NETWORK GLOBE (Initially Hidden)
    // ------------------------------------------------------------------------
    const friendsGlobe = createNetworkGlobe(friends);
    friendsGlobe.position.set(0, -0.55, 0); // centered + dropped below the names list
    friendsGlobe.scale.setScalar(0.74); // smaller so the title + globe fit one screen

    // Store base opacities and hide all globe materials at start
    friendsGlobe.traverse((child) => {
      if (child.material) {
        child.material.userData = { baseOpacity: child.material.opacity };
        child.material.opacity = 0; // Start hidden
        child.material.transparent = true;
        child.material.depthWrite = false; // Prevent dark silhouette when invisible
      }
    });
    friendsGlobe.visible = false; // Completely hidden until needed
    scene.add(friendsGlobe);

    // Track current opacity for smooth transitions
    let globeOpacity = 0;
    let planetBodyOpacity = 1;

    // ------------------------------------------------------------------------
    // FRIEND NODE INTERACTION — labels + hover + click (raycaster)
    // ------------------------------------------------------------------------
    const friendMeshes = friendsGlobe.userData.friendMeshes || [];
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const tmpV = new THREE.Vector3();
    let hoveredFriend = null;
    let dragMoved = false;

    const labelEls = friendMeshes.map((m) => {
      const el = document.createElement("div");
      el.className = "friend-label";
      el.textContent = m.userData.name || "";
      if (m.userData.url) {
        el.addEventListener("click", (ev) => {
          ev.stopPropagation();
          openFriend(m);
        });
      }
      labelsRef.current?.appendChild(el);
      return el;
    });

    const pickFriend = (e) => {
      if (!sceneStateRef.current.friendsActive || globeOpacity < 0.15) return null;
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(friendMeshes, true);
      if (!hits.length) return null;
      let obj = hits[0].object;
      while (obj && !friendMeshes.includes(obj)) obj = obj.parent;
      return obj || null;
    };

    const openFriend = (mesh) => {
      const url = mesh?.userData?.url;
      if (url) window.open(url, "_blank", "noopener");
    };

    // ------------------------------------------------------------------------
    // 5. LIGHTING
    // ------------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // ------------------------------------------------------------------------
    // 7. ANIMATION & INTERACTION STATE
    // ------------------------------------------------------------------------
    let isDragging = false;
    let activePointerId = null;
    let previousMousePosition = { x: 0, y: 0 };

    // Separate velocity for planet and globe
    let planetVelocity = { x: 0, y: 0 };
    let globeVelocity = { x: 0, y: 0 };

    // Scroll percent comes from App via the scrollRef (single clock). This listener
    // only drives the landing-hint fade. Clamp to 200 so it stays a constant (no
    // re-renders) once scrolled past the top — and is correct on a deep refresh.
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y < 200 ? y : 200);
    };

    const isInteractiveTarget = (target) =>
      target?.closest?.(
        "a, button, input, textarea, select, label, .orbit-arrow, .arch-row, .navbar, .scroll-rail",
      );

    const setCursor = (style) => {
      document.body.style.cursor = style;
    };

    const onPointerDown = (e) => {
      if (isInteractiveTarget(e.target)) return;
      if (e.pointerType === "touch") e.preventDefault();
      isDragging = true;
      activePointerId = e.pointerId;
      dragMoved = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e) => {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      if (!dragMoved && sceneStateRef.current.friendsActive) {
        const m = pickFriend(e) || hoveredFriend;
        openFriend(m);
      }
      isDragging = false;
      activePointerId = null;
      if (sceneStateRef.current.friendsActive) {
        setCursor(hoveredFriend?.userData?.url ? "pointer" : "grab");
      } else {
        setCursor("grab");
      }
    };
    const onPointerMove = (e) => {
      if (activePointerId !== null && e.pointerId !== activePointerId) return;
      if (!isDragging) {
        if (sceneStateRef.current.friendsActive && e.pointerType !== "touch") {
          hoveredFriend = pickFriend(e);
          const hasLink = Boolean(hoveredFriend?.userData?.url);
          setCursor(hasLink ? "pointer" : "grab");
        } else if (!sceneStateRef.current.friendsActive) {
          setCursor("grab");
        }
        return;
      }
      setCursor("grabbing");
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
        setHasInteracted(true);
        dragMoved = true;
      }

      if (sceneStateRef.current.friendsActive) {
        friendsGlobe.rotation.y -= deltaX * 0.005;
        friendsGlobe.rotation.x -= deltaY * 0.005;
        globeVelocity = {
          x: -deltaY * 0.005,
          y: -deltaX * 0.005,
        };
      } else {
        celestialGroup.rotation.y -= deltaX * 0.005;
        celestialGroup.rotation.x -= deltaY * 0.005;
        planetVelocity = {
          x: -deltaY * 0.005,
          y: -deltaX * 0.005,
        };
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    // Window listeners — mount is z-index -1 so it never receives events from above
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    window.addEventListener("pointerdown", onPointerDown, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // Time-based rotation so speed is consistent across refresh rates (60 vs 120 Hz)
    // and independent of frame rate. Values are radians/second (calm, slow orbit).
    const clock = new THREE.Clock();
    const SPIN = { planet: 0.04, rings: 0.05, globe: 0.02, stars: 0.004 };

    let readyFired = false;
    const animate = () => {
      requestAnimationFrame(animate);
      if (!readyFired) {
        readyFired = true;
        onReady?.();
      }
      const dt = Math.min(clock.getDelta(), 0.05); // clamp (tab refocus jumps)

      const starts = sectionStarts(["intro", "experience", "research", "education", "projects", "friends"]);
      const choreo = planetFromScroll(scrollRef.current, starts, {
        xScale: profileRef.current.xScale,
      });
      const { x, z, ringsOpacity } = choreo;
      celestialGroup.position.z = z;
      celestialGroup.position.x = x;
      celestialGroup.scale.setScalar(choreo.scale);

      // Drag & Coasting Logic - Planet
      if (!isDragging) {
        celestialGroup.rotation.y += planetVelocity.y;
        celestialGroup.rotation.x += planetVelocity.x;
        planetVelocity.x *= 0.95; // Friction
        planetVelocity.y *= 0.95;
        celestialGroup.rotation.y += SPIN.planet * dt; // Auto-rotate
      }
      rings.rotation.y += SPIN.rings * dt;

      // One-time "wink" on load: a brief extra spin that eases out, telegraphing
      // that the planet is interactive (draggable).
      if (clock.elapsedTime < 2.5) {
        celestialGroup.rotation.y += 0.6 * (1 - clock.elapsedTime / 2.5) * dt;
      }

      // Drag & Coasting Logic - Globe
      if (!isDragging) {
        friendsGlobe.rotation.y += globeVelocity.y;
        friendsGlobe.rotation.x += globeVelocity.x;
        globeVelocity.x *= 0.95; // Friction
        globeVelocity.y *= 0.95;
        friendsGlobe.rotation.y += SPIN.globe * dt; // Slow auto-rotate
      }

      // Starfield Parallax & Twinkle
      starLayers.forEach((layer, i) => {
        layer.rotation.y += SPIN.stars * (i + 1) * dt;
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
      // PLANET (crescent via lighting in Friends) · rings (fade from Projects) · globe
      // ------------------------------------------------------------------------
      // Crescent in Friends: fade the planet BODY dark + drop its fill light, so only
      // the lit rim + atmosphere glow show (the atmosphere shader is untouched = rim).
      planetBodyOpacity = THREE.MathUtils.lerp(planetBodyOpacity, choreo.planetOpacity, 0.1);
      planet.material.opacity = (planet.material.userData?.baseOpacity ?? 1) * planetBodyOpacity;
      planet.material.transparent = true;
      planet.material.emissiveIntensity = THREE.MathUtils.lerp(0.15, 0.005, choreo.crescent);
      ambientLight.intensity = THREE.MathUtils.lerp(0.3, 0.05, choreo.crescent);
      rings.material.opacity = (rings.material.userData?.baseOpacity ?? 0.6) * ringsOpacity;
      rings.material.transparent = true;

      // Globe fades IN as the Friends section rises into view and then STAYS (Friends
      // is the last section, so it's the final view) — only fades out if you scroll
      // back up. Tied to the section's position so it never floats without the names.
      let gv = 0;
      const frEl = document.getElementById("friends");
      if (frEl) {
        const vh = window.innerHeight;
        const top = frEl.getBoundingClientRect().top;
        gv = THREE.MathUtils.clamp((vh * 0.3 - top) / (vh * 0.32), 0, 1);
      }
      friendsGlobe.visible = globeOpacity > 0.01;
      globeOpacity = THREE.MathUtils.lerp(globeOpacity, gv, 0.06);
      // Interact when globe is actually on screen (not only at scroll % threshold)
      sceneStateRef.current.friendsActive = gv > 0.2;
      if (friendsGlobe.visible) {
        friendsGlobe.traverse((child) => {
          if (child.material && child.material.userData.baseOpacity !== undefined) {
            child.material.opacity = child.material.userData.baseOpacity * globeOpacity;
          }
        });

        // Project friend nodes to screen for DOM labels + highlight on hover
        friendMeshes.forEach((m, i) => {
          const el = labelEls[i];
          if (!el) return;
          m.getWorldPosition(tmpV);
          const frontness = tmpV.z - friendsGlobe.position.z;
          tmpV.project(camera);
          const sx = (tmpV.x * 0.5 + 0.5) * window.innerWidth;
          const sy = (-tmpV.y * 0.5 + 0.5) * window.innerHeight;
          const isHot = hoveredFriend === m;
          const hasUrl = Boolean(m.userData.url);
          const show = (frontness > -0.2 || isHot) && globeOpacity > 0.3;

          // Hover highlight — scale, color pop, glowing ring
          m.scale.setScalar(isHot ? 1.9 : 1);
          if (m.material) {
            m.material.color.setHex(isHot ? 0xfff4e6 : m.userData.baseColor);
            const baseOp = m.userData.baseOpacity * globeOpacity;
            m.material.opacity = isHot ? Math.min(baseOp * 1.15, 1) : baseOp;
          }
          const halo = m.userData.halo;
          if (halo) {
            halo.lookAt(camera.position);
            halo.material.opacity = isHot ? 0.7 * globeOpacity : 0;
          }

          el.style.left = sx + "px";
          el.style.top = sy + "px";
          el.style.opacity = show ? String(globeOpacity * (isHot ? 1 : 0.75)) : "0";
          el.style.pointerEvents = show && hasUrl ? "auto" : "none";
          el.classList.toggle("hot", isHot);
          el.classList.toggle("has-link", hasUrl);
          el.setAttribute("aria-hidden", show ? "false" : "true");
        });
      } else if (hoveredFriend) {
        hoveredFriend = null;
      }

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };
    animate();

    const handleResize = () => {
      profileRef.current = getViewportProfile();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, profileRef.current.pixelRatioCap),
      );
      if (composer) {
        composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      setCursor("");
      labelEls.forEach((el) => el.remove());
      mountEl.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onReady]);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: "black",
          touchAction: "none",
        }}
      />
      {/* Friend-node labels (projected from 3D each frame) */}
      <div
        ref={labelsRef}
        style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }}
      />
      {/* Landing hints — gone once hero section starts */}
      {scrollY < 150 && (
        <div
          style={{
            position: "fixed",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            pointerEvents: "none",
            opacity: Math.max(1 - scrollY / 100, 0),
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Scroll down indicator */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              animation: "hintBounce 2s ease-in-out infinite",
            }}
          >
            <span
              style={{
                color: "rgba(255, 200, 160, 0.5)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Scroll to begin
            </span>
            {/* Chevron down */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 140, 66, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Drag hint */}
          {!hasInteracted && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "rgba(255, 200, 160, 0.45)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                animation: "dragNudge 2.4s ease-in-out infinite",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255, 200, 160, 0.55)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8" />
                <path d="M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
              or drag the planet
            </span>
          )}
        </div>
      )}
      <style>{`
        @keyframes hintBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes dragNudge {
          0%, 100% { transform: translateX(0); opacity: 0.45; }
          50% { transform: translateX(5px); opacity: 0.8; }
        }
        .friend-label {
          position: absolute;
          transform: translate(-50%, -150%);
          white-space: nowrap;
          font-family: var(--font-sans);
          font-size: 0.66rem;
          letter-spacing: 0.5px;
          color: #fff;
          background: rgba(10, 7, 5, 0.74);
          border: 1px solid rgba(255, 208, 138, 0.3);
          border-radius: 10px;
          padding: 0.12rem 0.5rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .friend-label.has-link {
          cursor: pointer;
        }
        .friend-label.hot {
          border-color: #ffd08a;
          background: rgba(30, 18, 10, 0.92);
          box-shadow: 0 0 18px rgba(255, 140, 66, 0.55), 0 0 4px rgba(255, 208, 138, 0.8);
          transform: translate(-50%, -150%) scale(1.08);
          color: #fff4e6;
        }
        .friend-label.hot.has-link::after {
          content: " ↗";
          color: #ff8c42;
          font-size: 0.58rem;
        }
      `}</style>
    </>
  );
};

export default CelestialScene;
