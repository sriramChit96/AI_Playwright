const { test, expect } = require('@playwright/test');

test.describe('Practice Page Tests', () => {
  test('should navigate to practice page and get title', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/practice');
    const title = await page.title();
    console.log('Page Title:', title);
    expect(title).toBeTruthy();
  });

  test('should launch google and verify title', async ({ page }) => {
    await page.goto('https://www.google.com');
    const title = await page.title();
    expect(title).toContain('Google');
  });

  test('should check page URL', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/practice');
    expect(page.url()).toContain('rahulshettyacademy.com');
  });
});
