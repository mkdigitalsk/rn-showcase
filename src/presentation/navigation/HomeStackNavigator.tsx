import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppColors } from '../foundation/theme';
import { useStrings } from '../foundation/strings';
import { HomeScreen } from '../screens/home/HomeScreen';
import { UiComponentsScreen } from '../screens/uiComponents/UiComponentsScreen';
import { NetworkingScreen } from '../screens/networking/NetworkingScreen';
import { StorageScreen } from '../screens/storage/StorageScreen';
import { PlatformApisScreen } from '../screens/platformApis/PlatformApisScreen';
import { DatabaseScreen } from '../screens/database/DatabaseScreen';
import { ScannerScreen } from '../screens/scanner/ScannerScreen';
import { CalendarScreen } from '../screens/calendar/CalendarScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { HomeSection } from './routes';

// Derived from HomeSection routes
export type HomeStackProps = {
  [K in keyof typeof HomeSection]: undefined;
};

const Stack = createNativeStackNavigator<HomeStackProps>();

export const HomeStackNavigator = () => {
  const colors = useAppColors();
  const { t } = useStrings();

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
        options={{ title: t('screen_home') }}
      />
      <Stack.Screen
        name={HomeSection.UiComponents.name}
        component={UiComponentsScreen}
        options={{ title: t('screen_ui_components') }}
      />
      <Stack.Screen
        name={HomeSection.Networking.name}
        component={NetworkingScreen}
        options={{ title: t('screen_networking') }}
      />
      <Stack.Screen
        name={HomeSection.Storage.name}
        component={StorageScreen}
        options={{ title: t('screen_storage') }}
      />
      <Stack.Screen
        name={HomeSection.PlatformApis.name}
        component={PlatformApisScreen}
        options={{ title: t('screen_platform_apis') }}
      />
      <Stack.Screen
        name={HomeSection.Database.name}
        component={DatabaseScreen}
        options={{ title: t('screen_database') }}
      />
      <Stack.Screen
        name={HomeSection.Scanner.name}
        component={ScannerScreen}
        options={{ title: t('screen_scanner') }}
      />
      <Stack.Screen
        name={HomeSection.Calendar.name}
        component={CalendarScreen}
        options={{ title: t('screen_calendar') }}
      />
      <Stack.Screen
        name={HomeSection.Notifications.name}
        component={NotificationsScreen}
        options={{ title: t('screen_notifications') }}
      />
    </Stack.Navigator>
  );
};
