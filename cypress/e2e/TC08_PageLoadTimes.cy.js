describe.skip('Calculating Page load times for URLs', () => {
    const urls = [
     'https://blog.scoop.it',
     'https://blog.scoop.it/2024/06/13/revitalizing-email-marketing-with-a-curated-approach/',
     'https://blog.scoop.it/2024/09/05/uncovering-the-hidden-gems-of-content-curation-4-benefits-you-didnt-know-existed/',
     'https://blog.scoop.it/2024/08/29/optimizing-your-content-strategy-best-practices-for-curated-content-marketing/',
     'https://blog.scoop.it/2024/08/15/email-accessibility-2024s-game-changing-email-marketing-trend-and-how-to-get-it-right/',
     'https://blog.scoop.it/2021/12/07/social-media-seo-understanding-the-seismic-influence-of-social-networks-on-digital-marketing/',
     
    ]
  
    const loadTimes = [];
  
    const now = new Date();
    const timestamp = now.toISOString().replace(/:/g, '-').replace(/\..+/, '').replace('T', '_');
    const reportFile = `cypress/reports/loadtimes_${timestamp}.html`;
  
  
    urls.forEach(url => {
      it(`should measure page load time for ${url}`, () => {
        let loadTime;
        cy.visit(url, {
          onBeforeLoad: win => {
            win.t0 = performance.now();
          },
          onLoad: win => {
            const t1 = performance.now();
            loadTime = (t1 - win.t0) / 1000;
            loadTimes.push({ url, loadTime });
          },
        });
      });
    });

  
    after(() => {
       // Filter out any invalid or undefined load times
  const validLoadTimes = loadTimes.filter(item => typeof item.loadTime === 'number');

  if (validLoadTimes.length > 0) {
    // Calculate the average only from valid load times
    const totalLoadTime = validLoadTimes.reduce((acc, cur) => acc + cur.loadTime, 0);
    const avgLoadTime = totalLoadTime / validLoadTimes.length;

    // Generate the HTML report
    const reportHtml = generateHtmlReport(validLoadTimes, avgLoadTime);
    cy.writeFile(reportFile, reportHtml);
  } else {
    // Handle case where no valid load times were collected
    cy.writeFile(reportFile, `<p>No valid page load times collected.</p>`);
  }
  });
})

  // Helper function to generate the HTML report
  function generateHtmlReport(loadTimes, avgLoadTime) {
    const rows = loadTimes.map(item => `
      <tr>
        <td><a href="${item.url}" target="_blank">${item.url}</a></td>
        <td>${item.loadTime !== undefined ? item.loadTime.toFixed(2) + ' seconds' : 'Failed to load'}</td>
      </tr>
    `).join('');
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Page Load Times Report</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          a { text-decoration: none; color: blue; }
          a:hover { text-decoration: underline; }
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
        <h2>Average Load Time: ${avgLoadTime ? avgLoadTime.toFixed(2) + ' seconds' : 'No valid load times'}</h2>
        <canvas id="loadTimeChart" class="chart"></canvas>
        <script>
          const ctx = document.getElementById('loadTimeChart').getContext('2d');
          const chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ${JSON.stringify(loadTimes.map(item => item.url))},
              datasets: [{
                label: 'Load Time (seconds)',
                data: ${JSON.stringify(loadTimes.map(item => item.loadTime || 0))}, // Handle failed URLs with 0
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
  }
  
  
