import React from "react";
import "../styles/projects.css";

export default function Projects() {
  const projects = [
    {
      title: "3D Solar System",
      role: "Interactive Design",
      description:
        "Interactive 3D solar system built with Three.js and React Three Fiber, featuring realistic physics and orbital mechanics.",
      image: "/images/solar-system.png",
      link: "https://github.com/wena04/solar-system",
    },
    {
      title: "Portfolio Website",
      role: "Web Development",
      description:
        "Personal portfolio website with 3D interactive elements and modern design, showcasing my projects and skills.",
      image: "/images/portfolio.png",
      link: "https://github.com/wena04/wena04.github.io",
    },
    {
      title: "Data Visualization",
      role: "Frontend Engineering",
      description:
        "Real-time data visualization dashboard for analyzing market trends and financial data with interactive charts.",
      image: "/images/dashboard.png",
      link: "https://github.com/wena04/data-dashboard",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">
            Founder <span className="highlight">Search</span>
          </h2>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="card-info">
                <span className="card-role">{project.role}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                <div className="card-arrow">↗</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
