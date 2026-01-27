import React from 'react';
import { Card } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';

interface AppCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  onPress?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ children, elevated = true, onPress }): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Card mode={elevated ? "elevated" : "contained"} style={{ 
      borderStyle: 'solid', 
      borderWidth: elevated ? 0 : 1, 
      borderColor: theme.colors.neutral10,
      backgroundColor: theme.colors.surface }} onPress={onPress}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};


