import { useCallback, useMemo, useState } from 'react';
import { TYPES } from '../../../app/diTypes';
import { OpenLinkUseCase } from '../../../domain/useCases/platform/OpenLinkUseCase';
import { SignOutUseCase } from '../../../domain/useCases/auth/SignOutUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { ThemeMode } from '../../foundation/themeMode';
import { useThemeMode } from '../../foundation/ThemeProvider';
import { useStrings, Language } from '../../foundation/strings';
import { SettingsUiState } from './SettingsUiState';
import { getCrashlytics, crash } from '@react-native-firebase/crashlytics';
import { version } from '../../../../package.json';

const STUDIO_URL = 'https://mkdigital.sk';

export const useSettingsViewModel = () => {
  const { themeMode, setThemeMode } = useThemeMode();
  const openLinkUseCase = useResolve<OpenLinkUseCase>(TYPES.OpenLinkUseCase);
  const signOutUseCase = useResolve<SignOutUseCase>(TYPES.SignOutUseCase);
  const { language, setLanguage, t } = useStrings();
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);

  const uiState: SettingsUiState = useMemo(
    () => ({
      themeMode,
      language,
      versionName: version,
      showThemeDialog,
      showLanguageDialog,
      showCrashButton: __DEV__,
    }),
    [themeMode, language, showThemeDialog, showLanguageDialog]
  );

  const onThemeClick = useCallback(() => {
    setShowThemeDialog(true);
  }, []);

  const onThemeSelected = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
      setShowThemeDialog(false);
    },
    [setThemeMode]
  );

  const onThemeDialogDismiss = useCallback(() => {
    setShowThemeDialog(false);
  }, []);

  const onLanguageClick = useCallback(() => {
    setShowLanguageDialog(true);
  }, []);

  const onLanguageSelected = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      setShowLanguageDialog(false);
    },
    [setLanguage]
  );

  const onLanguageDialogDismiss = useCallback(() => {
    setShowLanguageDialog(false);
  }, []);

  const signOut = useCallback(
    (onLoggedOut?: () => void): void => {
      execute({
        action: () => signOutUseCase.execute(),
        onSuccess: () => onLoggedOut?.(),
      });
    },
    [signOutUseCase]
  );

  const triggerTestCrash = useCallback(() => {
    crash(getCrashlytics());
  }, []);

  const openWeb = useCallback(() => {
    execute({ action: () => openLinkUseCase.execute(STUDIO_URL) });
  }, [openLinkUseCase]);

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
    openWeb,
    signOut,
  };
};
