// @ts-check
import { defineConfig } from 'astro/config';
import remarkPortfolio from './src/lib/remark-portfolio.mjs';

// Identificador único de cada compilación (cache-busting de CSS/JS en Base.astro)
const BUILD_VERSION = Date.now().toString(36);

export default defineConfig({
  vite: { define: { BUILD_VERSION: JSON.stringify(BUILD_VERSION) } },
  // URL final de la web en GitHub Pages
  site: 'https://mynameismarkel.github.io',

  // Resaltado de los bloques ```código``` de los Markdown (estilo VS Code)
  markdown: {
    // ```terminal  y  ```lang tab="x"  ->  tus componentes <terminal-block> / <code-editor>
    remarkPlugins: [remarkPortfolio],
    shikiConfig: { theme: 'dark-plus', wrap: false },
  },
});
