import React, { useCallback } from 'react';
import { appErrorKey } from '../../foundation/errors/appErrorKey';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSignUpViewModel } from './useSignUpViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { RootStackParamList } from '../../navigation/RootStackNavigator';
import { AppCard, AppTextField, ContainedButton, AppTextButton, ColumnSpacer2, ColumnSpacer4 } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumError, TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { space4, space8 } from '../../foundation/dimensions';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SignUpScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const navigation = useNavigation<SignUpNavigationProp>();
  const { uiState, onEmailChange, onPasswordChange, onConfirmPasswordChange, signUp } = useSignUpViewModel();

  const handleSignUp = useCallback(() => {
    signUp(() => navigation.replace('Main'));
  }, [signUp, navigation]);

  const handleToSignIn = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getEmailErrorText = (): string | undefined => {
    switch (uiState.emailError) {
      case 'empty':
        return t('sign_up_email_error_empty');
      case 'invalid_format':
        return t('sign_up_email_error_invalid');
      case 'already_exists':
        return t('sign_up_email_error_already_exists');
      default:
        return undefined;
    }
  };

  const getPasswordErrorText = (): string | undefined => {
    switch (uiState.passwordError) {
      case 'empty':
        return t('sign_up_password_error_empty');
      case 'too_short':
        return t('sign_up_password_error_short');
      case 'weak':
        return t('sign_up_password_error_weak');
      default:
        return undefined;
    }
  };

  const getConfirmPasswordErrorText = (): string | undefined => {
    switch (uiState.confirmPasswordError) {
      case 'empty':
        return t('sign_up_confirm_error_empty');
      case 'mismatch':
        return t('sign_up_confirm_error_mismatch');
      default:
        return undefined;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: space4,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <TextHeadlineMedium color={colors.primary}>{t('sign_up_title')}</TextHeadlineMedium>
        <ColumnSpacer2 />
        <TextBodyMediumNeutral80>{t('sign_up_subtitle')}</TextBodyMediumNeutral80>

        <ColumnSpacer4 />

        <AppCard elevated>
          <AppTextField
            value={uiState.email}
            onChangeText={onEmailChange}
            label={t('sign_up_email_label')}
            placeholder={t('sign_up_email_placeholder')}
            error={uiState.emailError !== null}
            helperText={getEmailErrorText()}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ColumnSpacer4 />

          <AppTextField
            value={uiState.password}
            onChangeText={onPasswordChange}
            label={t('sign_up_password_label')}
            placeholder={t('sign_up_password_placeholder')}
            error={uiState.passwordError !== null}
            helperText={getPasswordErrorText()}
            secureTextEntry
          />

          <ColumnSpacer4 />

          <AppTextField
            value={uiState.confirmPassword}
            onChangeText={onConfirmPasswordChange}
            label={t('sign_up_confirm_label')}
            placeholder={t('sign_up_confirm_placeholder')}
            error={uiState.confirmPasswordError !== null}
            helperText={getConfirmPasswordErrorText()}
            secureTextEntry
          />

          <ColumnSpacer4 />

          {uiState.error && <TextBodyMediumError>{t(appErrorKey(uiState.error))}</TextBodyMediumError>}

          <ContainedButton text={t('sign_up_button')} onPress={handleSignUp} loading={uiState.isLoading} disabled={uiState.isLoading} />
        </AppCard>

        <ColumnSpacer4 />

        <AppTextButton text={t('sign_up_to_sign_in')} onPress={handleToSignIn} />

        <View style={{ height: space8 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
