import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { createScene } from "../three/scene.js";

export default function Hero() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create Three.js scene
    const { scene, camera, renderer, controls, planet } = createScene();
    sceneRef.current = { scene, camera, renderer, controls, planet };

    // Stars are now created in the scene setup

    // Add to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Animate planet
      if (planet.userData.animate) {
        planet.userData.animate(0.016); // ~60fps
      }

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="hero">
      {/* <div className="hero-content">
        <h1 className="hero-title">Anthony Wen</h1>
        <p className="hero-subtitle">
          Developer • CS + INFO Student • Boba + Music Lover
        </p>
        <p className="hero-description">
          Communication is key in life. Undergraduate student at the University
          of Washington currently pursuing a double degree in Computer Science
          and Informatics.
        </p>
        <div className="hero-status">
          <span>⚙️ Full-Stack Dev</span>
          <span>🧠 Product Thinking</span>
          <span>🧋 Boba Dev Hours</span>
        </div>
      </div> */}
      <div className="hero-canvas" ref={mountRef} />
    </section>
  );
}
