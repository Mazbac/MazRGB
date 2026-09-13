# Product

MazRGB is a Windows desktop application for controlling RGB lighting across brands from one place.

## Goal

- Problem: PC RGB is fragmented across vendor utilities that do not share a control model, often run continuously, and are difficult to synchronize.
- Target user: a Windows PC owner with RGB hardware from multiple brands who wants one dependable control surface.
- Core successful outcome: open MazRGB (or use its tray menu), choose a look, and have every supported light follow it without opening vendor-specific apps.
- Why this product should exist: cross-brand hardware support already exists in projects such as OpenRGB; MazRGB should turn that capability into a focused, polished everyday desktop experience.

## Product profile

- Surface/distribution: installable desktop app with a normal window and system-tray presence.
- Primary environment: Windows 11 desktop; keyboard and mouse first.
- Risk level: standard. It controls local hardware and may require elevated/device-driver prerequisites, but it does not handle money, identity, or cloud data.
- Valuable/sensitive assets affected: local lighting state and local app preferences only for the MVP.

## MVP

- Discover RGB controllers through a local hardware adapter and show whether each device is controllable.
- Apply a solid color and brightness to all compatible devices at once.
- Select one or more devices and override the global look for that selection.
- Apply a small set of built-in scenes that combine color and brightness, including a one-action blackout.
- Rescan/reconnect and explain offline, unsupported, or permission/prerequisite states clearly.
- Minimize/close to tray and expose the same core scenes, blackout, and app-open action there.

## Control model

- Scene first: everyday use is one click for the whole setup.
- Selection second: device cards support multi-select for precise overrides without leaving the main screen.
- Capability-aware controls: never pretend every controller supports the same native effects; show only operations that can be applied safely to the current selection.
- Predictable fallback: blackout may be implemented as zero-output color when hardware has no native power state, while MazRGB remembers the previous scene for restore.
- One mental model: window controls and tray controls operate on the same active scene/state.

## Later / non-goals

- Direct reimplementation of every vendor USB/SMBus driver is not an MVP requirement.
- Dynamic software effects, per-LED spatial mapping, audio/game integrations, ambient-screen capture, and advanced animations come after reliable static control.
- Fan speed, pumps, LCD panels, macros, and non-lighting peripheral settings are out of scope.
- Cloud accounts, remote control over the internet, telemetry, and multi-PC sync are not required for MVP.

## Success

The first useful version succeeds when a user with more than one supported RGB device can launch MazRGB, see the devices, apply a cross-device color/brightness scene, turn everything dark, restore a scene, and perform those common actions again from the tray without opening vendor utilities.
