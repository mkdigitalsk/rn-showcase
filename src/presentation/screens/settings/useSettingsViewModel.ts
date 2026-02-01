import { useCallback, useMemo } from 'react';
import { ThemeMode } from '../../foundation/themeMode';
import { useThemeMode } from '../../foundation/ThemeProvider';
import { useStrings, Language } from '../../foundation/strings';
import { SettingsUiState } from './SettingsUiState';

const APP_VERSION = '0.0.1';

export const useSettingsViewModel = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const { language, setLanguage, t } = useStrings();

  const uiState: SettingsUiState = useMemo(() => ({
    themeMode,
    language,
    versionName: APP_VERSION,
  }), [themeMode, language]);

  const onThemeModeChanged = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, [setThemeMode]);

  const onLanguageChanged = useCallback((lang: Language) => {
    setLanguage(lang);
  }, [setLanguage]);

  return {
    uiState,
    t,
    onThemeModeChanged,
    onLanguageChanged,
  };
};
