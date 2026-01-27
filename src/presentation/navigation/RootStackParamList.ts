import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabParamList } from './BottomTabNavigator';
import { HomeStackParamList } from './HomeStackNavigator';

export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
};

// Re-export for convenience
export type { BottomTabParamList, HomeStackParamList };

// Type-safe navigation pre celú appku
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
