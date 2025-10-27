import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Portfolio/",
  resolve: {
    dedupe: ["react", "react-dom"], // ✅ prevent duplicated React resolution
  },
});
