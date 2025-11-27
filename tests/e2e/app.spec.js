// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Application', () => {
  test('should have the correct title', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Check the title
    await expect(page).toHaveTitle(/Quasar App/);
  });
});
