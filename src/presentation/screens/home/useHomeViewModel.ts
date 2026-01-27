import { useState } from 'react';
import { HomeUiState, initialHomeUiState } from './HomeUiState';
import { FeatureId } from './Feature';

export const useHomeViewModel = () => {
  const [uiState] = useState<HomeUiState>(initialHomeUiState);

  const onFeatureClick = (featureId: FeatureId) => {
    // TODO: Navigation will be implemented later
    console.log('Feature clicked:', featureId);
  };

  return {
    uiState,
    onFeatureClick,
  };
};
