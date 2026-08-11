import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TYPES } from '../../../app/diTypes';
import { OpenLinkUseCase } from '../../../domain/useCases/platform/OpenLinkUseCase';
import { SignOutUseCase } from '../../../domain/useCases/auth/SignOutUseCase';
import { DeleteAccountUseCase } from '../../../domain/useCases/auth/DeleteAccountUseCase';
import { IsDemoAccountUseCase } from '../../../domain/useCases/auth/IsDemoAccountUseCase';
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
  const deleteAccountUseCase = useResolve<DeleteAccountUseCase>(TYPES.DeleteAccountUseCase);
  const isDemoAccountUseCase = useResolve<IsDemoAccountUseCase>(TYPES.IsDemoAccountUseCase);
  const { language, setLanguage, t } = useStrings();
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteAccountFailed, setDeleteAccountFailed] = useState(false);
  const [isDemoAccount, setIsDemoAccount] = useState<boolean | undefined>(undefined);
  // A second tap lands before the state re-render, so the guard has to be readable in the same tick.
  const deletionInFlight = useRef(false);

  useEffect(() => {
    execute({
      action: () => isDemoAccountUseCase.execute(),
      onSuccess: demo => setIsDemoAccount(demo),
    });
  }, [isDemoAccountUseCase]);

  const uiState: SettingsUiState = useMemo(
    () => ({
      themeMode,
      language,
      versionName: version,
      showThemeDialog,
      showLanguageDialog,
      showCrashButton: __DEV__,
      showDeleteAccountDialog,
      isDeletingAccount,
      deleteAccountFailed,
      isDemoAccount,
    }),
    [
      themeMode,
      language,
      showThemeDialog,
      showLanguageDialog,
      showDeleteAccountDialog,
      isDeletingAccount,
      deleteAccountFailed,
      isDemoAccount,
    ]
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

  const onDeleteAccountClick = useCallback(() => {
    setDeleteAccountFailed(false);
    setShowDeleteAccountDialog(true);
  }, []);

  const onDeleteAccountDialogDismiss = useCallback(() => {
    setShowDeleteAccountDialog(false);
  }, []);

  const confirmDeleteAccount = useCallback(
    (onDeleted?: () => void): void => {
      if (deletionInFlight.current) {
        return;
      }
      deletionInFlight.current = true;

      execute({
        action: () => deleteAccountUseCase.execute(),
        onLoading: () => {
          setIsDeletingAccount(true);
          setDeleteAccountFailed(false);
        },
        onSuccess: () => {
          deletionInFlight.current = false;
          setIsDeletingAccount(false);
          setShowDeleteAccountDialog(false);
          onDeleted?.();
        },
        onError: () => {
          deletionInFlight.current = false;
          setIsDeletingAccount(false);
          setShowDeleteAccountDialog(false);
          setDeleteAccountFailed(true);
        },
      });
    },
    [deleteAccountUseCase]
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
    onDeleteAccountClick,
    onDeleteAccountDialogDismiss,
    confirmDeleteAccount,
  };
};
