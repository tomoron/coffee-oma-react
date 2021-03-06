/// <reference types="cypress" />
import {
  sessionvalidateURL,
  RegistrationShowURL,
  FollowURL,
  FollowExistsURL,
  FollowDestroyURL,
} from '../../src/urls/index';
import { products } from '../fixtures/products.json';
import currentuser from '../fixtures/currentuser.json';
import { users } from '../fixtures/users.json';
import { follow } from '../fixtures/follow.json';

describe('Create', () => {
  beforeEach(() => {
    cy.Logined(currentuser);
    cy.intercept('GET', RegistrationShowURL(`${users[1].id}`), {
      statusCode: 200,
      body: { data: users[1] },
    });
    cy.intercept('GET', `${FollowExistsURL}?follow_id=${users[1].id}`, {
      statusCode: 200,
      body: { follow },
    });
  });
  it('successfully', () => {
    cy.intercept('POST', FollowURL, { statusCode: 201 });
    cy.visit(`/registration/${users[1].id}`);
    cy.get('[data-testid = create]', { includeShadowDom: true }).click({
      force: true,
    });
    cy.get('[data-testid = destroy]', { includeShadowDom: true }).should(
      'have.text',
      'フォロー解除',
    );
  });
  it('failed', () => {
    cy.intercept('POST', FollowURL, { statusCode: 500 });
    cy.visit(`/registration/${users[1].id}`);
    cy.get('[data-testid = create]', { includeShadowDom: true }).click({
      force: true,
    });
    cy.FlashMessage('error', 'エラーが発生しました。');
  });
});

describe('Destory', () => {
  beforeEach(() => {
    cy.Logined(currentuser);
    cy.intercept('GET', RegistrationShowURL(`${users[1].id}`), {
      statusCode: 200,
      body: { data: users[1] },
    });
    cy.intercept('GET', `${FollowExistsURL}?follow_id=${users[1].id}`, {
      statusCode: 200,
      body: { follow: true },
    });
  });
  it('successfully', () => {
    cy.intercept('DELETE', FollowDestroyURL(`${users[1].id}`), {
      statusCode: 201,
    });
    cy.visit(`/registration/${users[1].id}`);
    cy.get('[data-testid = destroy]', { includeShadowDom: true }).click({
      force: true,
    });
    cy.get('[data-testid = create]', { includeShadowDom: true }).should(
      'have.text',
      'フォローする',
    );
  });
  it('failed', () => {
    cy.intercept('DELETE', FollowDestroyURL(`${users[1].id}`), {
      statusCode: 500,
    });
    cy.visit(`/registration/${users[1].id}`);
    cy.get('[data-testid = destroy]', { includeShadowDom: true }).click({
      force: true,
    });
    cy.FlashMessage('error', 'エラーが発生しました。');
  });
});
