/* ═══════════════════════════════════════════════════════════
   components/editor.js   ·   <code-editor>

   Editor de código con pestañas, números de línea y minimapa.
   La gran ventaja: ya NO hay que tokenizar el código a mano.
   Escribes el código tal cual y se resalta solo.

   Cada archivo es un <script type="text/plain"> (así puedes usar
   <, > y & sin escapar nada):

     <code-editor>
       <script type="text/plain" data-name="punteros.c" data-lang="C">
   #include <stdio.h>
   int main() {
       int *p = NULL;
       return 0;
   }
       </script>
       <script type="text/plain" data-name="malloc.c" data-lang="C">
   ...otro archivo...
       </script>
     </code-editor>

   Atributos de cada <script>:
     data-name  -> nombre de la pestaña (p.ej. "punteros.c")
     data-lang  -> C | Python | JavaScript | ...  (resaltado + etiqueta)
     data-icon  -> (opcional) carácter de icono
     data-color -> (opcional) color del icono
   ═══════════════════════════════════════════════════════════ */
(() => {
  let counter = 0;

  /* ─── Definición de lenguajes para el resaltador ─────────── */
  const LANGS = {
    c: {
      line: ['//'], block: [['/*', '*/']], strings: ['"', "'"], preproc: true,
      keywords: new Set(('int char float double void short long unsigned signed const ' +
        'static struct union enum typedef sizeof return if else for while do switch case ' +
        'break continue goto default extern register volatile inline bool _Bool').split(' ')),
      constants: new Set(['NULL', 'true', 'false', 'EOF']),
    },
    python: {
      line: ['#'], block: [], strings: ['"', "'"], preproc: false,
      keywords: new Set(('def class return if elif else for while import from as with try ' +
        'except finally raise lambda yield global nonlocal pass break continue in is not ' +
        'and or assert del async await match case').split(' ')),
      constants: new Set(['None', 'True', 'False', 'self', 'cls']),
    },
    javascript: {
      line: ['//'], block: [['/*', '*/']], strings: ['"', "'", '`'], preproc: false,
      keywords: new Set(('var let const function return if else for while do switch case ' +
        'break continue new typeof instanceof in of class extends super import export ' +
        'default from as await async yield throw try catch finally delete void this').split(' ')),
      constants: new Set(['null', 'undefined', 'true', 'false', 'NaN']),
    },
    default: {
      line: ['#', '//'], block: [['/*', '*/']], strings: ['"', "'", '`'], preproc: false,
      keywords: new Set([]), constants: new Set([]),
    },
  };

  const ALIAS = { c: 'c', py: 'python', python: 'python', js: 'javascript', javascript: 'javascript' };
  const ICONS = { c: '©', python: '🐍', javascript: 'JS' };

  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const isId = (c) => /[A-Za-z0-9_$]/.test(c);
  const isIdStart = (c) => /[A-Za-z_$]/.test(c);
  const isDigit = (c) => c >= '0' && c <= '9';

  /* ─── Resaltador: devuelve HTML con <span class> por token ── */
  function highlight(code, langKey) {
    const cfg = LANGS[langKey] || LANGS.default;
    let html = '';
    let i = 0;
    const n = code.length;
    let lineStart = true;
    const wrap = (cls, txt) => `<span class="${cls}">${esc(txt)}</span>`;

    while (i < n) {
      const c = code[i];

      // espacios / saltos de línea
      if (/\s/.test(c)) {
        let j = i;
        while (j < n && /\s/.test(code[j])) j++;
        const ws = code.slice(i, j);
        html += esc(ws);
        if (ws.includes('\n')) lineStart = true;
        i = j;
        continue;
      }

      // comentario de bloque
      let matchedBlock = false;
      for (const [open, close] of cfg.block) {
        if (code.startsWith(open, i)) {
          let end = code.indexOf(close, i + open.length);
          end = end === -1 ? n : end + close.length;
          html += wrap('cm', code.slice(i, end));
          i = end; lineStart = false; matchedBlock = true; break;
        }
      }
      if (matchedBlock) continue;

      // preprocesador C (#include, #define...) al inicio de línea
      if (cfg.preproc && lineStart && c === '#') {
        let j = i;
        while (j < n && code[j] !== '\n') j++;
        html += wrap('im', code.slice(i, j));
        i = j; lineStart = false; continue;
      }

      // comentario de línea
      let matchedLine = false;
      for (const lc of cfg.line) {
        if (code.startsWith(lc, i)) {
          let j = i;
          while (j < n && code[j] !== '\n') j++;
          html += wrap('cm', code.slice(i, j));
          i = j; lineStart = false; matchedLine = true; break;
        }
      }
      if (matchedLine) continue;

      // cadenas de texto
      if (cfg.strings.includes(c)) {
        let j = i + 1;
        while (j < n && code[j] !== c) { if (code[j] === '\\') j++; j++; }
        j = Math.min(j + 1, n);
        html += wrap('st', code.slice(i, j));
        i = j; lineStart = false; continue;
      }

      // números
      if (isDigit(c) || (c === '.' && isDigit(code[i + 1]))) {
        let j = i;
        while (j < n && /[0-9a-fA-FxX._]/.test(code[j])) j++;
        html += wrap('nb', code.slice(i, j));
        i = j; lineStart = false; continue;
      }

      // identificadores: keyword / constante / función / variable
      if (isIdStart(c)) {
        let j = i;
        while (j < n && isId(code[j])) j++;
        const word = code.slice(i, j);
        let k = j;
        while (k < n && /\s/.test(code[k])) k++;
        let cls;
        if (cfg.keywords.has(word)) cls = 'kw';
        else if (cfg.constants.has(word)) cls = 'nb';
        else if (code[k] === '(') cls = 'fn';
        else cls = 'nm';
        html += wrap(cls, word);
        i = j; lineStart = false; continue;
      }

      // puntuación / operadores
      html += wrap('op', c);
      i++; lineStart = false;
    }
    return html;
  }

  /* ─── Quita la indentación común y líneas en blanco extremas ─ */
  function dedent(raw) {
    let lines = raw.replace(/\t/g, '    ').split('\n');
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(min)).join('\n');
  }

  class CodeEditor extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;
      const uid = ++counter;

      // lee los archivos desde los <script type="text/plain"> hijos
      const files = [...this.querySelectorAll('script[type="text/plain"]')].map((s) => {
        const lang = s.dataset.lang || 'text';
        const key = ALIAS[lang.toLowerCase()] || 'default';
        return {
          name: s.dataset.name || ('archivo' + key),
          lang,
          key,
          icon: s.dataset.icon || ICONS[key] || '<>',
          color: s.dataset.color || '#61afef',
          code: dedent(s.textContent),
        };
      });
      if (!files.length) return;

      this.innerHTML = `
        <div class="ed-wrap">
          <div class="ed-titlebar">
            <div class="ed-dots"><div class="ed-dot dot-r"></div><div class="ed-dot dot-y"></div><div class="ed-dot dot-g"></div></div>
            <div class="ed-tabs" data-role="tabs"></div>
          </div>
          <div class="ed-body">
            <div class="ed-gutter" data-role="gutter"></div>
            <div class="ed-code"><pre data-role="code"></pre></div>
            <div class="ed-minimap" data-role="minimap"></div>
          </div>
          <div class="ed-statusbar">
            <div class="ed-statusbar-left">
              <span data-role="lang"></span>
              <button class="ed-copy-btn" data-role="copy">copiar código</button>
            </div>
            <div class="ed-statusbar-right">
              <span>UTF-8</span>
              <span data-role="lines"></span>
            </div>
          </div>
        </div>`;

      const $ = (r) => this.querySelector(`[data-role="${r}"]`);
      const tabsEl = $('tabs'), gutterEl = $('gutter'), codeEl = $('code'),
        minimapEl = $('minimap'), langEl = $('lang'), linesEl = $('lines'), copyEl = $('copy');

      let current = 0;

      const render = (idx) => {
        current = idx;
        const f = files[idx];
        const rawLines = f.code.split('\n');

        langEl.textContent = f.lang;
        linesEl.textContent = rawLines.length + ' líneas';
        gutterEl.innerHTML = rawLines.map((_, i) => `<div class="ln">${i + 1}</div>`).join('');
        codeEl.innerHTML = highlight(f.code, f.key);
        minimapEl.innerHTML = rawLines.map((l) => {
          const t = l.trim();
          const w = Math.max(16, Math.min(50, t.length * 1.1));
          let cls = '';
          if (/^(\/\/|#|\/\*|\*)/.test(t)) cls = 'cm-m';
          else if (t) cls = 'op-m';
          return `<div class="mm-line ${cls}" style="width:${w}px"></div>`;
        }).join('');

        tabsEl.querySelectorAll('.ed-tab').forEach((t, i) =>
          t.classList.toggle('active', i === idx));
      };

      tabsEl.innerHTML = files.map((f, i) => `
        <div class="ed-tab${i === 0 ? ' active' : ''}" data-i="${i}">
          <span style="color:${f.color}">${esc(f.icon)}</span>${esc(f.name)}
          <span class="ed-tab-close">✕</span>
        </div>`).join('');
      tabsEl.querySelectorAll('.ed-tab').forEach((t) =>
        t.addEventListener('click', () => render(+t.dataset.i)));

      copyEl.addEventListener('click', () => {
        navigator.clipboard.writeText(files[current].code).then(() => {
          copyEl.textContent = '✓ copiado';
          copyEl.classList.add('done');
          setTimeout(() => { copyEl.textContent = 'copiar código'; copyEl.classList.remove('done'); }, 1500);
        });
      });

      render(0);
    }
  }

  customElements.define('code-editor', CodeEditor);
})();
