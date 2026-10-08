/* Colores e iconos de los writeups según dificultad y sistema operativo */
export const DIFF_ACCENT = {
  Easy:   'linear-gradient(to right, var(--blue), #8fb0d6)',
  Medium: 'linear-gradient(to right, var(--gold), #e8c27a)',
  Hard:   'linear-gradient(to right, var(--red), #d76a66)',
  Insane: 'linear-gradient(to right, var(--red), var(--gold))',
} as const;

export const DIFF_TAG = { Easy: 'blue', Medium: 'gold', Hard: '', Insane: '' } as const;

export const OS_ICON: Record<string, string> = {
  Linux: '🐧', Windows: '⊞', FreeBSD: '😈', OpenBSD: '🐡', Android: '🤖', Other: '◆',
};
