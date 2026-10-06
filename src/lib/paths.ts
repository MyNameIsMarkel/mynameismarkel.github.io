/* Construye rutas internas respetando `base` (por si algún día cambia) */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => `${BASE}/${path.replace(/^\//, '')}`;

/* Normaliza una ruta para compararla: siempre con barra final */
export const norm = (p: string) => (p.endsWith('/') ? p : p + '/');
