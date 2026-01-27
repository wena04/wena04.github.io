// File: src/sections/Projects.jsx
import React from "react";
import "../styles/projects.css";

const projects = [
  {
    title: "3D Solar System",
    role: "WebGL & Physics",
    description: "Real-time orbital mechanics simulator.",
    image: "/images/solar-system.png",
    link: "https://github.com/wena04/solar-system",
  },
  {
    title: "Portfolio 2026",
    role: "Creative Dev",
    description: "The interactive 3D site you are looking at.",
    image: "/images/portfolio.png",
    link: "https://github.com/wena04",
  },
  {
    title: "Data Dashboard",
    role: "Full Stack",
    description: "Financial trends visualization in React & D3.",
    image: "/images/dashboard.png",
    link: "https://github.com/wena04/data-dashboard",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">
            Selected <span className="highlight">Works</span>
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <a
              href={p.link}
              key={i}
              className="project-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="card-info">
                <span className="card-role">{p.role}</span>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.description}</p>
                <div className="card-arrow">↗</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
