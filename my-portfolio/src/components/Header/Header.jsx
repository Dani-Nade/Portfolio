// src/components/Header/Header.jsx

import React, { useRef, useEffect, useState } from "react";
import styles from "./Header.module.css";

import Nav from "../Nav/Nav";

import { FiMail, FiPhone, FiLinkedin } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

import profilePic      from "../../assets/images/profile.png";
import dbIcon          from "../../assets/images/icons/DB.png";
import flutterIcon     from "../../assets/images/icons/Flutter.png";
import illustratorIcon from "../../assets/images/icons/illustrator.png";
import reactIcon       from "../../assets/images/icons/react.png";

export default function Header() {
  // refs for each section
  const aboutRef   = useRef(null);
  const contactRef = useRef(null);
  const skillsRef  = useRef(null);

  // visibility state
  const [aboutVisible,   setAboutVisible]   = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [skillsVisible,  setSkillsVisible]  = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        switch (entry.target.id) {
          case "about":
            setAboutVisible(true);
            break;
          case "contact":
            setContactVisible(true);
            break;
          case "skills":
            setSkillsVisible(true);
            break;
          default:
            // no other sections—just break
            break;
        }

        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    [aboutRef, contactRef, skillsRef].forEach((r) => {
      if (r.current) observer.observe(r.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />

      <div className={styles.headerWrapper}>
        {/* ─── About Me ─────────────────────────────────────────── */}
        <section
          id="about"
          ref={aboutRef}
          className={[
            styles.section,
            styles.aboutSection,
            aboutVisible && styles.visibleSection
          ].filter(Boolean).join(" ")}
        >
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>About me</h2>
            <div className={styles.aboutText}>
              <p>
                Hi! My name is <strong>Danish Nadeem</strong>. I’m a Front-End
                Developer based in Metropolis, building animated, interactive
                web experiences.
              </p>
              <p>
                In 2023 I led a team of 3 on an AI-powered dashboard that
                increased reporting speed by 40%. I love turning complex APIs
                into delightful interfaces.
              </p>
            </div>
          </div>

          <div className={styles.profileImageWrapper}>
            {/* Aptitude */}
            <div className={styles.iconsContainer}>
              <div className={styles.iconsRow}>
                <img src={dbIcon}          className={styles.icon} alt="DB" />
                <img src={illustratorIcon} className={styles.icon} alt="AI" />
                <img src={flutterIcon}     className={styles.icon} alt="Flutter" />
                <img src={reactIcon}       className={styles.icon} alt="React" />
              </div>
            </div>
            <img
              src={profilePic}
              className={styles.profileImg}
              alt="My profile"
            />
          </div>
        </section>

        {/* ─── Contact Info ─────────────────────────────────────── */}
        <section
          id="contact"
          ref={contactRef}
          className={[
            styles.section,
            styles.contactSection,
            contactVisible && styles.visibleSection
          ].filter(Boolean).join(" ")}
        >
          <h2 className={styles.contactTitle}>Contact</h2>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <FiMail />{" "}
              <a href="mailto:d.nadeem@example.com">d.nadeem@example.com</a>
            </div>
            <div className={styles.contactItem}>
              <FiPhone /> <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
            <div className={styles.contactItem}>
              <FiLinkedin />{" "}
              <a href="https://linkedin.com/in/danishnadeem">
                linkedin.com/in/danishnadeem
              </a>
            </div>
            <div className={styles.contactItem}>
              <FaGithub />{" "}
              <a href="https://github.com/danishnadeem">
                github.com/danishnadeem
              </a>
            </div>
          </div>
        </section>

        {/* ─── Skills & Education ───────────────────────────────── */}
        <section
          id="skills"
          ref={skillsRef}
          className={[
            styles.section,
            styles.skillsContainer,
            skillsVisible && styles.visibleSection
          ].filter(Boolean).join(" ")}
        >
          <h2 className={styles.blockTitle}>Skills & Education</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Education</div>
              <div className={styles.blockContent}>
                Metropolis University — B.Sc. Computer Science<br />
                <small>2018 – 2022</small>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Technical Skills</div>
              <ul className={styles.inlineList}>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Python</li>
                <li>HTML & CSS</li>
              </ul>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Frameworks</div>
              <ul className={styles.inlineList}>
                <li>React</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>Next.js</li>
              </ul>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Tools</div>
              <ul className={styles.inlineList}>
                <li>Git & GitHub</li>
                <li>Docker</li>
                <li>Webpack</li>
                <li>VS Code</li>
              </ul>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Soft Skills</div>
              <ul className={styles.inlineList}>
                <li>Teamwork</li>
                <li>Problem Solving</li>
                <li>Communication</li>
                <li>Time Management</li>
              </ul>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Languages</div>
              <ul className={styles.inlineList}>
                <li>English (Fluent)</li>
                <li>Spanish (Intermediate)</li>
                <li>Japanese (Basic)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
