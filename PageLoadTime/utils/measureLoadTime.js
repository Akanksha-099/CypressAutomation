const puppeteer = require('puppeteer');

// Function to measure page load time
async function measurePageLoadTime(url) {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    const t0 = performance.now(); // Start timer

    await page.goto(url, { waitUntil: 'load' });

    const t1 = performance.now(); // End timer
    const loadTime = (t1 - t0) / 1000; // Convert to seconds

    await browser.close();
    return loadTime;
  } catch (error) {
    console.error(`Error measuring load time for ${url}:`, error);
    return 'Failed to load'; // Return a default value instead of throwing an error
  } finally {
    if (browser) await browser.close(); // Ensure browser is closed
  }
}

module.exports = { measurePageLoadTime };
