import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppColors } from '../foundation/theme';
import { useStrings } from '../foundation/strings';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

export type SettingsStackProps = {
  SettingsMain: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackProps>();

export const SettingsStackNavigator = () => {
  const colors = useAppColors();
  const { t } = useStrings();

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
        options={{ title: t('screen_settings') }}
      />
    </Stack.Navigator>
  );
};
