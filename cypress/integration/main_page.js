describe('Main View', () => {

    beforeEach(() => {
        cy.fixture('orders_stub.json')
            .then(orders => {
                cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
                    statusCode: 200,
                    body: orders
                })
                cy.visit('http://localhost:3000/')
            })    
    })

    it('Should display the title of the site on page load', () => {
        cy.get('h1').contains('Burrito Builder')
    })

    it('Should display a form where a user can input their name', () => {
        cy.get('main').get('.order-form').get('input').invoke('attr', 'placeholder').should('contain', 'Name')
    })

    it('Should show pre-existing orders', () => {
        cy.get('.all-orders').children().should('have.length', 3)
    })

    it('Should be able to enter a name and choose ingredients', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: { 
              name: "Rachael", 
              ingredients: ["lettuce","carnitas"] 
            }
        })
        cy.get('input').type('Rachael')
          .get('#lettuce').click()
          .get('#carnitas').click()
          .get('#submit-button').click()
        cy.get('section').children().should('have.length', 4)
      })

})