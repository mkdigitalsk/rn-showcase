import { useState, useCallback, useEffect, useMemo } from 'react';
import { container, TYPES } from '../../../app/di/diContainer';
import { GetUsersUseCase } from '../../../domain/useCases/GetUsersUseCase';
import { BaseException } from '../../../domain/exceptions/BaseException';
import { NetworkingUiState, initialNetworkingUiState } from './NetworkingUiState';

export const useNetworkingViewModel = () => {
  const [uiState, setUiState] = useState<NetworkingUiState>(initialNetworkingUiState);

  // Resolve once, not on every render
  const getUsersUseCase = useMemo(
    () => container.resolve<GetUsersUseCase>(TYPES.GetUsersUseCase),
    []
  );

  const loadUsers = useCallback(async () => {
    setUiState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const users = await getUsersUseCase.execute();
      setUiState({ users, isLoading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof BaseException
          ? error.userMessage
          : 'An unexpected error occurred';
      setUiState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
    }
  }, [getUsersUseCase]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    uiState,
    onRetry: loadUsers,
  };
};
