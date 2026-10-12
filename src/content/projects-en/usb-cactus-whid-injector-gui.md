---
title: "USB Cactus WHID Injector GUI"
description: "Desktop application to manage a Cactus WHID (ESP8266 + ESPloitV2): firmware flashing, serial monitor and a DuckyScript editor with syntax highlighting, from Kali Linux."
order: 2
accent: blue
tags:
  - { label: BadUSB / HID, color: gold }
  - { label: Python, color: blue }
  - PyQt5
  - ESP8266
  - Bash
repo: https://github.com/MyNameIsMarkel/USB-Cactus-Whid-Injector-GUI
---

![DuckyScript editor](/images/projects/usb-cactus-whid-injector-gui/duckyscript.webp)

## What it is

A graphical interface to **manage a Cactus WHID**, a keystroke-injection (**HID / BadUSB**)
device based on the ESP8266 running the **ESPloitV2** firmware, used in physical security
testing and awareness training.

It is a **management and authoring** layer: flashing, serial monitor, payload editing and
access to the web panel. It does not reimplement the device; it relies on the standard tools
(`esptool`, the serial port and the ESPloitV2 web panel).

## Features

- **Flash**: pick the port, baud rate and ESPloitV2 `.bin` and flash the ESP8266 with
  `esptool`. Includes *erase flash* and *detect chip*.
- **Serial monitor** (38400 baud by default) to send configuration commands, with a quick
  `ResetDefaultConfig:` button.
- **DuckyScript editor** with **syntax highlighting**, insert buttons, a built-in cheat sheet,
  examples and saving to `~/.whidgui/scripts`.
- **Web panel**: AP details and a button to open `http://192.168.1.1`.

![Flashing tab](/images/projects/usb-cactus-whid-injector-gui/flashear.webp)

## Automated flashing

On the Cactus WHID the ESP8266 cannot be flashed directly: USB belongs to the ATmega32u4,
which must first load a *passthrough* sketch. The `flash_whid.sh` script automates the four
steps with `arduino-cli`, without opening the IDE, and pins the old versions ESPloitV2
needs (ESP8266 core 2.3.0, ArduinoJson 5.11.0) so it compiles.

```terminal path=~/tools/USB-Cactus-Whid-Injector-GUI
$ ./flash_whid.sh all
setup → 32u4 passthrough → build ESP → flash ESP → restore 32u4
```

## Design

- **Python 3 + PyQt5**; `esptool` is invoked through `QProcess` (non-blocking UI) and the
  serial monitor runs in a `QThread` with `pyserial`.
- DuckyScript highlighting with `QSyntaxHighlighter`.
- **Safe by design**: it ships no attack payloads and none of ESPloitV2's exfiltration or
  credential-harvesting modules, only two harmless example scripts. The app shows an
  authorised-use warning and reminds you to change the device's default credentials.

> **Responsible use:** only on systems you own or with explicit written authorisation.
