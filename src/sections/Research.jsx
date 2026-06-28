import React from "react";
import { research } from "../data/experiences";
import "../styles/research.css";

// ============================================================================
// RESEARCH — decision-tree (dashed slanted branches → two lab leaves)
// ============================================================================

const yearOf = (d) => parseInt(String(d).match(/\d{4}/)?.[0] || "0", 10);

// Oldest → newest (left branch = past, right = present).
const researchTimeline = [...research].sort((a, b) => yearOf(a.date) - yearOf(b.date));

export default function Research() {
  if (researchTimeline.length === 0) return null;

  return (
    <section id="research" className="research-section">
      <div className="research-head">
        <h2 className="section-title">Research</h2>
      </div>

      <div className="research-timeline">
        <div className="rt-tree">
          {/* dashed branches — lines only; dots are HTML below */}
          <svg
            className="rt-branches"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line className="rt-branch-line" x1="50" y1="0" x2="25" y2="100" />
            <line className="rt-branch-line" x1="50" y1="0" x2="75" y2="100" />
          </svg>

          <div className="rt-root">
            <span className="rt-dot rt-dot--root" />
          </div>

          <div className="rt-leaves">
            {researchTimeline.map((r) => (
              <article className="rt-leaf" key={r.id}>
                <div className="rt-joint">
                  <span className="rt-dot" />
                  <span className="rt-stem" aria-hidden="true" />
                </div>
                <div className="rt-body">
                  <div className="rt-lab">{r.company}</div>
                  <h3 className="rt-role">
                    {r.title}
                    {r.advisor ? <span className="rt-advisor"> · {r.advisor}</span> : null}
                  </h3>
                  <div className="rt-when">{r.date}</div>
                  {r.description && <p className="rt-desc">{r.description}</p>}
                  {r.skills && (
                    <div className="rt-tags">
                      {r.skills.slice(0, 3).map((t, k) => (
                        <span key={k} className="rt-tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
