/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.intercept('GET', 'http://localhost:3001/api/products', {
      fixture: 'products',
    }).as('Products');
    cy.intercept(
      'GET',
      'http://localhost:3001/uploads/product/image/1/product-01.jpg',
      {
        fixture: 'images/product-01.jpg',
      },
    );
    cy.intercept(
      'GET',
      'http://localhost:3001/uploads/product/image/2/product-02.jpg',
      {
        fixture: 'images/product-02.jpg',
      },
    );
    cy.intercept(
      'GET',
      'http://localhost:3001/uploads/product/image/3/product-03.jpg',
      {
        fixture: 'images/product-03.jpg',
      },
    );
    cy.visit('/');
    cy.wait('@Products').then(console.log);
    cy.fixture('products').then((Products) => {
      cy.get(
        `[data-rankid= ${Products.products[0].id}] > .card >.content >.header`,
      ).should('have.text', Products.products[0].name);
    });
  });
});
