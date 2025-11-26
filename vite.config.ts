import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@views": path.resolve(__dirname, "src/views"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-dialog",
          ],
          icons: ["lucide-react", "react-country-flag"],
          validation: ["zod"],
        },
      },
    },
  },
});
