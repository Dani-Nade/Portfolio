import React from "react";
import ProjectCard from "./ProjectCard";
import "../styles/ProjectGallery.css";

export default function ProjectGallery({ projects }) {
  return (
    <div className="gallery-grid">
      {projects.map((p, i) => (
        <ProjectCard key={i} p={p} />
      ))}
    </div>
  );
}
