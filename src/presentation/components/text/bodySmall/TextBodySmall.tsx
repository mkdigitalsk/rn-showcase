import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextBodySmall = ({children, color}: TextBaseProps) => (
  <Text variant="bodySmall" style={{color}}>{children}</Text>
);

export const TextBodySmallNeutral80 = ({children}: TextVariantProps) => {
  const colors = useAppColors();
  return <TextBodySmall color={colors.neutral80}>{children}</TextBodySmall>;
};
