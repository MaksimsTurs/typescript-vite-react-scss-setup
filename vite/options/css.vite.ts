import type { CSSOptions } from "vite";

import resolve from "../utils/resolve.util";

export default function(): CSSOptions {
  return {
    transformer:            "postcss",
    devSourcemap:           true,
    preprocessorOptions: {
      scss: {
        style: "compressed",
        syntax: "css",
      }
    },
    preprocessorMaxWorkers: true,
    postcss:                resolve("postcss.config.ts"),
		modules: {
			scopeBehaviour: "local"
		},
  };
};