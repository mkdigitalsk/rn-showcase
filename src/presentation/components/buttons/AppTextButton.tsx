import React from 'react';
import { Button } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';

interface AppTextButtonProps {
  text: string;
  onPress: () => void;
  align?: 'start' | 'center';
}

export const AppTextButton: React.FC<AppTextButtonProps> = ({ text, onPress, align = 'start' }): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Button
      mode="text"
      onPress={onPress}
      textColor={theme.colors.primary}
      style={{ alignSelf: align === 'center' ? 'center' : 'flex-start' }}
    >
      {text}
    </Button>
  );
};

export const AppTextButtonError: React.FC<AppTextButtonProps> = ({ text, onPress, align = 'start' }): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Button
      mode="text"
      onPress={onPress}
      textColor={theme.colors.error}
      style={{ alignSelf: align === 'center' ? 'center' : 'flex-start' }}
    >
      {text}
    </Button>
  );
};
