import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[#3D314A]/40 bg-[#120d1a] text-[#f5e2d0] overflow-hidden">
      {/* === Gradient Glow Border === */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#a6785e] via-[#d2a17a] to-[#a6785e] opacity-60"></div>

      {/* === Content === */}
      <div className="mx-auto w-[min(1100px,92vw)] py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[#e2b89c] font-semibold tracking-wider">
            © {new Date().getFullYear()} Danish Nadeem
          </span>
          <span className="hidden sm:inline opacity-50">•</span>
          <span className="opacity-80">
            React ⚛︎ + Firebase ☁️ + Anime.js ✨
          </span>
        </div>

        <div className="italic text-[#d2a17a]/90 hover:text-[#e2b89c] transition-all duration-300">
          “Blue. Calm. Precise.”
        </div>
      </div>

      {/* === Subtle Noise Texture === */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
          mixBlendMode: "overlay",
        }}
      ></div>
    </footer>
  );
}
