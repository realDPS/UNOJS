import tsconfigPaths from "vite-tsconfig-paths";
import svelte from "@sveltejs/vite-plugin-svelte";
import strip from "@rollup/plugin-strip";

export default ({ _command, mode }) => {
  if (mode === "development") {
    return {
      plugins: [svelte(), tsconfigPaths()],
      build: {
        outDir: "build",
        terserOptions: {
          compress: true
        }
      },
      server: {
        port: 5000
      }
    };
  } else {
    return {
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
    };
  }
};
