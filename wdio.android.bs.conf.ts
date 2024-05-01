import * as path from 'path';
import { config } from './wdio.conf';

// Access BrowserStack credentials from environment variables
const browserstackUser = process.env.BROWSERSTACK_USER;
const browserstackKey = process.env.BROWSERSTACK_KEY;

if (!browserstackUser || !browserstackKey) {
    throw new Error('BrowserStack credentials are missing. Please ensure they are set as environment variables.');
}

// Assign BrowserStack credentials
config.user = browserstackUser;
config.key = browserstackKey;

// Update Specs
config.specs = [
    path.join(process.cwd(), './apps/Android-NativeDemoApp-0.4.0.apk')
];

// Update Capabilities
config.capabilities = [
    {
        platformName: "Android",
        "appium:platformVersion": "10.0",
        "appium:orientation": "PORTRAIT",
        "appium:deviceName": "Google Pixel 2",
        "appium:automationName": "UIAutomator2",
        "appium:app": path.join(process.cwd(), './apps/Android-NativeDemoApp-0.4.0.apk'),
        "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
        "appium:autoGrantPermissions": true
    }
];

// Update Test runner services
config.services = ['browserstack'];

export { config };
