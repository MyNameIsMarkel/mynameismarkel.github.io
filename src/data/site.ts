/* Datos generales de la web ─ edita aquí */
export const SITE = {
  name: 'Markel Iturbe',
  subtitle: "Markel's Portfolio",
  footer: 'Cybersecurity & Dev',
};

/* Nombre visible (y orden) de cada CARPETA de src/content/notes.
   La clave es la ruta de la carpeta. Si una carpeta no está aquí,
   se muestra su nombre tal cual. */
export const NOTE_FOLDERS: Record<string, { label: string; order?: number }> = {
  'programming':  { label: 'Programación', order: 1 },
  'tools':        { label: 'Herramientas Ciberseguridad', order: 3 },
  'tools/recon':  { label: 'Reconocimiento', order: 1 },
};
