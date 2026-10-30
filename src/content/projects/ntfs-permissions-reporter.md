---
title: "NTFS Permissions Reporter"
description: "Herramienta de auditoría de permisos NTFS y de recursos compartidos en Windows: informe completo de ACL, acceso efectivo real de un usuario, filtros combinables y exportación a Excel, CSV, HTML, JSON y XML. Un único .exe sin instalación."
order: 3
accent: red
tags:
  - { label: GRC / Auditoría, color: gold }
  - { label: C#, color: blue }
  - .NET
  - Windows
  - Active Directory
repo: https://github.com/MyNameIsMarkel/NTFS_Permissions_Reporter
---

## Qué es

Una herramienta para **auditar permisos NTFS y de recursos compartidos** en servidores de
ficheros Windows. Responde a dos preguntas habituales en una auditoría de seguridad o de
cumplimiento: *¿quién tiene acceso a qué?* y *¿qué puede hacer realmente este usuario?*

Es un único `.exe`, sin instalación, gratuito y de código abierto. Se puede
[descargar desde Releases](https://github.com/MyNameIsMarkel/NTFS_Permissions_Reporter/releases/latest).

## Funcionalidades

- **Informe de permisos**: recorre las carpetas indicadas y lista cada entrada de la ACL:
  cuenta, permiso, permitir/denegar, a qué se aplica, si es heredado, propietario…
- **Acceso efectivo de un usuario**: calcula el acceso *real* en cada carpeta teniendo en
  cuenta todos sus grupos (también anidados), las denegaciones, los grupos locales del
  servidor y los permisos del recurso compartido.
- **Entrada flexible**: rutas locales o UNC (`\\servidor\recurso`), selección de shares de un
  servidor, importación desde `.txt` y arrastrar y soltar.
- **Dos vistas**: tabla ordenable con columnas configurables, o árbol de carpetas que marca
  permisos explícitos, herencia deshabilitada y errores.
- **Filtros combinables** (*campo · operador · valor*, con Y/O) sobre más de 20 campos:
  SID sin resolver, grupo sin miembros, cuenta deshabilitada, permisos idénticos al padre…
- **Exportación** a Excel, CSV, texto tabulado, HTML con buscador, JSON y XML.

## Rendimiento

Pensada para servidores reales con millones de carpetas:

- Recorrido **en paralelo** (32 hilos por defecto, configurable) para ocultar la latencia de red.
- `FindFirstFileEx` con *LargeFetch* y sin nombres 8.3; solo lee propietario y DACL.
- Evalúa las ACL **directamente sobre los bytes** del descriptor de seguridad.
- Caché de cuentas y grupos del usuario calculados por el controlador de dominio con
  `tokenGroups` en una sola consulta.
- Tablas virtuales (millones de filas) y soporte de rutas de más de 260 caracteres.
- Ejecutada como administrador activa el **privilegio de copia de seguridad** (como
  `robocopy /B`), así que puede leer incluso carpetas sin acceso para el administrador.

## Diseño técnico

- **C# / WinForms sobre .NET Framework 4.5**, sin dependencias externas: compila con el
  `csc.exe` incluido en Windows (`build.bat`), sin Visual Studio.
- Acceso nativo mediante **P/Invoke** a las APIs de ficheros, seguridad y NetAPI.
- **CI con GitHub Actions**: cada push a `main` compila el ejecutable en Windows y lo publica
  en *Releases* según la versión de `AssemblyVersion`.

```text tab="estructura"
src/
  Native.cs        P/Invoke (ficheros, seguridad, NetAPI)
  Security.cs      rutas, descriptores de seguridad, textos de permisos
  Accounts.cs      resolución de cuentas (AD y locales), shares, acceso efectivo
  Model.cs         modelo del informe, campos, recorrido paralelo
  Filters.cs       reglas de filtro
  Export.cs        exportadores (xlsx, csv, txt, html, json, xml)
  MainForm*.cs     ventana principal (informe, árbol, acceso efectivo)
```

> Requisitos: Windows 10/11 o Windows Server 2012 R2+, con .NET Framework 4.5 o superior
> (incluido en Windows).
