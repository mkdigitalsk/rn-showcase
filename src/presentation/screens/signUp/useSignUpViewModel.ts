import { useState, useCallback } from 'react';
import { toAppError } from '../../foundation/errors/AppError';
import { SignUpUiState, initialSignUpUiState, SignUpEmailError, SignUpPasswordError, SignUpConfirmPasswordError } from './SignUpUiState';
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

  const onEmailChange = useCallback((email: string) => {
    setUiState(prev => ({ ...prev, email, emailError: null }));
  }, []);

  const onPasswordChange = useCallback((password: string) => {
    setUiState(prev => ({ ...prev, password, passwordError: null }));
  }, []);

  const onConfirmPasswordChange = useCallback((confirmPassword: string) => {
    setUiState(prev => ({ ...prev, confirmPassword, confirmPasswordError: null }));
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
      const emailError = validateEmail(uiState.email);
      const passwordError = validatePassword(uiState.password);
      const confirmPasswordError = validateConfirmPassword(uiState.password, uiState.confirmPassword);

      if (emailError || passwordError || confirmPasswordError) {
        setUiState(prev => ({ ...prev, emailError, passwordError, confirmPasswordError }));
        return;
      }

      execute({
        action: async () => {
          const exists = await checkEmailExistsUseCase.execute(uiState.email);
          if (exists) {
            throw new EmailAlreadyExistsException();
          }
          return signUpUseCase.execute({ email: uiState.email, password: uiState.password });
        },
        onLoading: () => setUiState(prev => ({ ...prev, isLoading: true })),
        onSuccess: () => {
          setUiState(prev => ({ ...prev, isLoading: false }));
          onSignedUp?.();
        },
        onError: error => {
          // A taken email belongs on the email field; anything else is not about one field, so it
          // goes to the form-level error rather than being dropped.
          if (error instanceof EmailAlreadyExistsException) {
            setUiState(prev => ({ ...prev, isLoading: false, emailError: 'already_exists', error: null }));
          } else {
            setUiState(prev => ({ ...prev, isLoading: false, error: toAppError(error) }));
          }
        },
      });
    },
    [
      uiState.email,
      uiState.password,
      uiState.confirmPassword,
      validateEmail,
      validatePassword,
      validateConfirmPassword,
      checkEmailExistsUseCase,
      signUpUseCase,
    ]
  );

  return {
    uiState,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    signUp,
  };
};
