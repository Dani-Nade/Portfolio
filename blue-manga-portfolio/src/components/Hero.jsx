import React, { useEffect } from "react";
import "../styles/Hero.css";
import forestBack from "/forest-back.png";
import forestFront from "/forest-front.png";

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const backLayer = document.querySelector(".forest-back");
      const frontLayer = document.querySelector(".forest-front");

      if (backLayer) backLayer.style.transform = `translateY(${scrollY * 0.2}px)`;
      if (frontLayer) frontLayer.style.transform = `translateY(${scrollY * 0.6}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to next section
  const handleSlide = () => {
    const nextSection = document.querySelector(".transition-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="hero-section">
        <img src={forestBack} alt="Forest background" className="forest-back" />
        <img src={forestFront} alt="Forest foreground" className="forest-front" />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title hover-reactive">
            {"Danish Nadeem".split("").map((char, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                {char}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">
            SOFTWARE ENGINEER • FRONTEND • CLOUD
          </p>

          <div className="hero-buttons">
            <button onClick={handleSlide} className="slide-btn">
              Explore →
            </button>
          </div>
        </div>
      </section>


 
    </>
  );
}
