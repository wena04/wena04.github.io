import React, { useState, useEffect, useCallback, Suspense } from "react";
// Layer 0 - 3D Scene (lazy-loaded — Three.js is ~500KB, defer until after first paint)
const CelestialScene = React.lazy(() => import("./scene/CelestialScene"));
// Layer 2 - Navigation
import Navbar from "./nav/Navbar";
import Footer from "./nav/Footer";
import ScrollRail from "./nav/ScrollRail";
import LoadingScreen from "./nav/LoadingScreen";
// Layer 1 - Content Sections
import Intro from "./sections/Intro";
import Experience from "./sections/Experience";
import Research from "./sections/Research";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Friends from "./sections/Friends";
// Styles
import "./App.css";

function App() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [pageReady, setPageReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);
  const loaded = pageReady && sceneReady;

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

  // Hide the loading shade once DOM assets AND the 3D scene's first frame are ready.
  useEffect(() => {
    const finish = () => setPageReady(true);
    const minDelay = setTimeout(finish, 300);
    if (document.readyState === "complete") {
      return () => clearTimeout(minDelay);
    }
    window.addEventListener("load", finish);
    const safety = setTimeout(finish, 5000);
    return () => {
      clearTimeout(minDelay);
      clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div className="app">
      <LoadingScreen done={loaded} />

      <div className="scroll-progress" style={{ transform: `scaleX(${scrollPercent})` }} />

      <Suspense fallback={null}>
        <CelestialScene scrollPercent={scrollPercent} onReady={onSceneReady} />
      </Suspense>

      <Navbar scrollPercent={scrollPercent} />
      <ScrollRail />

      <main
        className="main-content"
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div style={{ height: "100vh", pointerEvents: "none" }} />

        <div style={{ pointerEvents: "auto" }}>
          <Intro scrollPercent={scrollPercent} />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Experience />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Research />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Education />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Projects />
        </div>

        <div style={{ pointerEvents: "none" }}>
          <Friends />
        </div>

        <div style={{ pointerEvents: "auto" }}>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
