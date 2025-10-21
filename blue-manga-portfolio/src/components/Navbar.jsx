import React, { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveringTop, setHoveringTop] = useState(false);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // hide when scrolling down, show when scrolling up
      if (currentScroll > lastScrollY && currentScroll > 100 && !hoveringTop) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScroll);
    };

    const handleMouseMove = (e) => {
      // if user moves near top, show navbar
      if (e.clientY < 80) {
        clearTimeout(hideTimeout.current);
        setHoveringTop(true);
        setHidden(false);
      } else if (hoveringTop) {
        // small delay before hiding again (feels natural)
        clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => {
          setHoveringTop(false);
          if (window.scrollY > 100) setHidden(true);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimeout.current);
    };
  }, [lastScrollY, hoveringTop]);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${
        hidden ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className="flex items-center justify-center gap-8 px-10 py-3 rounded-full border border-[#3D314A]/40 backdrop-blur-sm"
        style={{
          background:
            "repeating-linear-gradient(135deg, rgba(26,20,35,0.6) 0%, rgba(61,49,74,0.6) 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          transition: "all 0.4s ease",
        }}
      >
        {/* ==== LOGO (NAME) ==== */}
        <div className="flex items-center gap-1 relative select-none">
          <span
            className="relative px-4 py-1 text-xl font-extrabold tracking-[0.12em] uppercase"
            style={{
              backgroundColor: "#684756",
              color: "#E7D8C9",
              borderRadius: "6px",
              fontFamily: "'Bebas Neue', sans-serif",
              boxShadow:
                "inset 0 0 0 2px rgba(26,20,35,0.5), 0 2px 4px rgba(0,0,0,0.2)",
              textShadow:
                "1px 1px 0 #3D314A, 2px 2px 0 rgba(26,20,35,0.2), 3px 3px 0 rgba(26,20,35,0.15)",
              filter: "contrast(115%) brightness(105%)",
            }}
          >
            DANISH
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://grainy-gradients.vercel.app/noise.svg')",
                opacity: 0.18,
                mixBlendMode: "overlay",
              }}
            />
          </span>

          <span
            className="text-xl font-extrabold tracking-[0.12em] uppercase"
            style={{
              background:
                "linear-gradient(90deg, #7B4B3A 0%, #96705B 50%, #AB8476 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Bebas Neue', sans-serif",
              textShadow:
                "1px 1px 1px rgba(26,20,35,0.25), 0 0 8px rgba(171,132,118,0.2)",
              filter: "contrast(115%) brightness(110%)",
            }}
          >
            NADEEM
          </span>
        </div>

        {/* ==== NAV LINKS ==== */}
        <ul className="flex items-center gap-4 font-semibold text-sm uppercase tracking-wide">
          {["Home", "Skills", "Contact"].map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                className="relative px-4 py-1 rounded-md border border-transparent text-[#E7D8C9]
                transition-all duration-300 hover:border-[#AB8476]/70 hover:bg-[#AB8476]/10 hover:text-[#AB8476]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ==== CTA BUTTON ==== */}
        <a
          href="#projects"
          className="ml-2 px-5 py-1.5 text-sm font-bold text-[#1A1423]
          rounded-md bg-[#AB8476] hover:bg-[#96705B]
          transition-all duration-300 hover:scale-105 shadow-[0_4px_15px_rgba(171,132,118,0.4)]"
        >
          View Work
        </a>
      </div>
    </nav>
  );
}
