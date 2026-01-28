import React from "react";
import { personal } from "../data/personal";
import { skills } from "../data/skills";
import "../styles/sections.css";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              <strong>{personal.major}</strong> at {personal.university}
              {personal.minor && <> with a minor in <strong>{personal.minor}</strong></>}.
            </p>
            <p>
              {personal.standing} • {personal.scholarship} recipient • Dean's List Student
            </p>
            <p>
              Languages: {personal.languages.join(", ")}
            </p>
          </div>
          <div className="about-skills">
            <h3>Skills & Technologies</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Languages</h4>
                <ul>
                  {skills.languages.slice(0, 6).map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-category">
                <h4>Technologies</h4>
                <ul>
                  {skills.technologies.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-category">
                <h4>Tools</h4>
                <ul>
                  {skills.tools.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
