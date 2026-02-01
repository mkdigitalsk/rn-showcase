import { useState, useEffect, useCallback, useRef } from 'react';
import { TYPES } from '../../../app/diTypes';
import { ShareUseCase } from '../../../domain/useCases/platform/ShareUseCase';
import { DialUseCase } from '../../../domain/useCases/platform/DialUseCase';
import { OpenLinkUseCase } from '../../../domain/useCases/platform/OpenLinkUseCase';
import { SendEmailUseCase } from '../../../domain/useCases/platform/SendEmailUseCase';
import { CopyToClipboardUseCase } from '../../../domain/useCases/platform/CopyToClipboardUseCase';
import { GetLocationUseCase } from '../../../domain/useCases/location/GetLocationUseCase';
import { IsBiometricEnabledUseCase } from '../../../domain/useCases/biometric/IsBiometricEnabledUseCase';
import { AuthenticateWithBiometricUseCase } from '../../../domain/useCases/biometric/AuthenticateWithBiometricUseCase';
import { IsFlashlightAvailableUseCase } from '../../../domain/useCases/flashlight/IsFlashlightAvailableUseCase';
import { ToggleFlashlightUseCase } from '../../../domain/useCases/flashlight/ToggleFlashlightUseCase';
import { ObserveLocationUpdatesUseCase } from '../../../domain/useCases/location/ObserveLocationUpdatesUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { PlatformApisUiState, initialPlatformApisUiState } from './PlatformApisUiState';

const DEMO_PHONE_NUMBER = '+1234567890';
const DEMO_URL = 'https://github.com/KusnirM';
const DEMO_EMAIL = 'example@example.com';
const DEMO_SHARE_TEXT = 'Check out this awesome app!';
const DEMO_EMAIL_SUBJECT = 'Hello from RN Showcase';
const DEMO_EMAIL_BODY = 'This email was sent from the React Native Showcase app.';
const DEMO_COPY_TEXT = 'This text was copied from RN Showcase!';

