import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from '../presentation/home/HomeScreen';
import { PaperProvider } from 'react-native-paper';


function App(): React.JSX.Element {

  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
