// src/components/ProjectCard.jsx
import React from "react";

export default function ProjectCard({ p }) {
  return (
    <a
      href={p.href || "#"}
      target="_blank"
      rel="noreferrer"
      className="group card"
      data-reveal="fade-up"
    >
      {p.imageUrl && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={p.imageUrl}
            alt={p.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-[#e2b89c] truncate">
            {p.title}
          </h3>
          <span className="px-2 py-0.5 text-[11px] rounded-full border border-[#d2a17a]/40 text-[#f5e2d0]/90">
            {p.tags?.[0] || "Project"}
          </span>
        </div>
        {p.subtitle && (
          <p className="mt-1 text-sm text-[#f5e2d0]/80 line-clamp-2">
            {p.subtitle}
          </p>
        )}
      </div>

      {/* Hover tech overlay */}
      <div className="card-hover-info">
        <p>🛠 Built with: {p.tech?.join(", ") || "React, Firebase, Tailwind"}</p>
      </div>
    </a>
  );
}
