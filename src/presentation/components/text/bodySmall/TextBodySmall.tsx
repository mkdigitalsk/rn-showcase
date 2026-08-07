import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextBodySmall = ({ children, color, underline }: TextBaseProps) => (
  <Text variant="bodySmall" style={{ color, textDecorationLine: underline ? 'underline' : 'none' }}>
    {children}
  </Text>
);

export const TextBodySmallNeutral80 = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextBodySmall color={colors.neutral80}>{children}</TextBodySmall>;
};
