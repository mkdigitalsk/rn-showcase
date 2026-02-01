import { PushPermissionStatus } from '../../../domain/model/Notification';

export interface NotificationsUiState {
  permissionStatus: PushPermissionStatus;
  permissionLoading: boolean;
  lastSentNotification: string | null;
}

export const initialNotificationsUiState: NotificationsUiState = {
  permissionStatus: PushPermissionStatus.NOT_DETERMINED,
  permissionLoading: false,
  lastSentNotification: null,
};
