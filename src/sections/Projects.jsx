import React from "react";
import { codingProjects, designProjects } from "../data/projects";
import "../styles/projects.css";

export default function Projects() {
  // Show featured projects first, then others
  const featuredCoding = codingProjects.filter((p) => p.featured);
  const otherCoding = codingProjects.filter((p) => !p.featured);
  const featuredDesign = designProjects.filter((p) => p.featured);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">Projects</h2>
        </div>

        {/* Featured Coding Projects */}
        <h3 style={{ color: "#ff6b35", marginBottom: "1rem" }}>Featured</h3>
        <div className="projects-grid">
          {featuredCoding.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-info">
                <span className="card-role">{project.role}</span>
                <h3 className="card-title">{project.title}</h3>
                {project.award && (
                  <span className="card-award" style={{ color: "#ffd700", fontSize: "0.8rem" }}>
                    🏆 {project.award}
                  </span>
                )}
                <p className="card-desc">{project.description}</p>
                <div className="card-tech" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} style={{ background: "rgba(255,107,53,0.2)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="card-links" style={{ marginTop: "1rem" }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35", marginRight: "1rem" }}>
                      GitHub ↗
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35" }}>
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Projects */}
        <h3 style={{ color: "#ff8c42", marginTop: "3rem", marginBottom: "1rem" }}>Design</h3>
        <div className="projects-grid">
          {featuredDesign.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-info">
                <span className="card-role">{project.role}</span>
                <h3 className="card-title">{project.title}</h3>
                {project.event && (
                  <span style={{ color: "#aaa", fontSize: "0.8rem" }}>
                    {project.event}
                  </span>
                )}
                <p className="card-desc">{project.description}</p>
                <div className="card-tech" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {project.tools.map((tool, i) => (
                    <span key={i} style={{ background: "rgba(255,140,66,0.2)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem" }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Coding Projects */}
        <h3 style={{ color: "#888", marginTop: "3rem", marginBottom: "1rem" }}>More Projects</h3>
        <div className="projects-grid">
          {otherCoding.slice(0, 6).map((project) => (
            <div key={project.id} className="project-card" style={{ opacity: 0.8 }}>
              <div className="card-info">
                <span className="card-role">{project.role}</span>
                <h3 className="card-title">{project.title}</h3>
                {project.course && (
                  <span style={{ color: "#666", fontSize: "0.75rem" }}>{project.course}</span>
                )}
                <p className="card-desc">{project.description}</p>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35", fontSize: "0.85rem" }}>
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
