/// <reference types="cypress" />
import { RegistrationNewURL } from '../../src/urls/index';

describe('Sign up', () => {
  it('successfully', () => {
    cy.intercept('POST', RegistrationNewURL, { statusCode: 200 });
    cy.visit('/sign_up');
    cy.get('[data-testid =name ] > input').type('test', { force: true });
    cy.get('[data-testid =email ] > input').type('test@example.com', {
      force: true,
    });
    cy.get('[data-testid =password ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid =password_confirmation ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid = submit]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/send_mail');
  });
  it('failed', () => {
    cy.intercept('POST', RegistrationNewURL, { statusCode: 401 });
    cy.visit('/sign_up');
    cy.get('[data-testid =name ] > input').type('test', { force: true });
    cy.get('[data-testid =email ] > input').type('test@example.com', {
      force: true,
    });
    cy.get('[data-testid =password ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid =password_confirmation ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid = submit]').click({ force: true });
    cy.url().should('eq', 'http://localhost:3000/sign_up');
    cy.FlashMessage('error', '登録に失敗しました。');
  });
  it('form failed(name.minlength)', () => {
    cy.visit('/sign_up');
    cy.get('[data-testid =name ] > input').type('t', { force: true });
    cy.get('[data-testid =email ] > input').type('test@example.com', {
      force: true,
    });
    cy.get('[data-testid =password ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid =password_confirmation ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid = submit]').click({ force: true });
    cy.FormErrorMessage('アカウント名は最低2文字以上必要です');
  });
  it('form failed(email)', () => {
    cy.visit('/sign_up');
    cy.get('[data-testid =name ] > input').type('test', { force: true });
    cy.get('[data-testid =email ] > input').type(' ', { force: true });
    cy.get('[data-testid =password ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid =password_confirmation ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid = submit]').click({ force: true });
    cy.FormErrorMessage('メールアドレスが入力されていません。');
  });
  it('form failed(password)', () => {
    cy.visit('/sign_up');
    cy.get('[data-testid =name ] > input').type('test', { force: true });
    cy.get('[data-testid =email ] > input').type('test@example.com', {
      force: true,
    });
    cy.get('[data-testid =password ] > input').type(' ', { force: true });
    cy.get('[data-testid =password_confirmation ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid = submit]').click({ force: true });
    cy.FormErrorMessage(
      'パスワードは最低８文字以上必要ですパスワードが一致しません',
    );
  });
  it('form failed(password_confirmation)', () => {
    cy.intercept('POST', RegistrationNewURL, { statusCode: 401 });
    cy.visit('/sign_up');
    cy.get('[data-testid =name ] > input').type('test', { force: true });
    cy.get('[data-testid =email ] > input').type('test@example.com', {
      force: true,
    });
    cy.get('[data-testid =password ] > input').type('password', {
      force: true,
    });
    cy.get('[data-testid =password_confirmation ] > input').type('passwerd', {
      force: true,
    });
    cy.get('[data-testid = submit]').click({ force: true });
    cy.get('[data-testid =password_confirmation ] > input').type(
      '{backspace}',
      { force: true },
    );
    cy.FormErrorMessage('パスワードが一致しません');
  });
});
