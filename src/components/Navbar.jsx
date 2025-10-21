import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

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
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#hero" onClick={() => scrollToSection("hero")}>
            Anthony Wen
          </a>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <a
            href="#about"
            className={`navbar-link ${
              activeSection === "about" ? "active" : ""
            }`}
            onClick={() => scrollToSection("about")}
          >
            About
          </a>
          <a
            href="#projects"
            className={`navbar-link ${
              activeSection === "projects" ? "active" : ""
            }`}
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={`navbar-link ${
              activeSection === "contact" ? "active" : ""
            }`}
            onClick={() => scrollToSection("contact")}
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

