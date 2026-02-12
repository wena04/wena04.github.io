import React, { useState, useEffect } from "react";
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
  return (
    <section id="intro" className="hero-container">
      {/* HUD Panel - Minimalist */}
      <div className="hud-panel minimal">
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

        {/* Social Links */}
        <div className="social-row">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            GITHUB
          </a>
          <span className="separator">&bull;</span>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            LINKEDIN
          </a>
          <span className="separator">&bull;</span>
          <a href={socialLinks.email} className="social-link">
            EMAIL
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
