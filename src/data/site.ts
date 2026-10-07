/* Datos generales de la web ─ edita aquí */
export const SITE = {
  name: 'Markel Iturbe',
};

/* Nombre visible (y orden) de cada CARPETA de src/content/notes, en los dos idiomas.
   La clave es la ruta de la carpeta. Si una carpeta no está aquí,
   se muestra su nombre tal cual. */
export const NOTE_FOLDERS: Record<string, { es: string; en: string; order?: number }> = {
  'programming': { es: 'Programación',                en: 'Programming',        order: 1 },
  'tools':       { es: 'Herramientas Ciberseguridad', en: 'Cybersecurity Tools', order: 3 },
  'tools/recon': { es: 'Reconocimiento',              en: 'Reconnaissance',     order: 1 },
};
