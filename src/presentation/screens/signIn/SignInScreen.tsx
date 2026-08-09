import React, { useCallback, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSignInViewModel, TEST_EMAIL, TEST_PASSWORD } from './useSignInViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import {
  AppCard,
  AppTextField,
  AppPasswordTextField,
  ContainedButton,
  AppTextButton,
  ColumnSpacer2,
  ColumnSpacer4,
  ColumnSpacer8,
} from '../../components';
import { TextBodySmallNeutral80 } from '../../components/text/bodySmall/TextBodySmall';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextLabelSmall } from '../../components/text/labelSmall/TextLabelSmall';
import { space4, space8, cardCornerRadius6 } from '../../foundation/dimensions';

type SignInNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SignInScreen = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const { t } = useStrings();
  const navigation = useNavigation<SignInNavigationProp>();
  const { uiState, onEmailChange, onPasswordChange, signIn, restoreSession, authenticateWithBiometrics, fillTestAccount } =
    useSignInViewModel();

  useEffect(() => {
    restoreSession(() => navigation.replace('Main'));
  }, [restoreSession, navigation]);

  const handleSignIn = useCallback(() => {
    signIn(() => navigation.replace('Main'));
  }, [signIn, navigation]);

  const handleBiometricSignIn = useCallback(() => {
    authenticateWithBiometrics(() => navigation.replace('Main'));
  }, [authenticateWithBiometrics, navigation]);

  const getEmailErrorText = (): string | undefined => {
    switch (uiState.emailError) {
      case 'empty':
        return t('sign_in_email_error_empty');
      case 'invalid_format':
        return t('sign_in_email_error_invalid');
      default:
        return undefined;
    }
  };

  const getPasswordErrorText = (): string | undefined => {
    switch (uiState.passwordError) {
      case 'empty':
        return t('sign_in_password_error_empty');
      case 'too_short':
        return t('sign_in_password_error_short');
      case 'weak':
        return t('sign_in_password_error_weak');
      default:
        return undefined;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: space4,
          paddingTop: insets.top + space4,
          paddingBottom: insets.bottom + space4,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center' }}>
          <TextHeadlineMedium color={colors.primary}>{t('sign_in_title')}</TextHeadlineMedium>
          <ColumnSpacer2 />
          <TextBodyMediumNeutral80>{t('sign_in_subtitle')}</TextBodyMediumNeutral80>
        </View>

        <ColumnSpacer8 />

        <View>
          <AppTextField
            value={uiState.email}
            onChangeText={onEmailChange}
            label={t('sign_in_email_label')}
            placeholder={t('sign_in_email_placeholder')}
            error={uiState.emailError !== null}
            helperText={getEmailErrorText()}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ColumnSpacer4 />

          <AppPasswordTextField
            value={uiState.password}
            onChangeText={onPasswordChange}
            label={t('sign_in_password_label')}
            placeholder={t('sign_in_password_placeholder')}
            error={uiState.passwordError !== null}
            helperText={getPasswordErrorText()}
          />

          {uiState.signInFailed && (
            <>
              <ColumnSpacer4 />
              <TextLabelSmall color={colors.error}>{t('sign_in_server_error')}</TextLabelSmall>
            </>
          )}

          <ColumnSpacer4 />

          <ContainedButton
            text={t('sign_in_button')}
            onPress={handleSignIn}
            loading={uiState.isLoading}
            disabled={uiState.isLoading}
            fullWidth
          />
        </View>

        {uiState.biometricsAvailable && (
          <>
            <ColumnSpacer4 />
            <AppCard elevated>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton
                  icon="fingerprint"
                  size={32}
                  iconColor={colors.primary}
                  onPress={handleBiometricSignIn}
                  loading={uiState.biometricsLoading}
                />
                <TextBodyMediumNeutral80>{t('sign_in_biometric_label')}</TextBodyMediumNeutral80>
              </View>
              {uiState.biometricsResult && uiState.biometricsResult.type !== 'success' && (
                <TextLabelSmall color={colors.error}>
                  {uiState.biometricsResult.type === 'failed' ? uiState.biometricsResult.message : t('sign_in_biometric_cancelled')}
                </TextLabelSmall>
              )}
            </AppCard>
          </>
        )}

        <ColumnSpacer4 />

        <AppTextButton text={t('sign_in_to_sign_up')} onPress={() => navigation.navigate('SignUp')} align="center" />

        <View style={{ flex: 1, minHeight: space8 }} />

        <View style={{ backgroundColor: colors.neutral20, borderRadius: cardCornerRadius6, padding: space4, alignItems: 'center' }}>
          <TextBodySmallNeutral80>{t('sign_in_test_account_hint')}</TextBodySmallNeutral80>
          <ColumnSpacer2 />
          <TextBodyMediumNeutral80>{TEST_EMAIL}</TextBodyMediumNeutral80>
          <TextBodyMediumNeutral80>{TEST_PASSWORD}</TextBodyMediumNeutral80>
          <AppTextButton text={t('sign_in_fill_test')} onPress={fillTestAccount} align="center" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
