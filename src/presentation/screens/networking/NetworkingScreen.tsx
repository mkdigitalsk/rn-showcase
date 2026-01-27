import React from 'react';
import { View, FlatList } from 'react-native';
import { useNetworkingViewModel } from './useNetworkingViewModel';
import { UserCard } from './UserCard';
import { User } from '../../../domain/models/User';
import { LoadingView } from '../../components/LoadingView';
import { ErrorView } from '../../components/ErrorView';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { ColumnSpacer4 } from '../../components/spacers/Spacers';

export const NetworkingScreen = () => {
  const colors = useAppColors();
  const { uiState, onRetry } = useNetworkingViewModel();

  const renderItem = ({ item }: { item: User }) => <UserCard user={item} />;

  const keyExtractor = (item: User) => item.id.toString();

  if (uiState.isLoading) {
    return <LoadingView />;
  }

  if (uiState.error) {
    return <ErrorView message={uiState.error} onRetry={onRetry} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={uiState.users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
        ItemSeparatorComponent={ColumnSpacer4}
        removeClippedSubviews={false}
      />
    </View>
  );
};
