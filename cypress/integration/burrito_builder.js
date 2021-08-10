describe('Main view', () => {

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

    it('Should display a button to submit an order', () => {
        cy.get('.submit').should('exist')
    })

    it('Should show all pre-existing orders', () => {
        cy.get('.all-orders').children().should('have.length', 3)
    })

    it('Should be able to enter a name and ingredients and submit a new order', () => {
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
          .get('.order-form').get('.submit').click()
          cy.get('.all-orders').children().should('have.length', 4)
      })

    it('Should not allow a user to submit an order without ingredients', () => {
        cy.get('input').type('Rachael');
        cy.get('.submit').click();
        cy.get('.all-orders').should('not.contain', 'Rachael');
    });

    it('Should not allow a user to submit an order without a name', () => {
        cy.get('#cilantro').click();
        cy.get('.submit').click();
        cy.get('.all-orders').children().should('have.length', 3)
        cy.get('.all-orders').should('not.contain', 'cilantro');
      });
})

describe('Network Request Error', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })
    
    it('Should display an error message if the server is down while getting orders', () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            statusCode: 500
        })
        cy.visit('http://localhost:3000');
        cy.get('.error-message').contains('Our servers seem to be down, please check back later!');
        cy.get('.all-orders').should('not.exist')
      });

    it.only('Should not post an order if there is a network request error', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            statusCode: 500 
        });
        cy.get('input').type('Michael');
        cy.get('#lettuce').click();
        cy.get('#cilantro').click();
        cy.get('.submit').click();
        cy.get('.all-orders').should('not.exist');
        cy.get('.error-message').should('be.visible');
    });
})
