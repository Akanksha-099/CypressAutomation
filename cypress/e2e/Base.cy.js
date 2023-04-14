
/// <reference types="Cypress" />


describe('Homepage Visit', () => {
  beforeEach(() => {
    cy.visit('https://www.automationexercise.com/')
   
  })
  it('Verify the homepage items',()=>{
      cy.title().should('eq', 'Automation Exercise')
      cy.get('div[class*="left-sidebar"]>h2').should('have.text',"Category")
      cy.get('div[class*="left-sidebar"]>h2').isLeftOf('div[class*="features_items"]>h2')
      cy.get('div[class*="features_items"]>h2').should('have.text',"Features Items")
      cy.get('div[class*="left-sidebar"]>h2').isLeftAlignedOnScreen()
      cy.get('div[class*="brands_products"]>h2').should('have.text',"Brands")
  })
  it('Verify the card-layout',()=>{

      cy.get('div[class*="product-image-wrapper"]').should('be.visible')
      cy.get('div[class*="product-image-wrapper"]').eq(0).find('img').should('have.attr', 'src')
      cy.get('div[class*="product-image-wrapper"]').eq(0).find('h2').should('have.css','color' ,'rgb(254, 152, 15)')
      cy.get('a[class*="add-to-cart"]').eq(0).should('be.visible')
      cy.get('a[class*="add-to-cart"]').eq(0).should('have.text',"Add to cart")
      cy.get('ul[class*="nav-justified"]>li>a').eq(0).should('have.text',"View Product")
      cy.get('ul[class*="nav-justified"]>li>a').eq(0).should('have.css','color' ,'rgb(165, 42, 42)')

  })

  it('Verify for the active home carousel',()=>{
      cy.clock()
      cy.get('div[id="slider-carousel"]')
      .find('ol[class*="carousel-indicators"]>li')
      .invoke('index')
      .should('eq', 0)                    // first image is active
      })
  
})