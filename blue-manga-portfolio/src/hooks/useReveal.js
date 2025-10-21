// src/hooks/useReveal.js
import { useEffect } from "react";
import anime from "animejs";

export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const type = el.getAttribute("data-reveal") || "fade-up";
          el.style.opacity = "0";
          let anim = { targets: el, duration: 700, easing: "easeOutQuad", opacity: [0, 1] };
          if (type === "fade-up") anim.translateY = [18, 0];
          if (type === "fade-in") anim.opacity = [0, 1];
          anime(anim);
          io.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}
