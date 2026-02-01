import React from 'react';
import { RadioButton } from 'react-native-paper';
import { useAppTheme } from '../foundation/theme';

interface AppRadioButtonProps {
  selected: boolean;
  onPress?: () => void;
}

export const AppRadioButton: React.FC<AppRadioButtonProps> = ({
  selected,
  onPress,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <RadioButton
      value=""
      status={selected ? 'checked' : 'unchecked'}
      onPress={onPress}
      color={theme.colors.primary}
      uncheckedColor={theme.colors.neutral80}
    />
  );
};
