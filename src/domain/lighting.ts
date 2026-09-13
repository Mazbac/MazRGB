export type DeviceKind =
  'motherboard' | 'memory' | 'cooler' | 'gpu' | 'peripheral'

export type LightingLook = {
  color: string
  brightness: number
}

export type LightingDevice = LightingLook & {
  id: string
  name: string
  vendor: string
  kind: DeviceKind
  zones: number
  online: boolean
}

export type LightingScene = LightingLook & {
  id: string
  name: string
  description: string
}

// These colors are hardware output values, not UI design tokens.
export const DEFAULT_LOOK: LightingLook = { color: '#7950f2', brightness: 82 }
export const BLACKOUT_LOOK: LightingLook = { color: '#000000', brightness: 0 }

export const scenes: LightingScene[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Cool violet at full presence',
    color: DEFAULT_LOOK.color,
    brightness: DEFAULT_LOOK.brightness,
  },
  {
    id: 'focus',
    name: 'Focus',
    description: 'Clean soft white for work',
    color: '#e7f5ff',
    brightness: 58,
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Warm orange for evenings',
    color: '#f76707',
    brightness: 68,
  },
]
