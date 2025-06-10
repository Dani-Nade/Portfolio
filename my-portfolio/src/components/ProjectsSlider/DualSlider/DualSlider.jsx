import React from "react";
import ProjectsSlider from "../ProjectsSlider/ProjectsSlider";
import styles from "./DualSlider.module.css";

export default function DualSlider() {
  return (
    <div className={styles.dualSliderWrapper}>
      {/* Top: normal scroll */}
      <div className={styles.sliderColumn}>
        <ProjectsSlider secondsPerSlide={8} />
      </div>

      {/* Bottom: reverse scroll */}
      <div className={styles.sliderColumn}>
        <ProjectsSlider secondsPerSlide={8} reverse />
      </div>
    </div>
  );
}
