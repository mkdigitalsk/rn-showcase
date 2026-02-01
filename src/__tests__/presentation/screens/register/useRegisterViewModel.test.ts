import { renderHook, act } from '@testing-library/react-native';
import { test } from '../../../TestFunctions';
import { useRegisterViewModel } from '../../../../presentation/screens/register/useRegisterViewModel';

describe('useRegisterViewModel', () => {
  // === Default State ===

  it('default state has empty fields', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.name).toBe('');
        expect(state.email).toBe('');
        expect(state.password).toBe('');
        expect(state.confirmPassword).toBe('');
      },
    });
  });

  it('default state has no errors', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.nameError).toBeNull();
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
        expect(state.confirmPasswordError).toBeNull();
      },
    });
  });

  // === Field Changes ===

  it('onNameChange updates name and clears error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => result.current.register());
    act(() => result.current.onNameChange('John'));

    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.name).toBe('John');
        expect(state.nameError).toBeNull();
      },
    });
  });

  it('onEmailChange updates email and clears error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => result.current.register());
    act(() => result.current.onEmailChange('test@example.com'));

    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.email).toBe('test@example.com');
        expect(state.emailError).toBeNull();
      },
    });
  });

  it('onPasswordChange updates password and clears error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => result.current.register());
    act(() => result.current.onPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.password).toBe('Test123!');
        expect(state.passwordError).toBeNull();
      },
    });
  });

  it('onConfirmPasswordChange updates confirmPassword and clears error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => result.current.register());
    act(() => result.current.onConfirmPasswordChange('Test123!'));

    test({
      whenAction: () => result.current.uiState,
      then: (state) => {
        expect(state.confirmPassword).toBe('Test123!');
        expect(state.confirmPasswordError).toBeNull();
      },
    });
  });

  // === Registration Validation — Name ===

  it('register with empty name shows empty error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    let valid: boolean = true;
    act(() => { valid = result.current.register(); });

    test({
      whenAction: () => ({ valid, error: result.current.uiState.nameError }),
      then: ({ valid, error }) => {
        expect(valid).toBe(false);
        expect(error).toBe('empty');
      },
    });
  });

  // === Registration Validation — Email ===

  it('register with empty email shows empty error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: (error) => expect(error).toBe('empty'),
    });
  });

  it('register with invalid email shows invalid_format error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('invalid-email');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.emailError,
      then: (error) => expect(error).toBe('invalid_format'),
    });
  });

  // === Registration Validation — Password ===

  it('register with empty password shows empty error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onConfirmPasswordChange('Test123!');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBe('empty'),
    });
  });

  it('register with short password shows too_short error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Te1!');
      result.current.onConfirmPasswordChange('Te1!');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBe('too_short'),
    });
  });

  it('register with weak password shows weak error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('testtest');
      result.current.onConfirmPasswordChange('testtest');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.passwordError,
      then: (error) => expect(error).toBe('weak'),
    });
  });

  // === Registration Validation — Confirm Password ===

  it('register with empty confirm password shows empty error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.confirmPasswordError,
      then: (error) => expect(error).toBe('empty'),
    });
  });

  it('register with mismatched passwords shows mismatch error', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John');
      result.current.onEmailChange('test@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Different1!');
    });

    act(() => result.current.register());

    test({
      whenAction: () => result.current.uiState.confirmPasswordError,
      then: (error) => expect(error).toBe('mismatch'),
    });
  });

  // === Successful Registration ===

  it('register with all valid fields returns true and has no errors', () => {
    const { result } = renderHook(() => useRegisterViewModel());
    act(() => {
      result.current.onNameChange('John Doe');
      result.current.onEmailChange('john@example.com');
      result.current.onPasswordChange('Test123!');
      result.current.onConfirmPasswordChange('Test123!');
    });

    let valid: boolean = false;
    act(() => { valid = result.current.register(); });

    test({
      whenAction: () => ({ valid, state: result.current.uiState }),
      then: ({ valid, state }) => {
        expect(valid).toBe(true);
        expect(state.nameError).toBeNull();
        expect(state.emailError).toBeNull();
        expect(state.passwordError).toBeNull();
        expect(state.confirmPasswordError).toBeNull();
      },
    });
  });
});
