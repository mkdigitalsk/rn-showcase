import React from 'react';
import { renderScreen } from '../../../TestRender';
import { SettingsScreen } from '../../../../presentation/screens/settings/SettingsScreen';

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
  it('renders every section', () => {
    const { toJSON } = renderScreen(<SettingsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
