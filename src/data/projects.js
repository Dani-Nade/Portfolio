// src/data/projects.jsx
import altImage from "./alt.jpeg";
import expTrackGif from "./ExpTrack.gif";

const projects = [
  {
    title: "PixelRNN Image Completion",
    subtitle:
      "A deep learning model for reconstructing images pixel-by-pixel using autoregressive networks.",
    mediaType: "image",
    mediaUrl: altImage,
    href: "https://github.com/Dani-Nade/PixelRNN",
    tags: ["Deep Learning", "Generative AI"],
    tech: ["PyTorch", "NumPy", "Matplotlib"],
  },
  {
    title: "Shakespeare LSTM",
    subtitle:
      "Character-level LSTM model generating next-word predictions trained on Shakespeare’s writing style.",
    mediaType: "image",
    mediaUrl: altImage,
    href: "https://github.com/Dani-Nade/ShakespeareLSTM",
    tags: ["AI", "Text Generation"],
    tech: ["TensorFlow", "Python", "Streamlit"],
  },
  {
    title: "Expense Tracker",
    subtitle:
      "A personal finance app for tracking daily expenses and visualizing spending trends.",
    mediaType: "gif",
    mediaUrl: expTrackGif,
    href: "https://github.com/Dani-Nade/Expense-Tracker",
    tags: ["Finance", "Productivity"],
    tech: ["React", "LocalStorage", "TailwindCSS"],
  },
  {
    title: "Shopping List App",
    subtitle:
      "Smart shopping list app that organizes items, quantities, and prices with a clean UI.",
    mediaType: "image",
    mediaUrl: altImage,
    href: "https://github.com/Dani-Nade/Shopping-List-App",
    tags: ["Utility", "Frontend"],
    tech: ["Flutter", "Dart", "Firebase"],
  },
  {
    title: "Meals App",
    subtitle:
      "Mobile recipe and meal planner app with categories, filters, and favorites integration.",
    mediaType: "image",
    mediaUrl: altImage,
    href: "https://github.com/Dani-Nade/Meals-App",
    tags: ["Food", "Mobile App"],
    tech: ["Flutter", "Dart", "Provider"],
  },
  {
    title: "MiniForge",
    subtitle:
      "A compact build system CLI inspired by Make — helps automate repetitive development workflows.",
    mediaType: "image",
    mediaUrl: altImage,
    href: "https://github.com/Dani-Nade/MiniForge",
    tags: ["CLI", "Automation"],
    tech: ["Python", "Argparse", "OS"],
  },
  {
    title: "PulmoGuard AI",
    subtitle:
      "An AI-driven diagnostic system for early lung disease detection using medical imaging.",
    mediaType: "image",
    mediaUrl: altImage,
    href: "https://github.com/Dani-Nade/PulmoGuardAI",
    tags: ["Healthcare", "AI"],
    tech: ["PyTorch", "OpenCV", "NumPy", "Grad-CAM"],
  },
];

export default projects;
