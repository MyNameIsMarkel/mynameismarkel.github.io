---
title: "Nmap"
description: "Port, service and NSE script scanning"
order: 2
date: 2026-10-07
tags:
  - { label: recon, color: blue }
  - pentesting
---

Example note in English. It lives in `src/content/notes-en/` with **the same
path and file name** as the Spanish one, so the ES | EN switch jumps between them.

## Basic scan

Plain text with **bold**, `inline code` and [links](https://nmap.org/book/man.html).

- List with the red arrow
- Second item

> Quotes use the gold style of your notes.

## Terminal

```terminal tag=recon path=~/NOTES
$ nmap -sC -sV -p- 10.10.10.10
Starting Nmap 7.94

22/tcp open  ssh     OpenSSH 8.9p1
80/tcp open  http    Apache httpd 2.4.52
```

## Tabbed editor

```python tab="scan.py"
import nmap

scanner = nmap.PortScanner()
scanner.scan("10.10.10.10", "22-443")

for host in scanner.all_hosts():
    print(host, scanner[host].state())
```

```bash tab="scan.sh"
#!/bin/bash
# quick scan of the top 1000 ports
nmap -T4 -F "$1"
```

| Flag  | What it does             |
|-------|--------------------------|
| `-sC` | Default NSE scripts      |
| `-sV` | Service version          |
| `-p-` | All 65535 ports          |
