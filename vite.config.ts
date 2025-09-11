import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ezoicAdsRedirect } from "./scripts/ezoic-ads-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ezoicAdsRedirect()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
