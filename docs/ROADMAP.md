# Roadmap

Organize work as MVP → epics → concrete user capabilities. Keep infrastructure subordinate to user value.

## MVP

### Epic: Product definition

- [x] Define MazRGB as a Windows cross-brand RGB desktop controller
- [x] Define the first successful outcome and scene-first control model
- [x] Classify lifecycle, risk, and relevant capability areas

### Epic: Desktop foundation

- [x] Establish the MazRGB application shell and visual system
- [x] Add close-to-tray and single-instance desktop lifecycle
- [x] Share scene/blackout/restore commands between tray and renderer
- [x] Establish provider-neutral device and scene domain models

### Epic: Hardware integration

- [ ] Define the lighting-provider adapter contract
- [ ] Connect to the local OpenRGB SDK server and negotiate supported protocol
- [ ] Discover controllers and normalize devices/zones/capabilities
- [ ] Implement rescan/reconnect and useful prerequisite/error states
- [ ] Apply solid color and brightness to all or selected compatible devices
- [ ] Implement reliable blackout and restore against real hardware

### Epic: First releasable Windows build

- [ ] Persist appropriate user preferences and last useful scene
- [ ] Verify startup, tray, reconnect, unsupported-device, and restart recovery behavior
- [ ] Add Windows packaging, app icon, install/uninstall, and release workflow
- [ ] Verify the MVP on representative multi-brand hardware

## Later

Dynamic effects, per-LED spatial mapping, screen/audio/game integrations, user-created scenes, automation, remote control, and direct vendor adapters remain post-MVP unless real hardware testing proves one is required.
