import React, { useEffect } from 'react';
import { Linking, Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useThemeMode } from '../presentation/foundation/ThemeProvider';
import { RootStackNavigator } from '../presentation/navigation';
import { StringsProvider } from '../presentation/foundation/strings';

const handleDeepLink = (url: string) => {
  if (url.includes('notify')) {
    const params = new URL(url).searchParams;
    const message = params.get('message') || 'Task completed';
    Alert.alert('Claude Code', message);
  }
};

const AppContent = () => {
  const { navigationTheme } = useThemeMode();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={navigationTheme.colors.primary}
      />
      <NavigationContainer theme={navigationTheme}>
        <RootStackNavigator />
      </NavigationContainer>
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <StringsProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </StringsProvider>
  );
}

export default App;
