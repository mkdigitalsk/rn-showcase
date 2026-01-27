import React from 'react';
import { Text } from 'react-native-paper';
import { TextBaseProps, TextVariantProps } from '../TextProps';
import { useAppColors } from '../../../foundation';

export const TextLabelMedium = ({ children, color }: TextBaseProps) => (
  <Text variant="labelMedium" style={{ color }}>{children}</Text>
);

export const TextLabelMediumNeutral80 = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextLabelMedium color={colors.neutral80}>{children}</TextLabelMedium>;
};