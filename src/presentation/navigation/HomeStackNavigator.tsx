import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { UiComponentsScreen } from '../screens/uiComponents/UiComponentsScreen';
import { NetworkingScreen } from '../screens/networking/NetworkingScreen';
import { StorageScreen } from '../screens/storage/StorageScreen';
import { HomeSection } from './routes';

// Derived from HomeSection routes
export type HomeStackProps = {
  [K in keyof typeof HomeSection]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackProps>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HomeSection.HomeMain.name} component={HomeScreen} />
      <Stack.Screen name={HomeSection.UiComponents.name} component={UiComponentsScreen} />
      <Stack.Screen name={HomeSection.Networking.name} component={NetworkingScreen} />
      <Stack.Screen name={HomeSection.Storage.name} component={StorageScreen} />
    </Stack.Navigator>
  );
};
