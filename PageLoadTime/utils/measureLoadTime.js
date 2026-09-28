const puppeteer = require('puppeteer');

// Function to measure page load time
async function measurePageLoadTime(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    let browser;
    try {
      const launchOptions = attempt === 1 ? { args: ['--disable-http2'] } : {};
      browser = await puppeteer.launch(launchOptions);
      const page = await browser.newPage();

      const t0 = performance.now(); // Start timer
      const waitUntil = attempt === 1 ? 'domcontentloaded' : 'load';
      await page.goto(url, { waitUntil });

      const t1 = performance.now(); // End timer
      return (t1 - t0) / 1000; // Convert to seconds
    } catch (error) {
      const isHttp2Error = error.message.includes('ERR_HTTP2_PROTOCOL_ERROR');
      if (attempt === 0 && isHttp2Error) {
        console.warn(`HTTP/2 error for ${url}; retrying with HTTP/2 disabled and waiting for DOM content.`);
        continue;
      }

      console.error(`Error measuring load time for ${url}:`, error);
      return null;
    } finally {
      if (browser) {
        await browser.close().catch(closeError => {
          console.warn(`Error closing browser after measuring ${url}:`, closeError);
        });
      }
    }
  }

  return null;
}

module.exports = { measurePageLoadTime };
