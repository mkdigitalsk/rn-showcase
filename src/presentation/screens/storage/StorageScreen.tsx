import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const StorageScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Storage Screen</Text>
      <Text variant="bodyMedium">Empty test screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
