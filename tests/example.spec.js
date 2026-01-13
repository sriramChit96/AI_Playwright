const { chromium } = require('playwright');

async function launchBrowser() {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    const title = await page.title();
    console.log('Page Title:', title);
    await page.waitForTimeout(5000);
    await browser.close();
}

launchBrowser();
