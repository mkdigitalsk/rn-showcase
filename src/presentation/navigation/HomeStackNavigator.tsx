import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { UiComponentsScreen } from '../screens/uiComponents/UiComponentsScreen';
import { NetworkingScreen } from '../screens/networking/NetworkingScreen';
import { StorageScreen } from '../screens/storage/StorageScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  UiComponents: undefined;
  Networking: undefined;
  Storage: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UiComponents"
        component={UiComponentsScreen}
        options={{ title: 'UI Components' }}
      />
      <Stack.Screen
        name="Networking"
        component={NetworkingScreen}
        options={{ title: 'Networking' }}
      />
      <Stack.Screen
        name="Storage"
        component={StorageScreen}
        options={{ title: 'Storage' }}
      />
    </Stack.Navigator>
  );
};
