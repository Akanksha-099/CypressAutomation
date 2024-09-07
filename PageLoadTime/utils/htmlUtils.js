const fs = require('fs');

// Generate an HTML report from the load times
function generateHtmlReport(loadTimes, reportFilePath) {
  const validLoadTimes = loadTimes.filter(item => typeof item.loadTime === 'number');
  const totalLoadTime = validLoadTimes.reduce((acc, cur) => acc + cur.loadTime, 0);
  const avgLoadTime = validLoadTimes.length ? (totalLoadTime / validLoadTimes.length).toFixed(2) : 'N/A';

  const rows = loadTimes.map(item => `
    <tr>
      <td><a href="${item.url}" target="_blank">${item.url}</a></td>
      <td>${typeof item.loadTime === 'number' ? item.loadTime.toFixed(2) + ' seconds' : 'Failed to load'}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Page Load Times Report</title>
      <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .chart { width: 100%; height: 400px; }
      </style>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
      <h1 style="text-align: center;"><u>Page Load Times Report</u></h1>
      <table>
        <tr>
          <th>URL</th>
          <th>Load Time</th>
        </tr>
        ${rows}
      </table>
      <h2>Average Load Time: ${avgLoadTime} seconds</h2>
      <canvas id="loadTimeChart" class="chart"></canvas>
      <script>
        const ctx = document.getElementById('loadTimeChart').getContext('2d');
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ${JSON.stringify(loadTimes.map(item => item.url))},
            datasets: [{
              label: 'Load Time (seconds)',
              data: ${JSON.stringify(loadTimes.map(item => typeof item.loadTime === 'number' ? item.loadTime : 0))}, // Handle failed URLs with 0
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
      </script>
    </body>
    </html>
  `;

  fs.writeFileSync(reportFilePath, htmlContent);
  console.log(`HTML report generated: ${reportFilePath}`);
}

module.exports = { generateHtmlReport };
