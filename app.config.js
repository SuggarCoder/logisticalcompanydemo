import { defineConfig } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";

const rawBasePath = process.env.BASE_PATH || "/";
const basePath =
  rawBasePath === "/"
    ? "/"
    : `/${rawBasePath.replace(/^\/+|\/+$/g, "")}/`;

export default defineConfig({
  server: {
    baseURL: basePath,
    prerender: {
      routes: ["/"]
    }
  },
  vite: ({ router }) => ({
    base: router === "client" ? `${basePath}_build/` : basePath,
    define: {
      "import.meta.env.PUBLIC_BASE_URL": JSON.stringify(basePath)
    },
    plugins: [UnoCSS()]
  })
});
