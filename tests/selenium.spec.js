const { test, expect } = require('@playwright/test');

test.describe('Selenium Downloads Tests', () => {
  test('should find Selenium Grid and get the latest version', async ({ page }) => {
    await page.goto('https://www.selenium.dev/downloads/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1000);
    
    const gridSection = page.locator('text=/Selenium Grid/i');
    await gridSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const gridContainer = page.locator('div:has-text("Selenium Grid")').first();
    
    const versionText = await gridContainer.locator('text=/[0-9]+\\.[0-9]+\\.[0-9]+/').first().textContent();
    
    console.log('Selenium Grid Version:', versionText?.trim());
    
    const downloadLink = await gridContainer.locator('a, button').first().getAttribute('href');
    console.log('Download Link:', downloadLink);
    
    const gridFullText = await gridContainer.textContent();
    console.log('Grid Section Text:', gridFullText?.trim());
    
    expect(versionText || gridFullText).toBeTruthy();
  });

  test('should display all download options on the page', async ({ page }) => {
    await page.goto('https://www.selenium.dev/downloads/', { waitUntil: 'domcontentloaded' });
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const sections = await page.locator('h2, h3').allTextContents();
    
    console.log('Available Download Sections:');
    sections.forEach((section, index) => {
      console.log(`${index + 1}. ${section.trim()}`);
    });
    
    const hasGrid = sections.some(section => section.toLowerCase().includes('grid'));
    console.log('Selenium Grid section found:', hasGrid);
    
    expect(hasGrid).toBeTruthy();
  });

  test('should fetch Selenium Grid latest version and details', async ({ page }) => {
    await page.goto('https://www.selenium.dev/downloads/', { waitUntil: 'domcontentloaded' });
    
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    const allVersions = await page.locator('text=/version|[0-9]+\\.[0-9]+\\.[0-9]+/i').allTextContents();
    
    console.log('All Version References:');
    allVersions.forEach((version, index) => {
      console.log(`${index + 1}. ${version.trim()}`);
    });
    
    const versionPattern = /\d+\.\d+\.\d+/;
    const latestVersion = allVersions.find(v => versionPattern.test(v));
    
    console.log('Latest Version Found:', latestVersion?.trim());
    
    expect(latestVersion).toBeTruthy();
  });
});
