# UI and interaction contract

MazRGB is a focused Windows utility, not an RGB configuration laboratory. The common path must stay faster than vendor utilities.

## Product structure

- `Lighting` is the primary and currently only navigation destination.
- Scenes are the first control surface: one action applies a coherent look to every connected compatible device.
- Manual control is secondary and targets the current multi-selection.
- Device cards communicate selection, readiness, vendor, zone count, current color, and brightness without opening another screen.
- Blackout is a reversible primary action; after blackout the same action becomes Restore.
- Window and tray commands use the same scene names and lighting-state semantics.

## Visual system

- Default to the shared dark Mantine theme with violet as the product accent.
- Use semantic Mantine tokens and shared primitives before custom CSS/raw values.
- Color swatches are previews, never the only indication of device or action state.
- Controls must retain WCAG 2.2 AA contrast and visible keyboard focus.
- Desktop density should feel utility-like: compact enough for quick scanning without shrinking targets or labels.

## State contract

- Preview/sample hardware must be visibly identified and never presented as detected hardware.
- Provider connection, discovery, reconnecting, empty, partial support, offline, permission/prerequisite, and command-error states become required when the real provider is connected.
- Rescan is disabled until it performs a real provider action; do not ship decorative controls.
- Selection-dependent actions are disabled when no compatible device is selected.
- A partial device failure must identify affected devices while preserving successful device state.

## Responsive/platform behavior

- The supported product is Windows desktop; narrow layouts are stress-tested to prevent breakage, not a promise of a mobile product.
- Closing the desktop window hides it to tray; Quit is explicit.
- Do not use browser navigation metaphors when a direct desktop action is clearer.
- Keyboard operation, screen-reader names, reduced motion, zoom/reflow, and non-color status cues remain required.

## Anti-drift

The actual application and reviewed Playwright snapshots are the visual source of truth. Shared token changes require accessibility and representative visual checks; never update baselines merely to silence failures.
