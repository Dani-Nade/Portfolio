export const projects = [
  {
    id: "project-1",
    title: "Project One",
    shortDesc: "A short description of Project One.",
    image: require("../../assets/images/profile.png"),
    details: [  // NEW: array of detail strings
      "🔧 Tech: React, CSS Modules, Framer Motion",
      "📦 Build: Webpack, Babel",
      "🗂️ Structure: hooks/, components/, styles/",
      "🛠️ Highlights: Infinite scroll, hover pop-ups"
    ]
  },
  {
    id: "project-2",
    title: "Project Two",
    shortDesc: "A short description of Project Two.",
    image: require("../../assets/images/profile.png"),
    details: [
      "🔧 Tech: Next.js, Tailwind",
      "⚙️ Backend: Node.js, Express",
      "📐 UI: Responsive grid layout",
      "🛠️ Highlights: Auth, API integration"
    ]
  },
  // …and so on for each project
];