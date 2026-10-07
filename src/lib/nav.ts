import { getCollection, type CollectionEntry } from 'astro:content';
import { NOTE_FOLDERS } from '../data/site';
import type { Lang } from '../i18n/ui';
import { localePath } from '../i18n/utils';

export interface NavNode {
  label: string;
  level: number;
  href?: string;
  order: number;
  key?: string;
  children?: NavNode[];
}

/* Una nota/proyecto ya resuelto para un idioma concreto */
export interface Localized<T> {
  id: string;
  entry: T;
  title: string;
  fallback: boolean; // true = no existe en este idioma y se muestra la del otro
}
export type NoteItem = Localized<CollectionEntry<'notes'> | CollectionEntry<'notesEn'>>;
export type ProjectItem = Localized<CollectionEntry<'projects'> | CollectionEntry<'projectsEn'>>;

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

const prettify = (s: string) =>
  s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/* Junta español + inglés: usa la versión del idioma pedido y, si no existe, la del otro */
function merge<E extends { id: string; data: { title: string; titleEn?: string } }>(
  es: E[], en: E[], lang: Lang,
): Localized<E>[] {
  const [primary, secondary] = lang === 'es' ? [es, en] : [en, es];
  const map = new Map<string, Localized<E>>();
  for (const e of secondary) {
    const title = lang === 'en' && e.data.titleEn ? e.data.titleEn : e.data.title;
    map.set(e.id, { id: e.id, entry: e, title, fallback: true });
  }
  for (const e of primary) map.set(e.id, { id: e.id, entry: e, title: e.data.title, fallback: false });
  return [...map.values()];
}

export async function getNotes(lang: Lang): Promise<NoteItem[]> {
  const es = await getCollection('notes', visible);
  const en = await getCollection('notesEn', visible);
  return merge<any>(es, en, lang);
}

export async function getProjects(lang: Lang): Promise<ProjectItem[]> {
  const es = await getCollection('projects', visible);
  const en = await getCollection('projectsEn', visible);
  return merge<any>(es, en, lang).sort(
    (a, b) => a.entry.data.order - b.entry.data.order || a.title.localeCompare(b.title, lang),
  );
}

const folderLabel = (key: string, lang: Lang) =>
  NOTE_FOLDERS[key]?.[lang] ?? prettify(key.split('/').pop()!);

/* Construye el árbol de NOTAS a partir de las carpetas de src/content/notes */
export async function buildNotesTree(lang: Lang): Promise<NavNode[]> {
  const notes = await getNotes(lang);
  const root: NavNode = { label: '', level: 0, order: 0, children: [] };

  for (const note of notes) {
    const parts = note.id.split('/');
    let node = root;
    parts.slice(0, -1).forEach((_, i) => {
      const key = parts.slice(0, i + 1).join('/');
      let child = node.children!.find((c) => c.key === key);
      if (!child) {
        child = { key, label: folderLabel(key, lang), level: i + 1, order: NOTE_FOLDERS[key]?.order ?? 100, children: [] };
        node.children!.push(child);
      }
      node = child;
    });
    node.children!.push({
      label: note.title,
      level: parts.length,
      order: note.entry.data.order,
      href: localePath(lang, `notes/${note.id}/`),
    });
  }

  const sort = (n: NavNode) => {
    n.children?.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, lang));
    n.children?.forEach(sort);
  };
  sort(root);
  return root.children!;
}

/* Miga de pan de una nota: ["NOTAS", "Herramientas Ciberseguridad", "Reconocimiento", "Nmap"] */
export function noteFolders(id: string, lang: Lang) {
  const parts = id.split('/');
  return parts.slice(0, -1).map((_, i) => folderLabel(parts.slice(0, i + 1).join('/'), lang));
}
