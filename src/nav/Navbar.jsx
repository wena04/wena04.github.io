import React, { useState, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar({ scrollPercent = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  // Fade in navbar after some scroll (starts at 10%)
  const opacity = Math.min(Math.max((scrollPercent - 0.1) * 10, 0), 1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "experience", "projects", "friends"];
      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "intro", label: "Intro" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "friends", label: "Friends" },
  ];

  return (
    <nav
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        opacity: opacity,
        pointerEvents: opacity > 0.5 ? "auto" : "none",
        transition: "opacity 0.3s ease-out",
      }}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Anthony Wen
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`navbar-link ${activeSection === item.id ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}
