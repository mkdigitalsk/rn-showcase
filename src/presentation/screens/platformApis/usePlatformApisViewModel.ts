import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { container, TYPES } from '../../../app/di/diContainer';
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
import { LocationRepository } from '../../../domain/repositories/LocationRepository';
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

  const shareUseCase = useMemo(
    () => container.resolve<ShareUseCase>(TYPES.ShareUseCase), []
  );
  const dialUseCase = useMemo(
    () => container.resolve<DialUseCase>(TYPES.DialUseCase), []
  );
  const openLinkUseCase = useMemo(
    () => container.resolve<OpenLinkUseCase>(TYPES.OpenLinkUseCase), []
  );
  const sendEmailUseCase = useMemo(
    () => container.resolve<SendEmailUseCase>(TYPES.SendEmailUseCase), []
  );
  const copyToClipboardUseCase = useMemo(
    () => container.resolve<CopyToClipboardUseCase>(TYPES.CopyToClipboardUseCase), []
  );
  const getLocationUseCase = useMemo(
    () => container.resolve<GetLocationUseCase>(TYPES.GetLocationUseCase), []
  );
  const isBiometricEnabledUseCase = useMemo(
    () => container.resolve<IsBiometricEnabledUseCase>(TYPES.IsBiometricEnabledUseCase), []
  );
  const authenticateWithBiometricUseCase = useMemo(
    () => container.resolve<AuthenticateWithBiometricUseCase>(TYPES.AuthenticateWithBiometricUseCase), []
  );
  const isFlashlightAvailableUseCase = useMemo(
    () => container.resolve<IsFlashlightAvailableUseCase>(TYPES.IsFlashlightAvailableUseCase), []
  );
  const toggleFlashlightUseCase = useMemo(
    () => container.resolve<ToggleFlashlightUseCase>(TYPES.ToggleFlashlightUseCase), []
  );
  const locationRepository = useMemo(
    () => container.resolve<LocationRepository>(TYPES.LocationRepository), []
  );

  // Check biometrics and flashlight availability on mount
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const [biometrics, flashlight] = await Promise.all([
          isBiometricEnabledUseCase.execute(),
          isFlashlightAvailableUseCase.execute(),
        ]);
        setUiState(prev => ({
          ...prev,
          biometricsAvailable: biometrics,
          flashlightAvailable: flashlight,
        }));
      } catch {}
    };
    checkAvailability();
  }, [isBiometricEnabledUseCase, isFlashlightAvailableUseCase]);

  // Cleanup location tracking on unmount
  useEffect(() => {
    return () => {
      if (stopTrackingRef.current) {
        stopTrackingRef.current();
      }
    };
  }, []);

  const share = useCallback(async () => {
    await shareUseCase.execute(DEMO_SHARE_TEXT);
  }, [shareUseCase]);

  const dial = useCallback(async () => {
    await dialUseCase.execute(DEMO_PHONE_NUMBER);
  }, [dialUseCase]);

  const openLink = useCallback(async () => {
    await openLinkUseCase.execute(DEMO_URL);
  }, [openLinkUseCase]);

  const sendEmail = useCallback(async () => {
    await sendEmailUseCase.execute({
      to: DEMO_EMAIL,
      subject: DEMO_EMAIL_SUBJECT,
      body: DEMO_EMAIL_BODY,
    });
  }, [sendEmailUseCase]);

  const copyToClipboard = useCallback(async () => {
    await copyToClipboardUseCase.execute(DEMO_COPY_TEXT);
    setUiState(prev => ({ ...prev, copiedToClipboard: true }));
    setTimeout(() => {
      setUiState(prev => ({ ...prev, copiedToClipboard: false }));
    }, 2000);
  }, [copyToClipboardUseCase]);

  const getLocation = useCallback(async () => {
    setUiState(prev => ({ ...prev, locationLoading: true, locationError: false }));
    try {
      const location = await getLocationUseCase.execute();
      setUiState(prev => ({ ...prev, location, locationLoading: false }));
    } catch {
      setUiState(prev => ({ ...prev, locationLoading: false, locationError: true }));
    }
  }, [getLocationUseCase]);

  const startLocationUpdates = useCallback(() => {
    if (stopTrackingRef.current) return;

    setUiState(prev => ({ ...prev, isTrackingLocation: true, locationUpdatesError: false }));
    const stop = locationRepository.startLocationUpdates(
      (location) => {
        setUiState(prev => ({ ...prev, trackedLocation: location }));
      },
      () => {
        setUiState(prev => ({ ...prev, isTrackingLocation: false, locationUpdatesError: true }));
        stopTrackingRef.current = null;
      },
    );
    stopTrackingRef.current = stop;
  }, [locationRepository]);

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

  const authenticateWithBiometrics = useCallback(async () => {
    setUiState(prev => ({ ...prev, biometricsLoading: true, biometricsResult: null }));
    try {
      const result = await authenticateWithBiometricUseCase.execute();
      setUiState(prev => ({ ...prev, biometricsLoading: false, biometricsResult: result }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setUiState(prev => ({
        ...prev,
        biometricsLoading: false,
        biometricsResult: { type: 'failed', message },
      }));
    }
  }, [authenticateWithBiometricUseCase]);

  const toggleFlashlight = useCallback(async () => {
    try {
      const newState = await toggleFlashlightUseCase.execute(uiState.flashlightOn);
      setUiState(prev => ({ ...prev, flashlightOn: newState }));
    } catch {}
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
