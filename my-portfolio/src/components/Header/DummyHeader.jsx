// src/components/Header/DummyHeader.jsx

import React from "react";
import Nav from "../Nav/Nav";
import ProjectsSlider from "../ProjectsSlider/ProjectsSlider";

export default function DummyHeader() {
  return (
    <header style={{ width: "100%", background: "#F5EFE7", padding: "1rem 0" }}>
      {/* Projects slider at the very top */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ProjectsSlider interval={4000} />
      </div>

      {/* Your nav right below */}
      <Nav />

      {/* Placeholder content so you can scroll */}
      <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>Welcome to My Site</h1>
      </div>
    </header>
  );
}
