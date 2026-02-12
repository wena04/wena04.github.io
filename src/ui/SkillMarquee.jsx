import React from "react";
import { skillIcons } from "../data/skills";

export default function SkillMarquee() {
  // Duplicate the list for seamless infinite scroll
  const doubled = [...skillIcons, ...skillIcons];

  return (
    <div className="skill-marquee">
      <div className="marquee-track">
        {doubled.map((skill, i) => (
          <div key={i} className="marquee-item">
            <img src={skill.url} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .skill-marquee {
          overflow: hidden;
          background: rgba(10, 10, 12, 0.5);
          border-top: 1px solid rgba(255, 107, 53, 0.15);
          border-bottom: 1px solid rgba(255, 107, 53, 0.15);
          padding: 1.5rem 0;
          margin-top: 3rem;
          width: 100%;
        }

        .marquee-track {
          display: flex;
          gap: 3rem;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .marquee-item img {
          width: 40px;
          height: 40px;
          filter: brightness(0.9);
          transition: filter 0.2s ease, transform 0.2s ease;
        }

        .marquee-item:hover img {
          filter: brightness(1.2);
          transform: scale(1.15);
        }

        .marquee-item span {
          color: #888;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
