import { getCollection, type CollectionEntry } from 'astro:content';
import { NOTE_FOLDERS } from '../data/site';
import { url } from './paths';

export interface NavNode {
  label: string;
  level: number;
  href?: string;
  order: number;
  children?: NavNode[];
}

const prettify = (s: string) =>
  s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/* Notas publicadas (en `npm run dev` también se ven los borradores) */
export async function getNotes() {
  return getCollection('notes', ({ data }) => import.meta.env.DEV || !data.draft);
}

/* Construye el árbol de NOTES a partir de las carpetas de src/content/notes */
export async function buildNotesTree(): Promise<NavNode[]> {
  const notes = await getNotes();
  const root: NavNode = { label: 'NOTES', level: 0, order: 0, children: [] };

  for (const note of notes) {
    const parts = note.id.split('/');
    let node = root;
    // carpetas intermedias -> grupos plegables
    parts.slice(0, -1).forEach((part, i) => {
      const key = parts.slice(0, i + 1).join('/');
      let child = node.children!.find((c) => c.children && (c as any).key === key);
      if (!child) {
        const cfg = NOTE_FOLDERS[key];
        child = { label: cfg?.label ?? prettify(part), level: i + 1, order: cfg?.order ?? 100, children: [] };
        (child as any).key = key;
        node.children!.push(child);
      }
      node = child;
    });
    // la nota -> enlace
    node.children!.push({
      label: note.data.title,
      level: parts.length,
      order: note.data.order,
      href: url(`notes/${note.id}/`),
    });
  }

  const sort = (n: NavNode) => {
    n.children?.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, 'es'));
    n.children?.forEach(sort);
  };
  sort(root);
  return root.children!;
}

/* Miga de pan de una nota: ["NOTES", "Herramientas Ciberseguridad", "Reconocimiento", "Nmap"] */
export function noteBreadcrumb(note: CollectionEntry<'notes'>) {
  const parts = note.id.split('/');
  const folders = parts.slice(0, -1).map((p, i) => {
    const key = parts.slice(0, i + 1).join('/');
    return NOTE_FOLDERS[key]?.label ?? prettify(p);
  });
  return ['NOTES', ...folders, note.data.title];
}
