export enum NetworkErrorCode {
  TIMEOUT = '1000',
  NO_CONNECTION = '1001',
  UNKNOWN = '1002',
}

export enum DataErrorCode {
  PARSING = '3000',
  SERIALIZATION = '3001',
  UNKNOWN = '3002',
}

export abstract class BaseException extends Error {
  abstract readonly errorCode: string;
  abstract readonly userMessage: string;
  readonly shouldReport: boolean = true;
  readonly originalCause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.originalCause = cause;
  }
}

export class NetworkException extends BaseException {
  readonly errorCode: string;
  readonly userMessage: string;

  constructor(
    message: string = 'Network error occurred',
    userMessage: string = 'Please check your internet connection',
    errorCode: string = NetworkErrorCode.UNKNOWN
  ) {
    super(message);
    this.userMessage = userMessage;
    this.errorCode = errorCode;
  }
}

export class ApiException extends BaseException {
  readonly httpCode: number;
  readonly errorCode: string;
  readonly userMessage: string;

  constructor(
    httpCode: number,
    message: string = 'API error occurred',
    userMessage: string = 'Something went wrong. Please try again.'
  ) {
    super(message);
    this.httpCode = httpCode;
    this.errorCode = `2-${httpCode}`;
    this.userMessage = userMessage;
  }
}

export class DataException extends BaseException {
  readonly errorCode: string;
  readonly userMessage: string;

  constructor(
    message: string = 'Data parsing error',
    userMessage: string = 'Unable to process data',
    errorCode: string = DataErrorCode.PARSING
  ) {
    super(message);
    this.userMessage = userMessage;
    this.errorCode = errorCode;
  }
}

export class UnknownException extends BaseException {
  readonly errorCode: string = '9000';
  readonly userMessage: string = 'An unexpected error occurred';

  constructor(cause?: Error) {
    super(cause?.message ?? 'Unknown error', cause);
  }
}
