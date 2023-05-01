const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
    "reporterOptions": {
      "configFile": "reporter-config.json"
  },
    retries:{ "runMode": 2, "openMode": 0 },
    pageLoadTimeout:10000,
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

    },
  },
});
