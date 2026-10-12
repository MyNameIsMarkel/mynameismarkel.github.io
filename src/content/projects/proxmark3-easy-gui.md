---
title: "Proxmark3 Easy GUI"
description: "Interfaz gráfica de escritorio para manejar un Proxmark3 Easy (firmware Iceman) desde Kali Linux: acciones rápidas de LF/HF, consola integrada y salida en tiempo real, sin memorizar comandos."
order: 1
accent: red
tags:
  - { label: RFID / NFC, color: gold }
  - { label: Python, color: blue }
  - PyQt5
  - Proxmark3
repo: https://github.com/MyNameIsMarkel/proxmark3-easy-GUI
---

![Interfaz de Proxmark3 Easy GUI](/images/projects/proxmark3-easy-gui/interfaz.webp)

## Qué es

Una aplicación de escritorio, ligera y en español, para trabajar con un **Proxmark3 Easy**
—la herramienta de referencia para auditar tarjetas **RFID/NFC**— con el **firmware Iceman**.

No sustituye ni modifica la instalación existente: por debajo llama al cliente oficial
`pm3`, así que **todo lo que funciona en la consola `pm3` funciona igual en la GUI**.
Es una capa visual que evita tener que memorizar la sintaxis de los comandos más habituales.

## Funcionalidades

- **Panel de conexión**: puerto (`auto` o `/dev/ttyACM0`), binario y comprobación del estado
  con un clic (indicador verde/rojo).
- **Acciones rápidas** sin escribir comandos:
  - *Hardware*: versión, estado y afinado de antenas (`hw tune`).
  - *Búsqueda*: buscar LF, buscar HF y autodetectar.
  - **LF (125 kHz)**: leer EM410x, detectar y volcar T55xx.
  - **HF (13.56 MHz)**: info ISO14443-A, MIFARE y MFU/NTAG.
- **Consola integrada** para lanzar *cualquier* comando `pm3`, con la salida en tiempo real.
- Botones para **detener** el comando en curso, **limpiar** y **guardar el log**.
- Tema oscuro, icono propio e instalador con acceso directo en el menú y el escritorio.

## Cómo funciona

```python tab="runner.py"
# La GUI no reimplementa el Proxmark: lanza el cliente oficial con QProcess
# (sin bloquear la interfaz) y limpia los códigos de color ANSI de la salida.
self.proc.start(pm3, ["-c", command])
```

- **Python 3 + PyQt5**. Cada comando se ejecuta como `pm3 -c "<comando>"` mediante
  `QProcess`, así que la interfaz no se congela y la salida llega en directo.
- Se ejecuta **un comando cada vez**, con opción de abortarlo.
- `install.sh` comprueba dependencias (PyQt5 por apt o en un *venv*), avisa si no
  encuentra `pm3` y registra el acceso directo.

## Instalación

```terminal path=~/tools
$ git clone https://github.com/MyNameIsMarkel/proxmark3-easy-GUI.git && cd proxmark3-easy-GUI && ./install.sh
```

> **Uso responsable:** solo con tarjetas, credenciales y dispositivos propios o con permiso
> explícito. Clonar o manipular credenciales ajenas (transporte, control de accesos, pago)
> puede ser ilegal.
