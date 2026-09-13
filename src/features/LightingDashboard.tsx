import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  ColorInput,
  Group,
  Paper,
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from '@mantine/core'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { demoDevices } from '../domain/demoDevices'
import {
  BLACKOUT_LOOK,
  DEFAULT_LOOK,
  scenes,
  type LightingScene,
} from '../domain/lighting'
import { subscribeToTrayActions } from '../platform/desktop'

export function LightingDashboard() {
  const [devices, setDevices] = useState(demoDevices)
  const [selectedIds, setSelectedIds] = useState(
    () =>
      new Set(
        demoDevices
          .filter((device) => device.online)
          .map((device) => device.id),
      ),
  )
  const [manualColor, setManualColor] = useState(DEFAULT_LOOK.color)
  const [manualBrightness, setManualBrightness] = useState(
    DEFAULT_LOOK.brightness,
  )
  const lastNonBlackout = useRef(DEFAULT_LOOK)

  const selectedCount = selectedIds.size
  const onlineDevices = devices.filter((device) => device.online)
  const onlineCount = onlineDevices.length
  const isBlackout =
    onlineCount > 0 && onlineDevices.every((device) => device.brightness === 0)

  const selectionLabel = useMemo(() => {
    if (selectedCount === onlineCount)
      return `All ${onlineCount} connected devices`
    if (selectedCount === 1) return '1 device selected'
    return `${selectedCount} devices selected`
  }, [onlineCount, selectedCount])

  const applyGlobalLook = useCallback((color: string, brightness: number) => {
    setDevices((current) =>
      current.map((device) =>
        device.online ? { ...device, color, brightness } : device,
      ),
    )
    if (brightness > 0) lastNonBlackout.current = { color, brightness }
  }, [])
  const applyScene = useCallback(
    (scene: LightingScene) => {
      setManualColor(scene.color)
      setManualBrightness(scene.brightness)
      applyGlobalLook(scene.color, scene.brightness)
    },
    [applyGlobalLook],
  )

  const blackoutAll = useCallback(() => {
    setDevices((current) =>
      current.map((device) =>
        device.online ? { ...device, ...BLACKOUT_LOOK } : device,
      ),
    )
  }, [])

  const restoreAll = useCallback(() => {
    const look = lastNonBlackout.current
    setManualColor(look.color)
    setManualBrightness(look.brightness)
    applyGlobalLook(look.color, look.brightness)
  }, [applyGlobalLook])

  const applySelection = () => {
    setDevices((current) =>
      current.map((device) =>
        device.online && selectedIds.has(device.id)
          ? { ...device, color: manualColor, brightness: manualBrightness }
          : device,
      ),
    )

    if (selectedCount === onlineCount && manualBrightness > 0) {
      lastNonBlackout.current = {
        color: manualColor,
        brightness: manualBrightness,
      }
    }
  }

  const toggleDevice = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  useEffect(
    () =>
      subscribeToTrayActions((action) => {
        if (action.type === 'blackout') blackoutAll()
        if (action.type === 'restore') restoreAll()
        if (action.type === 'scene') {
          const scene = scenes.find(
            (candidate) => candidate.id === action.sceneId,
          )
          if (scene) applyScene(scene)
        }
      }),
    [applyScene, blackoutAll, restoreAll],
  )

  return (
    <Stack gap="xl" maw="84rem">
      <PageHeader
        title="Lighting"
        description="One control surface for every supported light in your PC."
        actions={
          <Group>
            <Button variant="default" disabled>
              Rescan
            </Button>
            <Button
              variant="filled"
              onClick={isBlackout ? restoreAll : blackoutAll}
            >
              {isBlackout ? 'Restore' : 'Blackout'}
            </Button>
          </Group>
        }
      />

      <Paper withBorder p="md">
        <Group justify="space-between" align="center" wrap="wrap">
          <Stack gap={2}>
            <Group gap="xs">
              <Badge color="violet">Preview data</Badge>
              <Text fw={600}>OpenRGB provider not connected yet</Text>
            </Group>
            <Text c="dimmed" size="sm">
              The controls below are the real product model using local sample
              devices.
            </Text>
          </Stack>
          <Text size="sm" c="dimmed">
            {onlineCount} devices ready
          </Text>
        </Group>
      </Paper>

      <Section
        title="Scenes"
        description="Apply one look to every connected device."
      >
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          {scenes.map((scene) => (
            <Card key={scene.id} withBorder padding="md">
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <Stack gap={2}>
                    <Text fw={600}>{scene.name}</Text>
                    <Text size="sm" c="dimmed">
                      {scene.description}
                    </Text>
                  </Stack>
                  <Box w={28} h={28} bg={scene.color} />
                </Group>
                <Button variant="light" onClick={() => applyScene(scene)}>
                  Apply scene
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Section>

      <Section title="Manual control" description={selectionLabel}>
        <Paper withBorder p="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <ColorInput
              label="Color"
              value={manualColor}
              onChange={setManualColor}
              format="hex"
              swatches={scenes.map((scene) => scene.color)}
              eyeDropperButtonProps={{ 'aria-label': 'Pick color from screen' }}
            />
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm" fw={500}>
                  Brightness
                </Text>
                <Text size="sm" c="dimmed">
                  {manualBrightness}%
                </Text>
              </Group>
              <Slider
                thumbLabel="Brightness"
                value={manualBrightness}
                onChange={setManualBrightness}
              />
            </Stack>
          </SimpleGrid>
          <Group justify="flex-end" mt="lg">
            <Button disabled={selectedCount === 0} onClick={applySelection}>
              Apply to selection
            </Button>
          </Group>
        </Paper>
      </Section>

      <Section
        title="Devices"
        description="Select devices to target with manual controls."
      >
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {devices.map((device) => (
            <Card key={device.id} withBorder padding="md">
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <Checkbox
                    checked={selectedIds.has(device.id)}
                    disabled={!device.online}
                    onChange={(event) =>
                      toggleDevice(device.id, event.currentTarget.checked)
                    }
                    label={device.name}
                  />
                  <Badge color={device.online ? 'green' : 'gray'}>
                    {device.online ? 'Ready' : 'Offline'}
                  </Badge>
                </Group>
                <Stack gap={6}>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      {device.vendor}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {device.zones} zones
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <Box w={16} h={16} bg={device.color} />
                    <Text size="sm">
                      {device.brightness === 0
                        ? 'Blackout'
                        : `${device.brightness}% brightness`}
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Section>
    </Stack>
  )
}
