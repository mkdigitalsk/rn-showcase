import { useState, useCallback, useEffect } from 'react';
import { TYPES } from '../../../app/diTypes';
import { LoginUseCase } from '../../../domain/useCases/auth/LoginUseCase';
import { IsBiometricEnabledUseCase } from '../../../domain/useCases/biometric/IsBiometricEnabledUseCase';
import { AuthenticateWithBiometricUseCase } from '../../../domain/useCases/biometric/AuthenticateWithBiometricUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { LoginUiState, initialLoginUiState, EmailError, PasswordError } from './LoginUiState';
import { isValidEmail, isPasswordLongEnough, isValidPassword } from '../../foundation/ValidationPatterns';

const TEST_EMAIL = 'test01@mkdigital.sk';
const TEST_PASSWORD = 'MKDigitalTest1@';

export const useLoginViewModel = () => {
  const [uiState, setUiState] = useState<LoginUiState>(initialLoginUiState);

  const loginUseCase = useResolve<LoginUseCase>(TYPES.LoginUseCase);
  const isBiometricEnabledUseCase = useResolve<IsBiometricEnabledUseCase>(TYPES.IsBiometricEnabledUseCase);
  const authenticateWithBiometricUseCase = useResolve<AuthenticateWithBiometricUseCase>(TYPES.AuthenticateWithBiometricUseCase);

  useEffect(() => {
    execute({
      action: () => isBiometricEnabledUseCase.execute(),
      onSuccess: (available) => setUiState(prev => ({ ...prev, biometricsAvailable: available })),
    });
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

  const login = useCallback((onLoggedIn?: () => void): void => {
    const emailError = validateEmail(uiState.email);
    const passwordError = validatePassword(uiState.password);

    if (emailError || passwordError) {
      setUiState(prev => ({ ...prev, emailError, passwordError, loginFailed: false }));
      return;
    }

    execute({
      action: () => loginUseCase.execute({ email: uiState.email, password: uiState.password }),
      onLoading: () => setUiState(prev => ({ ...prev, isLoading: true, loginFailed: false })),
      onSuccess: () => {
        setUiState(prev => ({ ...prev, isLoading: false }));
        onLoggedIn?.();
      },
      onError: () => setUiState(prev => ({ ...prev, isLoading: false, loginFailed: true })),
    });
  }, [uiState.email, uiState.password, validateEmail, validatePassword, loginUseCase]);

  const authenticateWithBiometrics = useCallback((onAuthenticated?: () => void): void => {
    execute({
      action: () => authenticateWithBiometricUseCase.execute(),
      onLoading: () => setUiState(prev => ({ ...prev, biometricsLoading: true })),
      onSuccess: (result) => {
        setUiState(prev => ({
          ...prev,
          biometricsLoading: false,
          biometricsResult: result,
        }));
        if (result.type === 'success') {
          onAuthenticated?.();
        }
      },
      onError: (error) => setUiState(prev => ({
        ...prev,
        biometricsLoading: false,
        biometricsResult: { type: 'failed', message: error.userMessage },
      })),
    });
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
