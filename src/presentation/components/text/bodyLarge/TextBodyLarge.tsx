import React from 'react';
import { Text } from 'react-native-paper';
import { useAppColors } from '../../../foundation/theme';
import { TextBaseProps, TextVariantProps } from '../TextProps';

export const TextBodyLarge = ({ children, color, bold }: TextBaseProps) => (
  <Text variant="bodyLarge" style={{ color, fontWeight: bold ? 'bold' : undefined }}>
    {children}
  </Text>
);

export const TextBodyLargeNeutral100 = ({ children, bold }: TextVariantProps) => {
  const colors = useAppColors();
  return (
    <TextBodyLarge color={colors.neutral100} bold={bold}>
      {children}
    </TextBodyLarge>
  );
};

export const TextBodyLargeNeutral80 = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextBodyLarge color={colors.neutral80}>{children}</TextBodyLarge>;
};

export const TextBodyLargePrimary = ({ children }: TextVariantProps) => {
  const colors = useAppColors();
  return <TextBodyLarge color={colors.primary}>{children}</TextBodyLarge>;
};
