import React, { useState } from "react";
import "./VerticalNav.css";
import portraitPic from "../assets/react.svg";

const VerticalNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="vertical-nav">
      <div className="logo">
        <h2>Amelia Li</h2>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <img src={portraitPic} alt="menu" />
      </div>

      <div className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}>
        <a
          href="#about"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </a>
        <a
          href="#experiences"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Experiences
        </a>
        <a
          href="#projects"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Projects
        </a>
        <a
          href="#education"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Education
        </a>
      </div>
    </div>
  );
};

export default VerticalNav;
