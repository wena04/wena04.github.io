import React from "react";
import "../styles/loading.css";

// Minimal loading shade while the page/scene build — just a small orb + ring on a
// warm shade, fading out quickly once ready (no deliberate "loading page").
export default function LoadingScreen({ done }) {
  return (
    <div className={"loading-screen" + (done ? " done" : "")} aria-hidden={done}>
      <div className="loader-orb">
        <span className="loader-ring" />
      </div>
    </div>
  );
}
