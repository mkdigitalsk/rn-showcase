import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextHeadlineMedium = ({ children, color }: TextBaseProps) => (
  <Text variant="headlineMedium" style={{ color }}>{children}</Text>
);

export const TextHeadlineMediumPrimary = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextHeadlineMedium color={colors.primary}>{children}</TextHeadlineMedium>;
};
