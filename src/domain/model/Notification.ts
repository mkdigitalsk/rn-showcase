export interface AppNotification {
  id: string;
  title: string;
  message: string;
  channel: NotificationChannel;
}

export enum NotificationChannel {
  GENERAL = 'GENERAL',
  REMINDERS = 'REMINDERS',
  PROMOTIONS = 'PROMOTIONS',
}

export const NotificationChannelConfig: Record<
  NotificationChannel,
  { id: string; name: string; description: string }
> = {
  [NotificationChannel.GENERAL]: {
    id: '001',
    name: 'General',
    description: 'General app notifications',
  },
  [NotificationChannel.REMINDERS]: {
    id: '002',
    name: 'Reminders',
    description: 'Calendar events and task reminders',
  },
  [NotificationChannel.PROMOTIONS]: {
    id: '003',
    name: 'Promotions',
    description: 'Deals, offers and updates',
  },
};

export enum PushPermissionStatus {
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  NOT_DETERMINED = 'NOT_DETERMINED',
}
