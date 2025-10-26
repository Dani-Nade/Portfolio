import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import SkillsSection from "./components/SkillsSection.jsx";
import ProjectGallery from "./components/ProjectGallery.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppCTA from "./components/WhatsAppCTA.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import ContactForm from "./components/ContactForm.jsx";
import AnimatedTitle from "./components/util/AnimatedTitle.jsx";
import StarryBackground from "./components/StarryBackground.jsx";
import useReveal from "./hooks/useReveal.js";
import useBackgroundCycle from "./hooks/useBackgroundCycle.js";

// ✅ Import centralized project data
import projects from "./data/projects.js";

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useReveal();
  useBackgroundCycle();

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isAdmin = route.startsWith("#/admin");

  return (
    <div className="min-h-screen pastel-bg text-[#f5e2d0] relative overflow-hidden">
      <ProgressBar />
      <Navbar active={isAdmin ? "admin" : "home"} />
      {!isAdmin && <StarryBackground />}

      <main>
        {!isAdmin ? (
          <>
            <section id="hero" data-section="hero">
              <Hero />
            </section>

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
                <ProjectGallery projects={projects} />
              </div>
            </section>

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
          <section className="py-10" data-reveal="fade-up" data-section="admin">
            <div className="mx-auto w-[min(1100px,92vw)]">
              <AdminPanel />
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppCTA />
    </div>
  );
}
