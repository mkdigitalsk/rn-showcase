import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useHomeViewModel } from './useHomeViewModel';
import { FeatureCard } from './FeatureCard';
import { Feature } from './Feature';
import { space4 } from '../../foundation/dimensions';

export const HomeScreen = () => {
  const { uiState, onFeatureClick } = useHomeViewModel();

  const renderItem = ({ item }: { item: Feature }) => (
    <FeatureCard feature={item} onClick={() => onFeatureClick(item.id)} />
  );

  const keyExtractor = (item: Feature) => item.id;

  return (
    <View style={styles.container}>
      <FlatList
        data={uiState.features}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: space4,
    paddingBottom: 100, // Space for bottom navigation (will be replaced with safe area)
  },
  separator: {
    height: space4,
  },
});
