import React from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#home" className={styles.navItem}>
        <span className={styles.navLink}>Home</span>
      </a>
      <a href="#about" className={styles.navItem}>
        <span className={styles.navLink}>About</span>
      </a>
      <a href="#projects" className={styles.navItem}>
        <span className={styles.navLink}>Projects</span>
      </a>
      <a href="#contact" className={styles.navItem}>
        <span className={styles.navLink}>Contact</span>
      </a>
    </nav>
  );
}
