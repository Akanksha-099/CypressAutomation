exports.config = {
    user: process.env.BROWSERSTACK_USERNAME ,
    key: process.env.BROWSERSTACK_ACCESS_KEY ,
    hostname: 'hub.browserstack.com',
    services: [
      [
        'browserstack',
        {
          app: 'bs://c8665c3bac9f20d72fe75e9da665d590aefa351d',
          buildName: 'Test App',
          browserstackLocal: true
        },
      ]
    ],
    capabilities: [{
      'bstack:options': {
        deviceName: 'Google Pixel 7 Pro',
        platformVersion: '13.0',
        platformName: 'android',
      } }, 
    //   {
    //   'bstack:options': {
    //     deviceName: 'OnePlus 9',
    //     platformVersion: '11.0',
    //     platformName: 'android',
    //   }
    // }
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
    maxInstances: 2,

}
