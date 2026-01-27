import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';

export const CircularProgress = ({
  size = 'large',
}: {
  size?: 'small' | 'large';
}): React.JSX.Element => {
  const theme = useAppTheme();
  return <ActivityIndicator size={size} color={theme.colors.primary} />;
};
