// src/components/Hero/Hero.jsx
import React, { useEffect, useState } from "react";
import Ripples from "react-ripples";
import styles from "./Hero.module.css";
import heroImg from "../../assets/images/hero-bg.jpg";

export default function Hero() {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Ripples
      className={styles.heroContainer}
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      rippleColor="rgba(255,255,255,0.3)"
      resolution={512}
      perturbance={0.04}
      dropRadius={15}
      interactive={true}
    >
      <div className={styles.overlay}></div>
      <div
        className={`${styles.content} ${
          contentVisible ? styles.visible : ""
        }`}
      >
        <h1 className={styles.title}>Hi, I’m Jane Doe</h1>
        <p className={styles.subtitle}>Frontend Developer & Designer</p>
      </div>
    </Ripples>
  );
}
