import React from "react";
import { projects } from "../Projects/ProjectsData";
import styles from "./ProjectsSlider.module.css";

export default function ProjectsSlider({
  secondsPerSlide = 8,
  reverse = false
}) {
  // duplicate so we can scroll seamlessly
  const slides = [...projects, ...projects];
  const duration = projects.length * secondsPerSlide;

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.sliderInner}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        {slides.map((p, i) => (
          <div key={i} className={styles.slide}>
            <img src={p.image} alt={p.title} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.shortDesc}>{p.shortDesc}</p>
            </div>

            {/* Details popup */}
            <div className={styles.details}>
              <h4>{p.title} Details</h4>
              <ul>
                {p.details.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
