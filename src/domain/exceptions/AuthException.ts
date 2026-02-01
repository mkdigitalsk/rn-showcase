import { BaseException } from './BaseException';

export class EmailAlreadyExistsException extends BaseException {
  readonly errorCode: string = '4000';
  readonly userMessage: string = 'This email is already registered';

  constructor() {
    super('Email already exists');
  }
}
