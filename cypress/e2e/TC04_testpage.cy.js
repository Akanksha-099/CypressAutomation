/// <reference types="Cypress" />


describe('Test cases page visit', () => {
    before(() => {
      cy.visit('/')
     
    })
    it("Verifies the Test case page flow 6",()=>{

            cy.title().should('eq', 'Automation Exercise')
            cy.get('div[class*="left-sidebar"]>h2').should('have.text',"Category")
            cy.get('div[class*="features_items"]>h2').should('have.text',"Features Items")
            cy.get('div[class*="brands_products"]>h2').should('have.text',"Brands")
            cy.get('a[href="/test_cases"]').should('have.css','color','rgb(105, 103, 99)')
            cy.get('a[href="/test_cases"]').eq(0).click()
            cy.url().should('include','/test_cases')
            cy.get('b').should('have.text','Test Cases')
    })
})