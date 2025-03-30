import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 5173,
  },
  plugins: [react(), tsconfigPaths()],
});
