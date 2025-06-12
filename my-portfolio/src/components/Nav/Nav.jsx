import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";
import pacmanSprite from "../../assets/images/NavBarIcon/pacman_sprite.png";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen,  setMenuOpen]    = useState(false);

  // FRAME COUNT (adjust if you have more/less)
  const FRAME_COUNT = 5;

  // state for our CSS vars
  const [spriteData, setSpriteData] = useState({
    frameW: 0,
    frameH: 0,
    offsetX: 0
  });

  // load sprite to measure it
  useEffect(() => {
    const img = new Image();
    img.src = pacmanSprite;
    img.onload = () => {
      const frameW = img.width / FRAME_COUNT;
      const frameH = img.height;
      const offsetX = -frameW * (FRAME_COUNT - 1);
      setSpriteData({ frameW, frameH, offsetX });
    };
  }, []);

  // handle scroll toggle
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      if (!scrolled) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(v => !v);

  const items = [
    { href: "#about",   label: "About"   },
    { href: "#contact", label: "Contact" },
    { href: "#skills",  label: "Skills"  },
  ];

  // inline style for our Pac-Man button CSS vars
 const pacmanStyle = {
  "--frame-width":   `${spriteData.frameW}px`,
  "--frame-height":  `${spriteData.frameH}px`,
  "--frame-offset":  `${spriteData.offsetX}px`,
  "--sprite-width":  `${spriteData.frameW * FRAME_COUNT}px`,
  backgroundImage:    `url(${pacmanSprite})`,
  backgroundSize:     `${spriteData.frameW * FRAME_COUNT}px ${spriteData.frameH}px`
};

  return (
    <>
      {/* full navbar */}
      {!isScrolled && (
        <nav className={styles.navbar}>
          <div className={styles.navInner}>
            <button
              className={styles.pacmanButton}
              aria-label="Pac-Man"
              style={pacmanStyle}
            />
            <a href="#about" className={styles.logo}>Danish Nadeem</a>
            <ul className={styles.navList}>
              {items.map(it => (
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

      {/* float ☰ after scroll */}
      {isScrolled && (
        <button
          className={styles.iconButton}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      )}

      {/* sidebar */}
      {isScrolled && (
        <div className={`${styles.navOverlay} ${menuOpen ? styles.open : ""}`}>
          <div className={styles.navInner}>
            <button
              className={styles.pacmanButton}
              aria-label="Pac-Man"
              style={pacmanStyle}
            />
            <a href="#about" className={styles.logo}>Danish Nadeem</a>
          </div>
          <ul className={styles.navList}>
            {items.map(it => (
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
