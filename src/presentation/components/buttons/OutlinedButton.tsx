import React from 'react';
import { Button } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';
import { space4, cardCornerRadius6 } from '../../foundation/dimensions';

interface OutlinedButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({ text, onPress, disabled }) => {
  const theme = useAppTheme();

  return (
    <Button
      mode="outlined"
      onPress={onPress}
      disabled={disabled}
      textColor={theme.colors.primary}
      style={{
        alignSelf: 'flex-start',
        borderRadius: cardCornerRadius6,
        borderColor: theme.colors.primary,
      }}
      contentStyle={{ paddingHorizontal: space4 }}
    >
      {text}
    </Button>
  );
};
