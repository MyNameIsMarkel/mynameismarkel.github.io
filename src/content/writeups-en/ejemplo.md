---
# ─────────────────────────────────────────────────────────────
#  ENGLISH VERSION (optional) — same file name as the Spanish one,
#  e.g. src/content/writeups-en/lame.md
# ─────────────────────────────────────────────────────────────
title: "Ejemplo"                         # nombre de la máquina
description: "Anonymous SMB → reused credentials → misconfigured sudo"
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

## Summary

Short description of the exploitation chain: how you got in and how you escalated.

## Reconnaissance

```terminal tag=recon path=~/htb/example
$ nmap -sC -sV -p- --min-rate 5000 10.10.10.10
22/tcp  open  ssh          OpenSSH 8.2p1
445/tcp open  microsoft-ds Samba smbd 4.6.2
```

## Initial access

```terminal tag=exploit path=~/htb/example
$ smbclient -N //10.10.10.10/backups
smb: \> get config.bak
```

> The credentials in the backup were reused for SSH.

## Privilege escalation

```terminal tag=pentest path=~/htb/example
$ sudo -l
(root) NOPASSWD: /usr/bin/find
```

## Lessons learned

- What you learned.
- How it would be mitigated in a real environment.
