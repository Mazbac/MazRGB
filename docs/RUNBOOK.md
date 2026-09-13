# Runbook

## Local start

1. `npm ci` after a fresh clone.
2. `npm run doctor` to confirm the supported runtime and project files.
3. Keep `npm run dev` running for the renderer preview at `http://localhost:5173`.
4. Run `npm run desktop` in a second terminal to exercise the Electron window/tray lifecycle.

The desktop development command expects the Vite server to already be running. A production renderer build is created with `npm run build`; Windows packaging is not implemented yet.

## Verification

- `npm run verify` — formatting, lint, types, UI conformance, unit tests, and production renderer build.
- `npm run verify:full` — adds browser accessibility/E2E and reviewed visual regression.
- `npm run test:visual:update` — only after confirming a visual change is intentional.
- Exercise `npm run desktop` when Electron lifecycle/tray code changes; absence of an immediate process exit or runtime error is a smoke check, not a substitute for future packaged-app tests.

## Hardware-development rules

Real provider work must fail safely when OpenRGB is absent or unreachable. Keep preview/demo mode visibly separate from detected hardware, never use stale device identifiers after provider list changes, and do not make global machine/driver changes simply to get a development check green.

## Failure protocol

Preserve local/user work, reproduce the failure, identify blast radius, and choose the smallest reversible fix. Never loosen tests, regenerate visual baselines blindly, or reset Git merely to hide a failure.

## Release/operations

Windows packaging, signing, update/rollback, installer/uninstaller behavior, and representative hardware validation are required before calling an MVP build releasable. They are intentionally deferred until real hardware control is reliable.
