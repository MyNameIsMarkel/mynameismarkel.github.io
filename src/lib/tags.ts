export type Tag = string | { label: string; color: 'red' | 'blue' | 'gold' };

/* Devuelve { label, cls } listo para <span class="card-tag {cls}"> */
export const tagInfo = (t: Tag) =>
  typeof t === 'string'
    ? { label: t, cls: '' }
    : { label: t.label, cls: t.color === 'red' ? '' : t.color };
