import { useState, useCallback } from 'react';
import {
  SignUpUiState,
  initialSignUpUiState,
  SignUpNameError,
  SignUpEmailError,
  SignUpPasswordError,
  SignUpConfirmPasswordError,
} from './SignUpUiState';
import { isValidEmail, isPasswordLongEnough, isValidPassword } from '../../foundation/ValidationPatterns';
import { execute } from '../../hooks/useExecute';
import { useResolve } from '../../hooks/useResolve';
import { CheckEmailExistsUseCase } from '../../../domain/useCases/auth/CheckEmailExistsUseCase';
import { SignUpUseCase } from '../../../domain/useCases/auth/SignUpUseCase';
import { EmailAlreadyExistsException } from '../../../domain/exceptions/AuthException';
import { TYPES } from '../../../app/diTypes';

export const useSignUpViewModel = () => {
  const [uiState, setUiState] = useState<SignUpUiState>(initialSignUpUiState);

  const checkEmailExistsUseCase = useResolve<CheckEmailExistsUseCase>(TYPES.CheckEmailExistsUseCase);
  const signUpUseCase = useResolve<SignUpUseCase>(TYPES.SignUpUseCase);

  const onNameChange = useCallback((name: string) => {
    setUiState(prev => ({ ...prev, name, nameError: null }));
  }, []);

  const onEmailChange = useCallback((email: string) => {
    setUiState(prev => ({ ...prev, email, emailError: null }));
  }, []);

  const onPasswordChange = useCallback((password: string) => {
    setUiState(prev => ({ ...prev, password, passwordError: null }));
  }, []);

  const onConfirmPasswordChange = useCallback((confirmPassword: string) => {
    setUiState(prev => ({ ...prev, confirmPassword, confirmPasswordError: null }));
  }, []);

  const validateName = useCallback((name: string): SignUpNameError | null => {
    if (name.trim().length === 0) {
      return 'empty';
    }
    return null;
  }, []);

  const validateEmail = useCallback((email: string): SignUpEmailError | null => {
    if (email.trim().length === 0) {
      return 'empty';
    }
    if (!isValidEmail(email)) {
      return 'invalid_format';
    }
    return null;
  }, []);

  const validatePassword = useCallback((password: string): SignUpPasswordError | null => {
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

  const validateConfirmPassword = useCallback((password: string, confirmPassword: string): SignUpConfirmPasswordError | null => {
    if (confirmPassword.length === 0) {
      return 'empty';
    }
    if (password !== confirmPassword) {
      return 'mismatch';
    }
    return null;
  }, []);

  const signUp = useCallback(
    (onSignedUp?: () => void): void => {
      const nameError = validateName(uiState.name);
      const emailError = validateEmail(uiState.email);
      const passwordError = validatePassword(uiState.password);
      const confirmPasswordError = validateConfirmPassword(uiState.password, uiState.confirmPassword);

      if (nameError || emailError || passwordError || confirmPasswordError) {
        setUiState(prev => ({ ...prev, nameError, emailError, passwordError, confirmPasswordError }));
        return;
      }

      execute({
        action: async () => {
          const exists = await checkEmailExistsUseCase.execute(uiState.email);
          if (exists) {
            throw new EmailAlreadyExistsException();
          }
          return signUpUseCase.execute({ name: uiState.name, email: uiState.email, password: uiState.password });
        },
        onLoading: () => setUiState(prev => ({ ...prev, isLoading: true })),
        onSuccess: () => {
          setUiState(prev => ({ ...prev, isLoading: false }));
          onSignedUp?.();
        },
        onError: error => {
          if (error instanceof EmailAlreadyExistsException) {
            setUiState(prev => ({ ...prev, isLoading: false, emailError: 'already_exists' }));
          } else {
            setUiState(prev => ({ ...prev, isLoading: false }));
          }
        },
      });
    },
    [
      uiState.name,
      uiState.email,
      uiState.password,
      uiState.confirmPassword,
      validateName,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      checkEmailExistsUseCase,
      signUpUseCase,
    ]
  );

  return {
    uiState,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    signUp,
  };
};
