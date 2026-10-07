/* ═══════════════════════════════════════════════════════════
   main.js  —  comportamiento global compartido
   (tema claro/oscuro + abrir/cerrar sidebar)
   La terminal y el editor viven en components/terminal.js y
   components/editor.js como componentes independientes.
   ═══════════════════════════════════════════════════════════ */

/* ─── SIDEBAR ────────────────────────────────────────────── */
let sidebarOpen = window.innerWidth > 768;

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const tb = document.getElementById('topbar');
  const mn = document.getElementById('main');
  const ov = document.getElementById('overlay');
  if (window.innerWidth <= 768) {
    sb.classList.toggle('open');
    ov.classList.toggle('visible');
  } else {
    sidebarOpen = !sidebarOpen;
    sb.classList.toggle('collapsed', !sidebarOpen);
    tb.classList.toggle('full', !sidebarOpen);
    mn.classList.toggle('full', !sidebarOpen);
  }
}

function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('overlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('visible');
}

/* Despliega / pliega un grupo del árbol de navegación */
function toggleNav(el) {
  const toggle = el.querySelector('.nav-toggle');
  const children = el.nextElementSibling;
  if (!children || !children.classList.contains('nav-children')) return;
  children.classList.toggle('open');
  if (toggle) toggle.classList.toggle('open');
}

/* ─── THEME ──────────────────────────────────────────────── */
const THEME_LABELS = { es: ['OSCURO', 'CLARO'], en: ['DARK', 'LIGHT'] };
function themeLabel(isLight) {
  const l = THEME_LABELS[document.documentElement.lang] || THEME_LABELS.en;
  return isLight ? l[1] : l[0];
}

function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  const lbl = document.getElementById('theme-label');
  if (lbl) lbl.textContent = themeLabel(!isLight);
  try { localStorage.setItem('theme', isLight ? 'dark' : 'light'); } catch (e) {}
}

/* Mantiene el tema entre páginas (localStorage puede no estar disponible) */
(function () {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

/* Al cargar: actualiza la etiqueta del tema y cierra la sidebar al pasar a escritorio */
window.addEventListener('DOMContentLoaded', () => {
  const lbl = document.getElementById('theme-label');
  if (lbl) {
    lbl.textContent = themeLabel(document.documentElement.getAttribute('data-theme') === 'light');
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeSidebar();
  });
});
