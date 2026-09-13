# Durable decisions

Record only decisions a future agent might otherwise undo. Git history is not repeated here.

## 2026-09-11 — D001: Repository is project memory

Chat history is disposable. Product truth, current state, durable decisions, and working rules must live in the repository.

## 2026-09-11 — D002: Speed through constraints

Optimize for fastest path to a professional releasable product: reuse defaults, build vertical slices, automate verification, and avoid speculative infrastructure or corporate ceremony.

## 2026-09-11 — D003: Mantine is the default React component system

Use Mantine and shared product primitives before custom controls. A project may choose another library only for a concrete product/platform reason.

## 2026-09-11 — D004: Standards-led UI

Accessibility follows current WCAG guidance; platform-specific behavior follows current platform guidance; common UX uses mature design-system patterns. AI aesthetic preference is the final fallback, not the source of truth.

## 2026-09-11 — D005: Evolution must be system-wide

Intentional design-system changes update shared primitives/tokens and reviewed baselines. Local exceptions are not an acceptable substitute for coherent evolution.

## 2026-09-13 — D006: Windows desktop via Electron

MazRGB targets Windows first and uses Electron around the existing React/Mantine renderer. Privileged capabilities stay outside the renderer behind a narrow preload bridge.

## 2026-09-13 — D007: OpenRGB is the first hardware provider, not the product architecture

Use the OpenRGB SDK as the first path to broad cross-brand RGB support, but keep all provider-specific protocol and device details behind a MazRGB lighting-provider adapter. This preserves the option to add or replace providers without rewriting product workflows.

## 2026-09-13 — D008: Scene-first control model

Everyday control is whole-setup scenes plus Blackout/Restore; multi-select device overrides provide precision when needed. Window and tray actions share the same lighting-state semantics. Advanced dynamic effects remain later work until reliable static cross-brand control exists.

## Adding decisions

Use: date, stable ID, decision, and short reason. Add only when the choice is durable enough to affect future work.
