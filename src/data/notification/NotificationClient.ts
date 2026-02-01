import { injectable } from 'tsyringe';
import notifee, {
  AuthorizationStatus,
  AndroidImportance,
} from '@notifee/react-native';
import { Linking, Platform } from 'react-native';
import { LocalNotificationService } from '../../domain/repositories/LocalNotificationService';
import {
  AppNotification,
  NotificationChannel,
  NotificationChannelConfig,
  PushPermissionStatus,
} from '../../domain/model/Notification';

@injectable()
export class NotificationClient implements LocalNotificationService {
  private channelsCreated = false;

  async getPermissionStatus(): Promise<PushPermissionStatus> {
    const settings = await notifee.getNotificationSettings();
    return this.mapAuthStatus(settings.authorizationStatus);
  }

  async requestPermission(): Promise<PushPermissionStatus> {
    const settings = await notifee.requestPermission();
    return this.mapAuthStatus(settings.authorizationStatus);
  }

  async showNotification(notification: AppNotification): Promise<void> {
    await this.ensureChannels();

    const channelConfig = NotificationChannelConfig[notification.channel];

    await notifee.displayNotification({
      id: notification.id,
      title: notification.title,
      body: notification.message,
      android: {
        channelId: channelConfig.id,
        smallIcon: 'ic_notification',
        pressAction: { id: 'default' },
      },
    });
  }

  async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }

  async openSettings(): Promise<void> {
    if (Platform.OS === 'ios') {
      await Linking.openSettings();
    } else {
      await notifee.openNotificationSettings();
    }
  }

  private mapAuthStatus(status: AuthorizationStatus): PushPermissionStatus {
    switch (status) {
      case AuthorizationStatus.AUTHORIZED:
      case AuthorizationStatus.PROVISIONAL:
        return PushPermissionStatus.GRANTED;
      case AuthorizationStatus.DENIED:
        return PushPermissionStatus.DENIED;
      default:
        return PushPermissionStatus.NOT_DETERMINED;
    }
  }

  private async ensureChannels(): Promise<void> {
    if (this.channelsCreated) { return; }

    const importanceMap: Record<NotificationChannel, AndroidImportance> = {
      [NotificationChannel.GENERAL]: AndroidImportance.DEFAULT,
      [NotificationChannel.REMINDERS]: AndroidImportance.HIGH,
      [NotificationChannel.PROMOTIONS]: AndroidImportance.LOW,
    };

    for (const channel of Object.values(NotificationChannel)) {
      const config = NotificationChannelConfig[channel];
      await notifee.createChannel({
        id: config.id,
        name: config.name,
        description: config.description,
        importance: importanceMap[channel],
      });
    }

    this.channelsCreated = true;
  }
}
