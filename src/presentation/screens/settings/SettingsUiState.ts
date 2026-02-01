import { ThemeMode } from '../../foundation/themeMode';
import { Language } from '../../foundation/strings';

export interface SettingsUiState {
  themeMode: ThemeMode;
  language: Language;
  versionName: string;
  showThemeDialog: boolean;
  showLanguageDialog: boolean;
}
