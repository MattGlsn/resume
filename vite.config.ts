import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "myReactApp", // Name of the current app -- TO BE CHANGED
      filename: "remoteEntry.js", // The name of the federated file -- CAN BE CHANGED
      //For the remote libraries
      exposes: {
        //"./Button": "./src/components/Button"
      },
      //For the main application
      remotes: {
        //myReactApp: "http://localhost:3000/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"], // Shared dependencies between apps
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: [
      "node_modules",
      "dist",
      "**/*.stories.*", // ← Ignore Storybook files
      "**/storybook/**",
      "**/cypress/**",
    ],
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5000, //To be changed
    strictPort: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
