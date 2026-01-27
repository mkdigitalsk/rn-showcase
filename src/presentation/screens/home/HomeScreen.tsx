import React from 'react';
import { View, FlatList } from 'react-native';
import { useHomeViewModel } from './useHomeViewModel';
import { FeatureCard } from './FeatureCard';
import { Feature } from './Feature';
import { space4 } from '../../foundation/dimensions';
import { useAppColors } from '../../foundation/theme';
import { ColumnSpacer4 } from '../../components/spacers/Spacers';

export const HomeScreen = () => {
  const colors = useAppColors();
  const { uiState, onFeatureClick } = useHomeViewModel();

  const renderItem = ({ item }: { item: Feature }) => (
    <FeatureCard feature={item} onClick={() => onFeatureClick(item.id)} />
  );

  const keyExtractor = (item: Feature) => item.id;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={uiState.features}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ padding: space4, paddingBottom: 100 }}
        ItemSeparatorComponent={ColumnSpacer4}
      />
    </View>
  );
};
