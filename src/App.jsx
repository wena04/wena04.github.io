import React, { useState, useEffect } from "react";
// Layer 0 - 3D Scene
import CelestialScene from "./scene/CelestialScene";
// Layer 2 - Navigation
import Navbar from "./nav/Navbar";
import Footer from "./nav/Footer";
// Layer 1 - Content Sections
import Intro from "./sections/Intro";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Friends from "./sections/Friends";
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
      {/* Layer 0: 3D Background (Fixed) */}
      <CelestialScene />

      {/* Layer 2: Navigation (Fixed Top) */}
      <Navbar scrollPercent={scrollPercent} />

      {/* Layer 1: Main Content (Scrollable) */}
      <main
        className="main-content"
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* Intro Section (Hero + About merged) */}
        <div style={{ pointerEvents: "auto" }}>
          <Intro scrollPercent={scrollPercent} />
        </div>

        {/* Experience Section */}
        <div style={{ pointerEvents: "auto" }}>
          <Experience />
        </div>

        {/* Projects Section */}
        <div style={{ pointerEvents: "auto" }}>
          <Projects />
        </div>

        {/* Friends Section */}
        <div style={{ pointerEvents: "auto" }}>
          <Friends />
        </div>

        {/* Footer */}
        <div style={{ pointerEvents: "auto" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
