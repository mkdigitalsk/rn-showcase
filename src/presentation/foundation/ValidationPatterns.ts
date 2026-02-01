export const MIN_PASSWORD_LENGTH = 8;

export const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Requires: lowercase, uppercase, digit, special char (@$!%*?&)
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function isPasswordLongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function isValidPassword(password: string): boolean {
  return isPasswordLongEnough(password) && PASSWORD_REGEX.test(password);
}
