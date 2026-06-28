import React from "react";
import { research, clubs } from "../data/experiences";
import "../styles/research.css";

// ============================================================================
// RESEARCH & CLUBS — framed two-column layout with external links
// ============================================================================

const yearOf = (d) => parseInt(String(d).match(/\d{4}/)?.[0] || "0", 10);

const researchTimeline = [...research].sort((a, b) => yearOf(a.date) - yearOf(b.date));
const clubsTimeline = [...clubs].sort((a, b) => yearOf(b.date) - yearOf(a.date));

const ICON_EXTERNAL = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M6 3H3v10h10V10M9 2h5v5M14 2L7 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function EntryCard({ org, title, subtitle, when, description, tags, url }) {
  const hasLink = Boolean(url);

  return (
    <article className={`rc-card${hasLink ? " rc-card--linked" : ""}`}>
      {hasLink && (
        <a
          className="rc-card-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${org} website`}
        >
          <span className="rc-card-link-icon">{ICON_EXTERNAL}</span>
          <span>Visit site</span>
        </a>
      )}

      {hasLink ? (
        <a className="rc-org rc-org--link" href={url} target="_blank" rel="noopener noreferrer">
          {org}
          <span className="rc-org-icon" aria-hidden="true">{ICON_EXTERNAL}</span>
        </a>
      ) : (
        <div className="rc-org">{org}</div>
      )}

      <h3 className="rc-role">
        {title}
        {subtitle ? <span className="rc-sub"> · {subtitle}</span> : null}
      </h3>
      <div className="rc-when">{when}</div>
      {description && <p className="rc-desc">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="rc-tags">
          {tags.slice(0, 3).map((t, k) => (
            <span key={k} className="rc-tag">{t}</span>
          ))}
        </div>
      )}
    </article>
  );
}

function Column({ label, children, variant }) {
  return (
    <div className={`rc-col rc-col--${variant}`}>
      <div className="rc-col-head">
        <span className="rc-col-dot" aria-hidden="true" />
        <h3 className="rc-col-label">{label}</h3>
      </div>
      <div className={`rc-col-grid rc-col-grid--${variant}`}>{children}</div>
    </div>
  );
}

export default function Research() {
  if (researchTimeline.length === 0 && clubsTimeline.length === 0) return null;

  return (
    <section id="research" className="research-section">
      <div className="research-head">
        <h2 className="section-title">Research &amp; Clubs</h2>
      </div>

      <div className="research-frame">
        <span className="research-frame-corner research-frame-corner--tl" aria-hidden="true" />
        <span className="research-frame-corner research-frame-corner--tr" aria-hidden="true" />
        <span className="research-frame-corner research-frame-corner--bl" aria-hidden="true" />
        <span className="research-frame-corner research-frame-corner--br" aria-hidden="true" />

        <div className="research-layout">
          <Column label="Research" variant="research">
            {researchTimeline.map((r) => (
              <EntryCard
                key={r.id}
                org={r.company}
                title={r.title}
                subtitle={r.advisor}
                when={r.date}
                description={r.description}
                tags={r.skills}
                url={r.url}
              />
            ))}
          </Column>

          <div className="rc-divider" aria-hidden="true">
            <span className="rc-divider-dot" />
          </div>

          <Column label="Clubs &amp; Leadership" variant="clubs">
            {clubsTimeline.map((c) => (
              <EntryCard
                key={c.id}
                org={c.organization}
                title={c.title}
                subtitle={c.location}
                when={`${c.date}${c.category ? ` · ${c.category}` : ""}`}
                description={c.description}
                url={c.url}
              />
            ))}
          </Column>
        </div>
      </div>
    </section>
  );
}
