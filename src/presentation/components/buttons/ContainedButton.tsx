import React from 'react';
import { Button } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../../foundation/theme';
import { space4, cardCornerRadius6, space2, space } from '../../foundation/dimensions';

interface ContainedButtonProps {
  text: string;
  onPress: () => void;
}

export const ContainedButton: React.FC<ContainedButtonProps> = ({
  text,
  onPress,
}) => {
  const theme = useAppTheme();

  return (
    <Button
      mode="contained"
      onPress={onPress}
      buttonColor={theme.colors.primary}
      textColor={theme.colors.neutral0}
      style={{ alignSelf: 'flex-start' }}
    >
      {text}
    </Button>
  );
};
