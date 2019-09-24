describe('Sitemap', function () {
  it('generates properly', function () {
    cy.request('/sitemap.xml').its('body')
      .should('include', '<url><loc>http://localhost:3000/components/apache</loc></url>')
      .and('include', '<url><loc>http://localhost:3000/vendors/apache</loc></url>')
      .and('include', `<url><loc>${Cypress.env('BASE_URL')}/</loc></url>`)
  })
})
