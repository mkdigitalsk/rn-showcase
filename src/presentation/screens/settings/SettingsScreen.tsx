import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextBodyLargeNeutral100, TextBodyMediumNeutral80 } from '../../components';
import { ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { useStrings, Language } from '../../foundation/strings';
import { useThemeMode } from '../../foundation/ThemeProvider';
import { ThemeMode } from '../../foundation/themeMode';

export const SettingsScreen = () => {
  const colors = useAppColors();
  const { language, setLanguage, t } = useStrings();
  const { themeMode, setThemeMode } = useThemeMode();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: space4 }}>
      {/* Theme Section */}
      <TextBodyLargeNeutral100>{t('settings_appearance')}</TextBodyLargeNeutral100>
      <ColumnSpacer4 />

      <SelectionOption
        label={t('settings_theme_light')}
        selected={themeMode === 'light'}
        onPress={() => handleThemeChange('light')}
      />
      <ColumnSpacer4 />
      <SelectionOption
        label={t('settings_theme_dark')}
        selected={themeMode === 'dark'}
        onPress={() => handleThemeChange('dark')}
      />
      <ColumnSpacer4 />
      <SelectionOption
        label={t('settings_theme_system')}
        selected={themeMode === 'system'}
        onPress={() => handleThemeChange('system')}
      />

      <ColumnSpacer4 />
      <ColumnSpacer4 />

      {/* Language Section */}
      <TextBodyLargeNeutral100>{t('settings_language')}</TextBodyLargeNeutral100>
      <ColumnSpacer4 />

      <SelectionOption
        label={t('language_en')}
        selected={language === 'en'}
        onPress={() => handleLanguageChange('en')}
      />
      <ColumnSpacer4 />
      <SelectionOption
        label={t('language_sk')}
        selected={language === 'sk'}
        onPress={() => handleLanguageChange('sk')}
      />
    </View>
  );
};

interface SelectionOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const SelectionOption = ({ label, selected, onPress }: SelectionOptionProps) => {
  const colors = useAppColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: space4,
        backgroundColor: selected ? colors.primaryContainer : colors.surfaceVariant,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: selected ? colors.primary : colors.neutral60,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: space4,
        }}
      >
        {selected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.primary,
            }}
          />
        )}
      </View>
      <TextBodyMediumNeutral80>{label}</TextBodyMediumNeutral80>
    </TouchableOpacity>
  );
};
