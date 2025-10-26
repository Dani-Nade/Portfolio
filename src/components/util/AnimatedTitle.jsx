import React, { useEffect } from "react";
import anime from "animejs";

export default function AnimatedTitle({ text, className = "" }) {
  useEffect(() => {
    anime({
      targets: ".animated-letter",
      translateY: [24, 0],
      opacity: [0, 1],
      delay: anime.stagger(40, { start: 100 }),
      duration: 700,
      easing: "easeOutExpo",
    });
  }, [text]);

  return (
    <h2
      className={`animated-title text-[clamp(2rem,4vw,3rem)] font-extrabold text-center mb-6 ${className}`}
      style={{
        color: "#e2b89c",
        letterSpacing: "0.05em",
        textShadow: "0 0 20px rgba(226,184,156,0.4)",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="animated-letter inline-block transition-transform duration-200 hover:scale-125 hover:text-[#ffd6b5]"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
}
