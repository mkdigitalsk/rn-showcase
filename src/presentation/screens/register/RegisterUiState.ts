export type RegisterNameError = 'empty';
export type RegisterEmailError = 'empty' | 'invalid_format' | 'already_exists';
export type RegisterPasswordError = 'empty' | 'too_short' | 'weak';
export type RegisterConfirmPasswordError = 'empty' | 'mismatch';

export interface RegisterUiState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nameError: RegisterNameError | null;
  emailError: RegisterEmailError | null;
  passwordError: RegisterPasswordError | null;
  confirmPasswordError: RegisterConfirmPasswordError | null;
  isLoading: boolean;
}

export const initialRegisterUiState: RegisterUiState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  nameError: null,
  emailError: null,
  passwordError: null,
  confirmPasswordError: null,
  isLoading: false,
};
