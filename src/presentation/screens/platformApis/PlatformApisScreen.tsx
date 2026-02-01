import React from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePlatformApisViewModel } from './usePlatformApisViewModel';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { AppCard, OutlinedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextBodyLargeNeutral80 } from '../../components/text/bodyLarge/TextBodyLarge';
import { ColumnSpacer2, ColumnSpacer4, RowSpacer4 } from '../../components/spacers/Spacers';
import { space4, defaultIconSize } from '../../foundation/dimensions';

interface PlatformApiCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const PlatformApiCard = ({ icon, title, children }: PlatformApiCardProps) => {
  const colors = useAppColors();

  return (
    <AppCard elevated>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={icon} size={defaultIconSize} color={colors.neutral80} />
        <RowSpacer4 />
        <View style={{ flex: 1 }}>
          <TextBodyLargeNeutral80>{title}</TextBodyLargeNeutral80>
          <ColumnSpacer2 />
          {children}
        </View>
      </View>
    </AppCard>
  );
};

const formatCoordinate = (value: number): string => value.toFixed(6);

export const PlatformApisScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const {
    uiState,
    share,
    dial,
    openLink,
    sendEmail,
    copyToClipboard,
    getLocation,
    toggleLocationUpdates,
    authenticateWithBiometrics,
    toggleFlashlight,
  } = usePlatformApisViewModel();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
    >
      <TextHeadlineMedium color={colors.primary}>
        {t('platform_apis_title')}
      </TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('platform_apis_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      {/* Share */}
      <PlatformApiCard icon="share-variant-outline" title={t('platform_apis_share_title')}>
        <OutlinedButton text={t('platform_apis_share_action')} onPress={share} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Dial */}
      <PlatformApiCard icon="phone-outline" title={t('platform_apis_dial_title')}>
        <OutlinedButton text={t('platform_apis_dial_action')} onPress={dial} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Open Link */}
      <PlatformApiCard icon="link-variant" title={t('platform_apis_link_title')}>
        <OutlinedButton text={t('platform_apis_link_action')} onPress={openLink} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Send Email */}
      <PlatformApiCard icon="email-outline" title={t('platform_apis_email_title')}>
        <OutlinedButton text={t('platform_apis_email_action')} onPress={sendEmail} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Clipboard */}
      <PlatformApiCard icon="content-copy" title={t('platform_apis_copy_title')}>
        {uiState.copiedToClipboard && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_copied_message')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        <OutlinedButton text={t('platform_apis_copy_action')} onPress={copyToClipboard} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Location */}
      <PlatformApiCard icon="map-marker-outline" title={t('platform_apis_location_title')}>
        {uiState.locationLoading && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_location_loading')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        {uiState.locationError && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_location_error')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        {uiState.location && !uiState.locationLoading && (
          <>
            <TextBodyMediumNeutral80>
              {`Lat: ${formatCoordinate(uiState.location.lat)}, Lon: ${formatCoordinate(uiState.location.lon)}`}
            </TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        <OutlinedButton text={t('platform_apis_location_action')} onPress={getLocation} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Location Updates */}
      <PlatformApiCard icon="crosshairs-gps" title={t('platform_apis_location_updates_title')}>
        {uiState.locationUpdatesError && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_location_updates_error')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        {uiState.trackedLocation && (
          <>
            <TextBodyMediumNeutral80>
              {`Lat: ${formatCoordinate(uiState.trackedLocation.lat)}, Lon: ${formatCoordinate(uiState.trackedLocation.lon)}`}
            </TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        <OutlinedButton
          text={uiState.isTrackingLocation
            ? t('platform_apis_location_updates_stop')
            : t('platform_apis_location_updates_start')
          }
          onPress={toggleLocationUpdates}
        />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Biometrics */}
      <PlatformApiCard icon="fingerprint" title={t('platform_apis_biometrics_title')}>
        {!uiState.biometricsAvailable && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_biometrics_not_available')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        {uiState.biometricsResult?.type === 'success' && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_biometrics_success')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        {uiState.biometricsResult?.type === 'failed' && (
          <>
            <TextBodyMediumNeutral80>
              {`${t('platform_apis_biometrics_failed')}: ${uiState.biometricsResult.message}`}
            </TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        {uiState.biometricsResult?.type === 'cancelled' && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_biometrics_cancelled')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        <OutlinedButton text={t('platform_apis_biometrics_action')} onPress={authenticateWithBiometrics} />
      </PlatformApiCard>

      <ColumnSpacer4 />

      {/* Flashlight */}
      <PlatformApiCard icon="flashlight" title={t('platform_apis_flashlight_title')}>
        {!uiState.flashlightAvailable && (
          <>
            <TextBodyMediumNeutral80>{t('platform_apis_flashlight_not_available')}</TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        <OutlinedButton
          text={uiState.flashlightOn
            ? t('platform_apis_flashlight_off')
            : t('platform_apis_flashlight_on')
          }
          onPress={toggleFlashlight}
        />
      </PlatformApiCard>
    </ScrollView>
  );
};
