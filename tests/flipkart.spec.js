const { test, expect } = require('@playwright/test');

test.describe('Flipkart Tests', () => {
  test('should search Samsung, add first product to cart and verify', async ({ page }) => {
    await page.goto('https://www.flipkart.com', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    try {
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const searchBox = page.locator('input[placeholder*="Search"]').first();
      
      await searchBox.type('Samsung');
      
      await page.waitForTimeout(1000);
      
      await searchBox.press('Enter');
      
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(1000);
      
      const firstProduct = page.locator('[data-id][data-product-id]').first();
      const productName = await firstProduct.locator('a[title], .KzDlHZ').first().textContent();
      const productPrice = await firstProduct.locator('.Nx9bqj, ._30jeq3').first().textContent();
      
      console.log('First Product Name:', productName?.trim());
      console.log('First Product Price:', productPrice?.trim());
      
      await firstProduct.locator('a').first().click();
      
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const productTitle = await page.locator('h1, .B_NuCI').first().textContent();
      console.log('Product Title:', productTitle?.trim());
      
      const closeButton = page.locator('[class*="close"], [aria-label*="close"]').first();
      if (await closeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeButton.click();
        await page.waitForTimeout(500);
      }
      
      await page.waitForSelector('button:has-text("Add to Cart"), ._2KpZ6l:has-text("Add to Cart")', { timeout: 10000 });
      const addToCartButton = page.locator('button:has-text("Add to Cart"), ._2KpZ6l:has-text("Add to Cart")').first();
      await addToCartButton.click();
      
      await page.waitForTimeout(2000);
      
      await page.goto('https://www.flipkart.com/viewcart', { waitUntil: 'domcontentloaded' });
      
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const cartProductCount = await page.locator('text=/Samsung/i').count();
      
      console.log('Samsung products found in cart:', cartProductCount);
      
      expect(cartProductCount).toBeGreaterThan(0);
    } catch (error) {
      console.log('Error details:', error.message);
      const securityMessage = await page.locator('text=/Security|blocked|firewall/i').count();
      if (securityMessage > 0) {
        console.log('Flipkart is blocked by corporate firewall/proxy');
        test.skip();
      } else {
        throw error;
      }
    }
  });
});
