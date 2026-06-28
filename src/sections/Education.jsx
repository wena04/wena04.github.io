import React from "react";
import { education } from "../data/experiences";
import "../styles/education.css";

// ============================================================================
// EDUCATION — mission patches (schools as commemorative badges)
// ============================================================================

const patchLabel = (school) => {
  if (/washington/i.test(school)) return "UW";
  if (/guangzhou/i.test(school)) return "AISG";
  return school.split(/[\s,]+/)[0]?.slice(0, 4).toUpperCase() || "?";
};

export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="education-head">
        <h2 className="section-title">Education</h2>
      </div>

      <div className="patch-grid">
        {education.map((edu) => (
          <article className="mission-patch" key={edu.id}>
            <div className="patch-badge" aria-hidden="true">
              <div className="patch-stitch" />
              <div className="patch-face">
                {edu.logo ? (
                  <img src={edu.logo} alt="" />
                ) : (
                  <span className="patch-mark">{patchLabel(edu.school)}</span>
                )}
              </div>
            </div>
            <div className="patch-caption">
              <div className="patch-school">{edu.school}</div>
              <div className="patch-degree">{edu.degree}</div>
              <div className="patch-meta">
                {edu.date}
                {edu.minor ? ` · Minor: ${edu.minor}` : ""}
              </div>
              {edu.honors && <div className="patch-honors">{edu.honors}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
