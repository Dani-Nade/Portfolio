import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen,  setMenuOpen]    = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      if (!scrolled) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const items = [
    { href: "#about",   label: "About"   },
    { href: "#contact", label: "Contact" },
    { href: "#skills",  label: "Skills"  },
  ];

  return (
    <>
      {/* 1) Full navbar at top */}
      {!isScrolled && (
        <nav className={styles.navbar}>
          <div className={styles.navInner}>
            <a href="#about"  className={styles.logo}>Danish Nadeem</a>
            <ul className={styles.navList}>
              {items.map((it) => (
                <li key={it.href}>
                  <a href={it.href} className={styles.navLink}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* 2) Floating button once you scroll */}
      {isScrolled && (
        <button
          className={styles.iconButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      )}

      {/* 3) Sidebar panel */}
      {isScrolled && (
        <div className={`${styles.navOverlay} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.navInner}>
            <a href="#about" className={styles.logo}>Danish Nadeem</a>
          </div>
          <ul className={styles.navList}>
            {items.map((it) => (
              <li key={it.href}>
                <a href={it.href} className={styles.navLink}>
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
