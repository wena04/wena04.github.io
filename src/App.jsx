import React from "react";
import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* 3D Background - Layer 0 (Fixed) */}
      <Background3D />

      {/* Navigation - Fixed Top */}
      <Navbar />

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
          pointerEvents: "none" 
        }}
      >
        
        {/* 
            Each section content needs pointer-events: auto 
            to be interactive (links, buttons, etc.)
        */}
        
        <section id="hero">
          <div style={{ pointerEvents: "auto" }}>
            <Hero />
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

        <section id="contact">
          <div style={{ pointerEvents: "auto" }}>
            <Contact />
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
