import React from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '../foundation/theme';

interface AppBadgeProps {
  count?: number;
}

export const AppBadge: React.FC<AppBadgeProps> = ({ count }): React.JSX.Element => {
  return <Badge>{count != null ? (count > 99 ? '99+' : count) : ''}</Badge>;
};

interface AppBadgedBoxProps {
  count: number;
  icon: string;
  iconSize?: number;
}

export const AppBadgedBox: React.FC<AppBadgedBoxProps> = ({
  count,
  icon,
  iconSize = 24,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <View>
      <Icon name={icon} size={iconSize} color={theme.colors.neutral80} />
      <Badge style={{ position: 'absolute', top: -4, right: -8 }}>
        {count > 99 ? '99+' : count}
      </Badge>
    </View>
  );
};

interface AppDotBadgedBoxProps {
  showBadge: boolean;
  icon: string;
  iconSize?: number;
}

export const AppDotBadgedBox: React.FC<AppDotBadgedBoxProps> = ({
  showBadge,
  icon,
  iconSize = 24,
}): React.JSX.Element => {
  const theme = useAppTheme();
  return (
    <View>
      <Icon name={icon} size={iconSize} color={theme.colors.neutral80} />
      {showBadge && (
        <Badge size={8} style={{ position: 'absolute', top: -2, right: -2 }} />
      )}
    </View>
  );
};
