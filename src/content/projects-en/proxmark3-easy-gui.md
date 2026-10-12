---
title: "Proxmark3 Easy GUI"
description: "Desktop GUI to drive a Proxmark3 Easy (Iceman firmware) from Kali Linux: one-click LF/HF actions, a built-in console and real-time output, with no commands to memorise."
order: 1
accent: red
tags:
  - { label: RFID / NFC, color: gold }
  - { label: Python, color: blue }
  - PyQt5
  - Proxmark3
repo: https://github.com/MyNameIsMarkel/proxmark3-easy-GUI
---

![Proxmark3 Easy GUI interface](/images/projects/proxmark3-easy-gui/interfaz.webp)

## What it is

A lightweight desktop application for working with a **Proxmark3 Easy**, the reference tool
for auditing **RFID/NFC** cards, running the **Iceman firmware**.

It does not replace or modify the existing installation: under the hood it calls the official
`pm3` client, so **anything that works in the `pm3` console works exactly the same in the GUI**.
It is a visual layer that removes the need to memorise the syntax of the most common commands.

## Features

- **Connection panel**: port (`auto` or `/dev/ttyACM0`), binary and one-click status check
  (green/red indicator).
- **Quick actions** without typing commands:
  - *Hardware*: version, status and antenna tuning (`hw tune`).
  - *Search*: LF search, HF search and auto-detect.
  - **LF (125 kHz)**: read EM410x, detect and dump T55xx.
  - **HF (13.56 MHz)**: ISO14443-A, MIFARE and MFU/NTAG info.
- **Built-in console** to run *any* `pm3` command, with real-time output.
- Buttons to **stop** the running command, **clear** and **save the log**.
- Dark theme, custom icon and an installer that adds menu and desktop shortcuts.

## How it works

```python tab="runner.py"
# The GUI does not reimplement the Proxmark: it launches the official client
# with QProcess (without blocking the UI) and strips ANSI colour codes.
self.proc.start(pm3, ["-c", command])
```

- **Python 3 + PyQt5**. Each command runs as `pm3 -c "<command>"` through `QProcess`,
  so the UI never freezes and output streams in live.
- **One command at a time**, with the option to abort it.
- `install.sh` checks dependencies (PyQt5 via apt or in a *venv*), warns if `pm3` is
  missing and registers the shortcut.

## Installation

```terminal path=~/tools
$ git clone https://github.com/MyNameIsMarkel/proxmark3-easy-GUI.git && cd proxmark3-easy-GUI && ./install.sh
```

> **Responsible use:** only with cards, credentials and devices you own or are explicitly
> authorised to test. Cloning or tampering with other people's credentials (transport,
> access control, payment) may be illegal.
