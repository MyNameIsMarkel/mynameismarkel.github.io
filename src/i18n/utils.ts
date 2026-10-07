import type { Lang } from './ui';
import { url } from '../lib/paths';

/* Ruta interna en el idioma indicado:  ('en', 'projects/') -> /en/projects/ */
export const localePath = (lang: Lang, path = '') =>
  lang === 'es' ? url(path) : url(`en/${path.replace(/^\//, '')}`);

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/* Misma página en el otro idioma:  /notes/x/ <-> /en/notes/x/ */
export function alternatePath(pathname: string, target: Lang) {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  p = p.replace(/^\/en(\/|$)/, '/');
  return target === 'es' ? url(p) : url(`en${p}`);
}
