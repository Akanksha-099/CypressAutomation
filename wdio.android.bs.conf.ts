import * as path from 'path';
require('dotenv').config()
import { config } from './wdio.conf';

//
// ============
// BrowserStack Credentials
// ============
config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;


//
// ============
// Specs
// ============
config.specs = [
  // path.join(process.cwd(), './test/specs/android/add-note-screen*.js')
  path.join(process.cwd(), './apps/Android-NativeDemoApp-0.4.0.apk')
];

//
// ============
// Capabilities
// ============
config.capabilities = [
    {
      platformName: "Android",
      "appium:platformVersion": "10.0",
      "appium:orientation": "PORTRAIT",  
      "appium:deviceName": "Google Pixel 2",
      "appium:automationName": "UIAutomator2",
      "appium:app": path.join(process.cwd(), './apps/Android-NativeDemoApp-0.4.0.apk'), // Use 'file' instead of 'app'
      "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
      "appium:autoGrantPermissions": true
    }
  ]

//
// Test runner services
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = ['browserstack'];

exports.config = config;