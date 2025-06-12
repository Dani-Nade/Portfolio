  // src/components/Header/Header.jsx

  import React, { useRef, useEffect, useState } from "react";
  import Nav from "../Nav/Nav";
  import ProjectsSlider from "../ProjectsSlider/ProjectsSlider";

  import { FiMail, FiPhone, FiLinkedin } from "react-icons/fi";
  import { FaGithub } from "react-icons/fa";

  import profilePic      from "../../assets/images/profile.png";
  import dbIcon          from "../../assets/images/icons/DB.png";
  import flutterIcon     from "../../assets/images/icons/Flutter.png";
  import illustratorIcon from "../../assets/images/icons/illustrator.png";
  import reactIcon       from "../../assets/images/icons/react.png";

  import styles from "./Header.module.css";

  const ICON_SIZE = 40;     // px
  const FRICTION  = 0.95;   // inertia slowdown

  function DraggableIcon({ src, initial, parentRef }) {
    const [pos, setPos] = useState(initial);
    const posRef        = useRef(initial);
    const velocityRef   = useRef({ x: 0, y: 0 });
    const dragging      = useRef(false);
    const offset        = useRef({ x: 0, y: 0 });
    const lastTimeRef   = useRef(0);
    const frameRef      = useRef(null);

    // When user presses down
    const onMouseDown = e => {
      e.preventDefault();
      dragging.current = true;
      const rect = parentRef.current.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left - posRef.current.x,
        y: e.clientY - rect.top  - posRef.current.y
      };
      lastTimeRef.current = Date.now();
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup",   onMouseUp);
    };

    // While moving: update position + velocity
    const onMouseMove = e => {
      if (!dragging.current) return;
      const rect = parentRef.current.getBoundingClientRect();
      let newX = e.clientX - rect.left - offset.current.x;
      let newY = e.clientY - rect.top  - offset.current.y;
      // clamp inside
      newX = Math.max(0, Math.min(newX, rect.width  - ICON_SIZE));
      newY = Math.max(0, Math.min(newY, rect.height - ICON_SIZE));
      const now = Date.now();
      const dt  = now - lastTimeRef.current || 1;
      velocityRef.current = {
        x: (newX - posRef.current.x) / dt,
        y: (newY - posRef.current.y) / dt
      };
      lastTimeRef.current = now;
      posRef.current = { x: newX, y: newY };
      setPos({ x: newX, y: newY });
    };

    // On release: stop drag, start inertia
    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup",   onMouseUp);
      lastTimeRef.current = Date.now();
      frameRef.current = requestAnimationFrame(step);
    };

    // inertia step
    const step = () => {
      const rect = parentRef.current.getBoundingClientRect();
      const now  = Date.now();
      const dt   = now - lastTimeRef.current;
      lastTimeRef.current = now;

      let { x: vx, y: vy } = velocityRef.current;
      let newX = posRef.current.x + vx * dt;
      let newY = posRef.current.y + vy * dt;

      // bounce/clamp
      if (newX <= 0 || newX >= rect.width  - ICON_SIZE) vx = 0;
      if (newY <= 0 || newY >= rect.height - ICON_SIZE) vy = 0;
      newX = Math.max(0, Math.min(newX, rect.width  - ICON_SIZE));
      newY = Math.max(0, Math.min(newY, rect.height - ICON_SIZE));

      posRef.current = { x: newX, y: newY };
      velocityRef.current = { x: vx * FRICTION, y: vy * FRICTION };
      setPos({ x: newX, y: newY });

      if (Math.hypot(velocityRef.current.x, velocityRef.current.y) > 0.02) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    // cleanup on unmount
    useEffect(() => {
      return () => {
        cancelAnimationFrame(frameRef.current);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup",   onMouseUp);
      };
    }, []);

    return (
      <img
        src={src}
        alt=""
        className={styles.draggableIcon}
        style={{ left: pos.x, top: pos.y, width: ICON_SIZE }}
        onMouseDown={onMouseDown}
        draggable={false}
      />
    );
  }

  export default function Header() {
    const headerRef = useRef(null);
    const [icons, setIcons] = useState([]);

    // Spawn icons at random positions once
    useEffect(() => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const sources = [dbIcon, illustratorIcon, flutterIcon, reactIcon];
      setIcons(sources.map((src, i) => ({
        id: i,
        src,
        initial: {
          x: Math.random() * (rect.width  - ICON_SIZE),
          y: Math.random() * (rect.height - ICON_SIZE)
        }
      })));
    }, []);

    // IntersectionObserver for fade-in sections
    const aboutRef   = useRef(null);
    const contactRef = useRef(null);
    const skillsRef  = useRef(null);
    const [aboutVisible, setAboutVisible]     = useState(false);
    const [contactVisible, setContactVisible] = useState(false);
    const [skillsVisible, setSkillsVisible]   = useState(false);

    useEffect(() => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          if (e.target.id === "about")   setAboutVisible(true);
          if (e.target.id === "contact") setContactVisible(true);
          if (e.target.id === "skills")  setSkillsVisible(true);
          obs.unobserve(e.target);
        });
      }, { threshold: 0.2 });

      [aboutRef, contactRef, skillsRef].forEach(ref => {
        if (ref.current) obs.observe(ref.current);
      });
      return () => obs.disconnect();
    }, []);

    return (
      <>
        <Nav />

        <div ref={headerRef} className={styles.headerWrapper}>
          <div className={styles.iconsContainer}>
            {icons.map(ic => (
              <DraggableIcon
                key={ic.id}
                src={ic.src}
                initial={ic.initial}
                parentRef={headerRef}
              />
            ))}
          </div>

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
              <img
                src={profilePic}
                className={styles.profileImg}
                alt="My profile"
              />
            </div>
          </section>
{/* ─── Section Divider ─────────────────────────────────── */}
        <div className={styles.sectionDivider} />
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
                <FiMail />
                <a href="mailto:d.nadeem@example.com">
                  d.nadeem@example.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <FiPhone />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
              <div className={styles.contactItem}>
                <FiLinkedin />
                <a href="https://linkedin.com/in/danishnadeem">
                  linkedin.com/in/danishnadeem
                </a>
              </div>
              <div className={styles.contactItem}>
                <FaGithub />
                <a href="https://github.com/danishnadeem">
                  github.com/danishnadeem
                </a>
              </div>
            </div>
          </section>
{/* ─── Section Divider ─────────────────────────────────── */}
        <div className={styles.sectionDivider} />
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
                  Metropolis University — B.Sc. Computer Science<br/>
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


{/* ─── Section Divider ─────────────────────────────────── */}
        <div className={styles.sectionDivider} />

{/* ─── Project Slider ─────────────────────────────────── */}
          <div className={styles.dualSliderWrapper}>
          <div className={styles.sliderColumn}>
            <ProjectsSlider secondsPerSlide={8} />
          </div>
          <div className={styles.sliderColumn}>
            <ProjectsSlider secondsPerSlide={8} reverse />
          </div>
        </div>  


        </div>
      </>
    );
  }
