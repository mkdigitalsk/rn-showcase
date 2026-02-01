import { AppNotification, PushPermissionStatus } from '../model/Notification';

export interface LocalNotificationService {
  getPermissionStatus(): Promise<PushPermissionStatus>;
  requestPermission(): Promise<PushPermissionStatus>;
  showNotification(notification: AppNotification): Promise<void>;
  cancelAllNotifications(): Promise<void>;
  openSettings(): Promise<void>;
}
