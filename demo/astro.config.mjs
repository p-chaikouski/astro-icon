import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless"; // https://astro.build/config


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    includeFiles: ['../node_modules/@iconify/json/json/heroicons.json', '../node_modules/@iconify/json/json/radix-icons.json']
  }),
  // adapter: node(
  //   {
  //     mode: 'standalone'
  //   }
  // )
});