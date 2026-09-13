# Architecture

MazRGB is a Windows desktop application with a React/Mantine renderer and an Electron host.

## Baseline

- Package manager/runtime: npm on Node.js 24
- Renderer: React 19 + TypeScript + Vite 8
- Component library: Mantine 9
- Desktop shell: Electron 44
- Tests: Vitest, Playwright, and axe-core

## Process boundaries

- `electron/main.cjs` owns desktop lifecycle, tray, single-instance behavior, and future privileged provider connections.
- `electron/preload.cjs` exposes only narrow typed lighting actions to the sandboxed renderer.
- Renderer web preferences keep Node integration off, context isolation on, and sandboxing on.
- `src/platform/` contains renderer-facing desktop bridges; browser preview must remain usable without Electron.
- `src/domain/` owns provider-neutral lighting concepts such as devices and scenes.
- `src/features/` owns product workflows and must not speak vendor/OpenRGB protocol directly.

## Hardware-provider boundary

OpenRGB is the first provider target because its SDK already normalizes broad cross-brand hardware support. MazRGB must wrap it behind an application-level provider interface so protocol/device details do not leak into product UI.

The provider is responsible for connection/version negotiation, device discovery, stable identity within a synchronized list, capability reporting, color/brightness application, rescan, reconnect, and useful errors. Device-list changes invalidate stale identifiers according to the negotiated protocol behavior.

## Current implementation truth

The desktop shell and renderer interaction model are implemented. Hardware discovery/control is not: `src/domain/demoDevices.ts` supplies clearly labeled preview data. Rescan remains disabled until a real provider action exists.

## Future infrastructure

Do not add cloud services, auth, databases, analytics, or direct vendor drivers unless product requirements activate them. Packaging/updating is added after real local hardware control is reliable.
