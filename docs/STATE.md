# Current state

Keep this file short. It is the handoff for the next AI session, not project history; Git owns history.

## Current

- Mode: product development
- Epic: hardware integration
- Feature: first useful cross-brand lighting workflow
- Blocking issue: OpenRGB hardware adapter is not implemented yet

## Working

- Windows Electron shell with close-to-tray and single-instance behavior
- React/Mantine lighting dashboard with scene-first controls
- Aurora, Focus, Ember, Blackout, and Restore actions
- Multi-select device overrides for color and brightness
- Tray commands use the same scene/action model as the main window
- Demo devices are clearly labeled preview data
- Unit, accessibility, responsive visual, type, lint, and build verification structure

## Next

1. Implement the provider-neutral lighting adapter contract and OpenRGB SDK client.
2. Replace preview devices with detected hardware and real connection/error states.
3. Wire Rescan and apply/blackout/restore actions to the provider.
4. Add Windows packaging/install/update work only after real hardware control is reliable.

## Known issues

- Hardware control is not yet connected; current device state is local sample data.
