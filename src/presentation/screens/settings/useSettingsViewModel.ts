import { useCallback, useMemo, useState } from 'react';
import { ThemeMode } from '../../foundation/themeMode';
import { useThemeMode } from '../../foundation/ThemeProvider';
import { useStrings, Language } from '../../foundation/strings';
import { SettingsUiState } from './SettingsUiState';
import { getCrashlytics, crash } from '@react-native-firebase/crashlytics';

const APP_VERSION = '0.0.1';

export const useSettingsViewModel = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const { language, setLanguage, t } = useStrings();
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);

  const uiState: SettingsUiState = useMemo(() => ({
    themeMode,
    language,
    versionName: APP_VERSION,
    showThemeDialog,
    showLanguageDialog,
    showCrashButton: __DEV__,
  }), [themeMode, language, showThemeDialog, showLanguageDialog]);

  const onThemeClick = useCallback(() => {
    setShowThemeDialog(true);
  }, []);

  const onThemeSelected = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
    setShowThemeDialog(false);
  }, [setThemeMode]);

  const onThemeDialogDismiss = useCallback(() => {
    setShowThemeDialog(false);
  }, []);

  const onLanguageClick = useCallback(() => {
    setShowLanguageDialog(true);
  }, []);

  const onLanguageSelected = useCallback((lang: Language) => {
    setLanguage(lang);
    setShowLanguageDialog(false);
  }, [setLanguage]);

  const onLanguageDialogDismiss = useCallback(() => {
    setShowLanguageDialog(false);
  }, []);

  const triggerTestCrash = useCallback(() => {
    crash(getCrashlytics());
  }, []);

  return {
    uiState,
    t,
    onThemeClick,
    onThemeSelected,
    onThemeDialogDismiss,
    onLanguageClick,
    onLanguageSelected,
    onLanguageDialogDismiss,
    triggerTestCrash,
  };
};
