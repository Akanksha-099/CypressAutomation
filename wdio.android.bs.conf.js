require('dotenv').config()
exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'amaya_cArCFS',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'JBUbwP7HftDW46qRiqhu',
    hostname: 'hub.browserstack.com',
    services: [
      [
        'browserstack',
        {
          app: 'bs://c8665c3bac9f20d72fe75e9da665d590aefa351d',
          browserstackLocal: true,
          testObservability: true,
          'projectName': 'CypressAutomation',
          'buildName': 'run-appium-tests',
          //'buildTag': ''
        },
      ]
    ],
    capabilities: [{
      'bstack:options': {
        deviceName: 'Google Pixel 7 Pro',
        platformVersion: '13.0',
        platformName: 'android',
      } }, 
      {
        'bstack:options': {
          deviceName: 'Samsung Galaxy S22 Ultra',
          platformVersion: '12.0',
          platformName: 'android',
        }},
      {
      'bstack:options': {
        deviceName: 'OnePlus 9',
        platformVersion: '11.0',
        platformName: 'android',
      }
    }
  ],
    commonCapabilities: {
      'bstack:options': {
        projectName: "BrowserStack Sample",
        buildName: "bstack-demo",
        testObservability: true,
        debug: true,
        networkLogs: true,
        percy: false,
       //percyCaptureMode: auto
      }
    },
    maxInstances: 6,

}
