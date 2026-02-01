import { useState, useEffect, useCallback, useMemo } from 'react';
import { container, TYPES } from '../../../app/di/diContainer';
import { LoadStorageDataUseCase } from '../../../domain/useCases/storage/LoadStorageDataUseCase';
import { ObserveStorageDataUseCase } from '../../../domain/useCases/storage/ObserveStorageDataUseCase';
import { SetSessionCounterUseCase } from '../../../domain/useCases/storage/SetSessionCounterUseCase';
import { SetPersistentCounterUseCase } from '../../../domain/useCases/storage/SetPersistentCounterUseCase';
import { ClearSessionUseCase } from '../../../domain/useCases/storage/ClearSessionUseCase';
import { StorageUiState, initialStorageUiState } from './StorageUiState';

export const useStorageViewModel = () => {
  const [uiState, setUiState] = useState<StorageUiState>(initialStorageUiState);

  const loadStorageDataUseCase = useMemo(
    () => container.resolve<LoadStorageDataUseCase>(TYPES.LoadStorageDataUseCase), []
  );
  const observeStorageDataUseCase = useMemo(
    () => container.resolve<ObserveStorageDataUseCase>(TYPES.ObserveStorageDataUseCase), []
  );
  const setSessionCounterUseCase = useMemo(
    () => container.resolve<SetSessionCounterUseCase>(TYPES.SetSessionCounterUseCase), []
  );
  const setPersistentCounterUseCase = useMemo(
    () => container.resolve<SetPersistentCounterUseCase>(TYPES.SetPersistentCounterUseCase), []
  );
  const clearSessionUseCase = useMemo(
    () => container.resolve<ClearSessionUseCase>(TYPES.ClearSessionUseCase), []
  );

  useEffect(() => {
    const { subscribe } = observeStorageDataUseCase.execute();
    const subscription = subscribe((data) => {
      setUiState({
        sessionCounter: data.sessionCounter,
        persistentCounter: data.persistentCounter,
      });
    });

    loadStorageDataUseCase.execute();

    return () => {
      subscription.unsubscribe();
    };
  }, [loadStorageDataUseCase, observeStorageDataUseCase]);

  const incrementSessionCounter = useCallback(async () => {
    await setSessionCounterUseCase.execute(uiState.sessionCounter + 1);
  }, [uiState.sessionCounter, setSessionCounterUseCase]);

  const decrementSessionCounter = useCallback(async () => {
    await setSessionCounterUseCase.execute(Math.max(0, uiState.sessionCounter - 1));
  }, [uiState.sessionCounter, setSessionCounterUseCase]);

  const incrementPersistentCounter = useCallback(async () => {
    await setPersistentCounterUseCase.execute(uiState.persistentCounter + 1);
  }, [uiState.persistentCounter, setPersistentCounterUseCase]);

  const decrementPersistentCounter = useCallback(async () => {
    await setPersistentCounterUseCase.execute(Math.max(0, uiState.persistentCounter - 1));
  }, [uiState.persistentCounter, setPersistentCounterUseCase]);

  const clearSession = useCallback(async () => {
    await clearSessionUseCase.execute();
  }, [clearSessionUseCase]);

  return {
    uiState,
    incrementSessionCounter,
    decrementSessionCounter,
    incrementPersistentCounter,
    decrementPersistentCounter,
    clearSession,
  };
};
