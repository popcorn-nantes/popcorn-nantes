/* eslint-disable */

describe('Tests', () => {
  it('Visits index page', () => {
    cy.visit('/')
    cy.contains('h1', 'Trouvez un·e développeur·e freelance à Nantes')
    cy.get('#person-yann-boisselier').within(() => {
      cy.get('h2').contains('Développeur JavaScript FullStack')
      cy.get('h3').contains("10 ans d'expérience")
      cy.get('.domaines-metiers').contains('sites web')
      cy.get('.technologies').contains('Vue')
      cy.get('.technologies').contains('React')
      cy.get('.technologies').contains('GraphQL')
      cy.get('.technologies').contains('Nuxt')
      cy.get('.technologies').contains('Next')
      cy.get('.button').click()
    })
  })
})
