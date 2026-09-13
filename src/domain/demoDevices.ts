import { DEFAULT_LOOK, type LightingDevice } from './lighting'

export const demoDevices: LightingDevice[] = [
  {
    id: 'board',
    name: 'ROG Strix Z790-E',
    vendor: 'ASUS',
    kind: 'motherboard',
    zones: 3,
    online: true,
    ...DEFAULT_LOOK,
  },
  {
    id: 'memory',
    name: 'Vengeance RGB DDR5',
    vendor: 'Corsair',
    kind: 'memory',
    zones: 2,
    online: true,
    ...DEFAULT_LOOK,
  },
  {
    id: 'cooler',
    name: 'UNI FAN Controller',
    vendor: 'Lian Li',
    kind: 'cooler',
    zones: 4,
    online: true,
    ...DEFAULT_LOOK,
  },
]
