export type SignUpNameError = 'empty';
export type SignUpEmailError = 'empty' | 'invalid_format' | 'already_exists';
export type SignUpPasswordError = 'empty' | 'too_short' | 'weak';
export type SignUpConfirmPasswordError = 'empty' | 'mismatch';

export interface SignUpUiState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nameError: SignUpNameError | null;
  emailError: SignUpEmailError | null;
  passwordError: SignUpPasswordError | null;
  confirmPasswordError: SignUpConfirmPasswordError | null;
  isLoading: boolean;
}

export const initialSignUpUiState: SignUpUiState = {
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
