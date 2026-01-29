import React from "react";
import { experiences, education, awards } from "../data/experiences";

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Experience</h2>

        {/* Work Experience */}
        <div className="experience-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card">
              <div className="experience-date">{exp.date}</div>
              <div className="experience-content">
                <h3 className="experience-title">{exp.title}</h3>
                <div className="experience-company">
                  {exp.company}
                  {exp.location && (
                    <span className="experience-location">
                      {" "}
                      • {exp.location}
                    </span>
                  )}
                  {exp.course && (
                    <span className="experience-course"> • {exp.course}</span>
                  )}
                </div>
                {exp.note && <div className="experience-note">{exp.note}</div>}
                <p className="experience-description">{exp.description}</p>
                {exp.skills && (
                  <div className="experience-skills">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <h3 className="subsection-title">Education</h3>
        {education.map((edu) => (
          <div key={edu.id} className="education-card">
            <div className="experience-date">{edu.date}</div>
            <div className="experience-content">
              <h3 className="experience-title">{edu.school}</h3>
              <div className="experience-company">{edu.degree}</div>
              {edu.minor && (
                <div className="experience-note">Minor: {edu.minor}</div>
              )}
              <p className="experience-description">
                {edu.admissions} • {edu.honors} • {edu.standing}
              </p>
            </div>
          </div>
        ))}

        {/* Awards */}
        <h3 className="subsection-title">Awards & Honors</h3>
        <div className="awards-grid">
          {awards.slice(0, 4).map((award) => (
            <div key={award.id} className="award-card">
              <div className="award-title">{award.title}</div>
              <div className="award-issuer">{award.issuer}</div>
              <div className="award-date">{award.date}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .experience-section {
          padding: 5rem 0;
          min-height: 100vh;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .experience-card,
        .education-card {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: border-color 0.3s ease;
        }

        .experience-card:hover,
        .education-card:hover {
          border-color: rgba(255, 107, 53, 0.3);
        }

        .experience-date {
          color: #888;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .experience-title {
          color: #fff;
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
        }

        .experience-company {
          color: #ff8c42;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .experience-location,
        .experience-course {
          color: #888;
        }

        .experience-note {
          color: #666;
          font-size: 0.85rem;
          font-style: italic;
          margin-bottom: 0.5rem;
        }

        .experience-description {
          color: #aaa;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .experience-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          background: rgba(255, 107, 53, 0.15);
          color: #ff8c42;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .subsection-title {
          color: #ff6b35;
          font-size: 1.5rem;
          margin: 3rem 0 1.5rem;
        }

        .awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .award-card {
          padding: 1.25rem;
          background: rgba(255, 107, 53, 0.05);
          border: 1px solid rgba(255, 107, 53, 0.2);
          border-radius: 8px;
        }

        .award-title {
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .award-issuer {
          color: #ff8c42;
          font-size: 0.85rem;
        }

        .award-date {
          color: #666;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .experience-card,
          .education-card {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .experience-date {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
