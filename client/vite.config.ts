import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /*
  server: {
    // HMR is using WebSockets, so we need to use the ws protocol.
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 80
    }
  }
  */
});
