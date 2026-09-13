import { expect, test } from '@playwright/test'

test('desktop lighting dashboard remains stable', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Lighting' })).toBeVisible()
  await expect(page).toHaveScreenshot('lighting-dashboard-desktop.png', {
    fullPage: true,
  })
})

test('mobile lighting dashboard remains stable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Lighting' })).toBeVisible()
  await expect(page).toHaveScreenshot('lighting-dashboard-mobile.png', {
    fullPage: true,
  })
})
