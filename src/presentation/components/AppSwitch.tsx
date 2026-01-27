import React from 'react';
import { Switch } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';

interface AppSwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
}

export const AppSwitch: React.FC<AppSwitchProps> = ({ value, onValueChange }): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      color={theme.colors.primary}
      thumbColor={theme.colors.neutral0}
      trackColor={{ false: theme.colors.neutral80, true: theme.colors.primary }}
    />
  );
};
