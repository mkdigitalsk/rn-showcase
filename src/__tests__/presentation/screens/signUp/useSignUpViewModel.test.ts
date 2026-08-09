import { renderHook, act, waitFor } from '@testing-library/react-native';
import { test } from '../../../TestFunctions';

// Mock tsyringe container.resolve before importing the hook
const mockCheckEmailExists = { execute: jest.fn().mockResolvedValue(false) };
const mockSignUpUseCase = {
  execute: jest.fn().mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com', password: 'Test123!', createdAt: 1234567890 }),
};

jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token: symbol) => {
      const key = token.toString();
      if (key.includes('CheckEmailExists')) {
        return mockCheckEmailExists;
      }
      if (key.includes('SignUpUseCase')) {
        return mockSignUpUseCase;
      }
      return {};
    }),
  },
  injectable: () => (target: unknown) => target,
  inject: () => () => {},
}));

import { useSignUpViewModel } from '../../../../presentation/screens/signUp/useSignUpViewModel';

describe('useSignUpViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCheckEmailExists.execute.mockResolvedValue(false);
    mockSignUpUseCase.execute.mockResolvedValue({
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'Test123!',
      createdAt: 1234567890,
    });
  });

  // === Default State ===

  it('default state has empty fields', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.name).toBe('');
        expect(state.email).toBe('');
        expect(state.password).toBe('');
        expect(state.confirmPassword).toBe('');
      },
    });
  });

  it('default state has no errors', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.nameError).toBeNull();
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
        expect(state.confirmPasswordError).toBeNull();
      },
    });
  });

  // === Field Changes ===

  it('onNameChange updates name and clears error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => result.current.signUp());
    act(() => result.current.onNameChange('John'));

    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.name).toBe('John');
        expect(state.nameError).toBeNull();
      },
    });
  });

  it('onEmailChange updates email and clears error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => result.current.signUp());
    act(() => result.current.onEmailChange('test@example.com'));

    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.email).toBe('test@example.com');
        expect(state.emailError).toBeNull();
      },
    });
  });

  it('onPasswordChange updates password and clears error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => result.current.signUp());
    act(() => result.current.onPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.password).toBe('Test123!');
        expect(state.passwordError).toBeNull();
      },
    });
  });

  it('onConfirmPasswordChange updates confirmPassword and clears error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => result.current.signUp());
    act(() => result.current.onConfirmPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState,
      then: state => {
        expect(state.confirmPassword).toBe('Test123!');
        expect(state.confirmPasswordError).toBeNull();
      },
    });
  });

  // === Sign-up validation — Name ===

  it('sign up with empty name shows empty error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.nameError,
      then: error => expect(error).toBe('empty'),
    });
  });

  // === Sign-up validation — Email ===

  it('sign up with empty email shows empty error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: error => expect(error).toBe('empty'),
    });
  });

  it('sign up with invalid email shows invalid_format error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('invalid-email');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: error => expect(error).toBe('invalid_format'),
    });
  });

  // === Sign-up validation — Password ===

  it('sign up with empty password shows empty error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBe('empty'),
    });
  });

  it('sign up with short password shows too_short error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Te1!');
      result.current.onConfirmPasswordChange('Te1!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBe('too_short'),
    });
  });

  it('sign up with weak password shows weak error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('testtest');
      result.current.onConfirmPasswordChange('testtest');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: error => expect(error).toBe('weak'),
    });
  });

  // === Sign-up validation — Confirm Password ===

  it('sign up with empty confirm password shows empty error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.confirmPasswordError,
      then: error => expect(error).toBe('empty'),
    });
  });

  it('sign up with mismatched passwords shows mismatch error', () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Different1!');
    });

    act(() => result.current.signUp());

    test({
      whenAction: () => result.current.uiState.confirmPasswordError,
      then: error => expect(error).toBe('mismatch'),
    });
  });

  // === Successful sign-up ===

  it('sign up with valid fields calls use cases and invokes callback', async () => {
    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('john@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    const onSignedUp = jest.fn();
    act(() => result.current.signUp(onSignedUp));

    await waitFor(() => {
      expect(onSignedUp).toHaveBeenCalled();
    });

    expect(mockCheckEmailExists.execute).toHaveBeenCalledWith('john@example.com');
    expect(mockSignUpUseCase.execute).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Test123!',
    });
    expect(result.current.uiState.isLoading).toBe(false);
  });

  // === Email Already Exists ===

  it('sign up with existing email shows already_exists error', async () => {
    mockCheckEmailExists.execute.mockResolvedValue(true);

    const { result } = renderHook(() => useSignUpViewModel());
    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('existing@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    const onSignedUp = jest.fn();
    act(() => result.current.signUp(onSignedUp));

    await waitFor(() => {
      expect(result.current.uiState.emailError).toBe('already_exists');
    });

    expect(onSignedUp).not.toHaveBeenCalled();
    expect(mockSignUpUseCase.execute).not.toHaveBeenCalled();
    expect(result.current.uiState.isLoading).toBe(false);
  });
});
