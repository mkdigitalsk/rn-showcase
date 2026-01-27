import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextHeadlineMediumPrimary } from './text/headlineMedium/TextHeadlineMedium';
import { TextBodyMediumNeutral80 } from './text/bodyMedium/TextBodyMedium';
import { ContainedButton } from './buttons/ContainedButton';
import { ColumnSpacer2 } from './spacers/Spacers';
import { space4 } from '../foundation/dimensions';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message,
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextHeadlineMediumPrimary>Error</TextHeadlineMediumPrimary>
      <ColumnSpacer2 />
      <TextBodyMediumNeutral80>{message}</TextBodyMediumNeutral80>
      {onRetry && (
        <>
          <ColumnSpacer2 />
          <ContainedButton text="Retry" onPress={onRetry} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: space4,
  },
});
