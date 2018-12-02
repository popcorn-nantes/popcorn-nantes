/* eslint-disable */

describe('Tests', () => {
  it('Visits index page', () => {
    cy.visit('/');
    cy.contains('h1', 'Trouvez un·e développeur·e freelance à Nantes');
  });

});
