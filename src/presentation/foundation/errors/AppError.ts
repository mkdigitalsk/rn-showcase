import { ApiException, BaseException, DataException, NetworkErrorCode, NetworkException } from '../../../domain/exceptions/BaseException';

/**
 * What a failure means to the person looking at the screen. A view model maps a domain exception to
 * one of these; the screen turns it into text, so no string is resolved outside the UI.
 */
export enum AppError {
  NoConnection = 'NoConnection',
  Timeout = 'Timeout',
  Unauthorized = 'Unauthorized',
  NotFound = 'NotFound',
  Server = 'Server',
  Data = 'Data',
  Generic = 'Generic',
}

const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_SERVER_ERROR = 500;

/**
 * Collapsing to Generic is the intended outcome for anything the user cannot act on differently —
 * the alternative is a case per HTTP status that all say the same sentence.
 */
export function toAppError(error: BaseException): AppError {
  if (error instanceof NetworkException) {
    switch (error.errorCode) {
      case NetworkErrorCode.NO_CONNECTION:
        return AppError.NoConnection;
      case NetworkErrorCode.TIMEOUT:
        return AppError.Timeout;
      default:
        return AppError.Generic;
    }
  }

  if (error instanceof ApiException) {
    if (error.httpCode === HTTP_UNAUTHORIZED) return AppError.Unauthorized;
    if (error.httpCode === HTTP_NOT_FOUND) return AppError.NotFound;
    if (error.httpCode >= HTTP_SERVER_ERROR) return AppError.Server;
    return AppError.Generic;
  }

  if (error instanceof DataException) return AppError.Data;

  return AppError.Generic;
}
