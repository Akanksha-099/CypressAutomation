const fs = require('fs');
const path = require('path');
const { measurePageLoadTime } = require('./utils/measureLoadTime');
const { saveLoadTimes, createDirs } = require('./utils/fileUtils');
const { generateHtmlReport } = require('./utils/htmlUtils');

// Create directories if they don't exist
const logsDir = path.join(__dirname, 'logs');
const reportsDir = path.join(__dirname, 'reports');
createDirs(logsDir, reportsDir);

// Paths for loadtimes and report files
const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_');
const loadTimesFilePath = path.join(logsDir, `loadtimes_${timestamp}.json`);
const reportFilePath = path.join(reportsDir, `PageLoadTimeReport_${timestamp}.html`);

// Main function
async function main() {
  const urls = [
    'https://www.foo.software',
    'https://www.w3.org/WAI/',
    'https://webaim.org/',
    'https://dequeuniversity.com/',
    'https://developer.mozilla.org/en-US/',
    'https://alistapart.com/',
    'https://www.mckinsey.com/', // This may fail to load
  ];

  const loadTimes = [];

  for (const url of urls) {
    console.log(`Measuring load time for: ${url}`);
    const loadTime = await measurePageLoadTime(url);
    loadTimes.push({ url, loadTime });
  }

  // Save load times to JSON file
  saveLoadTimes(loadTimes, loadTimesFilePath);

  // Generate and save HTML report
  generateHtmlReport(loadTimes, reportFilePath);
}

main();
