import React from "react";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Computer Engineering & Computer Science student at UW. I
              enjoy building backend systems, experimenting with operating
              systems concepts, and exploring data-driven applications in real
              estate, fintech, and healthtech.
            </p>
            <p>
              Currently, I'm focused on Leetcoding, job searching, and working
              as a TA for Frontend and Server Side Development courses. I'm
              always excited to learn new technologies and work on challenging
              projects.
            </p>
          </div>
          <div className="about-skills">
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Frontend</h4>
                <ul>
                  <li>React</li>
                  <li>JavaScript/TypeScript</li>
                  <li>HTML/CSS</li>
                  <li>Three.js</li>
                </ul>
              </div>
              <div className="skill-category">
                <h4>Backend</h4>
                <ul>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>SQL</li>
                </ul>
              </div>
              <div className="skill-category">
                <h4>Tools</h4>
                <ul>
                  <li>Git</li>
                  <li>Docker</li>
                  <li>Vite</li>
                  <li>VS Code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
