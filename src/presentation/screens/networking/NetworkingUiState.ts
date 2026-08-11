import { RemoteNote } from '../../../domain/model/RemoteNote';
import type { AppError } from '../../foundation/errors/AppError';

export interface NetworkingUiState {
  notes: RemoteNote[];
  editing: RemoteNote | null;
  conflict: RemoteNote | null;
  isLoading: boolean;
  isSaving: boolean;
  error: AppError | null;
}

export const initialNetworkingUiState: NetworkingUiState = {
  notes: [],
  editing: null,
  conflict: null,
  isLoading: false,
  isSaving: false,
  error: null,
};
