/* ═══════════════════════════════════════════════════════════
   Textos de la interfaz en cada idioma.
   El contenido (About, notas, proyectos) está en src/data y src/content.
   ═══════════════════════════════════════════════════════════ */
export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

export const UI = {
  es: {
    'nav.about': 'SOBRE MÍ',
    'nav.notes': 'NOTAS',
    'nav.projects': 'PROYECTOS',
    'nav.templates': 'PLANTILLAS',
    'crumb.templates': 'PLANTILLAS',
    'site.subtitle': 'Portfolio de Markel',
    'site.footer': 'Ciberseguridad y Desarrollo',
    'theme.dark': 'OSCURO',
    'theme.light': 'CLARO',
    'theme.aria': 'Cambiar tema',
    'menu.aria': 'Menú',
    'lang.aria': 'Read this page in English',
    'cv.download': 'Descargar CV',
    'nav.writeups': 'HTB WALKTHROUGHS',
    'writeups.eyebrow': 'Hack The Box',
    'writeups.sub': 'Máquinas retiradas resueltas paso a paso',
    'writeups.empty': 'Próximamente: aún no hay writeups publicados.',
    'writeup.eyebrow': 'Walkthrough',
    'writeup.machine': 'Ver máquina en HTB',
    'writeup.back': 'Volver a los walkthroughs',
    'writeup.fallback': 'Este walkthrough solo está disponible en inglés.',
    'writeup.active': '⚠ Máquina NO retirada: este writeup no se publicará (solo visible en local).',
    'writeup.completed': 'Completada',
    'diff.Easy': 'Fácil', 'diff.Medium': 'Media', 'diff.Hard': 'Difícil', 'diff.Insane': 'Insane',
    'updated': 'Última actualización',
    'notes.eyebrow': 'Base de conocimiento',
    'notes.count': 'notas',
    'notes.general': 'General',
    'notes.fallback': 'Esta nota solo está disponible en inglés.',
    'projects.eyebrow': 'Trabajo',
    'project.eyebrow': 'Proyecto',
    'project.repo': 'Ver en GitHub',
    'project.back': 'Volver a proyectos',
    'project.fallback': 'Este proyecto solo está disponible en inglés.',
    'templates.eyebrow': 'Documentación',
    'templates.title': 'Plantillas',
    'templates.sub': 'Descarga directa desde Google Drive',
  },
  en: {
    'nav.about': 'ABOUT ME',
    'nav.notes': 'NOTES',
    'nav.projects': 'PROJECTS',
    'nav.templates': 'DOCUMENT TEMPLATES',
    'crumb.templates': 'TEMPLATES',
    'site.subtitle': "Markel's Portfolio",
    'site.footer': 'Cybersecurity & Dev',
    'theme.dark': 'DARK',
    'theme.light': 'LIGHT',
    'theme.aria': 'Toggle theme',
    'menu.aria': 'Menu',
    'lang.aria': 'Leer esta página en español',
    'cv.download': 'Download CV',
    'nav.writeups': 'HTB WALKTHROUGHS',
    'writeups.eyebrow': 'Hack The Box',
    'writeups.sub': 'Retired machines solved step by step',
    'writeups.empty': 'Coming soon: no walkthroughs published yet.',
    'writeup.eyebrow': 'Walkthrough',
    'writeup.machine': 'View machine on HTB',
    'writeup.back': 'Back to walkthroughs',
    'writeup.fallback': 'This walkthrough is only available in Spanish.',
    'writeup.active': '⚠ Machine NOT retired: this writeup will not be published (local preview only).',
    'writeup.completed': 'Completed',
    'diff.Easy': 'Easy', 'diff.Medium': 'Medium', 'diff.Hard': 'Hard', 'diff.Insane': 'Insane',
    'updated': 'Last updated',
    'notes.eyebrow': 'Knowledge base',
    'notes.count': 'notes',
    'notes.general': 'General',
    'notes.fallback': 'This note is only available in Spanish.',
    'projects.eyebrow': 'Work',
    'project.eyebrow': 'Project',
    'project.repo': 'View on GitHub',
    'project.back': 'Back to projects',
    'project.fallback': 'This project is only available in Spanish.',
    'templates.eyebrow': 'Documentation',
    'templates.title': 'Templates',
    'templates.sub': 'Direct download from Google Drive',
  },
} as const;

export type UIKey = keyof (typeof UI)['es'];
export const useT = (lang: Lang) => (key: UIKey) => UI[lang][key];

/* Texto que puede estar en un idioma o en los dos:  "Python"  o  { es: "...", en: "..." } */
export type Localized = string | { es: string; en: string };
export const tr = (v: Localized, lang: Lang) => (typeof v === 'string' ? v : v[lang]);

export const dateLocale = (lang: Lang) => (lang === 'es' ? 'es-ES' : 'en-GB');
