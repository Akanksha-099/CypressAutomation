/// <reference types="Cypress" />


describe('Google Maps API tests', () => {
    let placeId;
   
    it("Add Place API",()=>{
      cy.request({
        method:'POST',
        url:'http://216.10.245.166/maps/api/place/add/json?key=qaclick123',
        body:
        
          {
            "location": {
              "lat": -38.383494,
              "lng": 33.427362
            },
            "accuracy": 50,
            "name": "Frontline house",
            "phone_number": "(+91) 983 893 3937",
            "address": "29, side layout, cohen 09",
            "types": [
              "shoe park",
              "shop"
            ],
            "website": "http://google.com",
            "language": "French-IN"
          
        }
      }).as('places')
      cy.get('@places').its('status').should('eq',200)
      cy.get('@places').then((response) => {
        let res = response.body
        placeId = res.place_id
        cy.log(placeId)
      })
      cy.get('@places').then((response)=>{cy.log(JSON.stringify(response.body))})
    })

    it('Get Place API',()=>{
      cy.request({
                method:'GET',
                url:'http://216.10.245.166/maps/api/place/get/json?place_id='+placeId+'&key=qaclick123',
                
              }).as('places')
              cy.get('@places').its('status').should('eq',200)
              cy.get('@places').then((response)=>{cy.log(JSON.stringify(response.body))})
    })
   
    it("Put Place API",()=>{
      cy.request({
        method:'PUT',
        url:'http://216.10.245.166/maps/api/place/update/json?key=qaclick123',
        body:
        
        {
          "place_id":placeId,
          "address":"70 winter walk, USA",
          "key":"qaclick123"
          }
      }).as('places')
      cy.get('@places').its('status').should('eq',200)
      cy.get('@places').then((response) => {
        let res = response.body
        placeId = res.place_id
        cy.log(placeId)
      })
      cy.get('@places').then((response)=>{cy.log(JSON.stringify(response.body))})
    })
   
    it("Delete Place API",()=>{
      cy.request({
        method:'PUT',
        url:'http://216.10.245.166/maps/api/place/delete/json?key=qaclick123',
        body:
        
        {
          "place_id":placeId,
          }
      }).as('places')
      cy.get('@places').its('status').should('eq',200)
      cy.get('@places').then((response)=>{cy.log(JSON.stringify(response.body))})
    })

})