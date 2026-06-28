import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { experiences, awards } from "../data/experiences";
import "../styles/experience.css";

// ============================================================================
// EXPERIENCE — the SCORPIUS constellation (Anthony is a Scorpio)
// The career path is traced as the star pattern, head -> stinger = newest ->
// oldest. ALL current roles ride the bright stars; "earlier roles" is kept for
// future overflow. See docs/scrollytelling-design.md (3.1).
// ============================================================================

const byId = (id) => experiences.find((e) => e.id === id);

// All work roles ride the constellation, in path order (newest -> oldest by date).
// (Wordplaypen moved to research.) "Earlier roles" kept for future overflow.
const CONSTELLATION_IDS = [11, 12, 1, 6, 2, 5, 7, 3];
const EARLIER_IDS = [9, 10];

// Scorpius star map: x,y normalized (0..1, y down), mag = relative size.
// `role` indexes into CONSTELLATION_IDS; `bright` = Antares (the heart).
const STARS = [
  { x: 0.64, y: 0.05, mag: 2.2, role: 0 }, // β Acrab (head)
  { x: 0.55, y: 0.085, mag: 1.7 }, // δ
  { x: 0.47, y: 0.125, mag: 1.6, role: 1 }, // π
  { x: 0.55, y: 0.2, mag: 1.7 }, // σ
  { x: 0.585, y: 0.275, mag: 3.3, role: 2, bright: true }, // α Antares
  { x: 0.585, y: 0.355, mag: 1.5 }, // τ
  { x: 0.55, y: 0.45, mag: 2.0, role: 3 }, // ε
  { x: 0.49, y: 0.535, mag: 1.8, role: 4 }, // μ
  { x: 0.435, y: 0.62, mag: 2.0, role: 5 }, // ζ
  { x: 0.385, y: 0.695, mag: 1.6 }, // η
  { x: 0.37, y: 0.775, mag: 2.0, role: 6 }, // θ Sargas
  { x: 0.43, y: 0.83, mag: 1.5 }, // ι
  { x: 0.53, y: 0.865, mag: 1.6 }, // κ
  { x: 0.62, y: 0.85, mag: 2.7, role: 7 }, // λ Shaula (stinger)
  { x: 0.665, y: 0.81, mag: 2.1 }, // υ Lesath
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const roleData = (slot) => byId(CONSTELLATION_IDS[slot]);
// short label/initial for the card icon (until real logos are added)
const initialOf = (co) => (co || "?").replace(/^The\s+/i, "").trim().charAt(0).toUpperCase();

export default function Experience() {
  const flightRef = useRef(null);
  const svgRef = useRef(null);
  const trackRef = useRef(null);
  const drawRef = useRef(null);
  const cometRef = useRef(null);
  const starRefs = useRef([]); // { el, card, leader, len }
  const totalLenRef = useRef(0);
  const [moreOpen, setMoreOpen] = useState(false);

  // --- layout the constellation (positions on the SVG path) ---
  useLayoutEffect(() => {
    const flight = flightRef.current;
    const svg = svgRef.current;
    const draw = drawRef.current;
    const track = trackRef.current;
    if (!flight || !svg || !draw) return;

    const layout = () => {
      const w = flight.clientWidth;
      const h = flight.clientHeight;
      if (!w || !h) return;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const px = (s) => s.x * w;
      const py = (s) => s.y * h;
      let d = `M ${px(STARS[0])} ${py(STARS[0])}`;
      for (let i = 1; i < STARS.length; i++) d += ` L ${px(STARS[i])} ${py(STARS[i])}`;
      track.setAttribute("d", d);
      draw.setAttribute("d", d);
      const total = draw.getTotalLength();
      totalLenRef.current = total;
      draw.style.strokeDasharray = total;
      draw.style.strokeDashoffset = total;

      let acc = 0;
      STARS.forEach((s, i) => {
        if (i > 0) acc += Math.hypot(px(s) - px(STARS[i - 1]), py(s) - py(STARS[i - 1]));
        const ref = starRefs.current[i];
        if (!ref) return;
        ref.len = acc;
        const X = px(s), Y = py(s);
        const size = 5 + s.mag * 2.2;
        ref.el.style.left = X + "px";
        ref.el.style.top = Y + "px";
        ref.el.style.width = size + "px";
        ref.el.style.height = size + "px";
        if (ref.card) {
          const cw = ref.card.offsetWidth || 220;
          ref.card.style.top = Y + "px";
          let lx;
          if (ref.side === "right") { ref.card.style.left = "auto"; ref.card.style.right = "0px"; lx = w - cw; }
          else { ref.card.style.left = "0px"; ref.card.style.right = "auto"; lx = cw; }
          if (ref.leader) {
            ref.leader.setAttribute("x1", X); ref.leader.setAttribute("y1", Y);
            ref.leader.setAttribute("x2", lx); ref.leader.setAttribute("y2", Y);
          }
        }
      });
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  // --- reveal on scroll: draw the line, ride the comet, ignite stars ---
  useEffect(() => {
    const flight = flightRef.current;
    const draw = drawRef.current;
    const comet = cometRef.current;
    if (!flight || !draw) return;

    let ticking = false;
    const render = () => {
      ticking = false;
      const total = totalLenRef.current;
      if (!total) return;
      const r = flight.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as it enters; ~1 while the bottom is still ~60% down the viewport
      const p = clamp((vh * 0.8 - r.top) / (vh * 0.2 + r.height), 0, 1);
      const drawn = p * total;
      draw.style.strokeDashoffset = total - drawn;
      const head = draw.getPointAtLength(drawn);
      comet.style.left = head.x + "px";
      comet.style.top = head.y + "px";
      comet.style.opacity = p > 0.02 && p < 0.98 ? 1 : 0;
      starRefs.current.forEach((ref) => {
        if (!ref) return;
        const lit = drawn >= ref.len - 2;
        ref.el.classList.toggle("lit", lit);
        if (ref.card) ref.card.classList.toggle("lit", lit);
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    render();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const setStarRef = (i, side, bright) => (el) => {
    if (!el) return;
    starRefs.current[i] = { ...(starRefs.current[i] || {}), el, side, bright, len: 0 };
  };
  const setCardRef = (i) => (el) => {
    starRefs.current[i] = { ...(starRefs.current[i] || {}), card: el };
  };
  const setLeaderRef = (i) => (el) => {
    starRefs.current[i] = { ...(starRefs.current[i] || {}), leader: el };
  };

  // assign alternating sides by role order (even split, no overlap)
  let roleCount = 0;

  return (
    <section id="experience" className="experience-section">
      <div className="exp-head">
        <h2 className="section-title">Experience</h2>
        <div className="awards-label">★ Honors &amp; Awards</div>
        <div className="awards">
          {awards.slice(0, 5).map((a) => (
            <span key={a.id} className="award"><span className="star">★</span> {a.title}</span>
          ))}
        </div>
      </div>

      <div className="exp-flight" ref={flightRef}>
        <svg className="exp-svg" ref={svgRef} preserveAspectRatio="none">
          <defs>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd93d" />
              <stop offset="1" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          <path ref={trackRef} fill="none" stroke="rgba(255,140,66,0.16)" strokeWidth="2.5" />
          <g className="exp-leaders">
            {STARS.map((s, i) =>
              s.role !== undefined ? <line key={i} ref={setLeaderRef(i)} /> : null
            )}
          </g>
          <path ref={drawRef} fill="none" stroke="url(#expGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="exp-comet" ref={cometRef} />

        {STARS.map((s, i) => {
          const isRole = s.role !== undefined;
          const side = isRole ? (roleCount++ % 2 === 0 ? "right" : "left") : null;
          const exp = isRole ? roleData(s.role) : null;
          return (
            <React.Fragment key={i}>
              <div
                className={"exp-star" + (s.bright ? " bright" : "")}
                ref={setStarRef(i, side, s.bright)}
              />
              {isRole && exp && (
                <div className={"exp-card " + side} ref={setCardRef(i)}>
                  <div className="exp-card-head">
                    <div
                      className={
                        "exp-logo" +
                        (exp.logo ? " has-img" : "") +
                        (exp.logoDark ? " dark-bg" : "")
                      }
                      aria-hidden="true"
                    >
                      {exp.logo ? (
                        <img src={exp.logo} alt="" />
                      ) : (
                        <span>{initialOf(exp.company)}</span>
                      )}
                    </div>
                    <div className="exp-card-id">
                      <div className="exp-company">{exp.company}</div>
                      <h4 className="exp-role-title">
                        {exp.title}
                        {exp.course ? ` · ${exp.course}` : ""}
                      </h4>
                    </div>
                  </div>
                  <div className="when">{exp.date}</div>
                  {exp.skills?.length > 0 && (
                    <div className="tags">
                      {exp.skills.slice(0, 3).map((t, k) => (
                        <span key={k} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Earlier roles — only shown once roles overflow the constellation */}
      {EARLIER_IDS.length > 0 && (
        <div className="exp-more">
          <button
            className="exp-more-btn"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((v) => !v)}
          >
            {moreOpen ? "－" : "＋"} Earlier roles ({EARLIER_IDS.length})
          </button>
          {moreOpen && (
            <div className="exp-more-list">
              {EARLIER_IDS.map((id) => {
                const e = byId(id);
                if (!e) return null;
                return (
                  <div className="row" key={id}>
                    <div className="row-main">
                      <div
                        className={
                          "exp-logo sm" +
                          (e.logo ? " has-img" : "") +
                          (e.logoDark ? " dark-bg" : "")
                        }
                        aria-hidden="true"
                      >
                        {e.logo ? (
                          <img src={e.logo} alt="" />
                        ) : (
                          <span>{initialOf(e.company)}</span>
                        )}
                      </div>
                      <div>
                        <h5>{e.title}</h5>
                        <div className="co">
                          {e.company}
                          {e.course ? ` · ${e.course}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="yr">{e.date}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
