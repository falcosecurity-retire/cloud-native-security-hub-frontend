describe('Home', function () {
  it('links each component', function () {
    cy.visit('/')

    cy.get('.card').contains('Apache').click()

    cy.get('h1').should('contain', 'Apache Falco Rules')
  })

  it('links each vendor', function () {
    cy.visit('/')

    cy.get('.vendor').eq(0).click()

    cy.get('h1').should('contain', 'Apache HTTP Server')
  })

  it('allows to search', function () {
    cy.visit('/')

    cy.get('#inputSearch').type('web')
    cy.get('.resultList').should('contain', 'Apache').and('contain', 'Nginx')

    cy.get('.resultList .result').contains('Nginx').click()
    cy.get('h1').should('contain', 'Nginx Falco Rules')
  })

  it('allows to filter', function () {
    cy.visit('/')

    cy.get('.card').should('contain', 'Apache').and('contain', 'Nginx').and('contain', 'etcd').and('contain', 'Rook')
    cy.get('.filter').contains('web').click()

    cy.get('.card').should('contain', 'Apache').and('contain', 'Nginx').and('not.contain', 'etcd').and('not.contain', 'Rook')
    cy.get('.filter').contains('storage').click()

    cy.get('.card').should('contain', 'Apache').and('contain', 'Nginx').and('not.contain', 'etcd').and('contain', 'Rook')
  })
})
