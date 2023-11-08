import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import yaml from '@rollup/plugin-yaml'

export default defineConfig({
  plugins: [sveltekit()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [yaml()]
    }
  }
});
