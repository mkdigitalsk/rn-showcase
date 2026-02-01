import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextTitleLargePrimary,
  TextBodyLargePrimary,
  TextBodyMediumNeutral80,
  TextBodySmallNeutral80,
  TextBodyLargeNeutral100,
  AppCard,
  AppRadioButton,
} from '../../components';
import { space4, space2 } from '../../foundation/dimensions';
import { useAppColors, useAppTheme } from '../../foundation/theme';
import { FlagSK, FlagEN } from '../../foundation/AppIcons';
import { useSettingsViewModel } from './useSettingsViewModel';
import { ThemeMode } from '../../foundation/themeMode';
import { Language } from '../../foundation/strings';

export const SettingsScreen = () => {
  const colors = useAppColors();
  const theme = useAppTheme();
  const {
    uiState,
    t,
    onThemeClick,
    onThemeSelected,
    onThemeDialogDismiss,
    onLanguageClick,
    onLanguageSelected,
    onLanguageDialogDismiss,
    triggerTestCrash,
  } = useSettingsViewModel();

  const themeModeLabel = (mode: ThemeMode): string => {
    switch (mode) {
      case 'light': return t('settings_theme_light');
      case 'dark': return t('settings_theme_dark');
      case 'system': return t('settings_theme_system');
    }
  };

  const languageLabel = (lang: Language): string => {
    switch (lang) {
      case 'en': return t('language_en');
      case 'sk': return t('language_sk');
    }
  };

  const LanguageFlag = ({ lang, size = 24 }: { lang: Language; size?: number }) => {
    switch (lang) {
      case 'en': return <FlagEN size={size} />;
      case 'sk': return <FlagSK size={size} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: space4, gap: space4 }}
      >
        {/* Appearance Section */}
        <TextTitleLargePrimary>{t('settings_appearance')}</TextTitleLargePrimary>

        <AppCard elevated onPress={onThemeClick}>
          <SettingsItem
            icon={<Icon name="weather-night" size={24} color={colors.primary} />}
            title={t('settings_theme')}
            value={themeModeLabel(uiState.themeMode)}
          />
        </AppCard>

        <AppCard elevated onPress={onLanguageClick}>
          <SettingsItem
            icon={<LanguageFlag lang={uiState.language} />}
            title={t('settings_language')}
            value={languageLabel(uiState.language)}
          />
        </AppCard>

        {/* Debug Section */}
        {uiState.showCrashButton && (
          <AppCard elevated onPress={triggerTestCrash}>
            <SettingsItem
              icon={<Icon name="bug-outline" size={24} color={colors.primary} />}
              title={t('settings_test_crash_title')}
              value={t('settings_test_crash_subtitle')}
            />
          </AppCard>
        )}

        {/* Version Footer */}
        <View style={{ alignItems: 'flex-end', marginTop: space4 }}>
          <TextBodySmallNeutral80>
            {`${t('settings_version')} ${uiState.versionName}`}
          </TextBodySmallNeutral80>
        </View>
      </ScrollView>

      {/* Theme Selection Dialog */}
      <Portal>
        <Dialog
          visible={uiState.showThemeDialog}
          onDismiss={onThemeDialogDismiss}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title>
            <TextTitleLargePrimary>{t('settings_theme')}</TextTitleLargePrimary>
          </Dialog.Title>
          <Dialog.Content>
            {(['light', 'dark', 'system'] as ThemeMode[]).map(mode => (
              <SelectionOption
                key={mode}
                label={themeModeLabel(mode)}
                selected={uiState.themeMode === mode}
                onPress={() => onThemeSelected(mode)}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* Language Selection Dialog */}
      <Portal>
        <Dialog
          visible={uiState.showLanguageDialog}
          onDismiss={onLanguageDialogDismiss}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Dialog.Title>
            <TextTitleLargePrimary>{t('settings_language')}</TextTitleLargePrimary>
          </Dialog.Title>
          <Dialog.Content>
            {(['en', 'sk'] as Language[]).map(lang => (
              <LanguageOption
                key={lang}
                flag={<LanguageFlag lang={lang} />}
                label={languageLabel(lang)}
                selected={uiState.language === lang}
                onPress={() => onLanguageSelected(lang)}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const SettingsItem = ({ icon, title, value }: SettingsItemProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: space4 }}>
      {icon}
      <View style={{ flex: 1 }}>
        <TextBodyLargePrimary>{title}</TextBodyLargePrimary>
        <View style={{ height: space2 }} />
        <TextBodyMediumNeutral80>{value}</TextBodyMediumNeutral80>
      </View>
    </View>
  );
};

interface SelectionOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const SelectionOption = ({ label, selected, onPress }: SelectionOptionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: space4,
      }}
    >
      <AppRadioButton selected={selected} onPress={onPress} />
      <TextBodyLargeNeutral100>{label}</TextBodyLargeNeutral100>
    </TouchableOpacity>
  );
};

interface LanguageOptionProps {
  flag: React.ReactNode;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const LanguageOption = ({ flag, label, selected, onPress }: LanguageOptionProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: space4,
      }}
    >
      <AppRadioButton selected={selected} onPress={onPress} />
      {flag}
      <View style={{ width: space4 }} />
      <TextBodyLargeNeutral100>{label}</TextBodyLargeNeutral100>
    </TouchableOpacity>
  );
};
