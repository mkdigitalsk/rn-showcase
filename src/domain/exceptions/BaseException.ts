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
  abstract readonly logMessage: string;
  readonly shouldReport: boolean = true;
  readonly originalCause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.originalCause = cause;
  }
}

export class NetworkException extends BaseException {
  readonly errorCode: NetworkErrorCode;
  readonly logMessage: string;

  constructor(
    message: string = 'Network error occurred',
    logMessage: string = 'Please check your internet connection',
    errorCode: NetworkErrorCode = NetworkErrorCode.UNKNOWN
  ) {
    super(message);
    this.logMessage = logMessage;
    this.errorCode = errorCode;
  }
}

export class ApiException extends BaseException {
  readonly httpCode: number;
  readonly errorCode: string;
  readonly logMessage: string;

  constructor(httpCode: number, message: string = 'API error occurred', logMessage: string = 'Something went wrong. Please try again.') {
    super(message);
    this.httpCode = httpCode;
    this.errorCode = `2-${httpCode}`;
    this.logMessage = logMessage;
  }
}

export class DataException extends BaseException {
  readonly errorCode: DataErrorCode;
  readonly logMessage: string;

  constructor(
    message: string = 'Data parsing error',
    logMessage: string = 'Unable to process data',
    errorCode: DataErrorCode = DataErrorCode.PARSING
  ) {
    super(message);
    this.logMessage = logMessage;
    this.errorCode = errorCode;
  }
}

export class UnknownException extends BaseException {
  readonly errorCode: string = '9000';
  readonly logMessage: string = 'An unexpected error occurred';

  constructor(cause?: Error) {
    super(cause?.message ?? 'Unknown error', cause);
  }
}
