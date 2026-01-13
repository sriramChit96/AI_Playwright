const { test, expect } = require('@playwright/test');

test.describe('Amazon Tests', () => {
  test('should search Samsung, add first product to cart and verify', async ({ page }) => {
    await page.goto('https://www.amazon.in', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    try {
      await page.waitForLoadState('domcontentloaded');
      
      const searchBox = page.locator('input[id="twotabsearchtextbox"]');
      
      await searchBox.type('Samsung');
      
      await page.waitForTimeout(1000);
      
      await searchBox.press('Enter');
      
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.locator('body').evaluate(el => el.scrollTop = 500);
      await page.waitForTimeout(1000);
      
      const firstProduct = page.locator('[data-component-type="s-search-result"]').first();
      const productName = await firstProduct.locator('h2 a span').first().textContent();
      
      console.log('First Product Name:', productName?.trim());
      
      await firstProduct.locator('h2 a').first().click();
      
      await page.waitForLoadState('domcontentloaded');
      
      const productTitle = await page.locator('h1 span').first().textContent();
      console.log('Product Title:', productTitle?.trim());
      
      const addToCartButton = page.locator('input[value="Add to Cart"]');
      await addToCartButton.click();
      
      await page.waitForTimeout(2000);
      
      await page.goto('https://www.amazon.in/gp/cart/view.html', { waitUntil: 'domcontentloaded' });
      
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const cartProductCount = await page.locator('text=/Samsung/i').count();
      
      console.log('Samsung products found in cart:', cartProductCount);
      
      expect(cartProductCount).toBeGreaterThan(0);
    } catch (error) {
      console.log('Error details:', error.message);
      const securityMessage = await page.locator('text=/Security|blocked|firewall/i').count();
      if (securityMessage > 0) {
        console.log('Amazon.in is blocked by corporate firewall/proxy');
        test.skip();
      } else {
        throw error;
      }
    }
  });
});
