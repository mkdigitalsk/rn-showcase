import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextBodyMedium = ({children, color, numberOfLines}: TextBaseProps) => (
  <Text variant="bodyMedium" style={{color}} numberOfLines={numberOfLines}>{children}</Text>
);

export const TextBodyMediumNeutral100 = ({children, numberOfLines}: TextVariantProps) => {
  const colors = useAppColors();
  return <TextBodyMedium color={colors.neutral100} numberOfLines={numberOfLines}>{children}</TextBodyMedium>;
};

export const TextBodyMediumNeutral80 = ({children, numberOfLines}: TextVariantProps) => {
  const colors = useAppColors();
  return <TextBodyMedium color={colors.neutral80} numberOfLines={numberOfLines}>{children}</TextBodyMedium>;
};
