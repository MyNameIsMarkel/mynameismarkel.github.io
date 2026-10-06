/* ═══════════════════════════════════════════════════════════
   components/terminal.js   ·   <terminal-block>

   Forma fácil de insertar una "terminal" en cualquier página:

     <terminal-block
        user="markel" host="kali" sym="㉿" path="~/NOTES"
        cmd="nmap -sV 10.0.0.1"
        tag="recon">
   Starting Nmap 7.94
   22/tcp open ssh
     </terminal-block>

   Atributos (todos opcionales salvo cmd):
     user   -> usuario del prompt        (def: "tu")
     host   -> host del prompt           (def: "portfolio")
     sym    -> símbolo entre user y host (def: "@", usa "㉿" para estilo kali)
     path   -> ruta del prompt           (def: "~")
     cmd    -> comando mostrado          (obligatorio)
     tag    -> pentest | recon | exploit | misc   (opcional)
   El texto interior del elemento = output (opcional, editable).
   ═══════════════════════════════════════════════════════════ */
(() => {
  let counter = 0;
  const PLACEHOLDER = 'pega el output aquí (opcional)...';
  const TAGS = {
    pentest: 'red', recon: 'blue', exploit: 'gold', misc: 'grey',
  };

  class TerminalBlock extends HTMLElement {
    connectedCallback() {
      if (this._init) return;
      this._init = true;

      const id = ++counter;
      const user = this.getAttribute('user') || 'tu';
      const host = this.getAttribute('host') || 'portfolio';
      const sym  = this.getAttribute('sym')  || '@';
      const path = this.getAttribute('path') || '~';
      const cmd  = this.getAttribute('cmd')  || this.dataset.cmd || '';
      const tag  = (this.getAttribute('tag') || '').toLowerCase();
      const output = this.textContent.trim();

      const esc = (s) => s
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const tagCls = TAGS[tag] || 'grey';
      const tagPill = tag
        ? `<span class="tag-pill ${tagCls}" data-role="tag">${esc(tag)}</span>`
        : `<span class="tag-pill grey" data-role="tag" style="opacity:.4">+ tag</span>`;

      const tagSelector = `
        <div class="tag-selector" data-role="selector">
          <span class="tag-pill red"  data-set="pentest">pentest</span>
          <span class="tag-pill blue" data-set="recon">recon</span>
          <span class="tag-pill gold" data-set="exploit">exploit</span>
          <span class="tag-pill grey" data-set="misc">misc</span>
          <span class="tag-pill grey" data-set="">ninguno</span>
        </div>`;

      const hasOutput = output ? ' has-output' : '';
      const outStyle = output
        ? 'color:#888'
        : 'color:#444;font-style:italic';
      const outContent = output ? esc(output) : PLACEHOLDER;

      this.innerHTML = `
        <div class="term-wrap">
          <div class="term-titlebar">
            <div class="term-dots">
              <div class="term-dot dot-r"></div>
              <div class="term-dot dot-y"></div>
              <div class="term-dot dot-g"></div>
            </div>
            <div class="term-title-bar-label">${esc(user)}${esc(sym)}${esc(host)} — ${esc(path)}</div>
          </div>
          <div class="term-body">
            <div class="cmd-line">
              <span class="prompt-user">${esc(user)}</span>
              <span class="prompt-sym">${esc(sym)}</span>
              <span class="prompt-host">${esc(host)}</span>
              <span class="prompt-sym">:</span>
              <span class="prompt-path">${esc(path)}</span>
              <span class="prompt-sym">&nbsp;$&nbsp;</span>
              <textarea class="cmd-text" rows="1" spellcheck="false" data-role="cmd">${esc(cmd)}</textarea>
            </div>
            <div class="term-output-block${hasOutput}" data-role="outblock">
              <div class="term-output-controls">
                <span class="term-out-label">output</span>
                <div class="tag-wrap">${tagPill}${tagSelector}</div>
              </div>
              <div class="term-output-editable" contenteditable="true" spellcheck="false"
                   style="${outStyle}" data-role="output"
                   data-placeholder="${output ? '0' : '1'}">${outContent}</div>
            </div>
            <div class="term-actions">
              <button class="term-act-btn" data-role="copy">copiar cmd</button>
            </div>
          </div>
        </div>`;

      this._wire(id);
    }

    _wire() {
      const $ = (r) => this.querySelector(`[data-role="${r}"]`);
      const cmd = $('cmd');
      const out = $('output');
      const outblock = $('outblock');
      const copy = $('copy');
      const tagPill = $('tag');
      const selector = $('selector');

      // auto-resize del comando
      const resize = () => { cmd.style.height = 'auto'; cmd.style.height = cmd.scrollHeight + 'px'; };
      cmd.addEventListener('input', resize);
      requestAnimationFrame(resize);

      // output editable con placeholder
      out.addEventListener('focus', () => {
        if (out.dataset.placeholder === '1') {
          out.textContent = '';
          out.style.color = '#888';
          out.style.fontStyle = 'normal';
          out.dataset.placeholder = '0';
        }
      });
      out.addEventListener('blur', () => {
        if (!out.textContent.trim()) {
          out.textContent = 'pega el output aquí (opcional)...';
          out.style.color = '#444';
          out.style.fontStyle = 'italic';
          out.dataset.placeholder = '1';
          outblock.classList.remove('has-output');
        }
      });
      out.addEventListener('input', () => {
        if (out.textContent.trim() && out.dataset.placeholder !== '1') {
          outblock.classList.add('has-output');
        }
      });

      // selector de tag
      tagPill.addEventListener('click', (e) => {
        e.stopPropagation();
        selector.classList.toggle('open');
      });
      selector.querySelectorAll('[data-set]').forEach((opt) => {
        opt.addEventListener('click', () => {
          const key = opt.dataset.set;
          selector.classList.remove('open');
          if (!key) {
            tagPill.className = 'tag-pill grey';
            tagPill.style.opacity = '.4';
            tagPill.textContent = '+ tag';
          } else {
            const colors = { pentest: 'red', recon: 'blue', exploit: 'gold', misc: 'grey' };
            tagPill.className = 'tag-pill ' + colors[key];
            tagPill.style.opacity = '1';
            tagPill.textContent = key;
          }
        });
      });
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target)) selector.classList.remove('open');
      });

      // copiar comando
      copy.addEventListener('click', () => {
        navigator.clipboard.writeText(cmd.value).then(() => {
          copy.textContent = '✓ copiado';
          copy.classList.add('copy-done');
          setTimeout(() => { copy.textContent = 'copiar cmd'; copy.classList.remove('copy-done'); }, 1500);
        });
      });
    }
  }

  customElements.define('terminal-block', TerminalBlock);
})();
