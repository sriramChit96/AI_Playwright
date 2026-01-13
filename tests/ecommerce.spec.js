const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Website Tests', () => {
  test('should search for laptop and get first product details', async ({ page }) => {
    await page.goto('https://testerbud.com/practice-ecommerece-website');
    
    await page.waitForLoadState('networkidle');
    
    const searchBox = page.locator('input[placeholder*="search" i], input[type="search"], input[placeholder*="Search" i]').first();
    
    await searchBox.type('Laptop');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const firstProductName = await page.locator('img[alt*="Laptop"]').first().getAttribute('alt');
    
    const firstProductPriceText = await page.locator('text=/Price:/').first().textContent();
    
    console.log('First Product Name:', firstProductName?.trim());
    console.log('First Product Price:', firstProductPriceText?.trim());
    
    expect(firstProductName).toBeTruthy();
    expect(firstProductPriceText).toBeTruthy();
    expect(firstProductName?.toLowerCase()).toContain('laptop');
  });

  test('should display product list after search', async ({ page }) => {
    await page.goto('https://testerbud.com/practice-ecommerece-website');
    
    await page.waitForLoadState('domcontentloaded');
    
    const searchInput = page.locator('[role="searchbox"], input[placeholder*="Search"]').first();
    await searchInput.type('Laptop');
    
    await page.waitForTimeout(2000);
    
    const searchResultsHeading = await page.locator('text=/Search Results/i').count();
    console.log('Search results heading found:', searchResultsHeading > 0);
    
    expect(searchResultsHeading).toBeGreaterThan(0);
  });
});
