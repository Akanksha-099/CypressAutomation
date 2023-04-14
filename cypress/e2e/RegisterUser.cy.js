/// <reference types="Cypress" />


describe('User registration flow', () => {
    before(() => {
      cy.visit('https://www.automationexercise.com/')
     
    })
    it("Verifies the Register User flow",()=>{
        //Click on signup/login button
        cy.get('a[href*="/login"]').click()
        cy.url().should('contain',"/login")
        //Verify 'New User Signup!' is visible
        cy.get('div[class*="signup-form"]').should('be.visible')
        cy.get('div[class*="signup-form"]').should('contain.text',"New User Signup!")
        //Enter name and email address
        cy.get('input[name="name"]').type('Alpha1')
        cy.get('input[name="email"]').eq(1).type('Alpha1231@abcd.com')

        //Click 'Signup' button
        cy.get('button[type="submit"]').eq(1).click()
        //Verify that 'ENTER ACCOUNT INFORMATION' is visible
        cy.get('b').should('be.visible')
        cy.get('b').should('contain.text',"Enter Account Information")
        //Fill details: Title, Name, Email, Password, Date of birth
        cy.get('[type="radio"]').first().check()       
        cy.get('input[id="password"]').type('Abcd@1234')
        cy.get('select').eq(0).select('1').should('have.value', '1')
        cy.get('select').eq(1).select('June').should('have.value', '6')
        cy.get('select').eq(2).select('1993').should('have.value', '1993')


        //Select checkbox 'Sign up for our newsletter!'
        cy.get('label').eq(7).should('have.text','Sign up for our newsletter!')
        cy.get('#newsletter').check('1')
        //Select checkbox 'Receive special offers from our partners!'
        cy.get('label').eq(8).should('have.text','Receive special offers from our partners!')
        cy.get('#optin').check('1')
        //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        cy.get('h2').eq(1).should('have.text',"Address Information")
        cy.get('h2').eq(1).should('have.css','color' ,'rgb(254, 152, 15)')
        cy.get('[data-qa="first_name"]').type('Alpha')
        cy.get('[data-qa="last_name"]').type('Beta')
        cy.get('[data-qa="company"]').type('test')
        cy.get('[data-qa="address"]').type('Test-123')
        cy.get('[data-qa="address2"]').type('Test Block, 123ABC')
        cy.get('[data-qa="country"]').select('New Zealand')
        cy.get('[data-qa="state"]').type('TestState')
        cy.get('[data-qa="city"]').type('TestCity')
        cy.get('[data-qa="zipcode"]').type('009988')
        cy.get('[data-qa="mobile_number"]').type('9876543210')


        //Click 'Create Account button'
        cy.get('[data-qa="create-account"]').should('have.text',"Create Account")
        cy.get('[data-qa="create-account"]').click()
        //Verify that 'ACCOUNT CREATED!' is visible
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="account-created"]').should('have.text',"Account Created!")
        //Click 'Continue' button
        cy.get('[data-qa="continue-button"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        //Verify that 'Logged in as username' is visible
        cy.get(':nth-child(10) > a').should('contain.text',"Logged in as")
        
        //Click 'Delete Account' button
        cy.get('a[href="/delete_account"]').should('be.visible')
        cy.get('a[href="/delete_account"]').click()
        //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="account-deleted"]').should('have.text',"Account Deleted!")
        cy.get('[data-qa="continue-button"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })


})