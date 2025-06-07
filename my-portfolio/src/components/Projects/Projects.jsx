// Projects.jsx
import React, { useEffect, useRef } from "react";
import styles from "./Projects.module.css";
import proj1 from "../../assets/images/project1.jpg";
import proj2 from "../../assets/images/project2.jpg";
// (Add more project images/imports as needed)

export default function Projects() {
  const cardsRef = useRef([]);

  // Set up Intersection Observer to add “visible” class when a card enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Example project data; swap with your real project info
  const projects = [
    {
      img: proj1,
      title: "Project One",
      desc: "A short description of Project One.",
    },
    {
      img: proj2,
      title: "Project Two",
      desc: "A short description of Project Two.",
    },
    // …add more objects for additional cards
  ];

  return (
    <section id="projects" className={styles.projectsContainer}>
      {projects.map((p, idx) => (
        <div
          key={idx}
          className={styles.card}
          ref={(el) => (cardsRef.current[idx] = el)}
        >
          <img src={p.img} alt={p.title} className={styles.cardImage} />
          <div className={styles.cardInfo}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
