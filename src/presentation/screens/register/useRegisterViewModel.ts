import { useState, useCallback } from 'react';
import {
  RegisterUiState,
  initialRegisterUiState,
  RegisterNameError,
  RegisterEmailError,
  RegisterPasswordError,
  RegisterConfirmPasswordError,
} from './RegisterUiState';
import { isValidEmail, isPasswordLongEnough, isValidPassword } from '../../foundation/ValidationPatterns';

export const useRegisterViewModel = () => {
  const [uiState, setUiState] = useState<RegisterUiState>(initialRegisterUiState);

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

  const validateName = useCallback((name: string): RegisterNameError | null => {
    if (name.trim().length === 0) { return 'empty'; }
    return null;
  }, []);

  const validateEmail = useCallback((email: string): RegisterEmailError | null => {
    if (email.trim().length === 0) { return 'empty'; }
    if (!isValidEmail(email)) { return 'invalid_format'; }
    return null;
  }, []);

  const validatePassword = useCallback((password: string): RegisterPasswordError | null => {
    if (password.length === 0) { return 'empty'; }
    if (!isPasswordLongEnough(password)) { return 'too_short'; }
    if (!isValidPassword(password)) { return 'weak'; }
    return null;
  }, []);

  const validateConfirmPassword = useCallback((password: string, confirmPassword: string): RegisterConfirmPasswordError | null => {
    if (confirmPassword.length === 0) { return 'empty'; }
    if (password !== confirmPassword) { return 'mismatch'; }
    return null;
  }, []);

  const register = useCallback((): boolean => {
    const nameError = validateName(uiState.name);
    const emailError = validateEmail(uiState.email);
    const passwordError = validatePassword(uiState.password);
    const confirmPasswordError = validateConfirmPassword(uiState.password, uiState.confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setUiState(prev => ({ ...prev, nameError, emailError, passwordError, confirmPasswordError }));
      return false;
    }

    return true;
  }, [uiState.name, uiState.email, uiState.password, uiState.confirmPassword, validateName, validateEmail, validatePassword, validateConfirmPassword]);

  return {
    uiState,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    register,
  };
};
