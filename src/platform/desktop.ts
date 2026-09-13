export type TrayAction =
  | { type: 'scene'; sceneId: string }
  | { type: 'blackout' }
  | { type: 'restore' }

type MazRgbDesktopBridge = {
  onTrayAction: (listener: (action: TrayAction) => void) => () => void
}

declare global {
  interface Window {
    mazrgb?: MazRgbDesktopBridge
  }
}

export function subscribeToTrayActions(listener: (action: TrayAction) => void) {
  return window.mazrgb?.onTrayAction(listener) ?? (() => undefined)
}
