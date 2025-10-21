import React from "react";

export default function Projects() {
  const projects = [
    {
      title: "3D Solar System",
      description:
        "Interactive 3D solar system built with Three.js and React Three Fiber, featuring realistic physics and orbital mechanics.",
      technologies: ["Three.js", "React Three Fiber", "Rapier Physics"],
      github: "https://github.com/wena04/solar-system",
      demo: "https://wena04.github.io/solar-system",
      image: "/images/solar-system.png",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio website with 3D interactive elements and modern design, showcasing my projects and skills.",
      technologies: ["React", "Vite", "Three.js", "CSS3"],
      github: "https://github.com/wena04/wena04.github.io",
      demo: "https://wena04.github.io",
      image: "/images/portfolio.png",
    },
    {
      title: "Data Visualization Dashboard",
      description:
        "Real-time data visualization dashboard for analyzing market trends and financial data with interactive charts.",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      github: "https://github.com/wena04/data-dashboard",
      demo: "https://data-dashboard.vercel.app",
      image: "/images/dashboard.png",
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

