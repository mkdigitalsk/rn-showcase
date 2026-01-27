import React from 'react';
import { Divider } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../../foundation/theme';



const AppDivider: React.FC<{color: string}> = ({ color }): React.JSX.Element => (
  <Divider style={{ backgroundColor: color }} />
);

export const AppDividerPrimary = (): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <AppDivider color={theme.colors.primary} />
  );
};
