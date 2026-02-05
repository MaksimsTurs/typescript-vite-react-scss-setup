import type { Plugin } from "vite";

import imagemin from "unplugin-imagemin/vite";

import resolve from "../utils/resolve.util";

export default function(): Plugin<any> {
  return imagemin({ cacheLocation: resolve("node_modules\\unplugin-imagemin-cache") });
};