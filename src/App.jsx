import React from "react";
import VisualTest from "./components/VisualTest";
import Hero from "./sections/Hero";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* GLOBAL 3D BACKGROUND (Layer 0) */}
      <VisualTest />

      {/* SCROLLABLE CONTENT */}
      <main className="main-content" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Transparent Hero (shows planet) */}
        <Hero />
        
        {/* 
            Layer 1 and other sections are currently hidden 
            so you can focus on the 3D planet (Layer 0) first.
        */}
        {/* 
        <div style={{ background: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(10px)' }}>
            <About />
            <Experiences />
            <Projects />
            <Education />
            <Contact />
            <Footer />
        </div> 
        */}

      </main>
    </div>
  );
}

export default App;
