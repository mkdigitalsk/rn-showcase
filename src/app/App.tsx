import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../presentation/foundation';
import { HomeScreen } from '../presentation/screens/home/HomeScreen';

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={lightTheme}>
      <HomeScreen />
    </PaperProvider>
  );
}

export default App;
