import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  TextTitleLargePrimary,
  TextBodyLargePrimary,
  TextBodyMediumNeutral80,
  TextBodySmallNeutral80,
  TextBodySmall,
  TextBodyLargeNeutral100,
  AppCard,
  AppRadioButton,
  AppTextButtonError,
  ColumnSpacer2,
} from '../../components';
import { AvatarView } from '../../components/AvatarView';
import { ImageSourceDialog } from '../../components/imagepicker/ImageSourceDialog';
import { useImagePicker } from '../../components/imagepicker/useImagePicker';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import { space4, space2 } from '../../foundation/dimensions';
import { useAppColors, useAppTheme } from '../../foundation/theme';
import { FlagSK, FlagEN } from '../../foundation/AppIcons';
import { useSettingsViewModel } from './useSettingsViewModel';
import { ThemeMode } from '../../foundation/themeMode';
import { Language } from '../../foundation/strings';
import type { AvatarState } from '../../components/AvatarView';

const LOCKUP_ASPECT = 732 / 180;

export const SettingsScreen = () => {
  const colors = useAppColors();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { avatarState, dialogVisible, showDialog, dismissDialog, pick } = useImagePicker();
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
    openWeb,
    logout,
  } = useSettingsViewModel();

  // Reset rather than navigate: the tabs stay on the stack otherwise, and Back returns to a signed-out Home.
  const handleLogout = () => logout(() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }));

  const themeModeLabel = (mode: ThemeMode): string => {
    switch (mode) {
      case 'light':
        return t('settings_theme_light');
      case 'dark':
        return t('settings_theme_dark');
      case 'system':
        return t('settings_theme_system');
    }
  };

  const languageLabel = (lang: Language): string => {
    switch (lang) {
      case 'en':
        return t('language_en');
      case 'sk':
        return t('language_sk');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: space4, gap: space4 }}>
        <ProfileSection
          title={t('settings_profile')}
          photoLabel={t('settings_profile_photo')}
          photoHint={t('settings_profile_photo_hint')}
          avatarState={avatarState}
          onPress={showDialog}
        />

        <TextTitleLargePrimary>{t('settings_appearance')}</TextTitleLargePrimary>

        <SettingsCard
          icon={<Icon name="weather-night" size={24} color={colors.primary} />}
          title={t('settings_theme')}
          value={themeModeLabel(uiState.themeMode)}
          onPress={onThemeClick}
        />

        <SettingsCard
          icon={<LanguageFlag lang={uiState.language} />}
          title={t('settings_language')}
          value={languageLabel(uiState.language)}
          onPress={onLanguageClick}
        />

        {uiState.showCrashButton && (
          <SettingsCard
            icon={<Icon name="bug-outline" size={24} color={colors.primary} />}
            title={t('settings_test_crash_title')}
            value={t('settings_test_crash_subtitle')}
            onPress={triggerTestCrash}
          />
        )}

        <AboutSection
          title={t('settings_about')}
          tagline={t('settings_about_tagline')}
          webLabel={t('settings_about_web')}
          onPress={openWeb}
        />

        <VersionFooter label={`${t('settings_version')} ${uiState.versionName}`} />

        <AppTextButtonError text={t('settings_logout')} onPress={handleLogout} align="center" />
      </ScrollView>

      <ImageSourceDialog
        visible={dialogVisible}
        title={t('imagepicker_title')}
        cameraLabel={t('imagepicker_camera')}
        galleryLabel={t('imagepicker_gallery')}
        onAction={pick}
        onDismiss={dismissDialog}
      />

      <SelectionDialog visible={uiState.showThemeDialog} title={t('settings_theme')} onDismiss={onThemeDialogDismiss}>
        {(['light', 'dark', 'system'] as ThemeMode[]).map(mode => (
          <SelectionOption
            key={mode}
            label={themeModeLabel(mode)}
            selected={uiState.themeMode === mode}
            onPress={() => onThemeSelected(mode)}
          />
        ))}
      </SelectionDialog>

      <SelectionDialog visible={uiState.showLanguageDialog} title={t('settings_language')} onDismiss={onLanguageDialogDismiss}>
        {(['en', 'sk'] as Language[]).map(lang => (
          <LanguageOption
            key={lang}
            flag={<LanguageFlag lang={lang} />}
            label={languageLabel(lang)}
            selected={uiState.language === lang}
            onPress={() => onLanguageSelected(lang)}
          />
        ))}
      </SelectionDialog>
    </View>
  );
};

const LanguageFlag = ({ lang, size = 24 }: { lang: Language; size?: number }) => {
  switch (lang) {
    case 'en':
      return <FlagEN size={size} />;
    case 'sk':
      return <FlagSK size={size} />;
  }
};

interface ProfileSectionProps {
  title: string;
  photoLabel: string;
  photoHint: string;
  avatarState: AvatarState;
  onPress: () => void;
}

const ProfileSection = ({ title, photoLabel, photoHint, avatarState, onPress }: ProfileSectionProps) => {
  return (
    <>
      <TextTitleLargePrimary>{title}</TextTitleLargePrimary>

      <AppCard elevated onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space4 }}>
          <AvatarView state={avatarState} />
          <View style={{ flex: 1 }}>
            <TextBodyLargePrimary>{photoLabel}</TextBodyLargePrimary>
            <ColumnSpacer2 />
            <TextBodyMediumNeutral80>{photoHint}</TextBodyMediumNeutral80>
          </View>
        </View>
      </AppCard>
    </>
  );
};

interface AboutSectionProps {
  title: string;
  tagline: string;
  webLabel: string;
  onPress: () => void;
}

const AboutSection = ({ title, tagline, webLabel, onPress }: AboutSectionProps) => {
  const colors = useAppColors();

  return (
    <>
      <TextTitleLargePrimary>{title}</TextTitleLargePrimary>

      <AppCard elevated onPress={onPress} cover={require('../../assets/mk-digital-lockup.png')} coverAspectRatio={LOCKUP_ASPECT}>
        <View style={{ paddingVertical: space4, gap: space2 }}>
          <TextBodyLargeNeutral100 bold>{tagline}</TextBodyLargeNeutral100>
          <TextBodySmall color={colors.primary} underline>
            {webLabel}
          </TextBodySmall>
        </View>
      </AppCard>
    </>
  );
};

const VersionFooter = ({ label }: { label: string }) => {
  return (
    <View style={{ alignItems: 'flex-end', marginTop: space4 }}>
      <TextBodySmallNeutral80>{label}</TextBodySmallNeutral80>
    </View>
  );
};

interface SelectionDialogProps {
  visible: boolean;
  title: string;
  onDismiss: () => void;
  children: React.ReactNode;
}

const SelectionDialog = ({ visible, title, onDismiss, children }: SelectionDialogProps) => {
  const theme = useAppTheme();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: theme.colors.surface }}>
        <Dialog.Title>
          <TextTitleLargePrimary>{title}</TextTitleLargePrimary>
        </Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog>
    </Portal>
  );
};

interface SettingsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  onPress: () => void;
}

const SettingsCard = ({ icon, title, value, onPress }: SettingsCardProps) => {
  return (
    <AppCard elevated onPress={onPress}>
      <SettingsItem icon={icon} title={title} value={value} />
    </AppCard>
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
