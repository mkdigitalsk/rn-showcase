import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLoginViewModel } from './useLoginViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import {
  AppCard,
  AppTextField,
  ContainedButton,
  OutlinedButton,
  AppTextButton,
  ColumnSpacer2,
  ColumnSpacer4,
} from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextLabelSmall } from '../../components/text/labelSmall/TextLabelSmall';
import { space4, space8 } from '../../foundation/dimensions';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const navigation = useNavigation<LoginNavigationProp>();
  const {
    uiState,
    onEmailChange,
    onPasswordChange,
    login,
    authenticateWithBiometrics,
    fillTestAccount,
  } = useLoginViewModel();

  const handleLogin = useCallback(() => {
    const valid = login();
    if (valid) {
      navigation.replace('Main');
    }
  }, [login, navigation]);

  const handleBiometricLogin = useCallback(async () => {
    const success = await authenticateWithBiometrics();
    if (success) {
      navigation.replace('Main');
    }
  }, [authenticateWithBiometrics, navigation]);

  const handleSkip = useCallback(() => {
    navigation.replace('Main');
  }, [navigation]);

  const getEmailErrorText = (): string | undefined => {
    switch (uiState.emailError) {
      case 'empty': return t('login_email_error_empty');
      case 'invalid_format': return t('login_email_error_invalid');
      default: return undefined;
    }
  };

  const getPasswordErrorText = (): string | undefined => {
    switch (uiState.passwordError) {
      case 'empty': return t('login_password_error_empty');
      case 'too_short': return t('login_password_error_short');
      case 'weak': return t('login_password_error_weak');
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
          {t('login_title')}
        </TextHeadlineMedium>
        <ColumnSpacer2 />
        <TextBodyMediumNeutral80>{t('login_subtitle')}</TextBodyMediumNeutral80>

        <ColumnSpacer4 />

        <AppCard elevated>
          <AppTextField
            value={uiState.email}
            onChangeText={onEmailChange}
            label={t('login_email_label')}
            placeholder={t('login_email_placeholder')}
            error={uiState.emailError !== null}
            helperText={getEmailErrorText()}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ColumnSpacer4 />

          <AppTextField
            value={uiState.password}
            onChangeText={onPasswordChange}
            label={t('login_password_label')}
            placeholder={t('login_password_placeholder')}
            error={uiState.passwordError !== null}
            helperText={getPasswordErrorText()}
            secureTextEntry
          />

          <ColumnSpacer4 />

          <ContainedButton text={t('login_button')} onPress={handleLogin} />
        </AppCard>

        {uiState.biometricsAvailable && (
          <>
            <ColumnSpacer4 />
            <AppCard elevated>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton
                  icon="fingerprint"
                  size={32}
                  iconColor={colors.primary}
                  onPress={handleBiometricLogin}
                  loading={uiState.biometricsLoading}
                />
                <TextBodyMediumNeutral80>
                  {t('login_biometric_label')}
                </TextBodyMediumNeutral80>
              </View>
              {uiState.biometricsResult && uiState.biometricsResult.type !== 'success' && (
                <TextLabelSmall color={colors.error}>
                  {uiState.biometricsResult.type === 'failed'
                    ? uiState.biometricsResult.message
                    : t('login_biometric_cancelled')}
                </TextLabelSmall>
              )}
            </AppCard>
          </>
        )}

        <ColumnSpacer4 />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <AppTextButton text={t('login_skip')} onPress={handleSkip} />
          <AppTextButton text={t('login_fill_test')} onPress={fillTestAccount} />
        </View>

        <ColumnSpacer2 />

        <AppTextButton
          text={t('login_to_register')}
          onPress={() => navigation.navigate('Register')}
        />

        <View style={{ height: space8 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
