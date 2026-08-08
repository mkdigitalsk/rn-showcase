import React from 'react';
import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppColors } from '../foundation/theme';
import { space4 } from '../foundation/dimensions';

const AVATAR_SIZE = 120;

export type AvatarState = { type: 'empty' } | { type: 'loading' } | { type: 'loaded'; uri: string };

interface AvatarViewProps {
  state: AvatarState;
}

export const AvatarView: React.FC<AvatarViewProps> = ({ state }): React.JSX.Element => {
  const colors = useAppColors();

  return (
    <View
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: space4,
        overflow: 'hidden',
        backgroundColor: colors.neutral20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {state.type === 'loaded' && <Image source={{ uri: state.uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />}
      {state.type === 'loading' && <ActivityIndicator color={colors.primary} />}
      {state.type === 'empty' && <Icon name="account" size={AVATAR_SIZE / 2} color={colors.neutral80} />}
    </View>
  );
};
