import { renderHook, act } from '@testing-library/react-native';
import { test } from '../../../TestFunctions';

// Mock tsyringe container.resolve before importing the hook
const mockIsBiometricEnabled = { execute: jest.fn().mockResolvedValue(false) };
const mockAuthenticateWithBiometric = { execute: jest.fn().mockResolvedValue({ type: 'success' }) };

jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token: symbol) => {
      const key = token.toString();
      if (key.includes('IsBiometricEnabled')) { return mockIsBiometricEnabled; }
      if (key.includes('AuthenticateWithBiometric')) { return mockAuthenticateWithBiometric; }
      return {};
    }),
  },
  injectable: () => (target: any) => target,
  inject: () => () => {},
}));

import { useLoginViewModel } from '../../../../presentation/screens/login/useLoginViewModel';

describe('useLoginViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsBiometricEnabled.execute.mockResolvedValue(false);
    mockAuthenticateWithBiometric.execute.mockResolvedValue({ type: 'success' });
  });

  // === Default State ===

  it('default state has empty email', () => {
    const { result } = renderHook(() => useLoginViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: (state) => expect(state.email).toBe(''),
    });
  });

  it('default state has empty password', () => {
    const { result } = renderHook(() => useLoginViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: (state) => expect(state.password).toBe(''),
    });
  });

  it('default state has no errors', () => {
    const { result } = renderHook(() => useLoginViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
      },
    });
  });

  // === Email Change ===

  it('onEmailChange updates email', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.onEmailChange('test@example.com'));

    test({
      whenAction: () => result.current.uiState.email,
      then: (email) => expect(email).toBe('test@example.com'),
    });
  });

  it('onEmailChange clears email error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.login());
    expect(result.current.uiState.emailError).not.toBeNull();

    act(() => result.current.onEmailChange('test@example.com'));

    test({
      whenAction: () => result.current.uiState.emailError,
      then: (error) => expect(error).toBeNull(),
    });
  });

  // === Password Change ===

  it('onPasswordChange updates password', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.onPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState.password,
      then: (password) => expect(password).toBe('Test123!'),
    });
  });

  it('onPasswordChange clears password error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.login());
    expect(result.current.uiState.passwordError).not.toBeNull();

    act(() => result.current.onPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBeNull(),
    });
  });

  // === Fill Test Account ===

  it('fillTestAccount sets test credentials', () => {
    const { result } = renderHook(() => useLoginViewModel());

    act(() => result.current.fillTestAccount());

    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.email).toBe('test@example.com');
        expect(state.password).toBe('Test123!');
      },
    });
  });

  it('fillTestAccount clears errors', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.login());

    act(() => result.current.fillTestAccount());

    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
      },
    });
  });

  // === Login Validation — Email ===

  it('login with empty email shows empty error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.onPasswordChange('Test123!'));

    let valid: boolean = true;
    act(() => { valid = result.current.login(); });

    test({
      whenAction: () => ({ valid, error: result.current.uiState.emailError }),
      then: ({ valid, error }) => {
        expect(valid).toBe(false);
        expect(error).toBe('empty');
      },
    });
  });

  it('login with invalid email format shows invalid_format error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('invalid-email');
      result.current.onPasswordChange('Test123!');
    });

    act(() => result.current.login());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: (error) => expect(error).toBe('invalid_format'),
    });
  });

  // === Login Validation — Password ===

  it('login with empty password shows empty error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => result.current.onEmailChange('test@example.com'));

    act(() => result.current.login());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBe('empty'),
    });
  });

  it('login with short password shows too_short error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Te1!');
    });

    act(() => result.current.login());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBe('too_short'),
    });
  });

  it('login with weak password shows weak error', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('testtest');
    });

    act(() => result.current.login());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBe('weak'),
    });
  });

  // === Successful Login ===

  it('login with valid credentials returns true and has no errors', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
    });

    let valid: boolean = false;
    act(() => { valid = result.current.login(); });

    test({
      whenAction: () => ({ valid, state: result.current.uiState }),
      then: ({ valid, state }) => {
        expect(valid).toBe(true);
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
      },
    });
  });

  // === Password Strength Edge Cases ===

  it('password without uppercase is weak', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('test123!');
    });
    act(() => result.current.login());
    expect(result.current.uiState.passwordError).toBe('weak');
  });

  it('password without lowercase is weak', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('TEST123!');
    });
    act(() => result.current.login());
    expect(result.current.uiState.passwordError).toBe('weak');
  });

  it('password without digit is weak', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('TestTest!');
    });
    act(() => result.current.login());
    expect(result.current.uiState.passwordError).toBe('weak');
  });

  it('password without special char is weak', () => {
    const { result } = renderHook(() => useLoginViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test1234');
    });
    act(() => result.current.login());
    expect(result.current.uiState.passwordError).toBe('weak');
  });
});
