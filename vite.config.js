import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: false, // use public/site.webmanifest
      includeAssets: [
        "favicon.ico",
        "favicon.svg",
        "apple-touch-icon.png",
        "site.webmanifest",
        "fonts/space-grotesk-latin.woff2",
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg,png,webmanifest,woff2}"],
      },
    }),
  ],
  build: {
    // No source maps in production.
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
  },
});
