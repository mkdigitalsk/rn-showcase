import { ThemeMode } from '../../foundation/themeMode';
import { Language } from '../../foundation/strings';

export interface SettingsUiState {
  themeMode: ThemeMode;
  language: Language;
  versionName: string;
  showThemeDialog: boolean;
  showLanguageDialog: boolean;
  showCrashButton: boolean;
  showDeleteAccountDialog: boolean;
  isDeletingAccount: boolean;
  deleteAccountFailed: boolean;
  isDemoAccount: boolean | undefined;
}
