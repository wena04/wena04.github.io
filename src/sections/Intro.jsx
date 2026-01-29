import React from "react";
import { personal, socialLinks } from "../data/personal";
import { skills } from "../data/skills";

export default function Intro({ scrollPercent = 0 }) {
  // Text starts appearing after the initial zoom is complete (scroll > 20%)
  const opacity = Math.min(Math.max((scrollPercent - 0.2) * 5, 0), 1);
  const translateX = (1 - opacity) * 100;

  return (
    <section id="intro" className="intro-section">
      {/* Hero Content - Right Side */}
      <div
        className="intro-hero"
        style={{
          opacity: opacity,
          transform: `translateX(${translateX}px)`,
          pointerEvents: opacity > 0.5 ? "auto" : "none",
        }}
      >
        <h1 className="intro-name">{personal.name}</h1>
        <p className="intro-tagline">{personal.tagline}</p>
        <p className="intro-quote">"{personal.quote}"</p>

        <div className="intro-status">
          {personal.status.map((s, i) => (
            <span key={i}>
              {i === 0 ? "⚙️" : i === 1 ? "🧠" : "🧋"} {s}
            </span>
          ))}
        </div>

        <div className="intro-links">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={socialLinks.email}>Email</a>
        </div>
      </div>

      {/* About Content - Shows after scrolling more */}
      <div className="intro-about">
        <div className="about-grid">
          <div className="about-info">
            <h2>About Me</h2>
            <p className="about-bio">{personal.bio}</p>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Major</span>
                <span className="detail-value">{personal.major}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Minor</span>
                <span className="detail-value">{personal.minor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Award</span>
                <span className="detail-value">{personal.scholarship}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Languages</span>
                <span className="detail-value">
                  {personal.languages.join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div className="about-skills">
            <h3>Skills</h3>
            <div className="skills-columns">
              <div className="skill-column">
                <h4>Languages</h4>
                {skills.languages.slice(0, 6).map((s, i) => (
                  <span key={i} className="skill-item">
                    {s}
                  </span>
                ))}
              </div>
              <div className="skill-column">
                <h4>Technologies</h4>
                {skills.technologies.map((s, i) => (
                  <span key={i} className="skill-item">
                    {s}
                  </span>
                ))}
              </div>
              <div className="skill-column">
                <h4>Tools</h4>
                {skills.tools.map((s, i) => (
                  <span key={i} className="skill-item">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .intro-section {
          min-height: 200vh;
          position: relative;
        }

        /* Hero Part - First Screen */
        .intro-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          padding-right: 10%;
          text-align: right;
        }

        .intro-name {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b35, #ff8c42, #ffd93d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .intro-tagline {
          font-size: 1.2rem;
          color: #ff8c42;
          margin-bottom: 0.5rem;
        }

        .intro-quote {
          font-size: 1rem;
          color: #888;
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .intro-status {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          margin-bottom: 1.5rem;
        }

        .intro-status span {
          background: rgba(255, 107, 53, 0.15);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid rgba(255, 107, 53, 0.3);
          color: #ff8c42;
          font-size: 0.85rem;
        }

        .intro-links {
          display: flex;
          gap: 1.5rem;
        }

        .intro-links a {
          color: #ff6b35;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .intro-links a:hover {
          color: #ff8c42;
        }

        /* About Part - Second Screen */
        .intro-about {
          padding: 5rem 2rem;
        }

        .about-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .about-info h2 {
          color: #fff;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .about-bio {
          color: #ccc;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .about-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          gap: 1rem;
        }

        .detail-label {
          color: #ff6b35;
          font-weight: 600;
          min-width: 100px;
        }

        .detail-value {
          color: #aaa;
        }

        .about-skills h3 {
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .skills-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .skill-column h4 {
          color: #ff8c42;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }

        .skill-item {
          display: block;
          color: #aaa;
          font-size: 0.9rem;
          padding: 0.3rem 0;
        }

        @media (max-width: 768px) {
          .intro-hero {
            align-items: center;
            padding-right: 0;
            text-align: center;
          }

          .intro-name {
            font-size: 2.5rem;
          }

          .intro-status {
            justify-content: center;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .skills-columns {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
