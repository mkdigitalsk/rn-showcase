import React from 'react';
import { Text } from 'react-native-paper';
import { TextBaseProps } from '../TextProps';

export const TextLabelSmall = ({children, color}: TextBaseProps) => (
  <Text variant="labelSmall" style={{color}}>{children}</Text>
);
