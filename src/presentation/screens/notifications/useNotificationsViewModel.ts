import { useState, useEffect, useCallback } from 'react';
import { TYPES } from '../../../app/diTypes';
import { GetPermissionStatusUseCase } from '../../../domain/useCases/notifications/GetPermissionStatusUseCase';
import { RequestPermissionUseCase } from '../../../domain/useCases/notifications/RequestPermissionUseCase';
import { ShowNotificationUseCase } from '../../../domain/useCases/notifications/ShowNotificationUseCase';
import { CancelAllNotificationsUseCase } from '../../../domain/useCases/notifications/CancelAllNotificationsUseCase';
import { OpenNotificationSettingsUseCase } from '../../../domain/useCases/notifications/OpenNotificationSettingsUseCase';
import { NotificationChannel } from '../../../domain/model/Notification';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { NotificationsUiState, initialNotificationsUiState } from './NotificationsUiState';

let notificationCounter = 0;

export const useNotificationsViewModel = () => {
  const [uiState, setUiState] = useState<NotificationsUiState>(initialNotificationsUiState);

  const getPermissionStatusUseCase = useResolve<GetPermissionStatusUseCase>(TYPES.GetPermissionStatusUseCase);
  const requestPermissionUseCase = useResolve<RequestPermissionUseCase>(TYPES.RequestPermissionUseCase);
  const showNotificationUseCase = useResolve<ShowNotificationUseCase>(TYPES.ShowNotificationUseCase);
  const cancelAllNotificationsUseCase = useResolve<CancelAllNotificationsUseCase>(TYPES.CancelAllNotificationsUseCase);
  const openNotificationSettingsUseCase = useResolve<OpenNotificationSettingsUseCase>(TYPES.OpenNotificationSettingsUseCase);

  useEffect(() => {
    execute({
      action: () => getPermissionStatusUseCase.execute(),
      onSuccess: (status) => setUiState(prev => ({ ...prev, permissionStatus: status })),
    });
  }, [getPermissionStatusUseCase]);

  const requestPermission = useCallback(() => {
    execute({
      action: () => requestPermissionUseCase.execute(),
      onLoading: () => setUiState(prev => ({ ...prev, permissionLoading: true })),
      onSuccess: (status) => setUiState(prev => ({ ...prev, permissionStatus: status, permissionLoading: false })),
      onError: () => setUiState(prev => ({ ...prev, permissionLoading: false })),
    });
  }, [requestPermissionUseCase]);

  const sendReminderNotification = useCallback((title: string, message: string) => {
    notificationCounter++;
    execute({
      action: () => showNotificationUseCase.execute({
        id: `reminder-${notificationCounter}`,
        title,
        message,
        channel: NotificationChannel.REMINDERS,
      }),
      onSuccess: () => setUiState(prev => ({ ...prev, lastSentNotification: title })),
    });
  }, [showNotificationUseCase]);

  const sendPromoNotification = useCallback((title: string, message: string) => {
    notificationCounter++;
    execute({
      action: () => showNotificationUseCase.execute({
        id: `promo-${notificationCounter}`,
        title,
        message,
        channel: NotificationChannel.PROMOTIONS,
      }),
      onSuccess: () => setUiState(prev => ({ ...prev, lastSentNotification: title })),
    });
  }, [showNotificationUseCase]);

  const cancelAllNotifications = useCallback(() => {
    execute({
      action: () => cancelAllNotificationsUseCase.execute(),
      onSuccess: () => setUiState(prev => ({ ...prev, lastSentNotification: null })),
    });
  }, [cancelAllNotificationsUseCase]);

  const openSettings = useCallback(() => {
    execute({
      action: () => openNotificationSettingsUseCase.execute(),
    });
  }, [openNotificationSettingsUseCase]);

  return {
    uiState,
    requestPermission,
    sendReminderNotification,
    sendPromoNotification,
    cancelAllNotifications,
    openSettings,
  };
};
