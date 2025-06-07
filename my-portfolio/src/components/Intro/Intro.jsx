// src/components/Intro/Intro.jsx
import React, { useEffect } from "react";
import styles from "./Intro.module.css";

export default function Intro({ onFinish }) {
  useEffect(() => {
    // After 5 seconds (the length of our CSS animations), notify parent:
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={styles.introContainer}>
      <div className={styles.introText}>Danish Nadeem</div>
    </div>
  );
}
