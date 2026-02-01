import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../../foundation/theme';

interface AppFloatingActionButtonProps {
  icon?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
}

export const AppFloatingActionButton: React.FC<AppFloatingActionButtonProps> = ({
  icon = 'plus',
  onPress,
  label,
}) => {
  const theme = useAppTheme();
  return (
    <FAB
      icon={icon}
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        right: 16,
        bottom: 16,
      }}
      label={label}
      color={theme.colors.onPrimary}
      customSize={56}
    />
  );
};
