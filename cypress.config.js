const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { pa11y } = require('@cypress-audit/pa11y');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
    "reporterOptions": {
      "configFile": "reporter-config.json"
  },
    retries:{ "runMode": 2, "openMode": 0 },
    pageLoadTimeout:20000,
    responseTimeout:30000,
    screenshotOnRunFailure:true,
    video:true,
    videoCompression:15,
    videoUploadOnPasses:true,
    reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Inline Reporter',
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
},
 
  e2e: {
    baseUrl:'https://www.automationexercise.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
  
      on('task', {
        pa11y: pa11y(pa11yReport => {
          console.log(pa11yReport) // raw pa11y report
        }),
        lighthouse:lighthouse(),
        async lighthouse(allOptions) {
          let txt
          // calling the function is important
          const lighthouseTask = lighthouse((lighthouseReport) => {
            let lighthouseScoreText = ''
            let lighthouseResult = lighthouseReport?.lhr?.categories
            let lighthousePerformance =
              'Performance: ' + lighthouseResult?.performance?.score + '\n'
            let lighthouseAccessibility =
              'Accessibility: ' + lighthouseResult?.accessibility?.score + '\n'
            let lighthouseBestPractices =
              'Best Practices: ' +
              lighthouseResult?.['best-practices']?.score +
              '\n'
            let lighthouseSEO = 'SEO: ' + lighthouseResult?.seo?.score + '\n'
            lighthouseScoreText =
              lighthousePerformance +
              lighthouseAccessibility +
              lighthouseBestPractices +
              lighthouseSEO
    
            console.log(lighthouseScoreText)
            txt = lighthouseScoreText
          })

          const report = await lighthouseTask(allOptions)
          // insert the text into the report returned the test
          report.txt = txt
          return report
        },
        log(message) {
          // Define the behavior for the 'log' task.
          console.log(message);
          return null; // This can be any value you want to return
        },
        table(data) {
          // Define the behavior for the 'table' task.
          console.table(data); // Example of logging as a table.
          return null; // This can be any value you want to return
        },
      })
    
  },
}
});
