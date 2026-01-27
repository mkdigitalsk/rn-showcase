import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { CircularProgress } from './CircularProgress';

interface LoadingViewProps {
  style?: StyleProp<ViewStyle>;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <CircularProgress />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
