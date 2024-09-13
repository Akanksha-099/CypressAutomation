/// <reference types="@cypress-audit/lighthouse" />

describe.skip('Performance testing using Google Page Speed Scores',() => {
    beforeEach(() => { 
        cy.visit('/');
      });
  
      it('Verify the page speed scores against benchmark scores', () => {
      
        const thresholds = {
          performance: 50,
          accessibility: 50,
          'best-practices': 50,
          seo: 50,
          pwa: 50
        }
        const opts = {
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            disable: false,
            width: Cypress.config('viewportWidth'),
            height: Cypress.config('viewportHeight'),
            deviceScaleRatio: 1,
          },
        }
        cy.url()
          .then((url) => {
            cy.task('lighthouse', {
              url,
              thresholds,
              opts,
            })
          })
          .then((report) => {
            const { errors, results, txt } = report
            // our custom code in the plugins file has summarized the report
            cy.log(report.txt)
          })
      })

      it.skip('Verify for accessibility- pa11y audits', () => { 
        cy.checkPageA11y('/');
    });


})
