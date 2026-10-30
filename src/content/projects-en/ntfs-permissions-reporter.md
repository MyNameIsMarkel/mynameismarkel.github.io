---
title: "NTFS Permissions Reporter"
description: "Windows NTFS and share permissions auditing tool: full ACL report, a user's real effective access, combinable filters and export to Excel, CSV, HTML, JSON and XML. A single .exe, no installation."
order: 3
accent: red
tags:
  - { label: GRC / Auditing, color: gold }
  - { label: C#, color: blue }
  - .NET
  - Windows
  - Active Directory
repo: https://github.com/MyNameIsMarkel/NTFS_Permissions_Reporter
---

## What it is

A tool to **audit NTFS and share permissions** on Windows file servers. It answers two
questions that come up in every security or compliance audit: *who has access to what?*
and *what can this user actually do?*

It is a single `.exe`, with no installation, free and open source. It can be
[downloaded from Releases](https://github.com/MyNameIsMarkel/NTFS_Permissions_Reporter/releases/latest).

## Features

- **Permissions report**: walks the selected folders and lists every ACL entry: account,
  permission, allow/deny, what it applies to, whether it is inherited, owner…
- **A user's effective access**: computes the *real* access on each folder, taking into account
  all of the user's groups (including nested ones), deny entries, the server's local groups
  and the share permissions.
- **Flexible input**: local or UNC paths (`\\server\share`), picking shares from a server,
  importing from a `.txt` file and drag and drop.
- **Two views**: a sortable table with configurable columns, or a folder tree that flags
  explicit permissions, disabled inheritance and errors.
- **Combinable filters** (*field · operator · value*, with AND/OR) across 20+ fields:
  unresolved SID, empty group, disabled account, permissions identical to the parent…
- **Export** to Excel, CSV, tab-separated text, searchable HTML, JSON and XML.

## Performance

Built for real file servers with millions of folders:

- **Parallel** traversal (32 threads by default, configurable) to hide network latency.
- `FindFirstFileEx` with *LargeFetch* and no 8.3 names; only the owner and DACL are read.
- ACLs are evaluated **directly on the bytes** of the security descriptor.
- Account cache, and the user's groups are computed by the domain controller with
  `tokenGroups` in a single query.
- Virtual tables (millions of rows) and support for paths longer than 260 characters.
- When run as administrator it enables the **backup privilege** (like `robocopy /B`), so it can
  read even folders the administrator has no access to.

## Technical design

- **C# / WinForms on .NET Framework 4.5**, with no external dependencies: it builds with the
  `csc.exe` that ships with Windows (`build.bat`), no Visual Studio needed.
- Native access through **P/Invoke** to the file, security and NetAPI functions.
- **CI with GitHub Actions**: every push to `main` builds the executable on Windows and
  publishes it to *Releases* based on `AssemblyVersion`.

```text tab="structure"
src/
  Native.cs        P/Invoke (files, security, NetAPI)
  Security.cs      paths, security descriptors, permission strings
  Accounts.cs      account resolution (AD and local), shares, effective access
  Model.cs         report model, fields, parallel traversal
  Filters.cs       filter rules
  Export.cs        exporters (xlsx, csv, txt, html, json, xml)
  MainForm*.cs     main window (report, tree, effective access)
```

> Requirements: Windows 10/11 or Windows Server 2012 R2+, with .NET Framework 4.5 or later
> (included in Windows).
