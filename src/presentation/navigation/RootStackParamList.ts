import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabParamList } from './BottomTabNavigator';
import { HomeStackProps } from './HomeStackNavigator';

export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
};

// Re-export for convenience
export type { BottomTabParamList, HomeStackProps };

// Type-safe navigation pre celú appku
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
