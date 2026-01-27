import React from 'react';
import { Checkbox } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';

interface AppCheckboxProps {
  checked: boolean;
  onPress?: () => void;
  enabled?: boolean;
}

export const AppCheckbox: React.FC<AppCheckboxProps> = ({
  checked = false,
  onPress,
  enabled = true,
}) => {
  const theme = useAppTheme();

  return (
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={onPress}
      disabled={!enabled}
      color={theme.colors.primary}
      uncheckedColor={theme.colors.neutral40}
    />
  );
};
