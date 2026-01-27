import { Feature, showcaseFeatures } from './Feature';

export interface HomeUiState {
  features: Feature[];
}

export const initialHomeUiState: HomeUiState = {
  features: showcaseFeatures,
};
