import type { AppError } from '../../foundation/errors/AppError';
export type SignUpEmailError = 'empty' | 'invalid_format' | 'already_exists';
export type SignUpPasswordError = 'empty' | 'too_short' | 'weak';
export type SignUpConfirmPasswordError = 'empty' | 'mismatch';

export interface SignUpUiState {
  email: string;
  password: string;
  confirmPassword: string;
  emailError: SignUpEmailError | null;
  passwordError: SignUpPasswordError | null;
  confirmPasswordError: SignUpConfirmPasswordError | null;
  isLoading: boolean;
  error: AppError | null;
}

export const initialSignUpUiState: SignUpUiState = {
  email: '',
  password: '',
  confirmPassword: '',
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
  isLoading: false,
  error: null,
};
