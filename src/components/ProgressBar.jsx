// src/components/ProgressBar.jsx
import React, { useEffect, useRef } from "react";

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function onScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrolled = scrollTop / (scrollHeight - clientHeight);
      bar.style.width = `${scrolled * 100}%`;

      // subtle fade when scroll starts
      bar.style.opacity = scrolled > 0.02 ? "1" : "0";
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 h-[4px] z-[120] transition-all duration-200"
      style={{
        background:
          "linear-gradient(90deg, #d2a17a, #e2b89c, #f5e2d0, #d2a17a)",
        width: 0,
        boxShadow: "0 0 12px rgba(210,161,122,0.6)",
        opacity: 0,
        borderRadius: "0 4px 4px 0",
      }}
    />
  );
}
