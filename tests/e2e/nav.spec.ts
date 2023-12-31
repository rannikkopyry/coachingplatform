import { test, expect } from '@playwright/test'

test('should navigate to the pricing section', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'About Page' and click on it
  await page.click('text=Pricing')
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/#pricing')
  // The new page should contain an h1 with "About Page"
})

test('Button should have text Coming soon', async ({ page }) => {
    await page.goto('http://localhost:3000/')
})