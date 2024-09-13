import '../../cypress/support/commands.js';
/// <reference types="@cypress-audit/lighthouse" />

// List of URLs to test
const urlsToTest = [
  'https://www.foo.software',
  'https://www.w3.org/WAI/',
  'https://webaim.org/',
  'https://dequeuniversity.com/',
  'https://developer.mozilla.org/en-US/',
  'https://alistapart.com/',
  'https://www.nasa.gov/'
  // Add more URLs to test as needed
];
// Define at the top of the spec file or just import it
function terminalLog(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      })
    )
  
    cy.task('table', violationData)
  }
describe.skip('Accessibility testing', () => {
  urlsToTest.forEach((url) => {
    it(`Test accessibility for URL: ${url}`, () => {
      cy.visit(url);
      
      // For axe-based testing
      cy.injectAxe();
      cy.checkA11y(null, null, terminalLog);
      cy.testAccessibility();
     
      // For pa11y audits
      cy.checkPageA11y(url);

      // For Lighthouse testing
      const thresholds = {
        performance: 40,
        accessibility: 40,
        'best-practices': 40,
        seo: 40,
        pwa: 40,
      };
      const opts = {
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          disable: false,
          width: Cypress.config('viewportWidth'),
          height: Cypress.config('viewportHeight'),
          deviceScaleRatio: 1,
        },
      };

      cy.task('lighthouse', {
        url,
        thresholds,
        opts,
      }).then((report) => {
        const { errors, results, txt } = report;
        cy.log(report.txt);
      });
    });
  });
});
