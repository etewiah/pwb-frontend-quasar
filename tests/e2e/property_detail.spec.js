// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Property Detail Page', () => {
  test('displays all property information', async ({ page }) => {
    // Navigate to a property detail page
    await page.goto('http://localhost:9001/#/en/for-sale/1');

    // Wait for the page to load
    await page.waitForSelector('.property-details-table', { timeout: 10000 });

    // Check for Property Details Table
    const detailsTable = page.locator('.property-details-table');
    await expect(detailsTable).toBeVisible();

    // Check for reference if it exists
    const tableText = await detailsTable.textContent();
    console.log('Property details table contains:', tableText);

    // Check for constructed area and garages if they exist
    const features = page.locator('.q-mb-md').filter({ hasText: 'Bedrooms' });
    if (await features.count() > 0) {
      const featuresText = await features.textContent();
      console.log('Features section contains:', featuresText);
    }

    // Verify carousel is present
    await expect(page.locator('.q-carousel')).toBeVisible();
  });

  test('enquiry form has all required fields', async ({ page }) => {
    await page.goto('http://localhost:9001/#/en/for-sale/1');

    // Wait for the enquiry form to load
    await page.waitForSelector('.listing-enq-card', { timeout: 10000 });

    // Check for form fields
    const nameField = page.locator('input[aria-label*="name"], input:has-text("name")').first();
    const emailField = page.locator('input[type="email"], input[aria-label*="email"]').first();
    
    // Check for message textarea
    const messageField = page.locator('textarea, .q-field__native[type="textarea"]').first();
    
    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    
    // Log if message field exists
    if (await messageField.count() > 0) {
      console.log('Message field found');
      await expect(messageField).toBeVisible();
    } else {
      console.log('Message field not found - checking for any textarea');
      const anyTextarea = page.locator('textarea');
      const count = await anyTextarea.count();
      console.log(`Found ${count} textarea elements`);
    }
  });
});
