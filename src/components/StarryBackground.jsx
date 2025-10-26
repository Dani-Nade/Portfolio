import React, { useEffect, useRef } from "react";

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight * 1.2); // slightly taller than viewport

    // generate soft golden & beige stars
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
      speed: 0.02 + Math.random() * 0.02,
      color:
        Math.random() > 0.7
          ? "#e2b89c" // warm gold
          : "rgba(240, 220, 200, 0.8)",
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(18,13,26,1)";
      ctx.fillRect(0, 0, w, h);

      for (let s of stars) {
        s.alpha += s.speed * (Math.random() > 0.5 ? 1 : -1);
        if (s.alpha <= 0) s.alpha = Math.random();
        if (s.alpha > 1) s.alpha = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    animate();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 1.2;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10"
      style={{
        width: "100%",
        height: "120vh",
        background: "linear-gradient(to bottom, #120d1a 10%, #1a141f 90%)",
      }}
    ></canvas>
  );
}
