import React from 'react';
import { appErrorKey } from '../../foundation/errors/appErrorKey';
import { View, FlatList } from 'react-native';
import { IconButton, ActivityIndicator } from 'react-native-paper';
import { useNetworkingViewModel } from './useNetworkingViewModel';
import { UserCard } from './UserCard';
import { User } from '../../../domain/model/User';
import { ErrorView } from '../../components/ErrorView';
import { TextHeadlineMedium } from '../../components/text/headlineMedium/TextHeadlineMedium';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { useStrings } from '../../foundation/strings';
import { ColumnSpacer4 } from '../../components/spacers/Spacers';

export const NetworkingScreen = () => {
  const colors = useAppColors();
  const { t } = useStrings();
  const { uiState, onRetry } = useNetworkingViewModel();

  const renderItem = ({ item }: { item: User }) => <UserCard user={item} />;

  const keyExtractor = (item: User) => item.id.toString();

  if (uiState.error) {
    return <ErrorView message={t(appErrorKey(uiState.error))} onRetry={onRetry} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: space4,
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <TextHeadlineMedium color={colors.primary}>{t('networking_title')}</TextHeadlineMedium>
        </View>
        {uiState.isLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <IconButton icon="refresh" iconColor={colors.primary} onPress={onRetry} />
        )}
      </View>

      <FlatList
        data={uiState.users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: space4, paddingBottom: space4 }}
        ItemSeparatorComponent={ColumnSpacer4}
        removeClippedSubviews={false}
      />
    </View>
  );
};
