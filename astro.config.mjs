// @ts-check
import { defineConfig } from 'astro/config';
import remarkPortfolio from './src/lib/remark-portfolio.mjs';

export default defineConfig({
  // URL final de la web en GitHub Pages
  site: 'https://mynameismarkel.github.io',

  // Resaltado de los bloques ```código``` de los Markdown (estilo VS Code)
  markdown: {
    // ```terminal  y  ```lang tab="x"  ->  tus componentes <terminal-block> / <code-editor>
    remarkPlugins: [remarkPortfolio],
    shikiConfig: { theme: 'dark-plus', wrap: false },
  },
});
