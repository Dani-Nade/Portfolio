import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiFlutter,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiDocker,
  SiPython,
  SiFirebase,
  SiDart,
} from "react-icons/si";

const skills = [
  { icon: <SiReact />, label: "React" },
  { icon: <SiFlutter />, label: "Flutter" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiHtml5 />, label: "HTML" },
  { icon: <SiCss3 />, label: "CSS" },
  { icon: <SiDart />, label: "Dart" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiFirebase />, label: "Firebase" },
  { icon: <SiPython />, label: "Python" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 bg-[#1a141f] text-center relative overflow-hidden"
      data-reveal="fade-up"
    >
    
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {skills.map((s, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center text-[#f5e2d0] hover:text-[#e2b89c] transition-all"
            whileHover={{ scale: 1.25, rotate: 5 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="text-5xl sm:text-6xl mb-2 drop-shadow-[0_2px_8px_rgba(226,184,156,0.3)]">
              {s.icon}
            </div>
            <p className="text-sm font-semibold tracking-wider uppercase">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInChar {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
