import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeUiState, initialHomeUiState } from './HomeUiState';
import { FeatureId } from './Feature';
import { HomeStackProps } from '../../navigation/HomeStackNavigator';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackProps, 'HomeMain'>;

export const useHomeViewModel = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const uiState: HomeUiState = initialHomeUiState;

  const onFeatureClick = useCallback(
    (featureId: FeatureId) => {
      switch (featureId) {
        case FeatureId.UI_COMPONENTS:
          navigation.navigate('UiComponents');
          break;
        case FeatureId.NETWORKING:
          navigation.navigate('Networking');
          break;
        case FeatureId.STORAGE:
          navigation.navigate('Storage');
          break;
        case FeatureId.PLATFORM_APIS:
          navigation.navigate('PlatformApis');
          break;
        case FeatureId.DATABASE:
          navigation.navigate('Database');
          break;
        case FeatureId.SCANNER:
          navigation.navigate('Scanner');
          break;
        case FeatureId.CALENDAR:
          navigation.navigate('Calendar');
          break;
        case FeatureId.NOTIFICATIONS:
          navigation.navigate('Notifications');
          break;
        default:
          console.log('Feature not implemented:', featureId);
      }
    },
    [navigation],
  );

  return {
    uiState,
    onFeatureClick,
  };
};
