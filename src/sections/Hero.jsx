import React from "react";

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
      </div>
    </section>
  );
}
