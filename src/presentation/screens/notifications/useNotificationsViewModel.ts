import { useState, useEffect, useCallback, useMemo } from 'react';
import { container, TYPES } from '../../../app/di/diContainer';
import { GetPermissionStatusUseCase } from '../../../domain/useCases/notifications/GetPermissionStatusUseCase';
import { RequestPermissionUseCase } from '../../../domain/useCases/notifications/RequestPermissionUseCase';
import { ShowNotificationUseCase } from '../../../domain/useCases/notifications/ShowNotificationUseCase';
import { CancelAllNotificationsUseCase } from '../../../domain/useCases/notifications/CancelAllNotificationsUseCase';
import { OpenNotificationSettingsUseCase } from '../../../domain/useCases/notifications/OpenNotificationSettingsUseCase';
import { NotificationChannel } from '../../../domain/model/Notification';
import { NotificationsUiState, initialNotificationsUiState } from './NotificationsUiState';

let notificationCounter = 0;

export const useNotificationsViewModel = () => {
  const [uiState, setUiState] = useState<NotificationsUiState>(initialNotificationsUiState);

  const getPermissionStatusUseCase = useMemo(
    () => container.resolve<GetPermissionStatusUseCase>(TYPES.GetPermissionStatusUseCase), []
  );
  const requestPermissionUseCase = useMemo(
    () => container.resolve<RequestPermissionUseCase>(TYPES.RequestPermissionUseCase), []
  );
  const showNotificationUseCase = useMemo(
    () => container.resolve<ShowNotificationUseCase>(TYPES.ShowNotificationUseCase), []
  );
  const cancelAllNotificationsUseCase = useMemo(
    () => container.resolve<CancelAllNotificationsUseCase>(TYPES.CancelAllNotificationsUseCase), []
  );
  const openNotificationSettingsUseCase = useMemo(
    () => container.resolve<OpenNotificationSettingsUseCase>(TYPES.OpenNotificationSettingsUseCase), []
  );

  useEffect(() => {
    const load = async () => {
      const status = await getPermissionStatusUseCase.execute();
      setUiState(prev => ({ ...prev, permissionStatus: status }));
    };
    load();
  }, [getPermissionStatusUseCase]);

  const requestPermission = useCallback(async () => {
    setUiState(prev => ({ ...prev, permissionLoading: true }));
    const status = await requestPermissionUseCase.execute();
    setUiState(prev => ({ ...prev, permissionStatus: status, permissionLoading: false }));
  }, [requestPermissionUseCase]);

  const sendReminderNotification = useCallback(async (title: string, message: string) => {
    notificationCounter++;
    await showNotificationUseCase.execute({
      id: `reminder-${notificationCounter}`,
      title,
      message,
      channel: NotificationChannel.REMINDERS,
    });
    setUiState(prev => ({ ...prev, lastSentNotification: title }));
  }, [showNotificationUseCase]);

  const sendPromoNotification = useCallback(async (title: string, message: string) => {
    notificationCounter++;
    await showNotificationUseCase.execute({
      id: `promo-${notificationCounter}`,
      title,
      message,
      channel: NotificationChannel.PROMOTIONS,
    });
    setUiState(prev => ({ ...prev, lastSentNotification: title }));
  }, [showNotificationUseCase]);

  const cancelAllNotifications = useCallback(async () => {
    await cancelAllNotificationsUseCase.execute();
    setUiState(prev => ({ ...prev, lastSentNotification: null }));
  }, [cancelAllNotificationsUseCase]);

  const openSettings = useCallback(async () => {
    await openNotificationSettingsUseCase.execute();
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
