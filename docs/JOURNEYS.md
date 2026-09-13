# User lifecycle

MazRGB should get from launch to useful lighting control with minimal ceremony.

## Primary journey

1. User installs and opens MazRGB on Windows.
2. MazRGB checks the local lighting provider and begins device discovery automatically.
3. The main screen shows detected controllable devices plus any clear unsupported/offline state.
4. User applies a built-in scene to the whole setup, or selects devices for a manual color/brightness override.
5. User can Blackout and later Restore without rebuilding the previous look.
6. Closing the window keeps MazRGB available in the system tray; tray commands operate on the same active lighting state.
7. Reopening the app returns to the current device/lighting state rather than onboarding again.

## Setup and recovery

- Do not show ceremonial onboarding; explain prerequisites only when the provider is missing, unreachable, or lacks permission.
- Rescan/reconnect must be safe to repeat and must not discard the user's intended scene.
- Device-list changes must stop using stale device identifiers before applying further commands.
- Partial hardware support must identify which devices/actions are unavailable instead of failing the whole setup.
- If a provider disconnects, show stale/offline state and recover automatically when possible.

## Desktop lifecycle

- One MazRGB instance owns the tray and lighting session.
- Window close hides to tray; explicit Quit ends the application.
- Startup-at-login is a later preference, not an MVP assumption.
- Uninstall should remove app-owned files while leaving third-party provider configuration alone.

## Not applicable for MVP

Accounts, cloud data, sign-in/out, billing, collaborative state, and internet-dependent recovery are not part of the current product.
