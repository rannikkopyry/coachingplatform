import { test, expect } from '@playwright/test'

test('form works and correct success message shows up', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'About Page' and click on it
  await page.click('input')
  // The new URL should be "/about" (baseURL is used there)
})
