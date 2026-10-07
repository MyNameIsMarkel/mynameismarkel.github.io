---
title: "Nmap"
titleEn: "Nmap"   # título en el menú inglés mientras no haya traducción
description: "Escaneo de puertos, servicios y scripts NSE"
order: 2
date: 2026-10-06
tags:
  - { label: recon, color: blue }
  - pentesting
---

Nota de ejemplo: muestra todo lo que puedes usar dentro de un `.md`.
Bórrala o reescríbela con tu contenido real.

## Escaneo básico

Texto normal con **negrita**, `código en línea` y [enlaces](https://nmap.org/book/man.html).

- Lista con la flecha roja
- Segundo elemento

> Las citas salen con el estilo dorado de tus notas.

## Terminal

Un bloque ```` ```terminal ```` se convierte en tu componente de terminal.
La línea que empieza por `$ ` es el comando; lo demás es el output.

```terminal tag=recon path=~/NOTES
$ nmap -sC -sV -p- 10.10.10.10
Starting Nmap 7.94

22/tcp open  ssh     OpenSSH 8.9p1
80/tcp open  http    Apache httpd 2.4.52
```

## Editor con pestañas

Añade `tab="nombre"` a un bloque de código. Si pones varios seguidos,
se juntan en un único editor con varias pestañas.

```python tab="scan.py"
import nmap

scanner = nmap.PortScanner()
scanner.scan("10.10.10.10", "22-443")

for host in scanner.all_hosts():
    print(host, scanner[host].state())
```

```bash tab="scan.sh"
#!/bin/bash
# escaneo rápido de los 1000 puertos principales
nmap -T4 -F "$1"
```

## Bloque de código Markdown normal

```bash
# Detección de SO y versión
sudo nmap -O -sV 192.168.1.0/24
```

| Flag  | Para qué sirve              |
|-------|-----------------------------|
| `-sC` | Scripts NSE por defecto     |
| `-sV` | Versión de los servicios    |
| `-p-` | Los 65535 puertos           |
