import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackNavigator } from './HomeStackNavigator';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useAppColors } from '../foundation/theme';
import { getRoute, Routes } from './routes';

export type BottomTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const colors = useAppColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral80,
        tabBarStyle: {
          backgroundColor: colors.neutral0,
          borderTopColor: colors.neutral10,
        },
        headerStyle: {
          backgroundColor: colors.neutral0,
        },
        headerTintColor: colors.neutral100,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Routes.HomeMain.name;
          const screenRoute = getRoute(routeName);
          return {
            title: screenRoute.title,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: getRoute(Routes.Settings.name).title,
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
