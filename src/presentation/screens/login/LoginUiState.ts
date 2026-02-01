import { BiometricResult } from '../../../domain/repositories/BiometricRepository';

export type EmailError = 'empty' | 'invalid_format';
export type PasswordError = 'empty' | 'too_short' | 'weak';

export interface LoginUiState {
  email: string;
  password: string;
  emailError: EmailError | null;
  passwordError: PasswordError | null;
  biometricsAvailable: boolean;
  biometricsLoading: boolean;
  biometricsResult: BiometricResult | null;
}

export const initialLoginUiState: LoginUiState = {
  email: '',
  password: '',
  emailError: null,
  passwordError: null,
  biometricsAvailable: false,
  biometricsLoading: false,
  biometricsResult: null,
};
