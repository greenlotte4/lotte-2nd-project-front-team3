import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"), // store도 사용한다면 추가
    },
  },
});
