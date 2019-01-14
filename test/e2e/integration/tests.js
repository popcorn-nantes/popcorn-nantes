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
      cy.get('.technologies').contains('GraphQL')
      cy.get('.technologies').contains('Nuxt')
      cy.get('.button').click()
      cy.url().should('contain', '/person/yann-boisselier') // => true
    })
  })
  it('Visits a profile page', () => {
    cy.visit('/person/yann-boisselier')
    cy.get('h1').contains('Yann Boisselier')
    cy.get('h2').contains('Développeur JavaScript FullStack')
    cy.get('.technologies').contains('Vue')
    cy.get('.technologies').contains('GraphQL')
    cy.get('.technologies').contains('Nuxt')
    cy.get('.domaines-metiers').contains('sites web')
  })
  it('Click on contact person in profile page', () => {
    cy.visit('/person/yann-boisselier')
    cy.contains('Proposer un projet').click()
    cy.get('.modal .title').contains('Contacter Yann Boisselier')
  })
})
