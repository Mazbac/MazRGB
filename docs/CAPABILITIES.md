# Product classification and capability packs

## Product profile

- Surface: installable Windows desktop application with system-tray presence
- Primary input: keyboard and mouse
- User: individual PC owner controlling local RGB hardware
- External system: local RGB hardware provider; OpenRGB is the first provider target
- Valuable/sensitive assets: local hardware lighting state and local preferences
- Expected scale: one PC, usually tens of controllers/zones rather than server-scale workloads
- Regulatory domain: none identified
- Risk level: standard

## Activated capabilities

### `desktop-mobile` — active

Treat install/update/uninstall, single-instance behavior, window/tray lifecycle, startup/restart recovery, Windows conventions, DPI, and packaging as product behavior. Renderer code must not receive unrestricted Node access.

### Local hardware integration — active

Provider connectivity, protocol-version negotiation, discovery/rescan, unstable device lists, capability differences, permission/prerequisite failures, provider restarts, and command failures require explicit states. Provider-specific details stay behind an application adapter.

## Deferred / not applicable

Authentication, billing, cloud sync, collaboration, notifications, scheduling, AI, user-content moderation, and regulated-domain packs are not active for the MVP. Files/import-export may activate later for scene/profile portability.

## Abuse and failure check

Lighting commands are reversible but can be repeated rapidly. Coalesce or rate-limit high-frequency updates when real hardware is connected, never use stale controller IDs after a device-list update, and avoid treating a partial command failure as success for the whole selection.
