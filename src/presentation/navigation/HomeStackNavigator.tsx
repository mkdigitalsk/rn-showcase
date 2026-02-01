import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppColors } from '../foundation/theme';
import { HomeScreen } from '../screens/home/HomeScreen';
import { UiComponentsScreen } from '../screens/uiComponents/UiComponentsScreen';
import { NetworkingScreen } from '../screens/networking/NetworkingScreen';
import { StorageScreen } from '../screens/storage/StorageScreen';
import { PlatformApisScreen } from '../screens/platformApis/PlatformApisScreen';
import { DatabaseScreen } from '../screens/database/DatabaseScreen';
import { ScannerScreen } from '../screens/scanner/ScannerScreen';
import { HomeSection } from './routes';

// Derived from HomeSection routes
export type HomeStackProps = {
  [K in keyof typeof HomeSection]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackProps>();

export const HomeStackNavigator = () => {
  const colors = useAppColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.neutral80,
        headerBackTitle: '',
      }}
    >
      <Stack.Screen
        name={HomeSection.HomeMain.name}
        component={HomeScreen}
        options={{ title: HomeSection.HomeMain.title }}
      />
      <Stack.Screen
        name={HomeSection.UiComponents.name}
        component={UiComponentsScreen}
        options={{ title: HomeSection.UiComponents.title }}
      />
      <Stack.Screen
        name={HomeSection.Networking.name}
        component={NetworkingScreen}
        options={{ title: HomeSection.Networking.title }}
      />
      <Stack.Screen
        name={HomeSection.Storage.name}
        component={StorageScreen}
        options={{ title: HomeSection.Storage.title }}
      />
      <Stack.Screen
        name={HomeSection.PlatformApis.name}
        component={PlatformApisScreen}
        options={{ title: HomeSection.PlatformApis.title }}
      />
      <Stack.Screen
        name={HomeSection.Database.name}
        component={DatabaseScreen}
        options={{ title: HomeSection.Database.title }}
      />
      <Stack.Screen
        name={HomeSection.Scanner.name}
        component={ScannerScreen}
        options={{ title: HomeSection.Scanner.title }}
      />
    </Stack.Navigator>
  );
};
