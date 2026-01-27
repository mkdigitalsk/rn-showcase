import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeUiState, initialHomeUiState } from './HomeUiState';
import { FeatureId } from './Feature';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;

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
        default:
          // TODO: Implement other features
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
