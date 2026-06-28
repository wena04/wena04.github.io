import React, { useEffect, useRef, useState } from "react";
import { friends } from "../data/friends";
import { friendUrl } from "../scene/globeGenerator";
import "../styles/friends.css";

// Friends — the network globe lives in Layer 0 (CelestialScene). The title + legend
// are a FIXED overlay whose opacity is tied to the same #friends position the globe
// uses, so the names appear / stay / fade exactly WITH the globe (not with the
// scrolling section), and remain visible all the way to the bottom.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function Friends() {
  const ref = useRef(null);
  const [vis, setVis] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // same easing the globe uses: appear only once the section nears the top (so it
      // doesn't bleed over the Projects archive), then stay.
      setVis(clamp((vh * 0.3 - top) / (vh * 0.32), 0, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="friends" className="friends-section" ref={ref}>
      <div className="friends-overlay" style={{ opacity: vis }}>
        <div className="friends-head">
          <h2 className="section-title">Friends</h2>
        </div>

        <div className="friends-legend">
          {friends.map((f) => {
            const url = friendUrl(f.url);
            return (
              <a
                key={f.id}
                className={"flegend-item" + (url ? "" : " disabled")}
                href={url || undefined}
                target={url ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <span className="dot" style={{ background: f.color }} />
                {f.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
