/// <reference types="cypress" />
import {
  productindexURL,
  productshowURL,
  LikeExistsURL,
} from '../../src/urls/index';
import { products } from '../fixtures/products.json';

describe('Index', () => {
  it('successfully', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/products?page=0', {
      fixture: 'infiniteproduct',
    });
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
    cy.visit('/products');
    cy.fixture('products').then((Products) => {
      cy.get(
        `[data-testid= ${Products.products[0].id}] > .card >.content >.header`,
      ).should('have.text', Products.products[0].name);
    });
  });
  it('faild', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/products?page=0', {
      statusCode: 404,
    });
    cy.visit('/products', { failOnStatusCode: false });
    cy.ErrorBoundary(
      'アイテムが存在しません。時間をおいてから再度アクセスしてください。',
    );
  });
});

describe('New', () => {
  it('successfully', () => {
    cy.intercept('POST', productindexURL, { statusCode: 201 });
    cy.visit('/products/new');
    cy.get('[data-testid =name] > input').type('coffee-name', { force: true });
    cy.get('[data-testid =shopname] > input').type('coffee-shop-name', {
      force: true,
    });
    cy.get('[data-testid =price] > input').type('1000', { force: true });
    cy.get('[data-testid =url] > input').type('http://www.example.com', {
      force: true,
    });
    cy.get('[data-testid =caption]').type('coffeeの説明文', { force: true });
    cy.get('[data-testid =submit]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/products');
    cy.FlashMessage('success', '登録に成功しました。');
  });
  it('failed', () => {
    cy.intercept('POST', productindexURL, { statusCode: 401 });
    cy.visit('/products/new');
    cy.get('[data-testid =name] > input').type('coffee-name', { force: true });
    cy.get('[data-testid =shopname] > input').type('coffee-shop-name', {
      force: true,
    });
    cy.get('[data-testid =price] > input').type('1000', { force: true });
    cy.get('[data-testid =url] > input').type('http://www.example.com', {
      force: true,
    });
    cy.get('[data-testid =caption]').type('coffeeの説明文', { force: true });
    cy.get('[data-testid =submit]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/products/new');
    cy.get('[data-testid =error]').should('have.text', '登録に失敗しました。');
  });
  it('error message (caption)', () => {
    cy.intercept('POST', productindexURL, { statusCode: 401 });
    cy.visit('/products/new');
    cy.get('[data-testid =name] > input').type('coffee-name', { force: true });
    cy.get('[data-testid =price] > input').type('1000', { force: true });
    cy.get('[data-testid =caption]').focus().blur();
    cy.FormErrorMessage('商品の説明が入力されていません。');
  });
});
describe('Show', () => {
  it('successfully(product[0])', () => {
    cy.intercept('GET', productshowURL(`${products[0].id}`), {
      statusCode: 200,
      body: { product: products[0] },
    });
    cy.intercept('GET', `${LikeExistsURL}?product_id=1`, {
      statusCode: 200,
      body: { count: 1, liked: false },
    });
    cy.visit(`/products/${products[0].id}`);
    cy.get('[data-testid = name]').should('have.text', products[0].name);
    cy.get('[data-testid = rate_average]').should('be.visible');
  });
  it('successfully(product[1])', () => {
    cy.intercept('GET', productshowURL(`${products[1].id}`), {
      statusCode: 200,
      body: { product: products[1] },
    });
    cy.intercept('GET', `${LikeExistsURL}?product_id=1`, {
      statusCode: 200,
      body: { count: 1, liked: false },
    });
    cy.visit(`/products/${products[1].id}`);
    cy.get('[data-testid = name]').should('have.text', products[1].name);
    cy.get('[data-testid = rate_average]').should(
      'have.text',
      '評価がまだありません。',
    );
  });
  it('failed', () => {
    cy.intercept('GET', productshowURL(`${products[0].id}`), {
      statusCode: 404,
    });
    cy.visit(`/products/${products[0].id}`, { failOnStatusCode: false });
    cy.ErrorBoundary(
      'アイテムが存在しません。時間をおいてから再度アクセスしてください。',
    );
  });
});
