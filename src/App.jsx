import React, { useState, useEffect } from "react";
// Layer 0 - 3D Scene
import CelestialScene from "./scene/CelestialScene";
// Layer 2 - Navigation
import Navbar from "./nav/Navbar";
import Footer from "./nav/Footer";
// Layer 1 - Content Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
// Styles
import "./App.css";

function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? window.scrollY / scrollable : 0;
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      {/* 3D Background - Layer 0 (Fixed) */}
      <CelestialScene />

      {/* Navigation - Fixed Top */}
      <Navbar scrollPercent={scrollPercent} />

      {/* 
          Main Content Container - Layer 1 (Relative)
          We use pointer-events: none on the layout wrappers 
          so that clicks on empty space pass through to the 3D background.
      */}
      <main
        className="main-content"
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* 
            Each section content needs pointer-events: auto 
            to be interactive (links, buttons, etc.)
        */}

        <section id="hero">
          <div style={{ pointerEvents: "auto" }}>
            <Hero scrollPercent={scrollPercent} />
          </div>
        </section>

        <section id="about">
          <div style={{ pointerEvents: "auto" }}>
            <About />
          </div>
        </section>

        <section id="projects">
          <div style={{ pointerEvents: "auto" }}>
            <Projects />
          </div>
        </section>

        <div style={{ pointerEvents: "auto" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
