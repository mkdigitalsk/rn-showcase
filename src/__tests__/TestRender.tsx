import React, { ReactElement } from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../presentation/foundation/ThemeProvider';
import { StringsProvider } from '../presentation/foundation/strings';

const IPHONE_17_PRO_METRICS = {
  frame: { x: 0, y: 0, width: 402, height: 874 },
  insets: { top: 62, left: 0, right: 0, bottom: 34 },
};

export const renderScreen = (ui: ReactElement) =>
  render(
    <StringsProvider>
      <SafeAreaProvider initialMetrics={IPHONE_17_PRO_METRICS}>
        <ThemeProvider>
          <NavigationContainer>{ui}</NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </StringsProvider>
  );
