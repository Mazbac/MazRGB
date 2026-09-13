import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { theme } from './theme/theme'

function renderApp() {
  return render(
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>,
  )
}

describe('MazRGB lighting dashboard', () => {
  it('applies scenes and supports blackout/restore', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(screen.getByRole('heading', { name: 'Lighting' })).toBeVisible()
    await user.click(screen.getAllByRole('button', { name: 'Apply scene' })[1])
    expect(screen.getAllByText('58% brightness')).toHaveLength(3)

    await user.click(screen.getByRole('button', { name: 'Blackout' }))
    expect(screen.getAllByText('Blackout')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: 'Restore' }))
    expect(screen.getAllByText('58% brightness')).toHaveLength(3)
  })
})
