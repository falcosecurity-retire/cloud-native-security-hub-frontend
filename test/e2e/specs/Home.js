describe('Home', function () {
  it('links each component', function () {
    cy.visit('/')

    cy.get('.card').contains('Apache').click()

    cy.get('h2').should('contain', 'Apache')
  })
})
