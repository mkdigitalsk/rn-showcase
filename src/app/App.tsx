import React from 'react';
import {

  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeScreen from '../presentation/home/HomeScreen';
import { Box } from '../samples/sample';


function App(): React.JSX.Element {

  return (
    <Box><Text>Child1</Text></Box>
  );
}

const styles = StyleSheet.create({

});

export default App;
