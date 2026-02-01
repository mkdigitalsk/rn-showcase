import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackNavigator } from './HomeStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';
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
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral80,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.neutral10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Routes.HomeMain.name;
          const screenRoute = getRoute(routeName);
          return {
            tabBarStyle: screenRoute.showBottomNav
              ? { backgroundColor: colors.surface, borderTopColor: colors.neutral10 }
              : { display: 'none' as const },
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
