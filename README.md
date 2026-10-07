# Markel's Portfolio — versión Astro

Mismo diseño de siempre (estética kali/terminal), pero ahora:

- **Las notas y proyectos se escriben en Markdown** (`.md`).
- **El menú se genera solo**: creas un `.md` y aparece en la sidebar, en su carpeta.
- **Se publica solo** en `https://mynameismarkel.github.io` cada vez que haces `git push`.

---

## 1. Puesta en marcha (solo la primera vez)

### Requisitos
1. **Node.js 22 o superior** → https://nodejs.org (versión LTS).
2. **Git** → https://git-scm.com
3. Un editor: **VS Code** + la extensión oficial **"Astro"**.

Comprueba en una terminal:
```bash
node -v    # v22.x o superior
git -v
```

### Arrancar el proyecto en tu ordenador
Descomprime el zip, abre una terminal dentro de la carpeta `portfolio` y ejecuta:
```bash
npm install      # descarga Astro (solo la primera vez)
npm run dev      # arranca la web en local
```
Abre **http://localhost:4321**. Cada vez que guardes un archivo, la web se recarga sola.
Para pararlo: `Ctrl + C`.

---

## 2. Publicarla en GitHub Pages (solo la primera vez)

1. En GitHub, crea un repositorio **público** llamado exactamente
   **`mynameismarkel.github.io`**, vacío (sin README, sin .gitignore).
2. En la terminal, dentro de `portfolio`:
   ```bash
   git init
   git add .
   git commit -m "Portfolio en Astro"
   git branch -M main
   git remote add origin https://github.com/MyNameIsMarkel/mynameismarkel.github.io.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
4. Pestaña **Actions**: verás el despliegue. Cuando salga en verde (1–2 min),
   la web está en **https://mynameismarkel.github.io**.

A partir de aquí, **cada `git push` a `main` vuelve a publicar la web automáticamente**
(lo hace `.github/workflows/deploy.yml`).

> Si el repositorio tuviera otro nombre, la web quedaría en
> `mynameismarkel.github.io/<nombre>/` y habría que añadir `base: '/<nombre>'`
> en `astro.config.mjs`. Con el nombre de arriba no hace falta nada.

---

## 3. Estructura

```
portfolio/
├── astro.config.mjs            ← configuración (URL de la web, plugins)
├── package.json
├── .github/workflows/deploy.yml← publicación automática en GitHub Pages
│
├── public/                     ← se sirve TAL CUAL (no se procesa)
│   ├── styles/                 ← tus CSS de siempre + notes.css (estilo del Markdown)
│   ├── scripts/                ← main.js, terminal.js, editor.js (tus componentes)
│   └── images/                 ← logo-m.svg, y aquí tu foto, capturas, etc.
│
└── src/
    ├── content/                ← ★ AQUÍ ESCRIBES ★
    │   ├── notes/              ← notas (.md). Las carpetas = grupos del menú
    │   │   ├── owasp-top10.md
    │   │   ├── programming/    (c.md, python.md)
    │   │   └── tools/
    │   │       ├── recon/      (burpsuite.md, nmap.md, whois.md)
    │   │       └── ...         (exploitation.md, forensics.md, ...)
    │   └── projects/           ← proyectos (.md)
    │
    ├── data/
    │   ├── site.ts             ← nombre, pie de la sidebar y NOMBRES DE CARPETAS del menú
    │   └── templates.ts        ← lista de DOCUMENT TEMPLATES (enlaces a Drive)
    │
    ├── pages/                  ← cada archivo = una URL
    │   ├── index.astro         ← ABOUT ME  (/)
    │   ├── notes/index.astro   ← listado de notas  (/notes/)
    │   ├── notes/[...id].astro ← plantilla de cada nota
    │   ├── projects/index.astro← tarjetas de proyectos  (/projects/)
    │   ├── projects/[...id].astro ← plantilla de cada proyecto
    │   ├── templates.astro     ← DOCUMENT TEMPLATES  (/templates/)
    │   └── 404.astro
    │
    ├── layouts/Base.astro      ← <head> + sidebar + topbar comunes a todo
    ├── components/             ← Sidebar, Topbar, NavItem (sustituyen a sidebar.js)
    ├── lib/                    ← lógica interna (menú, rutas, plugin de Markdown)
    └── content.config.ts       ← qué campos lleva cada nota / proyecto
```

---

## 4. Escribir una nota

Crea un `.md` dentro de `src/content/notes/`. **La carpeta decide dónde sale en el menú**
y el nombre del archivo decide la URL:

`src/content/notes/tools/recon/nmap.md` → menú *NOTES › Herramientas Ciberseguridad › Reconocimiento › Nmap* → URL `/notes/tools/recon/nmap/`

Cabecera (frontmatter) de la nota:
```markdown
---
title: "Nmap"                         # obligatorio: texto del menú y título
description: "Escaneo de puertos"     # opcional
date: 2026-10-06                      # opcional: "Última actualización"
order: 2                              # opcional: posición en el menú (menor = arriba)
tags:                                 # opcional
  - { label: recon, color: blue }     # colores: red (por defecto), blue, gold
  - pentesting
draft: true                           # opcional: true = NO se publica (sí se ve en npm run dev)
---

## Primer apartado

