# MazRGB

MazRGB is a Windows desktop application for controlling RGB lighting across brands from one focused interface.

The current product slice includes the real dashboard, scene/manual control model, Blackout/Restore behavior, and Electron tray lifecycle. Hardware devices are still preview data while the first OpenRGB provider adapter is built.

## Development

1. `npm ci`
2. `npm run doctor`
3. `npm run dev` to keep the renderer preview running at `http://localhost:5173`
4. In another terminal, `npm run desktop` to launch the Electron shell and tray against that preview

## Verification

- `npm run verify` — formatting, lint, types, UI conformance, unit tests, and production renderer build
- `npm run verify:full` — default verification plus accessibility/E2E and visual regression
- `npm run test:visual:update` — update visual baselines only after reviewing an intentional UI change

## Product direction

MazRGB uses a scene-first control model: whole-PC scenes for normal use, Blackout/Restore for fast reversible control, and multi-select manual overrides for precision. OpenRGB is the first planned hardware provider, isolated behind a provider-neutral application boundary so future integrations do not reshape the UI.

Repository truth lives in `AGENTS.md` and `docs/`. Start with `docs/STATE.md` when continuing work.
