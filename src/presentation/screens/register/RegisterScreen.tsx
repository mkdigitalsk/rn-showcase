import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRegisterViewModel } from './useRegisterViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import {
  AppCard,
  AppTextField,
  ContainedButton,
  AppTextButton,
  ColumnSpacer2,
  ColumnSpacer4,
} from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { space4, space8 } from '../../foundation/dimensions';

type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const RegisterScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const navigation = useNavigation<RegisterNavigationProp>();
  const {
    uiState,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    register,
  } = useRegisterViewModel();

  const handleRegister = useCallback(() => {
    const valid = register();
    if (valid) {
      navigation.replace('Main');
    }
  }, [register, navigation]);

  const handleToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getNameErrorText = (): string | undefined => {
    switch (uiState.nameError) {
      case 'empty': return t('register_name_error_empty');
      default: return undefined;
    }
  };

  const getEmailErrorText = (): string | undefined => {
    switch (uiState.emailError) {
      case 'empty': return t('register_email_error_empty');
      case 'invalid_format': return t('register_email_error_invalid');
      default: return undefined;
    }
  };

  const getPasswordErrorText = (): string | undefined => {
    switch (uiState.passwordError) {
      case 'empty': return t('register_password_error_empty');
      case 'too_short': return t('register_password_error_short');
      case 'weak': return t('register_password_error_weak');
      default: return undefined;
    }
  };

  const getConfirmPasswordErrorText = (): string | undefined => {
    switch (uiState.confirmPasswordError) {
      case 'empty': return t('register_confirm_error_empty');
      case 'mismatch': return t('register_confirm_error_mismatch');
      default: return undefined;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: space4,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <TextHeadlineMedium color={colors.primary}>
          {t('register_title')}
        </TextHeadlineMedium>
        <ColumnSpacer2 />
        <TextBodyMediumNeutral80>{t('register_subtitle')}</TextBodyMediumNeutral80>

        <ColumnSpacer4 />

        <AppCard elevated>
          <AppTextField
            value={uiState.name}
            onChangeText={onNameChange}
            label={t('register_name_label')}
            placeholder={t('register_name_placeholder')}
            error={uiState.nameError !== null}
            helperText={getNameErrorText()}
            autoCapitalize="words"
          />

          <ColumnSpacer4 />

          <AppTextField
            value={uiState.email}
            onChangeText={onEmailChange}
            label={t('register_email_label')}
            placeholder={t('register_email_placeholder')}
            error={uiState.emailError !== null}
            helperText={getEmailErrorText()}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ColumnSpacer4 />

          <AppTextField
            value={uiState.password}
            onChangeText={onPasswordChange}
            label={t('register_password_label')}
            placeholder={t('register_password_placeholder')}
            error={uiState.passwordError !== null}
            helperText={getPasswordErrorText()}
            secureTextEntry
          />

          <ColumnSpacer4 />

          <AppTextField
            value={uiState.confirmPassword}
            onChangeText={onConfirmPasswordChange}
            label={t('register_confirm_label')}
            placeholder={t('register_confirm_placeholder')}
            error={uiState.confirmPasswordError !== null}
            helperText={getConfirmPasswordErrorText()}
            secureTextEntry
          />

          <ColumnSpacer4 />

          <ContainedButton text={t('register_button')} onPress={handleRegister} />
        </AppCard>

        <ColumnSpacer4 />

        <AppTextButton text={t('register_to_login')} onPress={handleToLogin} />

        <View style={{ height: space8 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
