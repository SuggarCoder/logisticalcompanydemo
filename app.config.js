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
      routes: ["/", "/us"]
    }
  },
  vite: {
    base: basePath,
    plugins: [UnoCSS()]
  }
});
