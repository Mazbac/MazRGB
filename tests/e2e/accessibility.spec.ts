import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('lighting dashboard is usable and has no detectable accessibility violations', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Lighting' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Blackout' })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Rescan' })).toBeDisabled()

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
