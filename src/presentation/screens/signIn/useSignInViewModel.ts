import { useState, useCallback, useEffect } from 'react';
import { TYPES } from '../../../app/diTypes';
import { SignInUseCase } from '../../../domain/useCases/auth/SignInUseCase';
import { SignInWithTokenUseCase } from '../../../domain/useCases/auth/SignInWithTokenUseCase';
import { IsBiometricEnabledUseCase } from '../../../domain/useCases/biometric/IsBiometricEnabledUseCase';
import { AuthenticateWithBiometricUseCase } from '../../../domain/useCases/biometric/AuthenticateWithBiometricUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { SignInUiState, initialSignInUiState, EmailError, PasswordError } from './SignInUiState';
import { isValidEmail, isPasswordLongEnough, isValidPassword } from '../../foundation/ValidationPatterns';

export const TEST_EMAIL = 'test01@mkdigital.sk';
export const TEST_PASSWORD = 'MKDigitalTest1@';

export const useSignInViewModel = () => {
  const [uiState, setUiState] = useState<SignInUiState>(initialSignInUiState);

  const signInUseCase = useResolve<SignInUseCase>(TYPES.SignInUseCase);
  const signInWithTokenUseCase = useResolve<SignInWithTokenUseCase>(TYPES.SignInWithTokenUseCase);
  const isBiometricEnabledUseCase = useResolve<IsBiometricEnabledUseCase>(TYPES.IsBiometricEnabledUseCase);
  const authenticateWithBiometricUseCase = useResolve<AuthenticateWithBiometricUseCase>(TYPES.AuthenticateWithBiometricUseCase);

  useEffect(() => {
    execute({
      action: () => isBiometricEnabledUseCase.execute(),
      onSuccess: available => setUiState(prev => ({ ...prev, biometricsAvailable: available })),
    });
  }, [isBiometricEnabledUseCase]);

  const onEmailChange = useCallback((email: string) => {
    setUiState(prev => ({ ...prev, email, emailError: null }));
  }, []);

  const onPasswordChange = useCallback((password: string) => {
    setUiState(prev => ({ ...prev, password, passwordError: null }));
  }, []);

  const validateEmail = useCallback((email: string): EmailError | null => {
    if (email.trim().length === 0) {
      return 'empty';
    }
    if (!isValidEmail(email)) {
      return 'invalid_format';
    }
    return null;
  }, []);

  const validatePassword = useCallback((password: string): PasswordError | null => {
    if (password.length === 0) {
      return 'empty';
    }
    if (!isPasswordLongEnough(password)) {
      return 'too_short';
    }
    if (!isValidPassword(password)) {
      return 'weak';
    }
    return null;
  }, []);

  const signIn = useCallback(
    (onSignedIn?: () => void): void => {
      const emailError = validateEmail(uiState.email);
      const passwordError = validatePassword(uiState.password);

      if (emailError || passwordError) {
        setUiState(prev => ({ ...prev, emailError, passwordError, signInFailed: false }));
        return;
      }

      execute({
        action: () => signInUseCase.execute({ email: uiState.email, password: uiState.password }),
        onLoading: () => setUiState(prev => ({ ...prev, isLoading: true, signInFailed: false })),
        onSuccess: () => {
          setUiState(prev => ({ ...prev, isLoading: false }));
          onSignedIn?.();
        },
        onError: () => setUiState(prev => ({ ...prev, isLoading: false, signInFailed: true })),
      });
    },
    [uiState.email, uiState.password, validateEmail, validatePassword, signInUseCase]
  );

  const authenticateWithBiometrics = useCallback(
    (onAuthenticated?: () => void): void => {
      execute({
        action: () => authenticateWithBiometricUseCase.execute(),
        onLoading: () => setUiState(prev => ({ ...prev, biometricsLoading: true })),
        onSuccess: result => {
          setUiState(prev => ({
            ...prev,
            biometricsLoading: false,
            biometricsResult: result,
          }));
          if (result.type === 'success') {
            onAuthenticated?.();
          }
        },
        onError: error =>
          setUiState(prev => ({
            ...prev,
            biometricsLoading: false,
            biometricsResult: { type: 'failed', message: error.userMessage },
          })),
      });
    },
    [authenticateWithBiometricUseCase]
  );

  const restoreSession = useCallback(
    (onRestored?: () => void): void => {
      execute({
        action: () => signInWithTokenUseCase.execute(),
        onLoading: () => setUiState(prev => ({ ...prev, isLoading: true })),
        onSuccess: user => {
          setUiState(prev => ({ ...prev, isLoading: false }));
          if (user) {
            onRestored?.();
          }
        },
        onError: () => setUiState(prev => ({ ...prev, isLoading: false })),
      });
    },
    [signInWithTokenUseCase]
  );

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
    signIn,
    restoreSession,
    authenticateWithBiometrics,
    fillTestAccount,
  };
};
