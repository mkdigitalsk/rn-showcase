import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApiException } from '../../../../domain/exceptions/BaseException';
import { ThemeProvider } from '../../../../presentation/foundation/ThemeProvider';
import { StringsProvider } from '../../../../presentation/foundation/strings';

const SERVER_ERROR = 500;

jest.mock('@react-native-firebase/crashlytics', () => ({ getCrashlytics: jest.fn(), crash: jest.fn() }));

const mockDeleteAccount = { execute: jest.fn().mockResolvedValue(undefined) };
const mockIsDemoAccount = { execute: jest.fn().mockResolvedValue(false) };

jest.mock('tsyringe', () => ({
  container: {
    resolve: jest.fn((token: symbol) => {
      const key = token.toString();
      if (key.includes('DeleteAccountUseCase')) {
        return mockDeleteAccount;
      }
      if (key.includes('IsDemoAccountUseCase')) {
        return mockIsDemoAccount;
      }
      if (key.includes('GetThemeModeUseCase')) {
        return { execute: () => 'system' };
      }
      return { execute: jest.fn() };
    }),
  },
  injectable: () => (target: unknown) => target,
  inject: () => () => {},
}));

import { useSettingsViewModel } from '../../../../presentation/screens/settings/useSettingsViewModel';

const IPHONE_17_PRO_METRICS = {
  frame: { x: 0, y: 0, width: 402, height: 874 },
  insets: { top: 62, left: 0, right: 0, bottom: 34 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StringsProvider>
    <SafeAreaProvider initialMetrics={IPHONE_17_PRO_METRICS}>
      <ThemeProvider>{children}</ThemeProvider>
    </SafeAreaProvider>
  </StringsProvider>
);

describe('useSettingsViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDeleteAccount.execute.mockResolvedValue(undefined);
    mockIsDemoAccount.execute.mockResolvedValue(false);
  });

  it('carries the demo flag the server sent into the state the screen reads', async () => {
    mockIsDemoAccount.execute.mockResolvedValue(true);

    const { result } = renderHook(() => useSettingsViewModel(), { wrapper });

    await waitFor(() => expect(result.current.uiState.isDemoAccount).toBe(true));
  });

  it('deletes the account before it leaves the screen', async () => {
    const order: string[] = [];
    mockDeleteAccount.execute.mockImplementation(async () => {
      order.push('delete');
    });

    const { result } = renderHook(() => useSettingsViewModel(), { wrapper });

    await act(async () => {
      result.current.confirmDeleteAccount(() => order.push('navigate'));
    });

    await waitFor(() => expect(order).toEqual(['delete', 'navigate']));
    expect(result.current.uiState.deleteAccountFailed).toBe(false);
  });

  it('surfaces the failure and stays on the screen', async () => {
    mockDeleteAccount.execute.mockRejectedValue(new ApiException(SERVER_ERROR, 'Request failed', 'error_server'));
    const onDeleteSuccess = jest.fn();

    const { result } = renderHook(() => useSettingsViewModel(), { wrapper });

    await act(async () => {
      result.current.confirmDeleteAccount(onDeleteSuccess);
    });

    await waitFor(() => expect(result.current.uiState.deleteAccountFailed).toBe(true));
    expect(onDeleteSuccess).not.toHaveBeenCalled();
    expect(result.current.uiState.isDeletingAccount).toBe(false);
  });

  it('ignores a second confirm while the first is in flight', async () => {
    mockDeleteAccount.execute.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useSettingsViewModel(), { wrapper });

    await act(async () => {
      result.current.confirmDeleteAccount();
      result.current.confirmDeleteAccount();
    });

    expect(mockDeleteAccount.execute).toHaveBeenCalledTimes(1);
    expect(result.current.uiState.isDeletingAccount).toBe(true);
  });
});
