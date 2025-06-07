import React from "react";
import styles from "./Header.module.css";

import { FiMail, FiPhone, FiLinkedin } from "react-icons/fi";
import { FaBehance } from "react-icons/fa";

import profilePic from "../../assets/images/profile.png";

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      
      {/* ─── About Me ─────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.aboutSection}`}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutTitle}>About me</div>
          <div className={styles.aboutText}>
            <p>
              Hi! My name is <strong>Danish Nadeem</strong>. I’m a Front-End Developer
              based in [Your City], building animated, interactive web experiences.
            </p>
            <p>
              My objective: To continually learn new tools and techniques, craft
              beautiful UIs, and contribute to projects that make people’s
              lives easier.
            </p>
          </div>
        </div>

        {/* profile wrapper now has two layers: border + image */}
        <div className={styles.profileImageWrapper}>
          <div className={styles.profileBorder} />
          <img src={profilePic} alt="My profile" />
        </div>
      </section>
      
      {/* ─── Contact Info ─────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.contactTitle}>Contact</div>
        <div className={styles.contactList}>
          <div className={styles.contactItem}>
            <FiMail /> <a href="mailto:youremail@example.com">youremail@example.com</a>
          </div>
          <div className={styles.contactItem}>
            <FiPhone /> <a href="tel:+1234567890">+1 (234) 567-890</a>
          </div>
          <div className={styles.contactItem}>
            <FiLinkedin /> <a href="https://linkedin.com/in/yourprofile">linkedin.com/in/yourprofile</a>
          </div>
          <div className={styles.contactItem}>
            <FaBehance /> <a href="https://behance.net/yourprofile">behance.net/yourprofile</a>
          </div>
        </div>
      </section>
      
      {/* ─── Skills / Education / etc. ────────────────────────── */}
      <section className={`${styles.section} ${styles.skillsContainer}`}>
        <div className={styles.skillsGrid}>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Education</div>
            <div className={styles.blockContent}>
              FPT University — Graphic Design<br/>
              <small>2020 – Now</small>
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Technical skill</div>
            <ul className={styles.inlineList}>
              <li>Figma</li>
              <li>Illustrator</li>
              <li>Photoshop</li>
              <li>After Effects</li>
            </ul>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Soft skill</div>
            <ul className={styles.inlineList}>
              <li>Teamwork</li>
              <li>Communication</li>
              <li>Critical Thinking</li>
              <li>Time Management</li>
            </ul>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Skill set</div>
            <ul className={styles.inlineList}>
              <li>User Research</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>App Design</li>
            </ul>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Interest</div>
            <ul className={styles.inlineList}>
              <li>Design Trends</li>
              <li>Technology</li>
            </ul>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>Language</div>
            <ul className={styles.inlineList}>
              <li>Vietnamese</li>
              <li>English (Pre-intermediate)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
