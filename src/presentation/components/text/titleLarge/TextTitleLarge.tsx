import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextTitleLarge = ({children, color}: TextBaseProps) => (
  <Text variant="titleLarge" style={{color}}>{children}</Text>
);

export const TextTitleLargeNeutral80 = ({children}: TextVariantProps) => {
  const colors = useAppColors();
  return <TextTitleLarge color={colors.neutral80}>{children}</TextTitleLarge>;
};

export const TextTitleLargePrimary = ({children}: TextVariantProps) => {
  const colors = useAppColors();
  return <TextTitleLarge color={colors.primary}>{children}</TextTitleLarge>;
};
