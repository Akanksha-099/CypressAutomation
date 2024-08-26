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
  if (!data.messages || !Array.isArray(data.messages)) {
    throw new TypeError('Expected an array of validation messages')
  }

  // Count the number of each type of message
  const counts = { info: 0, warning: 0, error: 0 }
  data.messages.forEach(item => {
    counts[item.type.toLowerCase()]++
  })

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
        overflow-x: auto;
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
      .info {
        background-color: #d9edf7;
      }
      .warning {
        background-color: #fcf8e3;
      }
      .error {
        background-color: #f2dede;
      }
      .chart {
        margin: 20px 0;
      }
      .chart text {
        font-size: 14px;
        fill: white;
      }
      .message {
        width: 30%;
      }
      .extract {
        width: 20%;
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 8px;
        vertical-align: middle;
      }
      .info-icon {
        background-color: #3498db;
      }
      .warning-icon {
        background-color: #f39c12;
      }
      .error-icon {
        background-color: #e74c3c;
      }
      @media (max-width: 768px) {
        .container {
          width: 100%;
          margin: 0;
          padding: 10px;
        }
      }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css" />
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Validation Report for ${escapeHtml(data.url)}</h1>
      </div>
      <div class="summary">
        <h1>Summary</h1>
        <canvas id="barChart" width="200" height="100"></canvas>
        <table id="summaryTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr class="info">
              <td><span class="icon info-icon"></span>Info</td>
              <td>${counts.info}</td>
            </tr>
            <tr class="warning">
              <td><span class="icon warning-icon"></span>Warning</td>
              <td>${counts.warning}</td>
            </tr>
            <tr class="error">
              <td><span class="icon error-icon"></span>Error</td>
              <td>${counts.error}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="details">
        <h1>Details</h1>
        <table id="detailsTable">
          <thead>
            <tr>
              <th>Type</th>
              <th class="message">Message</th>
              <th>Last Line</th>
              <th>Last Column</th>
              <th>First Column</th>
              <th class="extract">Extract</th>
            </tr>
          </thead>
          <tbody>
  `

  data.messages.forEach(item => {
    const escapedMessage = escapeHtml(item.message)
    const escapedExtract = escapeHtml(item.extract)
    htmlContent += `
      <tr class="${item.type.toLowerCase()}">
        <td><span class="icon ${item.type.toLowerCase()}-icon"></span>${item.type}</td>
        <td class="message">${escapedMessage}</td>
        <td>${item.lastLine}</td>
        <td>${item.lastColumn}</td>
        <td>${item.firstColumn}</td>
        <td class="extract">${escapedExtract}</td>
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
        // Draw the bar chart
        const ctx = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Info', 'Warning', 'Error'],
            datasets: [{
              label: 'Count',
              data: [${counts.info}, ${counts.warning}, ${counts.error}],
              backgroundColor: ['#3498db', '#f39c12', '#e74c3c']
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.parsed.y + ' messages';
                  }
                }
              }
            }
          }
        });

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

