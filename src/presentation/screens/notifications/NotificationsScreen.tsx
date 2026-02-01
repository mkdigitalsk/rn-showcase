import React from 'react';
import { ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNotificationsViewModel } from './useNotificationsViewModel';
import { PushPermissionStatus } from '../../../domain/model/Notification';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { AppCard, OutlinedButton } from '../../components';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from '../../components/text/bodyMedium/TextBodyMedium';
import { TextBodyLargeNeutral80 } from '../../components/text/bodyLarge/TextBodyLarge';
import { ColumnSpacer2, ColumnSpacer4 } from '../../components/spacers/Spacers';
import { space4 } from '../../foundation/dimensions';

export const NotificationsScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const {
    uiState,
    requestPermission,
    sendReminderNotification,
    sendPromoNotification,
    cancelAllNotifications,
    openSettings,
  } = useNotificationsViewModel();

  const permissionText = (() => {
    switch (uiState.permissionStatus) {
      case PushPermissionStatus.GRANTED:
        return t('notifications_permission_granted');
      case PushPermissionStatus.DENIED:
        return t('notifications_permission_denied');
      default:
        return t('notifications_permission_unknown');
    }
  })();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
    >
      <TextHeadlineMedium color={colors.primary}>
        {t('notifications_title')}
      </TextHeadlineMedium>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{t('notifications_subtitle')}</TextBodyMediumNeutral80>

      <ColumnSpacer4 />

      {/* Permission Card */}
      <NotificationCard
        icon="shield-outline"
        title={t('notifications_permission_title')}
        colors={colors}
      >
        <TextBodyMediumNeutral80>{permissionText}</TextBodyMediumNeutral80>
        <ColumnSpacer2 />
        {uiState.permissionStatus !== PushPermissionStatus.GRANTED && (
          <OutlinedButton
            text={t('notifications_request_permission')}
            onPress={requestPermission}
          />
        )}
      </NotificationCard>

      <ColumnSpacer4 />

      {/* Send Notifications Card */}
      <NotificationCard
        icon="bell-ring-outline"
        title={t('notifications_send_title')}
        colors={colors}
      >
        {uiState.lastSentNotification && (
          <>
            <TextBodyMediumNeutral80>
              {`${t('notifications_last_sent')}: ${uiState.lastSentNotification}`}
            </TextBodyMediumNeutral80>
            <ColumnSpacer2 />
          </>
        )}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <OutlinedButton
              text={t('notifications_send_reminder')}
              onPress={() =>
                sendReminderNotification(
                  t('notifications_reminder_title'),
                  t('notifications_reminder_message'),
                )
              }
            />
          </View>
          <View style={{ flex: 1 }}>
            <OutlinedButton
              text={t('notifications_send_promo')}
              onPress={() =>
                sendPromoNotification(
                  t('notifications_promo_title'),
                  t('notifications_promo_message'),
                )
              }
            />
          </View>
        </View>
      </NotificationCard>

      <ColumnSpacer4 />

      {/* Cancel & Settings Card */}
      <NotificationCard
        icon="bell-off-outline"
        title={t('notifications_cancel_title')}
        colors={colors}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <OutlinedButton
              text={t('notifications_open_settings')}
              onPress={openSettings}
            />
          </View>
          <View style={{ flex: 1 }}>
            <OutlinedButton
              text={t('notifications_cancel_all')}
              onPress={cancelAllNotifications}
            />
          </View>
        </View>
      </NotificationCard>
    </ScrollView>
  );
};

interface NotificationCardProps {
  icon: string;
  title: string;
  colors: ReturnType<typeof useAppColors>;
  children: React.ReactNode;
}

const NotificationCard = ({ icon, title, colors, children }: NotificationCardProps) => (
  <AppCard elevated>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
      <Icon name={icon} size={24} color={colors.primary} />
      <View style={{ width: 12 }} />
      <TextBodyLargeNeutral80>{title}</TextBodyLargeNeutral80>
    </View>
    {children}
  </AppCard>
);
