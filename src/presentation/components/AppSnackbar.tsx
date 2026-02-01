import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';

type SnackbarType = 'default' | 'success' | 'error' | 'warning';

interface AppSnackbarProps {
  visible: boolean;
  message: string;
  type?: SnackbarType;
  onDismiss: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export const AppSnackbar: React.FC<AppSnackbarProps> = ({
  visible,
  message,
  type = 'default',
  onDismiss,
  actionLabel,
  onAction,
}): React.JSX.Element => {
  const theme = useAppTheme();

  const backgroundColors: Record<SnackbarType, string> = {
    default: theme.colors.neutral80,
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
  };

  const contentColors: Record<SnackbarType, string> = {
    default: theme.colors.neutral0,
    success: theme.colors.neutral0,
    error: theme.colors.neutral0,
    warning: theme.colors.neutral100,
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      action={actionLabel ? { label: actionLabel, onPress: onAction ?? onDismiss } : undefined}
      style={{ backgroundColor: backgroundColors[type] }}
      theme={{ colors: { inverseSurface: backgroundColors[type], inverseOnSurface: contentColors[type], inversePrimary: contentColors[type] } }}
    >
      {message}
    </Snackbar>
  );
};
