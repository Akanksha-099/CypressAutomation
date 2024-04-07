/// <reference types="Cypress" />

import '../../cypress/support/commands.js';
describe('Testing Adobe Analytics', () => {
    it.skip('Validate Adobe Analytics variables', { retries: 2 },() => {
        // Visit the URL of the article
        cy.visit('https://www.mckinsey.com/careers/the-city-cup/faqs')
        cy.handleCookieBanner() 
        // Intercept the Adobe Analytics request
        cy.intercept('/b/ss/**').as('adobe')
        cy.scrollTo('60%',5000)
        // Click on the accordion item to expand
        cy.get('button[data-layer-location="accordion"]').first().click({force:true})
      
        // Wait for the Adobe Analytics request to complete after expanding
        cy.wait('@adobe').then(interception => {
          // Extract the values from the intercepted request
          const v28ValueExpand = new URL(interception.request.url).searchParams.get('v28')
          const v29ValueExpand = new URL(interception.request.url).searchParams.get('v29')
          const eventsValueExpand = new URL(interception.request.url).searchParams.get('events')
          const linkNameValueExpand = new URL(interception.request.url).searchParams.get('pev2')
      
          // Perform assertions for the expanded state
          expect(v28ValueExpand).to.eq('expand') // Adjust the expected value based on your scenario
          expect(v29ValueExpand).to.eq('body|accordion')
          expect(eventsValueExpand).to.eq('event24')
          expect(linkNameValueExpand).to.eq('UI Element Clicked')
      
          // Click again on the accordion item to collapse
          cy.get('button[data-layer-location="accordion"]').first().click({force:true})
      
          // Wait for the Adobe Analytics request to complete after collapsing
          cy.wait('@adobe').then(collapseInterception => {
            // Extract the values from the intercepted request after collapsing
            const v28ValueCollapse = new URL(collapseInterception.request.url).searchParams.get('v28')
            const v29ValueCollapse = new URL(collapseInterception.request.url).searchParams.get('v29')
            const eventsValueCollapse = new URL(collapseInterception.request.url).searchParams.get('events')
            const linkNameValueCollapse = new URL(collapseInterception.request.url).searchParams.get('pev2')
      
            // Perform assertions for the collapsed state
            expect(v28ValueCollapse).to.eq('collapse') // Adjust the expected value based on your scenario
            expect(v29ValueCollapse).to.eq('body|accordion')
            expect(eventsValueCollapse).to.eq('event24')
            expect(linkNameValueCollapse).to.eq('UI Element Clicked')
          })
        })
      })

    it.skip('Validate Adobe Analytics variables', { retries: 2 }, () => {
        // Visit the URL of the article
        cy.visit('https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/implementing-generative-ai-with-speed-and-safety')
        cy.handleCookieBanner() 
        
        // Intercept the Adobe Analytics request
        cy.intercept('/b/ss/**').as('adobe')
        cy.wait(5000)
        // Click on the accordion item to expand
        cy.get('[aria-label="Expandable Sidebar"] > span').eq(0).click({force:true})
       cy.wait(5000)
        // Wait for the Adobe Analytics request to complete after expanding
        cy.wait('@adobe').then(interception => {
          // Extract the values from the intercepted request
          const v28ValueExpand = new URL(interception.request.url).searchParams.get('v28')
          const v29ValueExpand = new URL(interception.request.url).searchParams.get('v29')
          const eventsValueExpand = new URL(interception.request.url).searchParams.get('events')
          const linkNameValueExpand = new URL(interception.request.url).searchParams.get('pev2')
      
          // Perform assertions for the expanded state
          expect(v28ValueExpand).to.eq('open sidebar') // Adjust the expected value based on your scenario
          expect(v29ValueExpand).to.eq('body|article-body|sidebar')
          expect(eventsValueExpand).to.eq('event24,event28')
          expect(linkNameValueExpand).to.eq('UI Element Clicked')
      
          // Click again on the accordion item to collapse
          cy.get('[aria-label="Expandable Sidebar"] > span').eq(0).click({force:true})
      
          // Wait for the Adobe Analytics request to complete after collapsing
          cy.wait('@adobe').then(collapseInterception => {
            // Extract the values from the intercepted request after collapsing
            const v28ValueCollapse = new URL(collapseInterception.request.url).searchParams.get('v28')
            const v29ValueCollapse = new URL(collapseInterception.request.url).searchParams.get('v29')
            const eventsValueCollapse = new URL(collapseInterception.request.url).searchParams.get('events')
            const linkNameValueCollapse = new URL(collapseInterception.request.url).searchParams.get('pev2')
      
            // Perform assertions for the collapsed state
            expect(v28ValueCollapse).to.eq('close sidebar') // Adjust the expected value based on your scenario
            expect(v29ValueCollapse).to.eq('body|article-body|sidebar')
            expect(eventsValueCollapse).to.eq('event24')
            expect(linkNameValueCollapse).to.eq('UI Element Clicked')
          })
        })
      })
    it('Validate Adobe analytics variables', () => {
        cy.intercept('/b/ss/**').as('adobe')
        cy.visit('https://promos.marriott.com/en/GROUP/golden-triangle')
        cy.scrollTo('bottom')
        cy.wait('@adobe').then(interception => {
            // Extract the values from the intercepted request
            const v41ValueExpand = new URL(interception.request.url).searchParams.get('v41')
            expect(v41ValueExpand).to.eq('Augustine, a Luxury Collection Hotel, Prague')
        })
    })
    it('Validate Adobe analytics variables',()=>{
      cy.intercept('/b/ss/**').as('adobe')
      cy.visit('https://www.marriott.com/en-us/hotels/laspm-park-mgm-las-vegas-a-tribute-portfolio-resort/rooms/')
      cy.scrollTo('bottom')
      cy.get('.onCorePage > .faq-accordion-faq-question').click()
      cy.wait('@adobe').then(interception => {
        // Extract the values from the intercepted request
        const c26ValueExpand = new URL(interception.request.url).searchParams.get('c26')
        const v22ValueExpand = new URL(interception.request.url).searchParams.get('v22')
        const v192ValueExpand = new URL(interception.request.url).searchParams.get('v192')
        const linkNameValueExpand = new URL(interception.request.url).searchParams.get('pev2')
        const eventsValueExpand = new URL(interception.request.url).searchParams.get('events')

        expect(c26ValueExpand).to.eq('AEM-prod') // Adjust the expected value based on your scenario
        expect(v22ValueExpand).to.eq('unauthenticated')
        expect(v192ValueExpand).to.eq('www.marriott.com/en-us/hotels/laspm-park-mgm-las-vegas-a-tribute-portfolio-resort/rooms/')
        expect(eventsValueExpand).to.contain('event1,prodView')
        expect(linkNameValueExpand).to.eq(null)

        cy.get('.onCorePage > .faq-accordion-faq-question').click()
        cy.wait('@adobe').then(collapseInterception => {
          // Extract the values from the intercepted request after collapsing
          const c26ValueCollapse = new URL(collapseInterception.request.url).searchParams.get('c26')
          const v22ValueCollapse = new URL(collapseInterception.request.url).searchParams.get('v22')
          const v192ValueCollapse = new URL(interception.request.url).searchParams.get('v192')
          const eventsValueCollapse = new URL(collapseInterception.request.url).searchParams.get('events')
          const linkNameValueCollapse = new URL(collapseInterception.request.url).searchParams.get('pev2')
    
          // Perform assertions for the collapsed state
          expect(c26ValueCollapse).to.eq('AEM-prod') // Adjust the expected value based on your scenario
          expect(v22ValueCollapse).to.eq('unauthenticated')
          expect(v192ValueCollapse).to.eq('www.marriott.com/en-us/hotels/laspm-park-mgm-las-vegas-a-tribute-portfolio-resort/rooms/')
          expect(eventsValueCollapse).to.eq('event2')
          expect(linkNameValueCollapse).to.eq('Custom Link Click')
        })
      })
    })
})