Texto en **Markdown** normal...
```

### Carpetas nuevas
Si creas una carpeta nueva (p.ej. `notes/cloud/`), aparece en el menú como "Cloud".
Para darle otro nombre u orden, añádela en `src/data/site.ts`:
```ts
'cloud': { label: 'Cloud Security', order: 4 },
```

---

## 5. Tu terminal y tu editor dentro del Markdown

### Terminal  → bloque ```` ```terminal ````
````markdown
```terminal tag=recon path=~/NOTES
$ nmap -sC -sV 10.10.10.10
Starting Nmap 7.94
22/tcp open ssh
```
````
- La línea que empieza por `$ ` es el comando; el resto es el output.
- Opciones: `user`, `host`, `sym`, `path`, `tag` (`pentest`, `recon`, `exploit`, `misc`).
  Por defecto: `markel㉿kali` en `~`.

### Editor con pestañas  → añade `tab="nombre"` a un bloque de código
````markdown
```c tab="punteros.c"
#include <stdio.h>

int main() {
    int *p = NULL;
    return 0;
}
```

```c tab="malloc.c"
// segunda pestaña: va pegada a la anterior
```
````
- Varios bloques con `tab="..."` **seguidos** = un único editor con varias pestañas.
- Opcionales: `icon="🐍"` y `color="#ffd43b"` para el icono de la pestaña.
- Puedes pegar el código tal cual (con `<`, `>`, `&`, líneas en blanco...).

### Bloque de código normal
Un ```` ```bash ```` sin `tab=` sale como bloque resaltado estilo VS Code.

> También puedes seguir escribiendo `<terminal-block ...>` a mano en HTML,
> pero los bloques de arriba son más seguros: en Markdown, una línea en blanco
> dentro de una etiqueta HTML rompe el bloque.

### Imágenes
Guárdalas en `public/images/` y úsalas así:
```markdown
![Captura de Burp](/images/burp-proxy.png)
```

---

## 6. Añadir un proyecto

Crea `src/content/projects/mi-proyecto.md`:
```markdown
---
title: "Mi proyecto"
description: "Texto corto que sale en la tarjeta."
order: 3                       # orden de la tarjeta (01, 02, 03...)
accent: blue                   # franja superior: red o blue
tags:
  - { label: Python, color: blue }
  - CLI
repo: https://github.com/MyNameIsMarkel/mi-proyecto   # opcional
---

## Objetivo
Explicación completa del proyecto...
```
La tarjeta aparece en **PROJECTS** y enlaza a la página con todo el contenido.

---

## 7. Document Templates

Edita `src/data/templates.ts` y pon el enlace de Drive en `url`:
```ts
{ icon: '📋', name: 'Plantilla de Informe Pentest', meta: 'Informe completo · DOCX',
  url: 'https://drive.google.com/file/d/XXXX/view?usp=sharing' },
```
En Drive, comparte cada archivo como **"Cualquier persona con el enlace" → Lector**.

> Truco: para que el enlace descargue directamente en vez de abrir la vista previa:
> `https://drive.google.com/uc?export=download&id=XXXX` (XXXX = el id del archivo).

---

## 8. Otros cambios habituales

| Quiero cambiar…                     | Dónde                                   |
|-------------------------------------|-----------------------------------------|
| Textos del SOBRE MÍ, experiencia…   | `src/data/profile.ts`                   |
| Mi foto                             | `public/images/profile.png` (ruta en `HERO.photo` de `src/data/profile.ts`) |
| Enlaces GitHub, LinkedIn, HTB, email| `LINKS` en `src/data/profile.ts`        |
| Colores                             | `public/styles/tokens.css`              |
| Enlaces fijos del menú              | array `NAV` en `src/components/Sidebar.astro` |

---

## 9. Rutina para publicar

```bash
npm run dev                          # revisa en http://localhost:4321
git add .
git commit -m "Nueva nota: Nmap"
git push                             # 1–2 minutos después está online
```

Comandos útiles:
- `npm run build` → genera la web final en `dist/` (detecta errores antes de subir).
- `npm run preview` → sirve esa versión final en local.

---

## 10. Idiomas (español / inglés)

La web está en **español por defecto** (`/`) y en **inglés** en `/en/`.
El botón **ES | EN** de la barra superior lleva a la misma página en el otro idioma.

| Qué quiero traducir                          | Dónde                                              |
|----------------------------------------------|----------------------------------------------------|
| SOBRE MÍ (bio, experiencia, formación…)      | `src/data/profile.ts`  →  `L('español', 'english')` |
| Menú, botones, títulos de página             | `src/i18n/ui.ts`                                   |
| Nombre de las carpetas de notas en el menú   | `src/data/site.ts`  →  `NOTE_FOLDERS`              |
| Plantillas                                   | `src/data/templates.ts`                            |
| Una nota                                     | copia en `src/content/notes-en/` (ver abajo)       |
| Un proyecto                                  | copia en `src/content/projects-en/`                |

### Traducir una nota o un proyecto
Crea el archivo en inglés con **la misma ruta y el mismo nombre** que el español:

```
src/content/notes/tools/recon/nmap.md       ← español (obligatorio)
src/content/notes-en/tools/recon/nmap.md    ← inglés (opcional)
```

- Si **no** existe la versión inglesa, en `/en/` se muestra la española con el aviso
  *"This note is only available in Spanish"*. Así no hace falta traducirlo todo de golpe.
- Para que el menú en inglés no salga en español mientras tanto, añade `titleEn`
  en la cabecera de la nota española:
  ```markdown
  ---
  title: "Análisis forense"
  titleEn: "Forensics"
  ---
  ```

Los textos de los componentes (`copiar cmd` / `copy cmd`, `OSCURO` / `DARK`…) cambian solos según el idioma de la página.
