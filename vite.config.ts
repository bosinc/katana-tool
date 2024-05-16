import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { resolve } from "path";

import packageJson from "./package.json";
const { version } = packageJson;

const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

// https://vitejs.dev/config/
// @ts-expect-error -- to do
export default ({ mode }) => {
  console.log({ mode });
  const env = loadEnv(mode, process.cwd());

  const crxVersion = `${major}.${minor}.${patch}`;
  const outDirName = ["staging", "release"].includes(mode)
    ? `${mode}_v${crxVersion}`
    : mode === "production"
      ? env.VITE_PUBLIC_PROJECT_NAME
      : "dist";

  return defineConfig({
    plugins: [
      react(),
      crx({
        manifest: {
          ...manifest,
          name: (env.VITE_PUBLIC_PROJECT_NAME || "AliExpress Helper") as string,
          version: crxVersion,
        } as ManifestV3Export,
      }),
    ],
    resolve: {
      alias: {
        "@katana-common": resolve(__dirname, "modules/katana-common"),
        "@components": resolve(__dirname, "src/components"),
        "@utils": resolve(__dirname, "src/utils"),
        "@services": resolve(__dirname, "src/services"),
        "@atoms": resolve(__dirname, "src/atoms"),
        "@hooks": resolve(__dirname, "src/hooks"),
      },
    },
    build: {
      outDir: outDirName,
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          popup: resolve(__dirname, "popup/index.html"),
          login: resolve(__dirname, "login/index.html"),
        },
      },
    },
  });
};
