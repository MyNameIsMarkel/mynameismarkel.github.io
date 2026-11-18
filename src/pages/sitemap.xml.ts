/* ═══════════════════════════════════════════════════════════
   sitemap.xml — se genera solo en cada publicación.
   Incluye todas las páginas en castellano (/) e inglés (/en/),
   enlazadas entre sí con hreflang para que Google sepa que son
   la misma página en dos idiomas. Los borradores (draft) y los
   writeups de máquinas no retiradas no aparecen.
   ═══════════════════════════════════════════════════════════ */
import type { APIRoute } from 'astro';
import { getNotes, getProjects, getWriteups } from '../lib/nav';

const abs = (site: URL, path: string) => new URL(path, site).href;

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://mynameismarkel.github.io');

  /* Rutas sin prefijo de idioma + fecha opcional de última modificación */
  const pages: { path: string; lastmod?: Date }[] = [
    { path: '' },
    { path: 'notes/' },
    { path: 'projects/' },
    { path: 'writeups/' },
    { path: 'templates/' },
  ];
  // getNotes/getProjects/getWriteups('es') ya incluyen también lo que solo existe en inglés
  for (const n of await getNotes('es')) pages.push({ path: `notes/${n.id}/`, lastmod: n.entry.data.date });
  for (const p of await getProjects('es')) pages.push({ path: `projects/${p.id}/`, lastmod: p.entry.data.date });
  for (const w of await getWriteups('es')) pages.push({ path: `writeups/${w.id}/`, lastmod: w.entry.data.date });

  const urls = pages.flatMap(({ path, lastmod }) => {
    const es = abs(base, `/${path}`);
    const en = abs(base, `/en/${path}`);
    const alternates =
      `    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n` +
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${es}"/>\n`;
    const mod = lastmod ? `    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>\n` : '';
    return [es, en].map((loc) => `  <url>\n    <loc>${loc}</loc>\n${mod}${alternates}  </url>`);
  });

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n';

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
