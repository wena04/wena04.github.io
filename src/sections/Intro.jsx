import React, { useState, useEffect, useRef } from "react";
import "../styles/sections.css";
import { personal, socialLinks } from "../data/personal";

const Typewriter = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout = setTimeout(() => setBlink(!blink), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index >= phrases.length) {
      setIndex(0);
      return;
    }

    if (subIndex === phrases[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : 150,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  return (
    <span className="typewriter-text">
      {phrases[index].substring(0, subIndex)}
      <span className={`cursor ${blink ? "blink" : ""}`}>|</span>
    </span>
  );
};

const Intro = () => {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(0);

  // The hero words fade in only once the section has settled into view — by which
  // point the planet has already docked to the right (see choreography.js).
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 while entering from below; reaches 1 as the section reaches center
      const p = (vh - r.top - vh * 0.25) / (vh * 0.45);
      setReveal(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="intro" className="hero-container" ref={ref}>
      {/* HUD Panel - Minimalist; fades in after the planet docks */}
      <div
        className="hud-panel minimal"
        style={{
          opacity: reveal,
          transform: `translateY(${(1 - reveal) * 24}px)`,
          transition: "opacity 0.15s linear, transform 0.15s linear",
          willChange: "opacity, transform",
        }}
      >
        <h1 className="hud-title">{personal.name}</h1>

        {/* Typewriter Line */}
        <div className="hud-subtitle">
          <Typewriter
            phrases={[
              "Developer",
              "CS + INFO Student",
              "Boba + Music Lover",
              "Creative Coder",
            ]}
          />
        </div>

        {/* Social Links — icon + label, as pill buttons */}
        <div className="social-row">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            <span>GitHub</span>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.6 0H2.4A2.4 2.4 0 000 2.4v11.2A2.4 2.4 0 002.4 16h11.2a2.4 2.4 0 002.4-2.4V2.4A2.4 2.4 0 0013.6 0zM4.9 13.4H2.6V6h2.3v7.4zM3.7 5a1.34 1.34 0 110-2.69A1.34 1.34 0 013.7 5zm9.7 8.4h-2.3V9.8c0-.86-.02-1.97-1.2-1.97s-1.38.94-1.38 1.9v3.67H6.2V6h2.2v1.01h.03c.31-.58 1.06-1.2 2.18-1.2 2.33 0 2.76 1.54 2.76 3.53v4.06z"/></svg>
            <span>LinkedIn</span>
          </a>
          <a href={socialLinks.email} className="social-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
