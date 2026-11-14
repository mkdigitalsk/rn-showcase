import { renderHook, act, waitFor } from '@testing-library/react-native';
import { test } from '../../../TestFunctions';

// Mock tsyringe container.resolve before importing the hook
const mockSignIn = { execute: jest.fn().mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com' }) };
const mockIsBiometricEnabled = { execute: jest.fn().mockResolvedValue(false) };
const mockAuthenticateWithBiometric = { execute: jest.fn().mockResolvedValue({ type: 'success' }) };

jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token: symbol) => {
      const key = token.toString();
      if (key.includes('SignInUseCase')) {
        return mockSignIn;
      }
      if (key.includes('IsBiometricEnabled')) {
        return mockIsBiometricEnabled;
      }
      if (key.includes('AuthenticateWithBiometric')) {
        return mockAuthenticateWithBiometric;
      }
      return {};
    }),
  },
  injectable: () => (target: unknown) => target,
  inject: () => () => {},
}));

import { useSignInViewModel } from '../../../../presentation/screens/signIn/useSignInViewModel';

describe('useSignInViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsBiometricEnabled.execute.mockResolvedValue(false);
    mockAuthenticateWithBiometric.execute.mockResolvedValue({ type: 'success' });
  });

  // === Default State ===

  it('default state has empty email', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: state => expect(state.email).toBe(''),
    });
  });

  it('default state has empty password', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: state => expect(state.password).toBe(''),
    });
  });

  it('default state has no errors', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
      },
    });
  });

  // === Email Change ===

  it('onEmailChange updates email', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.onEmailChange('test@example.com'));

    test({
      whenAction: () => result.current.uiState.email,
      then: email => expect(email).toBe('test@example.com'),
    });
  });

  it('onEmailChange clears email error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.signIn());
    expect(result.current.uiState.emailError).not.toBeNull();

    await act(() => result.current.onEmailChange('test@example.com'));

    test({
      whenAction: () => result.current.uiState.emailError,
      then: error => expect(error).toBeNull(),
    });
  });

  // === Password Change ===

  it('onPasswordChange updates password', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.onPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState.password,
      then: password => expect(password).toBe('Test123!'),
    });
  });

  it('onPasswordChange clears password error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.signIn());
    expect(result.current.uiState.passwordError).not.toBeNull();

    await act(() => result.current.onPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBeNull(),
    });
  });

  // === Fill Test Account ===

  it('fillTestAccount sets test credentials', async () => {
    const { result } = await renderHook(() => useSignInViewModel());

    await act(() => result.current.fillTestAccount());

    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.email).toBe('test01@mkdigital.sk');
        expect(state.password).toBe('MKDigitalTest1@');
      },
    });
  });

  it('fillTestAccount clears errors', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.signIn());

    await act(() => result.current.fillTestAccount());

    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
      },
    });
  });

  // === SignIn Validation — Email ===

  it('sign in with empty email shows empty error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.onPasswordChange('Test123!'));

    await act(() => result.current.signIn());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: error => expect(error).toBe('empty'),
    });
  });

  it('sign in with invalid email format shows invalid_format error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('invalid-email');
      result.current.onPasswordChange('Test123!');
    });

    await act(() => result.current.signIn());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: error => expect(error).toBe('invalid_format'),
    });
  });

  // === SignIn Validation — Password ===

  it('sign in with empty password shows empty error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => result.current.onEmailChange('test@example.com'));

    await act(() => result.current.signIn());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBe('empty'),
    });
  });

  it('sign in with short password shows too_short error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Te1!');
    });

    await act(() => result.current.signIn());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBe('too_short'),
    });
  });

  it('sign in with weak password shows weak error', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('testtest');
    });

    await act(() => result.current.signIn());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBe('weak'),
    });
  });

  // === Successful SignIn ===

  it('sign in with valid credentials calls use case and invokes callback', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
    });

    const onSignedIn = jest.fn();
    await act(() => result.current.signIn(onSignedIn));

    await waitFor(() => {
      expect(onSignedIn).toHaveBeenCalled();
    });

    expect(mockSignIn.execute).toHaveBeenCalledWith({ email: 'test@example.com', password: 'Test123!' });
    expect(result.current.uiState.emailError).toBeNull();
    expect(result.current.uiState.passwordError).toBeNull();
    expect(result.current.uiState.signInFailed).toBe(false);
  });

  it('sign in with invalid credentials sets signInFailed', async () => {
    mockSignIn.execute.mockRejectedValueOnce(new Error('401'));
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
    });

    const onSignedIn = jest.fn();
    await act(() => result.current.signIn(onSignedIn));

    await waitFor(() => {
      expect(result.current.uiState.signInFailed).toBe(true);
    });

    expect(onSignedIn).not.toHaveBeenCalled();
    expect(result.current.uiState.isLoading).toBe(false);
  });

  // === Password Strength Edge Cases ===

  it('password without uppercase is weak', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('test123!');
    });
    await act(() => result.current.signIn());
    expect(result.current.uiState.passwordError).toBe('weak');
  });

  it('password without lowercase is weak', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('TEST123!');
    });
    await act(() => result.current.signIn());
    expect(result.current.uiState.passwordError).toBe('weak');
  });

  it('password without digit is weak', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('TestTest!');
    });
    await act(() => result.current.signIn());
    expect(result.current.uiState.passwordError).toBe('weak');
  });

  it('password without special char is weak', async () => {
    const { result } = await renderHook(() => useSignInViewModel());
    await act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test1234');
    });
    await act(() => result.current.signIn());
    expect(result.current.uiState.passwordError).toBe('weak');
  });
});
