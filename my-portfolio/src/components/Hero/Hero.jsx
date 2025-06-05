import React, { useEffect, useRef, useState } from "react";
import Ripples from "react-ripples";
import styles from "./Hero.module.css";
import heroImg from "../../assets/images/hero-bg.jpg";

export default function Hero() {
  const [contentVisible, setContentVisible] = useState(false);
  const ripplesRef = useRef(null);

  useEffect(() => {
    // delay showing the text for a quick fade/slide-in
    const timer = setTimeout(() => setContentVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Optional: manually trigger random drops every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (ripplesRef.current) {
        const { offsetWidth, offsetHeight } = ripplesRef.current;
        const x = Math.random() * offsetWidth;
        const y = Math.random() * offsetHeight;
        const dropRadius = 15 + Math.random() * 10;
        const strength = 0.02 + Math.random() * 0.02;
        ripplesRef.current.addRipple(x, y, dropRadius, strength);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Ripples
      ref={ripplesRef}
      className={styles.heroContainer}
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      // these props control how the ripples look
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
        <p className={styles.subtitle}>
          Frontend Developer | React Enthusiast
        </p>
      </div>
    </Ripples>
  );
}
