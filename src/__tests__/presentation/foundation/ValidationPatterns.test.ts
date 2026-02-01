import { test } from '../../TestFunctions';
import {
  isValidEmail,
  isPasswordLongEnough,
  isValidPassword,
  MIN_PASSWORD_LENGTH,
} from '../../../presentation/foundation/ValidationPatterns';

describe('ValidationPatterns', () => {
  // === Email Validation ===

  describe('isValidEmail', () => {
    it('accepts standard email', () => {
      test({
        whenAction: () => isValidEmail('test@example.com'),
        then: (result) => expect(result).toBe(true),
      });
    });

    it('accepts email with subdomain', () => {
      test({
        whenAction: () => isValidEmail('user@mail.example.co.uk'),
        then: (result) => expect(result).toBe(true),
      });
    });

    it('accepts email with plus tag', () => {
      test({
        whenAction: () => isValidEmail('user+tag@example.com'),
        then: (result) => expect(result).toBe(true),
      });
    });

    it('rejects email without @ symbol', () => {
      test({
        whenAction: () => isValidEmail('testexample.com'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects email without domain', () => {
      test({
        whenAction: () => isValidEmail('test@'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects email without TLD', () => {
      test({
        whenAction: () => isValidEmail('test@example'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects empty string', () => {
      test({
        whenAction: () => isValidEmail(''),
        then: (result) => expect(result).toBe(false),
      });
    });
  });

  // === Password Length ===

  describe('isPasswordLongEnough', () => {
    it('accepts password with exactly MIN_PASSWORD_LENGTH chars', () => {
      test({
        whenAction: () => isPasswordLongEnough('a'.repeat(MIN_PASSWORD_LENGTH)),
        then: (result) => expect(result).toBe(true),
      });
    });

    it('accepts password longer than MIN_PASSWORD_LENGTH', () => {
      test({
        whenAction: () => isPasswordLongEnough('a'.repeat(MIN_PASSWORD_LENGTH + 5)),
        then: (result) => expect(result).toBe(true),
      });
    });

    it('rejects password shorter than MIN_PASSWORD_LENGTH', () => {
      test({
        whenAction: () => isPasswordLongEnough('a'.repeat(MIN_PASSWORD_LENGTH - 1)),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects empty password', () => {
      test({
        whenAction: () => isPasswordLongEnough(''),
        then: (result) => expect(result).toBe(false),
      });
    });
  });

  // === Password Strength ===

  describe('isValidPassword', () => {
    it('accepts strong password with all requirements', () => {
      test({
        whenAction: () => isValidPassword('Test123!'),
        then: (result) => expect(result).toBe(true),
      });
    });

    it('rejects password without uppercase', () => {
      test({
        whenAction: () => isValidPassword('test123!'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects password without lowercase', () => {
      test({
        whenAction: () => isValidPassword('TEST123!'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects password without digit', () => {
      test({
        whenAction: () => isValidPassword('TestTest!'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects password without special character', () => {
      test({
        whenAction: () => isValidPassword('Test1234'),
        then: (result) => expect(result).toBe(false),
      });
    });

    it('rejects short password even if complex', () => {
      test({
        whenAction: () => isValidPassword('Te1!'),
        then: (result) => expect(result).toBe(false),
      });
    });
  });
});
