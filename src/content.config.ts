import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Etiqueta de color: "Python" (rojo por defecto) o { label: "Python", color: "blue" } */
const tag = z.union([
  z.string(),
  z.object({ label: z.string(), color: z.enum(['red', 'blue', 'gold']).default('red') }),
]);

/* NOTES ─ src/content/notes/**.md
   La carpeta donde metas el .md decide dónde aparece en el menú. */
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),                  // texto en el menú y título de la página
    description: z.string().optional(), // subtítulo bajo el título
    date: z.coerce.date().optional(),   // "Última actualización"
    order: z.number().default(100),     // posición en el menú (menor = más arriba)
    tags: z.array(tag).default([]),
    draft: z.boolean().default(false),  // true = no se publica
  }),
});

/* PROJECTS ─ src/content/projects/*.md */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),            // texto de la tarjeta
    date: z.coerce.date().optional(),
    order: z.number().default(100),     // orden de las tarjetas (01, 02...)
    accent: z.enum(['red', 'blue']).default('red'), // color de la franja superior
    tags: z.array(tag).default([]),
    repo: z.string().url().optional(),  // enlace a GitHub (opcional)
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, projects };
