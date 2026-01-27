import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextHeadlineMediumPrimary, TextBodyLargeNeutral80 } from '../../components';
import { space4 } from '../../foundation/dimensions';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <TextHeadlineMediumPrimary>Settings</TextHeadlineMediumPrimary>
      <View style={styles.spacer} />
      <TextBodyLargeNeutral80>
        TODO: Add settings options here.
      </TextBodyLargeNeutral80>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: space4,
  },
  spacer: {
    height: space4,
  },
});
