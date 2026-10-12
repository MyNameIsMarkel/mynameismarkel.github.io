---
title: "USB Cactus WHID Injector GUI"
description: "Aplicación de escritorio para gestionar un Cactus WHID (ESP8266 + ESPloitV2): flasheo del firmware, monitor serie y editor de DuckyScript con resaltado de sintaxis, desde Kali Linux."
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

![Editor de DuckyScript](/images/projects/usb-cactus-whid-injector-gui/duckyscript.webp)

## Qué es

Una interfaz gráfica en español para **gestionar un Cactus WHID**, un dispositivo de
inyección de pulsaciones (**HID / BadUSB**) basado en ESP8266 con firmware **ESPloitV2**,
usado en pruebas de seguridad física y concienciación.

Es una capa de **gestión y autoría**: flasheo, monitor serie, edición de payloads y acceso
al panel web. No reimplementa el aparato; se apoya en las herramientas estándar
(`esptool`, el puerto serie y el panel web de ESPloitV2).

## Funcionalidades

- **Flashear**: elige puerto, baudios y el `.bin` de ESPloitV2 y flashea la ESP8266 con
  `esptool`. Incluye *borrar flash* y *detectar chip*.
- **Monitor serie** (38400 baud por defecto) para enviar comandos de configuración, con
  acceso rápido a `ResetDefaultConfig:`.
- **Editor de DuckyScript** con **resaltado de sintaxis**, botones para insertar comandos,
  chuleta integrada, ejemplos y guardado en `~/.whidgui/scripts`.
- **Panel web**: datos del AP y botón para abrir `http://192.168.1.1`.

![Pestaña de flasheo](/images/projects/usb-cactus-whid-injector-gui/flashear.webp)

## Flasheo automatizado

En el Cactus WHID la ESP8266 no se flashea directamente: el USB pertenece al ATmega32u4,
que primero debe cargar un *passthrough*. El script `flash_whid.sh` automatiza los cuatro
pasos con `arduino-cli`, sin abrir el IDE, y fija las versiones antiguas que necesita
ESPloitV2 (core ESP8266 2.3.0, ArduinoJson 5.11.0) para que compile.

```terminal path=~/tools/USB-Cactus-Whid-Injector-GUI
$ ./flash_whid.sh all
setup → passthrough 32u4 → compilar ESP → flashear ESP → restaurar 32u4
```

## Diseño

- **Python 3 + PyQt5**; `esptool` se invoca con `QProcess` (sin bloquear la interfaz) y el
  monitor serie corre en un `QThread` con `pyserial`.
- Resaltado de DuckyScript con `QSyntaxHighlighter`.
- **Seguro por diseño**: no incluye payloads de ataque ni los módulos de exfiltración o robo
  de credenciales de ESPloitV2; solo dos scripts de ejemplo inofensivos. La app muestra un
  aviso de uso autorizado y recuerda cambiar las credenciales por defecto del dispositivo.

> **Uso responsable:** solo en equipos propios o con autorización explícita por escrito.
