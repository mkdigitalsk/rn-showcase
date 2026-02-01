import React from 'react';
import { Button } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';
import { space4, cardCornerRadius6 } from '../../foundation/dimensions';

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
      textColor={theme.colors.onPrimary}
      style={{
        alignSelf: 'flex-start',
        borderRadius: cardCornerRadius6,
      }}
      contentStyle={{ paddingHorizontal: space4 }}
    >
      {text}
    </Button>
  );
};
