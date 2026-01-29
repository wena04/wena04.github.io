import React from "react";
import { friends } from "../data/friends";

export default function Friends() {
  return (
    <section id="friends" className="friends-section">
      <div className="container">
        <h2 className="section-title">Friends</h2>
        <p className="friends-intro">
          Amazing people I've met along the way. Click to visit their
          portfolios!
        </p>

        {/* Placeholder - will become 3D globe in Phase 4 */}
        <div className="friends-grid">
          {friends.map((friend) => (
            <a
              key={friend.id}
              href={friend.url || "#"}
              target={friend.url ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="friend-card"
              style={{ borderColor: friend.color }}
            >
              <div
                className="friend-avatar"
                style={{ background: friend.color }}
              >
                {friend.name.charAt(0)}
              </div>
              <div className="friend-name">{friend.name}</div>
              {friend.url ? (
                <div className="friend-link">Visit Portfolio ↗</div>
              ) : (
                <div className="friend-pending">Coming soon</div>
              )}
            </a>
          ))}
        </div>

        <p className="friends-note">
          🌐 This section will become an interactive 3D globe!
        </p>
      </div>

      <style>{`
        .friends-section {
          padding: 5rem 0;
          min-height: 80vh;
        }

        .friends-intro {
          color: #aaa;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .friends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .friend-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .friend-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
        }

        .friend-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #000;
          margin-bottom: 1rem;
        }

        .friend-name {
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .friend-link {
          color: #ff6b35;
          font-size: 0.85rem;
        }

        .friend-pending {
          color: #666;
          font-size: 0.85rem;
          font-style: italic;
        }

        .friends-note {
          text-align: center;
          color: #666;
          font-size: 0.9rem;
          padding: 2rem;
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .friends-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
