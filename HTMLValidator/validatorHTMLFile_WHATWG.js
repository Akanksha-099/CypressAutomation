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
  if (typeof unsafe !== 'string') {
    return unsafe ? JSON.stringify(unsafe) : '';
  }
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
// Function to generate HTML content from JSON data
function generateHtmlContent(data,url) {
  if (!data.errors || !Array.isArray(data.errors)) {
    throw new TypeError('Expected an array of errors')
  }

  // Count the number of errors and warnings
  const counts = { errors: data.errorCount || 0, warnings: data.warningCount || 0 }

  // Prepare data for the chart
  const ruleCounts = {}
  data.errors.forEach(item => {
    const ruleId = item.ruleId || 'Unknown'
    ruleCounts[ruleId] = (ruleCounts[ruleId] || 0) + 1
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
    margin: 20px auto; /* Add 'auto' to center and give top-bottom margin */
    padding: 20px; /* This padding is equal on all sides */
    border-radius: 8px;
    box-sizing: border-box; /* Ensure padding is included in width calculations */
  }
  .header {
    display: flex; /* Enables Flexbox layout */
    justify-content: center; /* Centers the content horizontally */
    align-items: center; /* Centers the content vertically */
    text-align: center; /* Aligns text center inside the flex container */
    width: 100%; /* Ensures full width */
    padding: 20px 0; /* Optional: Adds some padding for spacing */
  }
  .header a {
    color: inherit; /* Ensures the link takes the color of its parent */
    text-decoration: none; /* Removes the underline from the link */
  }

  .header a:hover {
    text-decoration: underline; /* Adds underline on hover for better UX */
  }
  
  .summary, .details {
    width: 100%;
    padding: 20px;
    box-sizing: border-box; /* Include padding in width calculations */
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
    box-sizing: border-box; /* Include padding in width calculations */
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
    background-color: rgba(255, 99, 132, 0.2); /* Error: red */
  }
  .warning {
    background-color: rgba(255, 159, 64, 0.2); /* Warning: orange */
  }
  .message {
    width: 30%;
  }
  
  .context {
    width: 20%;
    max-width: 300px;
    white-space: pre-wrap; /* Preserves whitespace and wraps text */
    overflow-wrap: break-word; /* Breaks long words if necessary */
    box-sizing: border-box;
  }

.context pre {
    display: block;
    margin: 0;
    white-space: pre-wrap; /* Wraps text while preserving whitespace */
    overflow-wrap: break-word; /* Breaks long words if needed */
    word-break: normal; /* Prevents breaking words in the middle */
}

  .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  
  .error-icon {
    background-color: rgba(255, 99, 132, 1); /* Error: red */
  }
  
  .warning-icon {
    background-color: rgba(255, 159, 64, 1); /* Warning: orange */
  }
  
  @media (max-width: 768px) {
    .container {
      width: 100%;
      margin: 0 auto; /* Ensure it's centered on small screens too */
      padding: 10px;
    }
  }
  
  /* Add additional padding to the right side for equal space */
  .details-table td {
    padding-right: 15px; /* Adds extra space to the right */
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
  
  /* Add margin between the search box and the table */
  .dataTables_wrapper .dataTables_filter {
    margin-bottom: 20px; /* Adds space below the search box */
  }

  .dataTables_wrapper .dataTables_length {
    margin-bottom: 20px; /* Adds space below the "Show entries" dropdown */
  }

  /* Optional: Adjust spacing around the DataTable itself */
  #detailsTable_wrapper {
    margin-top: 20px; /* Adds space above the DataTable */
    margin-bottom: 20px; /* Adds space below the DataTable */
  }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
    <div class="container">
      <div class="header">
      <h1>Validation Report for <a href="${escapeHtml(url)}" target="_blank">${escapeHtml(url)}</a></h1>
      </div>
      <div class="summary">
        <h1>Summary: Error Distribution by Rule ID</h1>
        <div class="chart-container">
        <canvas id="ruleChart" width="400" height="200"></canvas>
      </div>
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
  `;

  data.errors.forEach(item => {
    const escapedMessage = escapeHtml(item.message || '');
    const escapedContext = escapeHtml(JSON.stringify(item.context,null,2) || 'No context available');
    const escapedRuleUrl = escapeHtml(item.ruleUrl || '');
    htmlContent += `
      <tr class="error">
        <td><a href="${escapedRuleUrl}" target="_blank">${escapeHtml(item.ruleId)}</a></td>
        <td class="message">${escapedMessage}</td>
        <td>${item.line}</td>
        <td>${item.column}</td>
        <td>${escapeHtml(item.selector)}</td>
        <td class="context"><pre>${escapedContext}</pre></td>
      </tr>
    `;
  });

  htmlContent += `
        </tbody>
      </table>
    </div>
   
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        // Make the table sortable and filterable
        $(document).ready(function() {
          $('#detailsTable').DataTable();
        });

        // Prepare data for the chart
        const ctx = document.getElementById('ruleChart').getContext('2d');
        const ruleCounts = ${JSON.stringify(ruleCounts)};
        const chartLabels = Object.keys(ruleCounts);
        const chartData = Object.values(ruleCounts);
        // Log to check if data is correct

        console.log('Chart Data:', chartLabels, chartData);

        // Create the chart
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: chartLabels,
            datasets: [{
              label: 'Number of Errors',
              data: chartData,
              backgroundColor:  'rgba(255, 99, 132, 0.2)' ,  // Error: red
              borderColor:'rgba(255, 99, 132, 1)' ,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
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
function main(jsonFilePath, htmlFilePath,url) {
  const jsonData = readJsonFile(jsonFilePath)

  if (!jsonData) {
    console.error('Failed to read or parse the JSON file.')
    return
  }

  try {
    const htmlContent = generateHtmlContent(jsonData,url)
    writeHtmlFile(htmlFilePath, htmlContent)
    console.log(`HTML report generated at ${htmlFilePath}`)
  } catch (error) {
    console.error(`Error generating HTML content: ${error.message}`)
  }
}

// Export the main function so it can be called from another file
module.exports = main
