// src/hooks/useBackgroundCycle.js
import { useEffect } from "react";
import anime from "animejs";

// Soft manga/pastel palettes (top-left & right glow)
const PALETTES = {
  hero:    { a: "rgba(173, 216, 255, .22)", b: "rgba(251, 194, 235, .18)", base: "#0b1220" },
  projects:{ a: "rgba(186, 255, 201, .16)", b: "rgba(132, 198, 255, .20)", base: "#0b1220" },
  contact: { a: "rgba(255, 230, 180, .16)", b: "rgba(196, 193, 255, .18)", base: "#0b1220" },
  admin:   { a: "rgba(255, 178, 171, .18)", b: "rgba(132, 198, 255, .22)", base: "#0b1220" },
};

export default function useBackgroundCycle() {
  useEffect(() => {
    const root = document.documentElement;
    const setVars = ({ a, b, base }) => {
      anime({
        targets: root,
        duration: 700,
        easing: "easeOutCubic",
        update: (anim) => {
          // lerp by progress for subtle transition
          root.style.setProperty("--bg-base", base);
          root.style.setProperty("--bg-a", a);
          root.style.setProperty("--bg-b", b);
        },
      });
    };

    const applyFor = (key) => setVars(PALETTES[key] || PALETTES.hero);

    // Observe which section is visible
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = e.target.getAttribute("data-section");
            applyFor(key);
          }
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll("[data-section]").forEach((n) => io.observe(n));
    // initial
    applyFor("hero");

    return () => io.disconnect();
  }, []);
}
