import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis"; // 🌙 smooth scroll
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ProjectCarousel from "./components/ProjectCarousel.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppCTA from "./components/WhatsAppCTA.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import ContactForm from "./components/ContactForm.jsx";
import AnimatedTitle from "./components/util/AnimatedTitle.jsx";
import StarryBackground from "./components/StarryBackground.jsx";
import useReveal from "./hooks/useReveal.js";
import useBackgroundCycle from "./hooks/useBackgroundCycle.js";

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useReveal();
  useBackgroundCycle();

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // === 🌙 Smooth Scroll Setup (Lenis) ===
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // slower, elegant glide
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const isAdmin = route.startsWith("#/admin");

  // === Dummy Projects ===
  const projects = [
    {
      title: "ConstructionSight AI",
      subtitle: "AI-powered construction safety & analytics dashboard.",
      imageUrl: "/projects/constructionsight.jpg",
      href: "https://github.com/danishnadeem/ConstructionSightAI",
      tags: ["Computer Vision", "AI"],
      tech: ["React", "FastAPI", "YOLOv8", "Firebase"],
    },
    {
      title: "Citation Manager Agent",
      subtitle: "Smart citation & study scheduler powered by LLMs.",
      imageUrl: "/projects/citation-agent.jpg",
      href: "https://github.com/danishnadeem/CitationAgent",
      tags: ["Automation", "NLP"],
      tech: ["Python", "LangChain", "Flask", "Firebase"],
    },
    {
      title: "Hasnain Furnitures 365 Studio",
      subtitle: "Premium local furniture e-commerce experience.",
      imageUrl: "/projects/furniture-site.jpg",
      href: "https://github.com/danishnadeem/HasnainFurnitures365",
      tags: ["E-Commerce", "UI/UX"],
      tech: ["React", "TailwindCSS", "Hostinger"],
    },
    {
      title: "Blue Manga Portfolio",
      subtitle: "Personal manga-themed developer showcase site.",
      imageUrl: "/projects/blue-manga.jpg",
      href: "https://github.com/danishnadeem/BlueMangaPortfolio",
      tags: ["Frontend", "Portfolio"],
      tech: ["React", "Anime.js", "Vite"],
    },
  ];

  return (
    <div className="min-h-screen pastel-bg text-[#f5e2d0] relative overflow-hidden">
      {/* === GLOBAL PROGRESS BAR === */}
      <ProgressBar />

      {/* === NAVBAR === */}
      <Navbar active={isAdmin ? "admin" : "home"} />

      {/* === STAR BACKGROUND (GLOBAL) === */}
      {!isAdmin && <StarryBackground />}

      <main>
        {!isAdmin ? (
          <>
            {/* === HERO SECTION === */}
            <section id="hero" data-section="hero">
              <Hero />
            </section>

            {/* === SKILLS SECTION === */}
            <section
              id="skills"
              className="relative py-24 bg-transparent text-center backdrop-blur-[2px]"
              data-reveal="fade-up"
              data-section="skills"
            >
              <div className="relative z-10 mx-auto w-[min(1100px,92vw)]">
                <AnimatedTitle text="My Skills" />
                <p className="text-[#f5e2d0]/85 mt-3 mb-8">
                  Tools, frameworks, and technologies that fuel my craft.
                </p>
                <SkillsSection />
              </div>
            </section>

            {/* === PROJECTS SECTION === */}
            <section
              id="projects"
              className="relative py-24 text-center backdrop-blur-[2px]"
              data-reveal="fade-up"
              data-section="projects"
            >
              <div className="relative z-10 mx-auto w-[min(1100px,92vw)]">
                <AnimatedTitle text="Featured Work" />
                <p className="text-[#f5e2d0]/85 mt-3 mb-8">
                  Real, evolving, and coffee-fueled. Click a project to open its GitHub repository.
                </p>
                <ProjectCarousel projects={projects} />
              </div>
            </section>

            {/* === CONTACT SECTION === */}
            <section
              id="contact"
              className="relative py-24 text-center backdrop-blur-[2px]"
              data-reveal="fade-up"
              data-section="contact"
            >
              <div className="relative z-10 mx-auto w-[min(1100px,92vw)]">
                <AnimatedTitle text="Let's Connect" />
                <p className="text-[#f5e2d0]/85 mt-3 mb-8">
                  Always open to collaborations, ideas, or just a chat ☕
                </p>
                <ContactForm />
              </div>
            </section>
          </>
        ) : (
          /* === ADMIN PANEL === */
          <section className="py-10" data-reveal="fade-up" data-section="admin">
            <div className="mx-auto w-[min(1100px,92vw)]">
              <AdminPanel />
            </div>
          </section>
        )}
      </main>

      {/* === FOOTER & CTA === */}
      <Footer />
      <WhatsAppCTA />
    </div>
  );
}
