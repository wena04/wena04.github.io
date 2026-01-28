import React, { useState, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar({ scrollPercent = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Fade in navbar after some scroll (starts at 10%)
  const opacity = Math.min(Math.max((scrollPercent - 0.1) * 10, 0), 1);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "contact"];
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
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
          >
            Anthony Wen
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <a
            href="#about"
            className={`navbar-link ${activeSection === "about" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            About
          </a>
          <a
            href="#projects"
            className={`navbar-link ${activeSection === "projects" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects");
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={`navbar-link ${activeSection === "contact" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Contact
          </a>
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
