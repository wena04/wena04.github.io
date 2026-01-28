import React from "react";
import { personal, socialLinks } from "../data/personal";

export default function Hero({ scrollPercent }) {
  // Text starts appearing after the initial zoom is complete (scroll > 20%)
  // and reaches full opacity around 40%
  const opacity = Math.min(Math.max((scrollPercent - 0.2) * 5, 0), 1);

  // Slide in from the right slightly
  const translateX = (1 - opacity) * 100;

  return (
    <section id="hero" className="hero">
      <div
        className="hero-content"
        style={{
          opacity: opacity,
          transform: `translateX(${translateX}px)`,
          pointerEvents: opacity > 0.5 ? "auto" : "none",
          textAlign: "left",
          marginLeft: "auto",
          marginRight: "10%",
          maxWidth: "450px",
        }}
      >
        <h1 className="hero-title">{personal.name}</h1>
        <p className="hero-subtitle">{personal.tagline}</p>
        <p className="hero-description">
          {personal.quote}. {personal.bio}
        </p>
        <div className="hero-status">
          {personal.status.map((s, i) => (
            <span key={i}>
              {i === 0 ? "⚙️" : i === 1 ? "🧠" : "🧋"} {s}
            </span>
          ))}
        </div>
        <div className="hero-links" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35" }}>
            GitHub
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35" }}>
            LinkedIn
          </a>
          <a href={socialLinks.email} style={{ color: "#ff6b35" }}>
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
