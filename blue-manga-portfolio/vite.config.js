import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/blue-manga-portfolio/", // 👈 your repo name
});
