import { useState, useEffect, useCallback } from 'react';
import { TYPES } from '../../../app/diTypes';
import { LoadStorageDataUseCase } from '../../../domain/useCases/storage/LoadStorageDataUseCase';
import { ObserveStorageDataUseCase } from '../../../domain/useCases/storage/ObserveStorageDataUseCase';
import { SetSessionCounterUseCase } from '../../../domain/useCases/storage/SetSessionCounterUseCase';
import { SetPersistentCounterUseCase } from '../../../domain/useCases/storage/SetPersistentCounterUseCase';
import { ClearSessionUseCase } from '../../../domain/useCases/storage/ClearSessionUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { StorageUiState, initialStorageUiState } from './StorageUiState';

export const useStorageViewModel = () => {
  const [uiState, setUiState] = useState<StorageUiState>(initialStorageUiState);

  const loadStorageDataUseCase = useResolve<LoadStorageDataUseCase>(TYPES.LoadStorageDataUseCase);
  const observeStorageDataUseCase = useResolve<ObserveStorageDataUseCase>(TYPES.ObserveStorageDataUseCase);
  const setSessionCounterUseCase = useResolve<SetSessionCounterUseCase>(TYPES.SetSessionCounterUseCase);
  const setPersistentCounterUseCase = useResolve<SetPersistentCounterUseCase>(TYPES.SetPersistentCounterUseCase);
  const clearSessionUseCase = useResolve<ClearSessionUseCase>(TYPES.ClearSessionUseCase);

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

  const incrementSessionCounter = useCallback(() => {
    execute({
      action: () => setSessionCounterUseCase.execute(uiState.sessionCounter + 1),
    });
  }, [uiState.sessionCounter, setSessionCounterUseCase]);

  const decrementSessionCounter = useCallback(() => {
    execute({
      action: () => setSessionCounterUseCase.execute(Math.max(0, uiState.sessionCounter - 1)),
    });
  }, [uiState.sessionCounter, setSessionCounterUseCase]);

  const incrementPersistentCounter = useCallback(() => {
    execute({
      action: () => setPersistentCounterUseCase.execute(uiState.persistentCounter + 1),
    });
  }, [uiState.persistentCounter, setPersistentCounterUseCase]);

  const decrementPersistentCounter = useCallback(() => {
    execute({
      action: () => setPersistentCounterUseCase.execute(Math.max(0, uiState.persistentCounter - 1)),
    });
  }, [uiState.persistentCounter, setPersistentCounterUseCase]);

  const clearSession = useCallback(() => {
    execute({
      action: () => clearSessionUseCase.execute(),
    });
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
