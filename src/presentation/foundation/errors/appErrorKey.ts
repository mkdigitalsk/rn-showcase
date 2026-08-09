import type { StringKey } from '../strings/en';
import { AppError } from './AppError';

// The only place an AppError becomes words; the screen passes the result to t().
export function appErrorKey(error: AppError): StringKey {
  switch (error) {
    case AppError.NoConnection:
      return 'error_no_connection';
    case AppError.Timeout:
      return 'error_timeout';
    case AppError.Unauthorized:
      return 'error_unauthorized';
    case AppError.NotFound:
      return 'error_not_found';
    case AppError.Server:
      return 'error_server';
    case AppError.Data:
      return 'error_data';
    case AppError.Generic:
      return 'error_generic';
  }
}
