import { User } from '../../../domain/model/User';
import type { AppError } from '../../foundation/errors/AppError';

export interface NetworkingUiState {
  users: User[];
  isLoading: boolean;
  error: AppError | null;
}

export const initialNetworkingUiState: NetworkingUiState = {
  users: [],
  isLoading: false,
  error: null,
};
