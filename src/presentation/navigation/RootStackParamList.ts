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
  // React Navigation's own augmentation shape.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
