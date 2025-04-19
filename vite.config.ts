import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path"; // Import resolve for path alias

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axiosConfig: resolve(__dirname, "src/axios/axiosConfig"), // Define alias for axiosConfig
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9092",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Keep `/api` prefix
      },
    },
  },
});
