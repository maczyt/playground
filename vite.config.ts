import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@swc/wasm-web"],
  },
  base: process.env.NODE_ENV === "development" ? "/" : "/playground",
  build: {
    outDir: "docs",
  },
});
