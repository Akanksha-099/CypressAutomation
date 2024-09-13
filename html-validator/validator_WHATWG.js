const validator = require('html-validator')
const fs = require('fs')
const path = require('path')
const generateHTMLReport = require('./validatorHTMLFile_WHATWG') // Import the main function from the report generator file

// Function to beautify errors
function beautifyErrors(input) {
  const errorRegex = /(Info|Warning|Error): (.+?)\nFrom line (\d+), column (\d+); to line (\d+), column (\d+)/g
  let formattedErrors = []
  let match

  while ((match = errorRegex.exec(input)) !== null) {
    const type = match[1]
    const message = match[2]
    const fromLine = match[3]
    const fromColumn = match[4]
    const toLine = match[5]
    const toColumn = match[6]

    formattedErrors.push({
      type,
      message,
      from: { line: fromLine, column: fromColumn },
      to: { line: toLine, column: toColumn },
    })
  }
  return formattedErrors
}

// Function to sanitize URL for use in filenames
function sanitizeFilename(url) {
  // Remove the protocol part (http://, https://)
  const urlWithoutProtocol = url.replace(/^https?:\/\//, '');

  // Replace non-alphanumeric characters with underscores
  const sanitized = urlWithoutProtocol.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  // Remove trailing underscores
  return sanitized.replace(/_+$/, '');
}

// Function to process each URL with retry logic
async function processUrl(url, retries = 3) {
  const options = {
    url: url,
    format: 'json',
    isLocal: true,
    validator: 'WHATWG', // Use the WHATWG validator
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await validator(options)
      console.log(`Validation result for ${url}:`, result)

      // Beautify errors
      const errors = beautifyErrors(result)

      // Create a sanitized filename for the URL
      const sanitizedUrl = sanitizeFilename(url)
      
      // Save the JSON result to a dynamically created file
      const logDir = path.join(__dirname, 'logs')
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir)
      }
      const logFilePath = path.join(logDir, `log_${sanitizedUrl}.json`)
      fs.writeFileSync(logFilePath, JSON.stringify(result, null, 2))

      // Generate the HTML report using the dynamically created JSON file path
      const htmlFilePath = path.join(__dirname, `WHATWGValidationReport_${sanitizedUrl}.html`)
      generateHTMLReport(logFilePath, htmlFilePath, url)
      break // Exit loop if successful
    } catch (error) {
      console.error(`Attempt ${attempt} - Error processing URL ${url}:`, error)
      if (attempt === retries) {
        console.error(`Failed to process URL ${url} after ${retries} attempts`)
      }
    }
  }
}

// Main function to handle an array of URLs
(async () => {
  const urls = [
    'https://www.mckinsey.com/',
    'https://www.ajio.com',
    'https://cloud.google.com/vertex-ai',
    'https://www.example.com',
    'https://www.mckinsey.com/featured-insights/annual-book-recommendations'
    // Add more URLs here
  ]

  for (const url of urls) {
    await processUrl(url)
  }
})()
