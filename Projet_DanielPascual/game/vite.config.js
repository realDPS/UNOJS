import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svelte from "@sveltejs/vite-plugin-svelte";
import strip from "@rollup/plugin-strip";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tsconfigPaths(),
    strip({ include: ["**/*.js", "**/*.svelte", "**/*.ts"] })
  ],
  build: {
    outDir: "build",
    terserOptions: {
      compress: true
    }
  },
  server: {
    port: 5000
  }
});
