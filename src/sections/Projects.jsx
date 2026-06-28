import React, { useEffect, useRef, useState } from "react";
import { codingProjects, designProjects, allProjects, codingProjectsNorm, designProjectsNorm } from "../data/projects";
import "../styles/projects-orbit.css";

// ============================================================================
// PROJECTS — featured "orbit" around the planet + paginated solar archive.
// See docs/scrollytelling-design.md (3.2).
// ============================================================================

const techOf = (p) => p.technologies || p.tools || [];
const FEATURED = allProjects.filter((p) => p.featured);

const ICON_GH = (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
);
const ICON_WEB = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
const ICON_YT = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.6 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
  </svg>
);

function ArchiveLink({ href, label, icon }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="arch-link"
        aria-label={label}
        title={label}
        onClick={(e) => e.stopPropagation()}
      >
        {icon}
      </a>
    );
  }
  return (
    <span className="arch-link disabled" aria-label={`${label} (coming soon)`} title="Coming soon">
      {icon}
    </span>
  );
}

const ICON_CODE = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const ICON_DESIGN = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><circle cx="8.5" cy="10" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="15.5" cy="10" r="1" />
  </svg>
);

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function Projects() {
  // ---------------------------------------------------------------- orbit
  const pinRef = useRef(null);
  const orbitRef = useRef(null);
  const cardEls = useRef([]);
  const manual = useRef(0); // drag/arrow offset
  const vel = useRef(0);
  const dragging = useRef(0);
  const dragMoved = useRef(false);
  const lastX = useRef(0);
  const pinP = useRef(0);
  const [front, setFront] = useState(0);
  const N = FEATURED.length;
  const STEP = (Math.PI * 2) / N;
  const REVS = Math.PI * 2 * 1.1;

  useEffect(() => {
    const onScroll = () => {
      const el = pinRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      pinP.current = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let raf;
    const layout = () => {
      raf = requestAnimationFrame(layout);
      const orbit = orbitRef.current;
      if (!orbit) return;
      const a = Math.min(360, window.innerWidth * 0.32);
      const b = a * 0.42;
      // settle drag coast
      if (!dragging.current && Math.abs(vel.current) > 0.0002) {
        manual.current += vel.current;
        vel.current *= 0.94;
      }
      const rot = pinP.current * REVS + manual.current;
      let best = 0, bestD = -1;
      cardEls.current.forEach((el, i) => {
        if (!el) return;
        const ang = (i / N) * Math.PI * 2 + rot;
        const x = Math.cos(ang) * a;
        const y = Math.sin(ang) * b;
        const depth = (Math.sin(ang) + 1) / 2;
        const s = 0.6 + depth * 0.55;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
        el.style.opacity = (0.3 + depth * 0.7).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.classList.toggle("focus", depth > 0.93);
        if (depth > bestD) { bestD = depth; best = i; }
      });
      setFront((f) => (f === best ? f : best));
    };
    layout();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [N, REVS]);

  const onDown = (e) => {
    dragging.current = 1;
    dragMoved.current = false;
    lastX.current = e.clientX;
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    if (Math.abs(dx) > 4) dragMoved.current = true;
    lastX.current = e.clientX;
    manual.current += dx * 0.006;
    vel.current = dx * 0.006;
  };
  const onUp = () => { dragging.current = 0; };
  const focusProject = (i) => {
    if (dragMoved.current) return;
    goTo(i);
  };
  const goTo = (i) => {
    const target = Math.PI / 2 - (i / N) * Math.PI * 2 - pinP.current * REVS;
    let t = target + Math.round((manual.current - target) / (2 * Math.PI)) * 2 * Math.PI;
    manual.current = t; vel.current = 0;
  };
  const step = (d) => goTo((front + d + N) % N);

  // ---------------------------------------------------------------- archive
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(null);
  const PAGE = 6;
  const list = filter === "all" ? allProjects : filter === "code" ? codingProjectsNorm : designProjectsNorm;
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const pageItems = list.slice(page * PAGE, page * PAGE + PAGE);
  const setF = (f) => { setFilter(f); setPage(0); setOpen(null); };

  return (
    <section id="projects" className="projects-orbit-section">
      {/* pinned featured orbit */}
      <div className="proj-pin" ref={pinRef}>
        <div className="proj-stage">
          <div className="proj-head">
            <h2 className="section-title">Projects</h2>
          </div>

          <div
            className="orbit"
            ref={orbitRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
          >
            {FEATURED.map((p, i) => (
              <div
                key={p.id}
                className={"orbit-card " + p.type + (i === front ? " focus" : "")}
                ref={(el) => (cardEls.current[i] = el)}
                role="button"
                tabIndex={0}
                aria-label={`View ${p.title}`}
                aria-current={i === front ? "true" : undefined}
                onClick={() => focusProject(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    focusProject(i);
                  }
                }}
              >
                <div className="thumb">{p.type === "design" ? "◷ design" : "◆ code"}</div>
                <div className="role">{p.award ? "🏆 " + p.role : p.role}</div>
                <h4>{p.title}</h4>
              </div>
            ))}
          </div>

          <div className="orbit-controls">
            <button className="orbit-arrow prev" aria-label="Previous" onClick={() => step(-1)}>‹</button>
            <div className="orbit-nav">
              <span className="orbit-count">{String(front + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
              <span className="orbit-dots">
                {FEATURED.map((p, i) => (
                  <button key={p.id} className={"odot" + (i === front ? " active" : "")} aria-label={p.title} onClick={() => goTo(i)} />
                ))}
              </span>
            </div>
            <button className="orbit-arrow next" aria-label="Next" onClick={() => step(1)}>›</button>
          </div>
        </div>
      </div>

      {/* full archive */}
      <section className="archive-wrap">
        <div className="archive-panel">
          <div className="archive-bar">
            <div className="archive-head">Project Archive</div>
            <div className="archive-tabs">
              {[["all", "All"], ["code", "Coding"], ["design", "Design"]].map(([f, label]) => (
                <button key={f} className={"atab" + (filter === f ? " active" : "")} onClick={() => setF(f)}>
                  {label}
                  {f !== "all" && (
                    <span> · {(f === "code" ? codingProjects : designProjects).length}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="arch-grid">
            {pageItems.map((p) => {
              const id = p.id;
              const isOpen = open === id;
              return (
                <div key={id} className={"arch-row" + (isOpen ? " open" : "")} onClick={() => setOpen(isOpen ? null : id)}>
                  <div className="arch-ico">{p.type === "design" ? ICON_DESIGN : ICON_CODE}</div>
                  <div className="arch-main">
                    <h5>{p.title}</h5>
                    <div className="tech">{techOf(p).slice(0, 3).join(" · ")}</div>
                  </div>
                  <div className="arch-links" onClick={(e) => e.stopPropagation()}>
                    <ArchiveLink href={p.github} label="GitHub" icon={ICON_GH} />
                    <ArchiveLink href={p.website} label="Website" icon={ICON_WEB} />
                    <ArchiveLink href={p.youtube} label="YouTube demo" icon={ICON_YT} />
                  </div>
                  <div className="arch-detail">
                    <div className="inner">
                      <span className="d-date">{p.date}</span>
                      {p.award ? `${p.award} — ` : ""}{p.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {pages > 1 && (
            <div className="arch-pager">
              <button className="apage" disabled={page <= 0} onClick={() => setPage((v) => v - 1)} aria-label="Previous page">‹</button>
              <span className="apage-info">{page + 1} / {pages}</span>
              <button className="apage" disabled={page >= pages - 1} onClick={() => setPage((v) => v + 1)} aria-label="Next page">›</button>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
