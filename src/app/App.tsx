import React, { useEffect } from 'react';
import { Linking, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../presentation/foundation';
import { RootStackNavigator } from '../presentation/navigation';
import { StringsProvider } from '../presentation/foundation/strings';

const handleDeepLink = (url: string) => {
  if (url.includes('notify')) {
    const params = new URL(url).searchParams;
    const message = params.get('message') || 'Task completed';
    Alert.alert('Claude Code', message);
  }
};

function App(): React.JSX.Element {
  useEffect(() => {
    // Handle deep link when app is already open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Handle deep link that opened the app
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  return (
    <StringsProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </StringsProvider>
  );
}

export default App;
