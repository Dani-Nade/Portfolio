// src/components/SkillsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  SiCplusplus,
  SiC,
  SiPython,
  SiOpenjdk,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiFlutter,
  SiAndroid,
  SiDart,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiFigma,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiGimp,
} from "react-icons/si";

const skills = [
  { icon: <SiCplusplus />, label: "C++" },
  { icon: <SiC />, label: "C" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiOpenjdk />, label: "Java" },
  { icon: <SiHtml5 />, label: "HTML5" },
  { icon: <SiCss3 />, label: "CSS3" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiReact />, label: "React" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiFlutter />, label: "Flutter" },
  { icon: <SiAndroid />, label: "Android" },
  { icon: <SiDart />, label: "Dart" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiKubernetes />, label: "Kubernetes" },
  { icon: <SiJenkins />, label: "Jenkins" },
  { icon: <SiFigma />, label: "Figma" },
  { icon: <SiAdobephotoshop />, label: "Photoshop" },
  { icon: <SiAdobeillustrator />, label: "Illustrator" },
  { icon: <SiAdobepremierepro />, label: "Premiere Pro" },
  { icon: <SiAdobeaftereffects />, label: "After Effects" },
  { icon: <SiGimp />, label: "GIMP" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 bg-[#1a141f] text-center relative overflow-hidden"
      data-reveal="fade-up"
    >
      <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
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
