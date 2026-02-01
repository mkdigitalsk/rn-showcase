import { useState, useCallback, useEffect, useMemo } from 'react';
import { container } from 'tsyringe';
import { TYPES } from '../../../app/diTypes';
import { IsBiometricEnabledUseCase } from '../../../domain/useCases/biometric/IsBiometricEnabledUseCase';
import { AuthenticateWithBiometricUseCase } from '../../../domain/useCases/biometric/AuthenticateWithBiometricUseCase';
import { LoginUiState, initialLoginUiState, EmailError, PasswordError } from './LoginUiState';
import { isValidEmail, isPasswordLongEnough, isValidPassword, MIN_PASSWORD_LENGTH } from '../../foundation/ValidationPatterns';

const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'Test123!';

export const useLoginViewModel = () => {
  const [uiState, setUiState] = useState<LoginUiState>(initialLoginUiState);

  const isBiometricEnabledUseCase = useMemo(
    () => container.resolve<IsBiometricEnabledUseCase>(TYPES.IsBiometricEnabledUseCase), [],
  );
  const authenticateWithBiometricUseCase = useMemo(
    () => container.resolve<AuthenticateWithBiometricUseCase>(TYPES.AuthenticateWithBiometricUseCase), [],
  );

  useEffect(() => {
    const checkBiometrics = async () => {
      const available = await isBiometricEnabledUseCase.execute();
      setUiState(prev => ({ ...prev, biometricsAvailable: available }));
    };
    checkBiometrics();
  }, [isBiometricEnabledUseCase]);

  const onEmailChange = useCallback((email: string) => {
    setUiState(prev => ({ ...prev, email, emailError: null }));
  }, []);

  const onPasswordChange = useCallback((password: string) => {
    setUiState(prev => ({ ...prev, password, passwordError: null }));
  }, []);

  const validateEmail = useCallback((email: string): EmailError | null => {
    if (email.trim().length === 0) { return 'empty'; }
    if (!isValidEmail(email)) { return 'invalid_format'; }
    return null;
  }, []);

  const validatePassword = useCallback((password: string): PasswordError | null => {
    if (password.length === 0) { return 'empty'; }
    if (!isPasswordLongEnough(password)) { return 'too_short'; }
    if (!isValidPassword(password)) { return 'weak'; }
    return null;
  }, []);

  const login = useCallback((): boolean => {
    const emailError = validateEmail(uiState.email);
    const passwordError = validatePassword(uiState.password);

    if (emailError || passwordError) {
      setUiState(prev => ({ ...prev, emailError, passwordError }));
      return false;
    }

    return true;
  }, [uiState.email, uiState.password, validateEmail, validatePassword]);

  const authenticateWithBiometrics = useCallback(async (): Promise<boolean> => {
    setUiState(prev => ({ ...prev, biometricsLoading: true }));
    const result = await authenticateWithBiometricUseCase.execute();
    setUiState(prev => ({
      ...prev,
      biometricsLoading: false,
      biometricsResult: result,
    }));
    return result.type === 'success';
  }, [authenticateWithBiometricUseCase]);

  const fillTestAccount = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      emailError: null,
      passwordError: null,
    }));
  }, []);

  return {
    uiState,
    onEmailChange,
    onPasswordChange,
    login,
    authenticateWithBiometrics,
    fillTestAccount,
  };
};
