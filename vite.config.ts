import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { resolve } from "path";

// https://vitejs.dev/config/
// @ts-expect-error -- to do
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      react(),
      crx({
        manifest: {
          ...manifest,
          name: (env.VITE_PUBLIC_PROJECT_NAME || "Pear Tool") as string,
        } as ManifestV3Export,
      }),
    ],
    resolve: {
      alias: {
        "@katana-common": resolve(__dirname, "modules/katana-common"),
        "@components": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          popup: resolve(__dirname, "popup/index.html"),
        },
      },
    },
  });
};
