/// <reference types="cypress" />
import {
  sessionvalidateURL,
  productshowURL,
  LikeCreateURL,
  LikeExistsURL,
  LikeDestroyURL,
} from '../../src/urls/index';
import { products } from '../fixtures/products.json';
import currentuser from '../fixtures/currentuser.json';
import { like } from '../fixtures/like.json';

describe('Create', () => {
  beforeEach(() => {
    cy.Logined(currentuser);
    cy.intercept('GET', productshowURL(`${products[0].id}`), {
      statusCode: 200,
      body: { product: products[0] },
    });
    cy.intercept('GET', `${LikeExistsURL}?product_id=1`, {
      statusCode: 200,
      body: { count: 1, liked: false },
    });
  });
  it('successfully', () => {
    cy.intercept('POST', LikeCreateURL, { statusCode: 201 });
    cy.visit(`/products/${products[0].id}`);
    cy.get('[data-testid = create]').click({ force: true });
    cy.get('[data-testid = destroy]').should('have.text', '2');
  });

  it('failed', () => {
    cy.intercept('POST', LikeCreateURL, { statusCode: 500 });
    cy.visit(`/products/${products[0].id}`);
    cy.get('[data-testid = create]').click({ force: true });
    cy.FlashMessage('error', 'エラーが発生しました。');
  });
});

describe('Destroy', () => {
  beforeEach(() => {
    cy.Logined(currentuser);
    cy.intercept('GET', productshowURL(`${products[0].id}`), {
      statusCode: 200,
      body: { product: products[0] },
    });
    cy.intercept('GET', `${LikeExistsURL}?product_id=1`, {
      statusCode: 200,
      body: like,
    });
  });
  it('successfully', () => {
    cy.intercept('DELETE', LikeDestroyURL(`${products[0].id}`), {
      statusCode: 201,
    });
    cy.visit(`/products/${products[0].id}`);
    cy.get('[data-testid=destroy]').click({ force: true });
    cy.get('[data-testid=create]').should('have.text', '1');
  });
  it('failed', () => {
    cy.intercept('DELETE', LikeDestroyURL(`${products[0].id}`), {
      statusCode: 500,
    });
    cy.visit(`/products/${products[0].id}`);
    cy.get('[data-testid=destroy]').click({ force: true });
    cy.FlashMessage('error', 'エラーが発生しました。');
  });
});
