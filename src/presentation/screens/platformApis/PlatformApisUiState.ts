import { Location } from '../../../domain/model/Location';
import { BiometricResult } from '../../../domain/repositories/BiometricRepository';

export interface PlatformApisUiState {
  copiedToClipboard: boolean;
  location: Location | null;
  locationLoading: boolean;
  locationError: boolean;
  isTrackingLocation: boolean;
  trackedLocation: Location | null;
  locationUpdatesError: boolean;
  biometricsAvailable: boolean;
  biometricsLoading: boolean;
  biometricsResult: BiometricResult | null;
  flashlightAvailable: boolean;
  flashlightOn: boolean;
}

export const initialPlatformApisUiState: PlatformApisUiState = {
  copiedToClipboard: false,
  location: null,
  locationLoading: false,
  locationError: false,
  isTrackingLocation: false,
  trackedLocation: null,
  locationUpdatesError: false,
  biometricsAvailable: false,
  biometricsLoading: false,
  biometricsResult: null,
  flashlightAvailable: false,
  flashlightOn: false,
};
