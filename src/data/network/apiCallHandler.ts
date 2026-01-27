import { AxiosError } from 'axios';
import {
  NetworkException,
  ApiException,
  DataException,
  NetworkErrorCode,
} from '../../domain/exceptions/BaseException';
import { ErrorStrings } from '../../presentation/strings/errorStrings';

export async function handleApiCall<T>(call: () => Promise<T>): Promise<T> {
  try {
    return await call();
  } catch (error) {
    if (error instanceof AxiosError) {
      // Timeout
      if (error.code === 'ECONNABORTED') {
        throw new NetworkException(
          `Request timeout: ${error.message}`,
          ErrorStrings.NETWORK_TIMEOUT,
          NetworkErrorCode.TIMEOUT
        );
      }

      // Network error (no connection)
      if (error.code === 'ERR_NETWORK' || !error.response) {
        throw new NetworkException(
          `Network error: ${error.message}`,
          ErrorStrings.NETWORK_CHECK_CONNECTION,
          NetworkErrorCode.NO_CONNECTION
        );
      }

      // HTTP error responses
      const status = error.response?.status;
      if (status) {
        const userMessage = getUserMessageForStatus(status);
        throw new ApiException(status, error.message, userMessage);
      }
    }

    // JSON parsing error
    if (error instanceof SyntaxError) {
      throw new DataException(
        `JSON parsing error: ${error.message}`,
        ErrorStrings.DATA_PARSING
      );
    }

    // Re-throw if already our exception
    if (
      error instanceof NetworkException ||
      error instanceof ApiException ||
      error instanceof DataException
    ) {
      throw error;
    }

    // Unknown error
    throw new NetworkException(
      error instanceof Error ? error.message : 'Unknown error',
      ErrorStrings.NETWORK_UNEXPECTED
    );
  }
}

function getUserMessageForStatus(status: number): string {
  switch (status) {
    case 400:
      return ErrorStrings.API_INVALID_REQUEST;
    case 401:
      return ErrorStrings.API_UNAUTHORIZED;
    case 403:
      return ErrorStrings.API_FORBIDDEN;
    case 404:
      return ErrorStrings.API_NOT_FOUND;
    case 500:
      return ErrorStrings.API_SERVER_ERROR;
    case 502:
    case 503:
    case 504:
      return ErrorStrings.API_SERVICE_UNAVAILABLE;
    default:
      return ErrorStrings.API_GENERIC;
  }
}
