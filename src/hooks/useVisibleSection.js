// Custom hook to detect which section is currently visible
// Uses Intersection Observer API for performance

import { useState, useEffect } from "react";

/**
 * Hook to track which section is currently visible in the viewport
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @param {object} options - Intersection Observer options
 * @returns {string} - The ID of the currently visible section
 */
export function useVisibleSection(sectionIds, options = {}) {
  const [visibleSection, setVisibleSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return visibleSection;
}

export default useVisibleSection;
