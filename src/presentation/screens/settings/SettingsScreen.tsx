import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextBodyLargeNeutral100, TextBodyMediumNeutral80 } from '../../components';
import { ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { useStrings, Language } from '../../foundation/strings';

export const SettingsScreen = () => {
  const colors = useAppColors();
  const { language, setLanguage, t } = useStrings();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: space4 }}>
      <TextBodyLargeNeutral100>{t('settings_language')}</TextBodyLargeNeutral100>
      <ColumnSpacer4 />

      <LanguageOption
        label={t('language_en')}
        selected={language === 'en'}
        onPress={() => handleLanguageChange('en')}
      />
      <ColumnSpacer4 />
      <LanguageOption
        label={t('language_sk')}
        selected={language === 'sk'}
        onPress={() => handleLanguageChange('sk')}
      />
    </View>
  );
};

interface LanguageOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const LanguageOption = ({ label, selected, onPress }: LanguageOptionProps) => {
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
