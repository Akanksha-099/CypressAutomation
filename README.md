# Code-Craft-LearnAutomation
[![Cypress and Lighthouse Tests Execution Workflow](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/cypress-and-lighthouse-tests.yml/badge.svg)](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/cypress-and-lighthouse-tests.yml)
[![Run Appium Tests](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/appium.yml/badge.svg)](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/appium.yml)
[![Page Load Time Measurement](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/page-load-time.yml/badge.svg)](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/page-load-time.yml)
[![Run Validators](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/html-validation.yml/badge.svg)](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/html-validation.yml)
[![K6 Performance Tests Workflow](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/performance-tests.yml/badge.svg)](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/performance-tests.yml)
[![BackstopJS Visual Regression Tests Workflow](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/backstop.yml/badge.svg)](https://github.com/Akanksha-099/CypressAutomation/actions/workflows/backstop.yml)

## Overview
Code-Craft-LearnAutomation is a dynamic initiative dedicated to mastering automation technologies through hands-on coding and craftsmanship. This project serves as a comprehensive learning platform, where I actively engage with tools like Cypress, K6, Lighthouse, HTML Validators, Page Load Times, and BackstopJS and other tools to hone my skills in the automation domain.

### Key Learning Focus Areas

- **Cypress Mastery:** Crafting robust end-to-end testing scenarios using Cypress for seamless automation.
- **Performance with K6:** Delving into the realm of performance testing, simulating and optimizing system behavior with K6.
- **Lighthouse Insights:** Exploring Lighthouse for in-depth insights into accessibility and performance metrics.
- **Appium:** Learning about Mobile Automation, and automating it using appium tests.
- **HTML Validation:** Ensuring HTML compliance with the WHATWG/W3C standards and generating detailed reports.
- **Page Load Times:** Measuring and analyzing page load times to optimize performance and user experience.
- **Visual Regression Testing with BackstopJS:** Automating visual regression tests to capture and compare screenshots, ensuring that UI changes do not introduce unexpected regressions.


### Why Code-Craft-LearnAutomation?

- **Code Craftsmanship:** Embrace the art of coding by actively working with industry-standard automation tools.
- **Continuous Learning:** This project embodies a continuous learning journey, where experimentation and growth are paramount.

## GitHub Actions Workflows

- **Cypress Run:** Executes end-to-end tests using Cypress.
- **Performance Tests:** Runs performance tests using K6.
- **Lighthouse Checks:** Performs accessibility and performance checks using Lighthouse.
- **Appium Tests:** Executes Appium tests using BrowserStack.
- **HTML Validator:** Validates HTML against the WHATWG and default W3C standards and generates validation reports.
- **Page Load Times:** Measures and reports on page load times for various URLs.
- **BackstopJS Visual Tests:** Automates visual regression testing using BackstopJS, comparing screenshots to ensure no unintended UI changes.
- **Send Slack Notification:** Sends notifications to Slack with combined workflow status.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- Git installed on your machine
- BrowserStack is also configured

### Clone the Repository
```git clone https://github.com/Akanksha-099/CypressAutomation.git```

### Install the dependencies
```cd CypressAutomation```
```npm install```

### Running Cypress Tests
```npx cypress run```

### Running K6 Performance Tests
```npm run k6Tests/<script-name>.js```

Note: Replace <script-name> with the specific script you want to run.

### Running Lighthouse Tests
Lighthouse tests are automated through workflows and are triggered automatically. Check the GitHub Actions for the latest results.

### Running Appium Tests
```npx wdio run wdio.android.bs.conf.js --spec ./test/specs/<script-name>.ts```

### Running HTML Validation
HTML validation is performed through GitHub Actions by passing the URLs in the repsective validator files. You can also manually execute the HTML validation script using the following command:
```node HTMLValidator/validator_*.js```

### Running Page Load Times Measurement
Page load times are measured and reported through GitHub Actions by passing the URLs in the repsective page-load times file. You can also manually execute the page load times measurement script using the following command:
```node PageLoadTime/loadtimes.js```

### Running BackstopJS Visual Regression Tests
BackstopJS visual regression tests compare screenshots to catch UI changes. You can run the tests locally or via GitHub Actions. Also, the branch can be switched to "main" branch as well int he github actions workflow. 
To run the tests locally:
```npx backstop test```

To update the changes after visual validation:
```npx backstop reference```


