const validator = require('html-validator')
const fs = require('fs')
const path = require('path')
const generateHTMLReport = require('./validatorHTMLFile_WHATWG') // Import the main function from the second file

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

;(async () => {
  const url = 'https://www.ajio.com/'
  const options = {
    url: url,
    format: 'json',
    isLocal: true,
    validator: 'WHATWG',
  }

  try {
    const result = await validator(options)
    console.log(result)

    // Beautify errors
    const errors = beautifyErrors(result)

    // Save the JSON result to a dynamically created file
    const logDir = path.join(__dirname, 'logs')
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir)
    }
    const logFilePath = path.join(logDir, `log_${Date.now()}.json`)
    fs.writeFileSync(logFilePath, JSON.stringify(result, null, 2))

    // Generate the HTML report using the dynamically created JSON file path
    const htmlFilePath = path.join(__dirname, 'formatted_report_whatwg.html')
    generateHTMLReport(logFilePath, htmlFilePath, url)
  } catch (error) {
    console.error('Error:', error)
  }
})()
