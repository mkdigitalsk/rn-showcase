export const ErrorStrings = {
  // Network errors
  NETWORK_CHECK_CONNECTION: 'Please check your internet connection.',
  NETWORK_TIMEOUT: 'Request timed out. Please try again.',
  NETWORK_UNEXPECTED: 'An unexpected error occurred',

  // API errors
  API_INVALID_REQUEST: 'Invalid request. Please check your input.',
  API_UNAUTHORIZED: 'Please log in again.',
  API_FORBIDDEN: "You don't have permission to access this.",
  API_NOT_FOUND: 'The requested resource was not found.',
  API_SERVER_ERROR: 'Server error. Please try again later.',
  API_SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.',
  API_GENERIC: 'Request failed. Please try again.',

  // Data errors
  DATA_PARSING: 'Unable to process server response',
  DATA_GENERIC: 'Unable to process data',
} as const;
