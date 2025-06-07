// Nav.jsx
import React from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <a href="#home" className={styles.navLinkItem}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" className={styles.navLinkItem}>
            About
          </a>
        </li>
        <li>
          <a href="#projects" className={styles.navLinkItem}>
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className={styles.navLinkItem}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
