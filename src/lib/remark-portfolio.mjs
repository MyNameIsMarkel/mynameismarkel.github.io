/* ═══════════════════════════════════════════════════════════
   remark-portfolio.mjs
   Convierte bloques de código especiales de los .md en tus
   componentes <terminal-block> y <code-editor>.

   1) TERMINAL
      ```terminal tag=recon path=~/NOTES
      $ nmap -sC -sV 10.10.10.10
      Starting Nmap 7.94
      22/tcp open ssh
      ```
      - La línea que empieza por "$ " es el comando; el resto, el output.
      - Opciones (todas opcionales): user, host, sym, path, tag
        (por defecto: markel ㉿ kali en ~).

   2) EDITOR CON PESTAÑAS
      ```c tab="punteros.c"
      int *p = NULL;
      ```
      ```python tab="script.py"
      print("hola")
      ```
      - Cualquier bloque con  tab="nombre"  se convierte en un editor.
      - Varios bloques con tab="..." SEGUIDOS se juntan en un único
        editor con varias pestañas.
      - Opcionales: icon="🐍" color="#ffd43b"

   Los bloques ``` normales (sin "terminal" ni tab=) se quedan como
   bloques de código resaltados por Astro.
   ═══════════════════════════════════════════════════════════ */

const DEFAULTS = { user: 'markel', host: 'kali', sym: '㉿', path: '~' };

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* "tab=\"a.c\" tag=recon"  ->  { tab: 'a.c', tag: 'recon' } */
function parseMeta(meta) {
  const out = {};
  if (!meta) return out;
  const re = /([\w-]+)=(?:"([^"]*)"|'([^']*)'|(\S+))/g;
  let m;
  while ((m = re.exec(meta))) out[m[1]] = m[2] ?? m[3] ?? m[4];
  return out;
}

function terminalHtml(node) {
  const opts = { ...DEFAULTS, ...parseMeta(node.meta) };
  const lines = node.value.split('\n');
  let cmd = '';
  const idx = lines.findIndex((l) => l.startsWith('$ '));
  if (idx !== -1) {
    cmd = lines[idx].slice(2);
    lines.splice(idx, 1);
  } else {
    cmd = lines.shift() ?? '';
  }
  const output = lines.join('\n').replace(/^\n+|\n+$/g, '');
  const attrs = ['user', 'host', 'sym', 'path', 'tag']
    .filter((k) => opts[k])
    .map((k) => `${k}="${esc(opts[k])}"`)
    .join(' ');
  return `<terminal-block ${attrs} cmd="${esc(cmd)}">${esc(output)}</terminal-block>`;
}

function editorTab(node) {
  const opts = parseMeta(node.meta);
  const attrs = [
    `data-name="${esc(opts.tab)}"`,
    `data-lang="${esc(node.lang || 'text')}"`,
    opts.icon ? `data-icon="${esc(opts.icon)}"` : '',
    opts.color ? `data-color="${esc(opts.color)}"` : '',
  ].filter(Boolean).join(' ');
  // <script type="text/plain"> no admite el texto "</script" dentro
  const code = node.value.replace(/<\/script/gi, '<\\/script');
  return `<script type="text/plain" ${attrs}>\n${code}\n</script>`;
}

const isTab = (n) => n && n.type === 'code' && /(^|\s)tab=/.test(n.meta || '');
const isTerminal = (n) => n && n.type === 'code' && n.lang === 'terminal';

function transform(parent) {
  if (!parent.children) return;
  const out = [];
  for (let i = 0; i < parent.children.length; i++) {
    const node = parent.children[i];
    if (isTerminal(node)) {
      out.push({ type: 'html', value: terminalHtml(node) });
    } else if (isTab(node)) {
      const tabs = [];
      while (isTab(parent.children[i])) tabs.push(editorTab(parent.children[i++]));
      i--;
      out.push({ type: 'html', value: `<code-editor>\n${tabs.join('\n')}\n</code-editor>` });
    } else {
      transform(node);
      out.push(node);
    }
  }
  parent.children = out;
}

export default function remarkPortfolio() {
  return (tree) => transform(tree);
}
