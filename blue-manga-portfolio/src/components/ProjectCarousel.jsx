// src/components/ProjectCarousel.jsx
import React, { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import "../styles/ProjectCarousel.css";

export default function ProjectCarousel({ projects }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    let scrollAmount = 0;
    const container = scrollRef.current;
    if (!container) return;

    const scroll = () => {
      scrollAmount += 0.5; // speed
      if (scrollAmount >= container.scrollWidth / 2) scrollAmount = 0;
      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    };

    const interval = setInterval(scroll, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track" ref={scrollRef}>
        {[...projects, ...projects].map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
    </div>
  );
}
