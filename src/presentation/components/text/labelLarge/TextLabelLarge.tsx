import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextLabelLarge = ({ children, color }: TextBaseProps) => (
  <Text variant="labelLarge" style={{ color }}>{children}</Text>
);

export const TextLabelLargePrimary = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextLabelLarge color={colors.primary}>{children}</TextLabelLarge>;
};

export const TextLabelLargeNeutral0 = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextLabelLarge color={colors.neutral0}>{children}</TextLabelLarge>;
};

export const TextLabelLargeError = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextLabelLarge color={colors.error}>{children}</TextLabelLarge>;
};
