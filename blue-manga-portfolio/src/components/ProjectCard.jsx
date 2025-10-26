import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function ProjectCard({ p }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Entrance animation — cards rise in with geometric bounce
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [40, 0],
      rotate: [-2, 0],
      easing: "easeOutElastic(1, .7)",
      duration: 1500,
      delay: anime.stagger(120, { start: 300 }),
    });

    // Background shimmer animation (infinite)
    anime({
      targets: el.querySelector(".glow-bg"),
      backgroundPositionX: ["0%", "200%"],
      easing: "linear",
      duration: 6000,
      loop: true,
    });
  }, []);

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      scale: 1.05,
      rotate: 1.5,
      boxShadow: "0 0 40px rgba(226,184,156,0.25)",
      easing: "easeOutElastic(1, .6)",
      duration: 600,
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      scale: 1,
      rotate: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      easing: "easeOutExpo",
      duration: 500,
    });
  };

  return (
    <a
      ref={cardRef}
      href={p.href || "#"}
      target="_blank"
      rel="noreferrer"
      className="relative group block rounded-2xl overflow-hidden backdrop-blur-sm border border-[#e2b89c]/20 hover:border-[#e2b89c]/50 transition-all duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glowing geometric background */}
      <div className="glow-bg absolute inset-0 z-0 bg-[linear-gradient(135deg,#2f1e29,#3e2b36,#2a1b24)] bg-[length:200%_200%] opacity-60"></div>

      {/* Media (image or video) */}
      <div className="relative z-10 aspect-[16/10] overflow-hidden rounded-t-2xl">
        {p.mediaType === "video" ? (
          <video
            src={p.mediaUrl}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={p.mediaUrl}
            alt={p.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 p-5">
        <h3 className="text-[#e2b89c] text-xl font-bold mb-1 tracking-wide group-hover:text-[#f5e2d0] transition-colors">
          {p.title}
        </h3>
        <p className="text-[#f5e2d0]/80 text-sm mb-2">{p.subtitle}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {p.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[11px] uppercase rounded-full border border-[#d2a17a]/40 text-[#f5e2d0]/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover overlay (tech stack) */}
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#1a141f]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl backdrop-blur-md">
          <div className="text-center px-4">
            <h4 className="text-[#e2b89c] font-semibold mb-2">
              Tech Stack ⚙️
            </h4>
            <p className="text-[#f5e2d0]/90 text-sm">
              {p.tech?.join(" • ") || "React, Firebase, Tailwind"}
            </p>
          </div>
        </div>
      </div>

      {/* Animated glowing border */}
      <div className="absolute inset-0 rounded-2xl border-[2px] border-transparent group-hover:border-[#e2b89c]/60 transition-all"></div>
    </a>
  );
}
