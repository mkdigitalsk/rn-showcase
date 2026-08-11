import React from 'react';
import { renderScreen } from '../../../TestRender';
import { SettingsScreen } from '../../../../presentation/screens/settings/SettingsScreen';

let mockIsDemoAccount = false;

jest.mock('../../../../presentation/screens/settings/useSettingsViewModel', () => ({
  useSettingsViewModel: () => ({
    uiState: {
      themeMode: 'system',
      language: 'en',
      versionName: '1.0.0',
      showThemeDialog: false,
      showLanguageDialog: false,
      showCrashButton: true,
      showDeleteAccountDialog: false,
      isDeletingAccount: false,
      deleteAccountFailed: false,
      isDemoAccount: mockIsDemoAccount,
    },
    t: (key: string) => key,
    onThemeClick: jest.fn(),
    onThemeSelected: jest.fn(),
    onThemeDialogDismiss: jest.fn(),
    onLanguageClick: jest.fn(),
    onLanguageSelected: jest.fn(),
    onLanguageDialogDismiss: jest.fn(),
    triggerTestCrash: jest.fn(),
    openWeb: jest.fn(),
    signOut: jest.fn(),
    onDeleteAccountClick: jest.fn(),
    onDeleteAccountDialogDismiss: jest.fn(),
    confirmDeleteAccount: jest.fn(),
  }),
}));

describe('SettingsScreen', () => {
  beforeEach(() => {
    mockIsDemoAccount = false;
  });

  it('renders every section', () => {
    const { toJSON } = renderScreen(<SettingsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('offers a normal account the delete control', () => {
    const { queryByText } = renderScreen(<SettingsScreen />);

    expect(queryByText('settings_delete_account')).not.toBeNull();
    expect(queryByText('settings_delete_account_demo')).toBeNull();
  });

  it('tells a demo account why instead of offering the delete control', () => {
    mockIsDemoAccount = true;

    const { queryByText } = renderScreen(<SettingsScreen />);

    expect(queryByText('settings_delete_account')).toBeNull();
    expect(queryByText('settings_delete_account_demo')).not.toBeNull();
  });

  it('leaves sign out alone on a demo account', () => {
    mockIsDemoAccount = true;

    const { queryByText } = renderScreen(<SettingsScreen />);

    expect(queryByText('settings_sign_out')).not.toBeNull();
  });
});
