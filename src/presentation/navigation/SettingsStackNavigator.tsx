import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppColors } from '../foundation/theme';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { Routes } from './routes';

export type SettingsStackProps = {
  SettingsMain: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackProps>();

export const SettingsStackNavigator = () => {
  const colors = useAppColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.neutral80,
      }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ title: Routes.Settings.title }}
      />
    </Stack.Navigator>
  );
};
