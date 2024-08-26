const fs = require('fs')
const path = require('path')

// Function to read JSON data from a file
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading or parsing JSON file: ${error.message}`)
    return null
  }
}

// Function to escape HTML special characters
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Function to generate HTML content from JSON data
function generateHtmlContent(data) {
  if (!data.errors || !Array.isArray(data.errors)) {
    throw new TypeError('Expected an array of errors')
  }

  // Count the number of errors and warnings
  const counts = { errors: data.errorCount || 0, warnings: data.warningCount || 0 }

  let htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validation Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
      }
      .container {
        width: 90%;
        max-width: 1200px;
        background-color: #ffffff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        margin: 20px;
        padding: 20px;
        border-radius: 8px;
      }
      .summary, .details {
        width: 100%;
        padding: 20px;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        table-layout: fixed;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        word-break: break-word;
      }
      th {
        background-color: #f2f2f2;
      }
      .error {
        background-color: #f2dede;
      }
      .message {
        width: 30%;
      }
      .context {
        width: 20%;
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 8px;
        vertical-align: middle;
      }
      .error-icon {
        background-color: #e74c3c;
      }
      .warning-icon {
        background-color: #f39c12;
      }
      @media (max-width: 768px) {
        .container {
          width: 100%;
          margin: 0;
          padding: 10px;
        }
      }
      /* Add space after the "context" column */
      .details-table td:last-child {
        position: relative;
      }

      .details-table td:last-child::after {
        content: "";
        display: block;
        width: 15px; /* Adjust the width as needed */
        height: 100%;
        position: absolute;
        right: -15px; /* Moves the space outside the table cell */
        top: 0;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css" />
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Validation Report</h1>
      </div>
      <div class="summary">
        <h1>Summary</h1>
        <table id="summaryTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr class="error">
              <td><span class="icon error-icon"></span>Error</td>
              <td>${counts.errors}</td>
            </tr>
            <tr class="warning">
              <td><span class="icon warning-icon"></span>Warning</td>
              <td>${counts.warnings}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="details">
        <h1>Details</h1>
        <table id="detailsTable" class="details-table">
          <thead>
            <tr>
              <th>Rule ID</th>
              <th>Message</th>
              <th>Line</th>
              <th>Column</th>
              <th>Selector</th>
              <th>Context</th>
            </tr>
          </thead>
          <tbody>
  `

  data.errors.forEach(item => {
    const escapedMessage = escapeHtml(item.message || '')
    const escapedContext = escapeHtml(JSON.stringify(item.context, null, 2) || '')
    const escapedRuleUrl = escapeHtml(item.ruleUrl || '')
    htmlContent += `
      <tr class="error">
        <td><a href="${escapedRuleUrl}" target="_blank">${escapeHtml(item.ruleId)}</a></td>
        <td class="message">${escapedMessage}</td>
        <td>${item.line}</td>
        <td>${item.column}</td>
        <td>${escapeHtml(item.selector)}</td>
        <td class="context"><pre>${escapedContext}</pre></td>
      </tr>
    `
  })

  htmlContent += `
          </tbody>
        </table>
      </div>
    </div>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        // Make the table sortable and filterable
        $(document).ready(function() {
          $('#detailsTable').DataTable();
        });
      });
    </script>
  </body>
  </html>
  `

  return htmlContent
}

// Function to write HTML content to a file
function writeHtmlFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

// Main function to read JSON, generate HTML, and write to a file
function main(jsonFilePath, htmlFilePath) {
  const jsonData = readJsonFile(jsonFilePath)

  if (!jsonData) {
    console.error('Failed to read or parse the JSON file.')
    return
  }

  try {
    const htmlContent = generateHtmlContent(jsonData)
    writeHtmlFile(htmlFilePath, htmlContent)
    console.log(`HTML report generated at ${htmlFilePath}`)
  } catch (error) {
    console.error(`Error generating HTML content: ${error.message}`)
  }
}

// Export the main function so it can be called from another file
module.exports = main
