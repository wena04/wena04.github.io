import React, { useEffect, useState } from "react";
import { navItems } from "../data/personal.js";
import "../styles/scrollrail.css";

// A constellation-style progress rail on the right edge: one star per section,
// the active one glows, a line "draws" between them as you scroll, and each is
// clickable to jump. (The "scroll to begin" cue lives only on the landing/Intro.)

export default function ScrollRail() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let idx = 0;
      navItems.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id, i) => {
    setHovered(null);
    setActive(i);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // how far the "drawn" line should reach (0..1 across the dots)
  const fill = navItems.length > 1 ? active / (navItems.length - 1) : 0;

  return (
    <nav
      className="scroll-rail"
      aria-label="Section progress"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="rail-track">
        <div className="rail-fill" style={{ height: `${fill * 100}%` }} />
      </div>
      {navItems.map((s, i) => {
        const showLabel = hovered !== null ? i === hovered : i === active;
        return (
          <button
            key={s.id}
            className={
              "rail-dot" +
              (i === active ? " active" : "") +
              (i < active ? " past" : "") +
              (showLabel ? " show-label" : "")
            }
            onClick={() => jump(s.id, i)}
            onMouseEnter={() => setHovered(i)}
            aria-label={s.label}
            aria-current={i === active ? "true" : undefined}
          >
            <span className="rail-label">{s.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
