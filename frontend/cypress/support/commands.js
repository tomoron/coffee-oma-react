import { sessionvalidateURL } from '../../src/urls/index';

Cypress.Commands.add('Logined', (login_user) => {
  cy.setCookie(
    'token',
    '{"access-token":"access-token","client":"client","uid":"uid"}',
  );
  cy.intercept('GET', sessionvalidateURL, {
    statusCode: 200,
    body: login_user,
  }).as('Validate');
});
Cypress.Commands.add('FormErrorMessage', (errormessage) => {
  cy.get('.ui.pointing.below.prompt.label').should('have.text', errormessage);
});
