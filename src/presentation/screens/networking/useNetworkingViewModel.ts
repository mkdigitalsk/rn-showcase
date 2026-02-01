import { useState, useCallback, useEffect } from 'react';
import { TYPES } from '../../../app/diTypes';
import { GetUsersUseCase } from '../../../domain/useCases/GetUsersUseCase';
import { useResolve } from '../../hooks/useResolve';
import { execute } from '../../hooks/useExecute';
import { NetworkingUiState, initialNetworkingUiState } from './NetworkingUiState';

export const useNetworkingViewModel = () => {
  const [uiState, setUiState] = useState<NetworkingUiState>(initialNetworkingUiState);

  const getUsersUseCase = useResolve<GetUsersUseCase>(TYPES.GetUsersUseCase);

  const loadUsers = useCallback(() => {
    execute({
      action: () => getUsersUseCase.execute(),
      onLoading: () => setUiState(prev => ({ ...prev, isLoading: true, error: null })),
      onSuccess: (users) => setUiState({ users, isLoading: false, error: null }),
      onError: (e) => setUiState(prev => ({ ...prev, isLoading: false, error: e.userMessage })),
    });
  }, [getUsersUseCase]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    uiState,
    onRetry: loadUsers,
  };
};