export const usePlatformApisViewModel = () => {
  const [uiState, setUiState] = useState<PlatformApisUiState>(initialPlatformApisUiState);
  const stopTrackingRef = useRef<(() => void) | null>(null);

  const shareUseCase = useResolve<ShareUseCase>(TYPES.ShareUseCase);
  const dialUseCase = useResolve<DialUseCase>(TYPES.DialUseCase);
  const openLinkUseCase = useResolve<OpenLinkUseCase>(TYPES.OpenLinkUseCase);
  const sendEmailUseCase = useResolve<SendEmailUseCase>(TYPES.SendEmailUseCase);
  const copyToClipboardUseCase = useResolve<CopyToClipboardUseCase>(TYPES.CopyToClipboardUseCase);
  const getLocationUseCase = useResolve<GetLocationUseCase>(TYPES.GetLocationUseCase);
  const isBiometricEnabledUseCase = useResolve<IsBiometricEnabledUseCase>(TYPES.IsBiometricEnabledUseCase);
  const authenticateWithBiometricUseCase = useResolve<AuthenticateWithBiometricUseCase>(TYPES.AuthenticateWithBiometricUseCase);
  const isFlashlightAvailableUseCase = useResolve<IsFlashlightAvailableUseCase>(TYPES.IsFlashlightAvailableUseCase);
  const toggleFlashlightUseCase = useResolve<ToggleFlashlightUseCase>(TYPES.ToggleFlashlightUseCase);
  const observeLocationUpdatesUseCase = useResolve<ObserveLocationUpdatesUseCase>(TYPES.ObserveLocationUpdatesUseCase);

  // Check biometrics and flashlight availability on mount
  useEffect(() => {
    execute({
      action: () => Promise.all([
        isBiometricEnabledUseCase.execute(),
        isFlashlightAvailableUseCase.execute(),
      ]),
      onSuccess: ([biometrics, flashlight]) => {
        setUiState(prev => ({
          ...prev,
          biometricsAvailable: biometrics,
          flashlightAvailable: flashlight,
        }));
      },
    });
  }, [isBiometricEnabledUseCase, isFlashlightAvailableUseCase]);

  // Cleanup location tracking on unmount
  useEffect(() => {
    return () => {
      if (stopTrackingRef.current) {
        stopTrackingRef.current();
      }
    };
  }, []);

  const share = useCallback(() => {
    execute({ action: () => shareUseCase.execute(DEMO_SHARE_TEXT) });
  }, [shareUseCase]);

  const dial = useCallback(() => {
    execute({ action: () => dialUseCase.execute(DEMO_PHONE_NUMBER) });
  }, [dialUseCase]);

  const openLink = useCallback(() => {
    execute({ action: () => openLinkUseCase.execute(DEMO_URL) });
  }, [openLinkUseCase]);

  const sendEmail = useCallback(() => {
    execute({
      action: () => sendEmailUseCase.execute({
        to: DEMO_EMAIL,
        subject: DEMO_EMAIL_SUBJECT,
        body: DEMO_EMAIL_BODY,
      }),
    });
  }, [sendEmailUseCase]);

  const copyToClipboard = useCallback(() => {
    execute({
      action: () => copyToClipboardUseCase.execute(DEMO_COPY_TEXT),
      onSuccess: () => {
        setUiState(prev => ({ ...prev, copiedToClipboard: true }));
        setTimeout(() => {
          setUiState(prev => ({ ...prev, copiedToClipboard: false }));
        }, 2000);
      },
    });
  }, [copyToClipboardUseCase]);

  const getLocation = useCallback(() => {
    execute({
      action: () => getLocationUseCase.execute(),
      onLoading: () => setUiState(prev => ({ ...prev, locationLoading: true, locationError: false })),
      onSuccess: (location) => setUiState(prev => ({ ...prev, location, locationLoading: false })),
      onError: () => setUiState(prev => ({ ...prev, locationLoading: false, locationError: true })),
    });
  }, [getLocationUseCase]);

  const startLocationUpdates = useCallback(() => {
    if (stopTrackingRef.current) return;

    setUiState(prev => ({ ...prev, isTrackingLocation: true, locationUpdatesError: false }));
    const subscription = observeLocationUpdatesUseCase.execute().subscribe(
      (location) => {
        setUiState(prev => ({ ...prev, trackedLocation: location }));
      },
      () => {
        setUiState(prev => ({ ...prev, isTrackingLocation: false, locationUpdatesError: true }));
        stopTrackingRef.current = null;
      },
    );
    stopTrackingRef.current = () => subscription.unsubscribe();
  }, [observeLocationUpdatesUseCase]);

  const stopLocationUpdates = useCallback(() => {
    if (stopTrackingRef.current) {
      stopTrackingRef.current();
      stopTrackingRef.current = null;
    }
    setUiState(prev => ({ ...prev, isTrackingLocation: false }));
  }, []);

  const toggleLocationUpdates = useCallback(() => {
    if (uiState.isTrackingLocation) {
      stopLocationUpdates();
    } else {
      startLocationUpdates();
    }
  }, [uiState.isTrackingLocation, startLocationUpdates, stopLocationUpdates]);

  const authenticateWithBiometrics = useCallback(() => {
    execute({
      action: () => authenticateWithBiometricUseCase.execute(),
      onLoading: () => setUiState(prev => ({ ...prev, biometricsLoading: true, biometricsResult: null })),
      onSuccess: (result) => setUiState(prev => ({ ...prev, biometricsLoading: false, biometricsResult: result })),
      onError: (error) => setUiState(prev => ({
        ...prev,
        biometricsLoading: false,
        biometricsResult: { type: 'failed', message: error.userMessage },
      })),
    });
  }, [authenticateWithBiometricUseCase]);

  const toggleFlashlight = useCallback(() => {
    execute({
      action: () => toggleFlashlightUseCase.execute(uiState.flashlightOn),
      onSuccess: (newState) => setUiState(prev => ({ ...prev, flashlightOn: newState })),
    });
  }, [toggleFlashlightUseCase, uiState.flashlightOn]);

  return {
    uiState,
    share,
    dial,
    openLink,
    sendEmail,
    copyToClipboard,
    getLocation,
    toggleLocationUpdates,
    authenticateWithBiometrics,
    toggleFlashlight,
  };
};
