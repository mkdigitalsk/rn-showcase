import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Card } from 'react-native-paper';
import { useAppTheme } from '../../foundation/theme';
import { space4 } from '../../foundation/dimensions';

interface AppCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  onPress?: () => void;
  cover?: ImageSourcePropType;
  coverAspectRatio?: number;
}

export const AppCard: React.FC<AppCardProps> = ({ children, elevated = true, onPress, cover, coverAspectRatio }): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <Card
      mode={elevated ? 'elevated' : 'contained'}
      style={{
        borderStyle: 'solid',
        borderWidth: elevated ? 0 : 1,
        borderColor: theme.colors.neutral10,
        backgroundColor: theme.colors.surface,
      }}
      onPress={onPress}
    >
      {cover && <Card.Cover source={cover} style={{ height: undefined, aspectRatio: coverAspectRatio }} />}
      <Card.Content style={{ paddingVertical: space4 }}>{children}</Card.Content>
    </Card>
  );
};
